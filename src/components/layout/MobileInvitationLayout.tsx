import React from "react";
import { motion } from "framer-motion";

export const MobileInvitationLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative min-h-screen w-full bg-slate-900 overflow-hidden flex justify-center">
      {/* Kiri beranimasi (Muncul Hanya di Desktop/Tablet) */}
      <motion.div
        className="hidden md:flex flex-1 relative bg-cover bg-center opacity-40 mix-blend-overlay"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2070')" }}
        animate={{ scale: [1.05, 1, 1.05], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />
      
      {/* Kotak Tengah Fokus Mobile (max-w-md atau ukuran HP) - Dipaksa ke Mode Gelap (Dark Mode) */}
      <div className="dark w-full max-w-md h-full min-h-screen bg-background text-foreground relative shadow-2xl z-10 flex flex-col overflow-x-hidden">
        {children}
      </div>

      {/* Kanan beranimasi (Muncul Hanya di Desktop/Tablet) */}
      <motion.div
        className="hidden md:flex flex-1 relative bg-cover bg-center opacity-40 mix-blend-overlay"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=2069')" }}
        animate={{ scale: [1, 1.05, 1], opacity: [0.5, 0.3, 0.5] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
};
