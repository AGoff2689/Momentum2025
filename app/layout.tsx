"use client";
import { useEffect } from "react";
import { startTrialIfNeeded } from "./lib/trial";

import "./globals.css";
import { Inter, Poppins } from "next/font/google";
import Header from "./components/Header";
import TransitionProvider from "./TransitionProvider";
const inter = Inter({ subsets:["latin"], variable:"--font-body" });
const poppins = Poppins({ subsets:["latin"], weight:["600","700","800"], variable:"--font-heading" });
export const metadata = { title:"Momentum2025", description:"Advance your career with AI-powered tools." };
export default function RootLayout({ children }: { children: React.ReactNode }) {
  useEffect(() => { startTrialIfNeeded(); }, []);

  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}

