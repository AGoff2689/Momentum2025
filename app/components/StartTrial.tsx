"use client";
import { useEffect } from "react";
import { startTrialIfNeeded } from "../lib/trial";

export default function StartTrial() {
  useEffect(() => { startTrialIfNeeded(); }, []);
  return null;
}
