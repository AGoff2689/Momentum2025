import "./globals.css";

export const metadata = {
  title: "Momentum2025",
  description: "Advance your career with AI-powered tools."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

