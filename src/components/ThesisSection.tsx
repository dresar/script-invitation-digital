import { motion } from "framer-motion";
import { BookOpen, User, Users } from "lucide-react";

interface ThesisSectionProps {
  judul?: string;
  pembimbing?: string;
  pembahas?: string;
}

const ThesisSection = ({
  judul = "Perancangan dan Implementasi Sistem Informasi Berbasis Web Menggunakan Teknologi Modern",
  pembimbing = "Dr. Ahmad Fauzi, M.Kom.",
  pembahas = "Prof. Dr. Budi Santoso, M.T.",
}: ThesisSectionProps) => {
  const items = [
    {
      icon: BookOpen,
      label: "Judul Skripsi",
      value: judul,
      gradient: "from-primary/20 to-accent/10",
    },
    {
      icon: User,
      label: "Dosen Pembimbing",
      value: pembimbing,
      gradient: "from-accent/20 to-primary/10",
    },
    {
      icon: Users,
      label: "Dosen Penguji / Pembahas",
      value: pembahas,
      gradient: "from-primary/15 to-accent/15",
    },
  ];

  return (
    <section className="py-20 sm:py-28 px-4 relative overflow-hidden" id="thesis">
      <div className="absolute inset-0 tech-grid opacity-[0.03]" />

      {/* Decorative elements */}
      <motion.div
        animate={{ y: [0, -15, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-20 right-10 w-3 h-3 rounded-full bg-primary/20"
      />
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute bottom-32 left-10 w-2 h-2 rounded-full bg-accent/20"
      />

      <div className="max-w-lg mx-auto text-center relative z-10">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-primary/60 text-xs tracking-[0.3em] uppercase mb-3"
        >
          Tugas Akhir
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-2xl sm:text-3xl font-bold text-foreground mb-3"
        >
          Informasi Skripsi
        </motion.h2>
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="h-px w-24 bg-gradient-to-r from-transparent via-primary to-transparent mx-auto mb-10"
        />

        <div className="space-y-4">
          {items.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, type: "spring", stiffness: 150 }}
              className="bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl p-5 sm:p-6 text-left group hover:bg-white/10 transition-all duration-300 shadow-xl"
            >
              <div className="flex gap-4 items-start">
                <div className={`w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br ${item.gradient} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300 shadow-inner`}>
                  <item.icon className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[10px] sm:text-xs text-slate-400 uppercase tracking-[0.15em] mb-1.5">{item.label}</p>
                  <p className="font-semibold text-white text-sm sm:text-base leading-relaxed">{item.value}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ThesisSection;
