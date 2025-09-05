"use client";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
export default function TransitionProvider({children}:{children:React.ReactNode}){
  const path = usePathname();
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={path}
        initial={{opacity:0, y:8}}
        animate={{opacity:1, y:0}}
        exit={{opacity:0, y:-8}}
        transition={{duration:.18, ease:"easeOut"}}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
