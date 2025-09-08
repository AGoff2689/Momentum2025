import { NextResponse } from "next/server";
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function detectKind(buf: Buffer, name: string, type: string) {
  const lowerName = (name || "").toLowerCase();
  const lowerType = (type || "").toLowerCase();

  // Magic bytes
  const isPDF  = buf.slice(0, 5).toString("utf8") === "%PDF-";
  const isZIP  = buf.length >= 2 && buf[0] === 0x50 && buf[1] === 0x4B; // "PK" (DOCX is a zip)

  if (isPDF || lowerName.endsWith(".pdf") || lowerType.includes("pdf")) return "pdf";
  if (isZIP  || lowerName.endsWith(".docx") || lowerType.includes("officedocument.wordprocessingml.document")) return "docx";
  if (lowerName.endsWith(".txt") || lowerType.includes("text/plain")) return "txt";
  return "unknown";
}

export async function POST(req: Request) {
  try {
    const form = await req.formData();
    const f = form.get("file") as File | null;
    if (!f) return NextResponse.json({ error: "no_file", message: "No file received." }, { status: 400 });

    const ab = await f.arrayBuffer();
    const buf = Buffer.from(ab);
    const kind = detectKind(buf, f.name || "", f.type || "");

    if (kind === "txt") {
      return NextResponse.json({ text: buf.toString("utf8"), kind });
    }

    if (kind === "docx") {
      try {
        const mammoth = await import("mammoth");
        const { value } = await mammoth.extractRawText({ buffer: buf });
        const text = (value || "").replace(/\s+\n/g, "\n").trim();
        if (!text) throw new Error("empty_docx_text");
        return NextResponse.json({ text, kind });
      } catch (e) {
        return NextResponse.json({ error: "docx_parse_failed", message: "Couldn’t read that DOCX. Try exporting as a fresh .docx or paste text." }, { status: 200 });
      }
    }

    if (kind === "pdf") {
      try {
        const pdfParse = (await import("pdf-parse")).default;
        const result = await pdfParse(buf);
        const text = (result.text || "").replace(/\s+\n/g, "\n").trim();
        if (!text) throw new Error("empty_pdf_text");
        return NextResponse.json({ text, kind });
      } catch (e) {
        return NextResponse.json({ error: "pdf_parse_failed", message: "Couldn’t read that PDF. Try saving as PDF (not a scanned image) or paste text." }, { status: 200 });
      }
    }

    return NextResponse.json({ error: "unsupported_type", message: "Unsupported file. Use PDF, DOCX, or TXT." }, { status: 415 });
  } catch {
    return NextResponse.json({ error: "parse_failed", message: "Resume parsing failed. Please try again or paste your text." }, { status: 200 });
  }
}
