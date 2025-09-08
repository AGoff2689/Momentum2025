"use client";
import { useEffect } from "react";

export default function StartTrial() {
  useEffect(() => {
    try {
      const k = "m25:trial:start";
      if (!localStorage.getItem(k)) {
        localStorage.setItem(k, String(Date.now()));
      }
    } catch {}
  }, []);
  return null;
}
