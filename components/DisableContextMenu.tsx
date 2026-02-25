"use client";

import { useEffect, useState } from "react";
import { ShieldAlert } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function DisableContextMenu() {
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const playBeep = () => {
      try {
        const legacyWindow = window as Window & {
          webkitAudioContext?: typeof AudioContext;
        };
        const AudioContextConstructor =
          window.AudioContext || legacyWindow.webkitAudioContext;

        if (!AudioContextConstructor) return;

        const audioCtx = new AudioContextConstructor();
        const oscillator = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(audioCtx.destination);

        oscillator.type = "sine";
        // High-tech pulse: sweep from 880Hz to 110Hz
        oscillator.frequency.setValueAtTime(880, audioCtx.currentTime); 
        oscillator.frequency.exponentialRampToValueAtTime(110, audioCtx.currentTime + 0.1);
        
        gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.1);

        oscillator.start(audioCtx.currentTime);
        oscillator.stop(audioCtx.currentTime + 0.1);
        oscillator.onended = () => {
          void audioCtx.close();
        };
      } catch (e) {
        console.warn("AudioContext blocked", e);
      }
    };

    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
      playBeep();
      setShowToast(true);
      
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setShowToast(false);
      }, 3000);
    };

    document.addEventListener("contextmenu", handleContextMenu);

    return () => {
      document.removeEventListener("contextmenu", handleContextMenu);
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <AnimatePresence>
      {showToast && (
        <motion.div 
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
          className="fixed bottom-6 right-6 z-[9999]"
        >
          <div className="bg-zinc-950/90 backdrop-blur-xl border border-red-500/30 text-white px-4 py-3 rounded-lg shadow-[0_0_30px_rgba(239,68,68,0.15)] flex items-center gap-3">
            <motion.div
              animate={{ rotate: [0, -10, 10, -10, 10, 0] }}
              transition={{ duration: 0.5 }}
            >
              <ShieldAlert className="w-5 h-5 text-red-500" />
            </motion.div>
            <div className="flex flex-col">
               <span className="text-sm font-bold tracking-tight">ZONA SUR TECH</span>
               <span className="text-xs text-zinc-400">Sistema Protegido</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
