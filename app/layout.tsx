import "./globals.css";

export const metadata = {
  title: "Momentum2025",
  description: "Operational tools built for your workflow."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
