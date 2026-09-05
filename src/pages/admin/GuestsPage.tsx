import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Copy, Check, Plus, Send, Loader2, Link2, Trash } from "lucide-react";
import { useAdminSettings } from "@/contexts/AdminSettingsContext";
import { toast } from "sonner";
import { format } from "date-fns";

export default function GuestsPage() {
  const { settings } = useAdminSettings();
  
  const [copied, setCopied] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [guests, setGuests] = useState<any[]>([]);
  
  const [newGuestName, setNewGuestName] = useState("");
  const [newGuestWa, setNewGuestWa] = useState("");
  const baseUrl = window.location.origin;

  const fetchGuests = async () => {
    try {
      const res = await fetch('/api/invitations');
      const json = await res.json();
      if(json.data) {
        setGuests(json.data);
      }
    } catch(err) {
      console.error("Gagal load data tamu", err);
    }
  }

  useEffect(() => {
    fetchGuests();
  }, []);

  const handleCopy = (slug: string) => {
    const url = `${baseUrl}/${encodeURIComponent(slug)}`;
    navigator.clipboard.writeText(url);
    setCopied(slug);
    toast.success("Link berhasil disalin!");
    setTimeout(() => setCopied(null), 2000);
  };

  const handleSendWA = (guest: any) => {
    const url = `${baseUrl}/${encodeURIComponent(guest.slug)}`;
    const message = settings.waTemplate
      .replace(/\[NAMA_TAMU\]/g, guest.guestName)
      .replace(/\[JUDUL\]/g, settings.thesisTitle)
      .replace(/\[LINK\]/g, url);
      
    const waLink = `https://wa.me/${guest.whatsapp?.replace(/^0/, "62") || ""}?text=${encodeURIComponent(message)}`;
    window.open(waLink, "_blank");
  };

  const addGuest = async () => {
    if (!newGuestName.trim()) return toast.error("Nama tamu harus diisi!");
    
    setIsLoading(true);
    try {
      const res = await fetch('/api/invitations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: settings.title,
          guestName: newGuestName.trim(),
          whatsapp: newGuestWa.trim(),
          eventDate: settings.eventDate
        })
      });
      const result = await res.json();
      
      if(res.ok) {
        toast.success("Tamu berhasil dibuat!");
        setNewGuestName("");
        setNewGuestWa("");
        fetchGuests();
      } else {
        toast.error(result.error || "Gagal membuat tamu");
      }
    } catch (err) {
      toast.error("Terjadi kesalahan jaringan");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Apakah Anda yakin ingin menghapus nama tamu ini? Link mereka akan seketika hangus.")) return;

    try {
      const res = await fetch(`/api/invitations/${id}`, {
        method: 'DELETE'
      });
      if (res.ok) {
        toast.success("Tamu berhasil dihapus!");
        fetchGuests();
      } else {
        toast.error("Gagal menghapus tamu");
      }
    } catch (err) {
      toast.error("Terjadi kesalahan jaringan");
    }
  };

  const inputClass = "w-full px-4 py-3 rounded-lg bg-slate-950 border border-white/10 text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all placeholder-slate-500 shadow-inner";

  return (
    <div className="space-y-8 pb-12 w-full max-w-5xl">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Manajemen Undangan</h1>
        <p className="text-slate-400 text-sm">Buat tautan unik untuk masing-masing tamu secara masif.</p>
      </div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-slate-900 border border-slate-800 shadow-2xl rounded-3xl p-6 sm:p-8 relative overflow-hidden">
        {/* Glow decor */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10 pointer-events-none" />

        <h2 className="text-lg font-semibold text-white mb-4">Pendaftaran Link Baru</h2>
        <div className="flex flex-col sm:flex-row gap-3 mb-8">
          <input
            className={inputClass + " flex-1"}
            placeholder="Ketikkan Nama Tamu (Satu, Dua / Instansi)..."
            value={newGuestName}
            onChange={(e) => setNewGuestName(e.target.value)}
            onKeyDown={(e) => { if(e.key === "Enter") addGuest(); }}
          />
          <input
            className={inputClass + " flex-1 max-w-sm"}
            placeholder="No. WA (Opsional) 0812 / 62812"
            value={newGuestWa}
            onChange={(e) => setNewGuestWa(e.target.value)}
            onKeyDown={(e) => { if(e.key === "Enter") addGuest(); }}
          />
          <button 
            disabled={isLoading}
            onClick={addGuest} 
            className="px-8 py-3 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground text-sm font-bold flex items-center justify-center gap-2 transition-all disabled:opacity-50 shadow-lg shadow-primary/20"
          >
            {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Plus className="w-5 h-5" />}
            Buat Link
          </button>
        </div>

        <div className="flex items-center justify-between mb-6 mt-12 pb-4 border-b border-white/10">
          <h3 className="text-base font-semibold text-slate-200">Daftar Link yang Sudah Digenerate ({guests.length})</h3>
        </div>

        {guests.length === 0 ? (
          <div className="text-center py-16 bg-slate-950/50 rounded-2xl border border-dashed border-white/10">
            <Link2 className="w-10 h-10 text-slate-600 mx-auto mb-3" />
            <p className="text-slate-400 text-sm">Belum ada Link yang digenerate. Semua daftar akan terpusat di sini.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {guests.map((g: any, i) => (
              <motion.div 
                initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}
                key={g.id} 
                className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 p-5 rounded-2xl bg-slate-950/50 hover:bg-slate-800/80 border border-slate-800 transition-colors shadow-sm"
              >
                <div className="flex-1">
                  <h4 className="text-lg font-semibold text-white mb-1.5">{g.guestName}</h4>
                  <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400">
                    <span className="flex items-center gap-1 font-mono text-primary/70 bg-primary/10 px-2 py-0.5 rounded-full">slug: {g.slug}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-emerald-500" /> {format(new Date(g.createdAt), "dd MMM, HH:mm")}</span>
                    <span>•</span>
                    <span>{g.whatsapp || "Tanpa No. WA"}</span>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 w-full md:w-auto mt-2 md:mt-0 pt-2 md:pt-0 border-t border-white/5 md:border-0">
                  <button 
                    onClick={() => handleCopy(g.slug)} 
                    className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-200 text-xs font-semibold transition-colors border border-white/5"
                  >
                    {copied === g.slug ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                    {copied === g.slug ? "Tercopy" : "Salin Link"}
                  </button>
                  
                  <button 
                    onClick={() => handleSendWA(g)} 
                    className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-[#25D366]/10 text-[#25D366] hover:bg-[#25D366]/20 border border-[#25D366]/20 text-sm font-bold transition-all shadow-lg shadow-[#25D366]/5 hover:shadow-[#25D366]/10 hover:-translate-y-0.5 focus:scale-95"
                  >
                    <Send className="w-4 h-4" /> Kirim via WA
                  </button>

                  <button 
                    onClick={() => handleDelete(g.id)} 
                    className="md:flex-none flex items-center justify-center w-10 h-10 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-500 border border-red-500/20 transition-all shadow-lg hover:shadow-red-500/10 hover:-translate-y-0.5 focus:scale-95"
                    title="Hapus Tamu"
                  >
                    <Trash className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
}
