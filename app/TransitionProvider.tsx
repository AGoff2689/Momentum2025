"use client";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
export default function TransitionProvider({ children }:{children:React.ReactNode}) {
  const p = usePathname();
  return (
    <AnimatePresence mode="wait">
      <motion.div key={p} initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-8}} transition={{duration:.25,ease:"easeOut"}}>
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
