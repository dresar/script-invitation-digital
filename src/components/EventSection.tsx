import { motion } from "framer-motion";
import { Calendar, Clock, MapPin, Monitor } from "lucide-react";

interface EventSectionProps {
  tanggal?: string;
  waktu?: string;
  lokasi?: string;
  mode?: string;
}

const EventSection = ({
  tanggal = "Sabtu, 18 April 2026",
  waktu = "09:00 WIB",
  lokasi = "Lantai 7 FIKTI, Universitas",
  mode = "Offline (Tanpa Zoom)",
}: EventSectionProps) => {
  const items = [
    { icon: Calendar, label: "Hari / Tanggal", value: tanggal, color: "from-primary/20 to-primary/5" },
    { icon: Clock, label: "Waktu", value: waktu, color: "from-accent/20 to-accent/5" },
    { icon: MapPin, label: "Lokasi", value: lokasi, color: "from-primary/20 to-primary/5" },
    { icon: Monitor, label: "Mode Pelaksanaan", value: mode, color: "from-accent/20 to-accent/5" },
  ];

  return (
    <section className="py-20 sm:py-28 px-4 bg-background relative overflow-hidden" id="event">
      {/* Subtle bg decoration */}
      <div className="absolute inset-0 tech-grid opacity-[0.03]" />
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        className="absolute -top-20 -right-20 w-64 h-64 border border-primary/5 rounded-full"
      />
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
        className="absolute -bottom-32 -left-32 w-96 h-96 border border-accent/5 rounded-full"
      />

      <div className="max-w-lg mx-auto text-center relative z-10">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-primary/60 text-xs tracking-[0.3em] uppercase mb-3"
        >
          Detail Acara
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-2xl sm:text-3xl font-bold text-foreground mb-3"
        >
          Informasi Sidang
        </motion.h2>
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="h-px w-24 bg-gradient-to-r from-transparent via-primary to-transparent mx-auto mb-10"
        />

        <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-10">
          {items.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, type: "spring", stiffness: 200 }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl p-4 sm:p-5 text-center group cursor-default shadow-lg hover:bg-white/10 transition-all duration-300"
            >
              <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300`}>
                <item.icon className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
              </div>
              <p className="text-[10px] sm:text-xs text-slate-400 uppercase tracking-wider mb-1">{item.label}</p>
              <p className="font-semibold text-white text-sm sm:text-base leading-tight">{item.value}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="w-full rounded-2xl overflow-hidden border border-white/10 shadow-xl mb-6"
        >
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7963.769599559375!2d98.66529717770993!3d3.613816000000017!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x303131fedffeafb1%3A0xb97d08b7d5857616!2sFakultas%20Ilmu%20Komputer%20dan%20Teknologi%20Informasi%20UMSU!5e0!3m2!1sid!2sid!4v1776321984909!5m2!1sid!2sid" 
            className="w-full h-64 sm:h-80" 
            style={{ border: 0 }} 
            allowFullScreen 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
          />
        </motion.div>

        <motion.a
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          href="https://maps.app.goo.gl/3AEvqZgWpxaR15F86"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground text-sm font-semibold shadow-lg hover:shadow-primary/25 hover:bg-primary/90 transition-all duration-300"
        >
          <MapPin className="w-4 h-4" />
          Buka di Aplikasi Google Maps
        </motion.a>
      </div>
    </section>
  );
};

export default EventSection;
