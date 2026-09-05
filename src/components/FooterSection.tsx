import { motion } from "framer-motion";
import { Heart, Sparkles } from "lucide-react";

const FooterSection = () => {
  return (
    <footer className="py-20 sm:py-24 px-4 text-center bg-background relative overflow-hidden">
      <div className="absolute inset-0 tech-grid opacity-[0.02]" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-sm mx-auto relative z-10"
      >
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
          className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6"
        >
          <Sparkles className="w-6 h-6 text-primary" />
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-foreground font-semibold text-lg sm:text-xl mb-3"
        >
          Terima Kasih
        </motion.p>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-muted-foreground text-sm leading-relaxed mb-2"
        >
          Atas doa dan kehadiran Anda,
        </motion.p>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-muted-foreground text-sm leading-relaxed"
        >
          semoga sidang ini berjalan lancar dan penuh berkah.
        </motion.p>

        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="h-px w-16 bg-gradient-to-r from-transparent via-border to-transparent mx-auto mt-10 mb-6"
        />

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.7 }}
          className="flex items-center justify-center gap-1.5 text-muted-foreground/40 text-xs"
        >
          <span>Made with</span>
          <Heart className="w-3 h-3 text-primary/50 fill-primary/50" />
          <span>• © 2026</span>
        </motion.div>
      </motion.div>
    </footer>
  );
};

export default FooterSection;
