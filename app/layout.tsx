import "./globals.css";
import { Inter } from "next/font/google";
import Header from "./components/Header";
import StartTrial from "./components/StartTrial";
import TransitionProvider from "./TransitionProvider";
import TrialBanner from "./components/TrialBanner";

export const metadata = { title:"Momentum2025", description:"Advance your career with AI tools" };
const inter = Inter({ subsets:["latin"], variable:"--font-body" });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.variable}>
        <StartTrial />
        <Header />
        <TrialBanner />
        <TransitionProvider>{children}</TransitionProvider>
      </body>
    </html>
  );
}
