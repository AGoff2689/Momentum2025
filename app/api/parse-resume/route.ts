import { NextResponse } from "next/server";
// Force Node runtime (needed for Buffer + libraries)
export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const form = await req.formData();
    const f = form.get("file") as File | null;
    if (!f) return NextResponse.json({ error: "no_file" }, { status: 400 });

    const ab = await f.arrayBuffer();
    const buf = Buffer.from(ab);
    const name = (f.name || "").toLowerCase();
    const type = (f.type || "").toLowerCase();

    // .txt
    if (name.endsWith(".txt") || type.includes("text/plain")) {
      const text = buf.toString("utf8");
      return NextResponse.json({ text });
    }

    // .docx
    if (name.endsWith(".docx") || type.includes("officedocument.wordprocessingml.document")) {
      const mammoth = await import("mammoth");
      const { value } = await mammoth.extractRawText({ buffer: buf });
      const text = (value || "").replace(/\s+\n/g, "\n").trim();
      return NextResponse.json({ text });
    }

    // .pdf
    if (name.endsWith(".pdf") || type.includes("pdf")) {
      const pdfParse = (await import("pdf-parse")).default;
      const result = await pdfParse(buf);
      const text = (result.text || "").replace(/\s+\n/g, "\n").trim();
      return NextResponse.json({ text });
    }

    return NextResponse.json({ error: "unsupported_type" }, { status: 415 });
  } catch (e) {
    return NextResponse.json({ error: "parse_failed" }, { status: 200 });
  }
}
