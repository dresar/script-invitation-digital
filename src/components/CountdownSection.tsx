import { motion } from "framer-motion";
import Countdown from "./Countdown";
import TechBackground from "./TechBackground";
import { format } from "date-fns";
import { id } from "date-fns/locale";

interface CountdownSectionProps {
  targetDate: Date;
}

const CountdownSection = ({ targetDate }: CountdownSectionProps) => {
  return (
    <section className="py-24 sm:py-32 px-4 relative overflow-hidden" id="countdown">
      <div className="absolute inset-0 hero-gradient" />
      <TechBackground />
      <div className="absolute inset-0 tech-grid opacity-5" />

      {/* Decorative orbs */}
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-10 left-1/4 w-40 h-40 bg-primary/20 rounded-full blur-3xl"
      />
      <motion.div
        animate={{ scale: [1, 1.3, 1], opacity: [0.08, 0.15, 0.08] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute bottom-10 right-1/4 w-56 h-56 bg-accent/15 rounded-full blur-3xl"
      />

      <div className="relative z-10 max-w-2xl mx-auto text-center">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-primary/70 text-xs sm:text-sm tracking-[0.3em] uppercase mb-3"
        >
          Menuju Hari H
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-2xl sm:text-4xl font-bold text-primary-foreground mb-3"
        >
          Hitung Mundur
        </motion.h2>
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="h-px w-24 bg-gradient-to-r from-transparent via-primary to-transparent mx-auto mb-12"
        />
        <Countdown targetDate={targetDate} />

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="text-primary-foreground/40 text-xs sm:text-sm mt-8"
        >
          {format(targetDate, "EEEE, dd MMMM yyyy", { locale: id })} • {format(targetDate, "HH:mm")} WIB
        </motion.p>
      </div>
    </section>
  );
};

export default CountdownSection;
