import { motion } from "framer-motion";
import { Users, Webhook, Fingerprint } from "lucide-react";
import { useEffect, useState } from "react";

export default function DashboardPage() {
  const [stats, setStats] = useState({ total: 0 });

  useEffect(() => {
    fetch('/api/invitations')
      .then(res => res.json())
      .then(data => {
        if(data.data) {
          setStats({ total: data.data.length });
        }
      })
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Beranda Administrator</h1>
        <p className="text-slate-400 text-sm">Selamat datang di sistem manajemen halaman undangan digital Anda.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-slate-900 border border-white/5 shadow-xl rounded-2xl p-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-2xl -z-10" />
          <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center mb-4 border border-primary/30">
            <Users className="w-6 h-6 text-primary" />
          </div>
          <h3 className="text-slate-400 text-sm font-medium mb-1">Total Tamu Diundang</h3>
          <p className="text-3xl font-bold text-white">{stats.total}</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-slate-900 border border-white/5 shadow-xl rounded-2xl p-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl -z-10" />
          <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center mb-4 border border-emerald-500/30">
            <Webhook className="w-6 h-6 text-emerald-400" />
          </div>
          <h3 className="text-slate-400 text-sm font-medium mb-1">Status Sistem</h3>
          <p className="text-xl font-bold text-emerald-400 mt-2">Active / Online</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-slate-900 border border-white/5 shadow-xl rounded-2xl p-6 relative overflow-hidden flex flex-col justify-between">
          <div className="absolute top-0 right-0 w-32 h-32 bg-rose-500/10 rounded-full blur-2xl -z-10" />
          <div>
            <div className="w-12 h-12 rounded-xl bg-rose-500/20 flex items-center justify-center mb-4 border border-rose-500/30">
              <Fingerprint className="w-6 h-6 text-rose-400" />
            </div>
            <h3 className="text-slate-400 text-sm font-medium mb-1">Sistem Keamanan</h3>
            <p className="text-sm text-slate-300 mt-1">Dev Bypass Aktif</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
