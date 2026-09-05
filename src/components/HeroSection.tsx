import { motion } from "framer-motion";
import TechBackground from "./TechBackground";
import profilePhoto from "@/assets/profile-photo.png";

interface HeroSectionProps {
  guestName: string;
  onOpen: () => void;
  profileImage?: string;
  nama?: string;
}

const HeroSection = ({ guestName, onOpen, profileImage, nama = "Eka Syarif Maulana" }: HeroSectionProps) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden hero-gradient">
      <TechBackground />
      <div className="tech-grid absolute inset-0 opacity-20" />
      
      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[hsl(220_25%_10%)] z-[1]" />
      
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 text-center px-6 max-w-lg mx-auto"
      >
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-primary/80 text-sm tracking-[0.3em] uppercase mb-8 font-light"
        >
          Undangan Sidang Skripsi
        </motion.p>

        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mx-auto mb-8 relative"
        >
          <div className="w-36 h-36 sm:w-44 sm:h-44 rounded-full mx-auto overflow-hidden border-2 border-primary/30 glow-primary animate-float">
            <img
              src={profileImage || profilePhoto}
              alt={nama}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute inset-0 rounded-full mx-auto w-36 h-36 sm:w-44 sm:h-44 bg-primary/10 blur-2xl animate-pulse-glow" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-3xl sm:text-4xl font-bold text-primary-foreground mb-2"
        >
          {nama}
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="h-px w-16 bg-gradient-to-r from-transparent via-primary to-transparent mx-auto my-4"
        />

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="text-primary-foreground/50 text-sm mb-2"
        >
          Kepada Yth:
        </motion.p>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-primary-foreground text-lg font-medium mb-10"
        >
          {guestName}
        </motion.p>

        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          onClick={onOpen}
          className="px-8 py-3 rounded-full bg-primary text-primary-foreground font-medium text-sm tracking-wide glow-primary transition-all hover:shadow-lg hover:shadow-primary/25"
        >
          Buka Undangan
        </motion.button>
      </motion.div>
    </section>
  );
};

export default HeroSection;
