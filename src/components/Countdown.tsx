import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface CountdownProps {
  targetDate: Date;
}

const Countdown = ({ targetDate }: CountdownProps) => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const tick = () => {
      const now = new Date().getTime();
      const diff = targetDate.getTime() - now;
      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }
      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    };
    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  const items = [
    { label: "Hari", value: timeLeft.days },
    { label: "Jam", value: timeLeft.hours },
    { label: "Menit", value: timeLeft.minutes },
    { label: "Detik", value: timeLeft.seconds },
  ];

  return (
    <div className="flex gap-2.5 sm:gap-4 justify-center">
      {items.map((item, i) => (
        <motion.div
          key={item.label}
          initial={{ opacity: 0, y: 30, scale: 0.8 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.1, type: "spring", stiffness: 200 }}
          className="relative group"
        >
          <div className="absolute -inset-1 bg-gradient-to-b from-primary/20 to-accent/10 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="relative glass rounded-2xl px-3 py-4 sm:px-6 sm:py-5 text-center min-w-[65px] sm:min-w-[90px] border border-primary/10 hover:border-primary/30 transition-all duration-300">
            <AnimatePresence mode="popLayout">
              <motion.span
                key={item.value}
                initial={{ opacity: 0, y: -20, scale: 0.5 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.5 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="block text-2xl sm:text-4xl font-bold font-mono text-primary-foreground tabular-nums"
              >
                {String(item.value).padStart(2, "0")}
              </motion.span>
            </AnimatePresence>
            <span className="text-[10px] sm:text-xs text-primary-foreground/50 uppercase tracking-[0.2em] mt-1 block">
              {item.label}
            </span>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default Countdown;
