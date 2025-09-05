import "./globals.css";
import { Inter, Poppins } from "next/font/google";
import StartTrial from "./components/StartTrial";

export const metadata = {
  title: "Momentum2025",
  description: "Advance your career with AI-powered tools",
};

const inter = Inter({ subsets: ["latin"], variable: "--font-body" });
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-head",
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${poppins.variable}`}>
        <StartTrial />
        {children}
      </body>
    </html>
  );
}
