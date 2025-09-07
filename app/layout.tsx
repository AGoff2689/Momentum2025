import "../styles/theme.css";
import type { Metadata } from "next";
import Sidebar from "./components/Sidebar";

export const metadata: Metadata = {
  title: "Momentum2025",
  description: "Advance your career with AI-powered coaching.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="app-shell">
          <Sidebar />
          <div className="content">
            <div className="content-inner">
              {children}
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
