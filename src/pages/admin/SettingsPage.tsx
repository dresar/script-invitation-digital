import { motion } from "framer-motion";
import { useAdminSettings } from "@/contexts/AdminSettingsContext";
import { Save } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";

export default function SettingsPage() {
  const { settings, updateSettings } = useAdminSettings();
  const [isSaving, setIsSaving] = useState(false);
  
  const [formData, setFormData] = useState({
    title: settings.title || "",
    eventDate: settings.eventDate || "",
    lokasiAcara: settings.lokasiAcara || "Lantai 7 FIKTI",
    modePelaksanaan: settings.modePelaksanaan || "Offline",
    thesisTitle: settings.thesisTitle || "",
    pembimbing: settings.pembimbing || "",
    pembahas: settings.pembahas || "",
    waTemplate: settings.waTemplate || ""
  });

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await updateSettings(formData);
      toast.success("Pengaturan berhasil disimpan ke Database!");
    } catch (error) {
      toast.error("Gagal menyimpan ke database. Coba lagi.");
    } finally {
      setIsSaving(false);
    }
  };

  const inputClass = "w-full px-4 py-3 rounded-xl bg-slate-950 border border-white/10 text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all placeholder-slate-500";
  const labelClass = "block text-xs font-semibold text-slate-300 uppercase tracking-widest mb-2";

  return (
    <div className="max-w-3xl space-y-8 pb-12">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Pengaturan Acara Publik</h1>
        <p className="text-slate-400 text-sm">Semua data di sini terhubung ke Neon Serverless Database secara real-time.</p>
      </div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-slate-900 border border-white/5 shadow-2xl rounded-3xl p-6 sm:p-8 relative overflow-hidden">
        <h2 className="text-lg font-semibold text-white mb-6 border-b border-white/10 pb-4">A. Informasi Dasar & Lokasi</h2>
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className={labelClass}>Judul Utama Pengantin/Acara</label>
              <input className={inputClass} value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} placeholder="Contoh: Budi & Ani" />
            </div>
            <div>
              <label className={labelClass}>Tanggal Acara Default</label>
              <input type="datetime-local" className={inputClass} value={formData.eventDate} onChange={(e) => setFormData({...formData, eventDate: e.target.value})} />
            </div>
            <div className="sm:col-span-2">
              <label className={labelClass}>Lokasi Acara</label>
              <input className={inputClass} value={formData.lokasiAcara} onChange={(e) => setFormData({...formData, lokasiAcara: e.target.value})} />
            </div>
            <div>
              <label className={labelClass}>Mode Pelaksanaan</label>
              <input className={inputClass} value={formData.modePelaksanaan} onChange={(e) => setFormData({...formData, modePelaksanaan: e.target.value})} placeholder="Offline / Online Zoom" />
            </div>
          </div>
        </div>

        <h2 className="text-lg font-semibold text-white mt-12 mb-6 border-b border-white/10 pb-4">B. Detail Tugas Akhir / Skripsi</h2>
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="sm:col-span-2">
              <label className={labelClass}>Judul Skripsi / Tugas Akhir</label>
              <textarea className={inputClass + " min-h-[80px]"} value={formData.thesisTitle} onChange={(e) => setFormData({...formData, thesisTitle: e.target.value})} />
            </div>
            <div>
              <label className={labelClass}>Dosen Pembimbing</label>
              <input className={inputClass} value={formData.pembimbing} onChange={(e) => setFormData({...formData, pembimbing: e.target.value})} />
            </div>
            <div>
              <label className={labelClass}>Dosen Penguji / Pembahas</label>
              <input className={inputClass} value={formData.pembahas} onChange={(e) => setFormData({...formData, pembahas: e.target.value})} />
            </div>
          </div>
        </div>

        <h2 className="text-lg font-semibold text-white mt-12 mb-6 border-b border-white/10 pb-4">C. Konfigurasi Pesan WhatsApp</h2>
        <div className="space-y-6">
          <div>
            <textarea 
              className={inputClass + " resize-y min-h-[200px] leading-relaxed"} 
              value={formData.waTemplate} 
              onChange={(e) => setFormData({...formData, waTemplate: e.target.value})} 
            />
            <div className="mt-4 p-4 rounded-xl bg-slate-950/50 border border-white/5 grid sm:grid-cols-2 gap-4">
              <div>
                <strong className="text-xs text-slate-300">Variabel Tersedia:</strong>
                <ul className="mt-2 space-y-1.5 text-xs text-slate-400 font-mono">
                  <li><span className="text-primary font-bold">[NAMA_TAMU]</span> - Nama dari form</li>
                  <li><span className="text-primary font-bold">[JUDUL]</span> - Judul Acara (atas)</li>
                  <li><span className="text-primary font-bold">[LINK]</span> - URL/Slug Unik</li>
                </ul>
              </div>
              <div className="text-xs text-slate-500 leading-relaxed pt-1">
                Ketikkan variabel secara persis. Sistem otomatis menggantikan kata tersebut dengan data yang sesuai saat Anda memencet tombol WA di daftar tamu.
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 flex justify-end">
          <button 
            onClick={handleSave}
            disabled={isSaving}
            className="px-8 py-3 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground text-sm font-bold flex items-center justify-center gap-2 transition-all shadow-lg shadow-primary/20 hover:shadow-primary/40 hover:-translate-y-0.5 disabled:opacity-50 disabled:hover:translate-y-0"
          >
            <Save className="w-4 h-4" /> {isSaving ? "Menyimpan ke Neon..." : "Simpan Pengaturan"}
          </button>
        </div>
      </motion.div>
    </div>
  );
}
