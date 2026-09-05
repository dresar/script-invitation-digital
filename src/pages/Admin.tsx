import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Copy, Check, Eye, Plus, Send, LogOut, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/components/AuthProvider";
import { toast } from "sonner";
import { format } from "date-fns";

const Admin = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  
  const [copied, setCopied] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [guests, setGuests] = useState<any[]>([]);
  
  const [newGuestName, setNewGuestName] = useState("");
  const [newGuestWa, setNewGuestWa] = useState("");

  const [data, setData] = useState({
    title: "Eka & Pasangan",
    eventDate: "2026-04-18T09:00:00", // Default from thesis
  });
  
  const [waTemplate, setWaTemplate] = useState("Halo [NAMA_TAMU]!\nKami mengundang Bapak/Ibu/Saudara/i untuk hadir di acara spesial kami '[JUDUL]'.\n\nSilakan buka link undangan berikut untuk info lebih detail:\n[LINK]\n\nKami sangat menantikan kehadiran Anda!");

  const baseUrl = window.location.origin;

  // Fetch guests from API explicitly
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
    const url = `${baseUrl}/?guest=${encodeURIComponent(slug)}`;
    navigator.clipboard.writeText(url);
    toast.success("Link berhasil disalin!");
    setTimeout(() => setCopied(null), 2000);
  };

  const handleSendWA = (guest: any) => {
    const url = `${baseUrl}/?guest=${encodeURIComponent(guest.slug)}`;
    const message = waTemplate
      .replace(/\[NAMA_TAMU\]/g, guest.guestName)
      .replace(/\[JUDUL\]/g, guest.title)
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
          title: data.title,
          guestName: newGuestName.trim(),
          whatsapp: newGuestWa.trim(),
          eventDate: data.eventDate
        })
      });
      const result = await res.json();
      
      if(res.ok) {
        toast.success("Tamu berhasil dibuat!");
        setNewGuestName("");
        setNewGuestWa("");
        fetchGuests(); // Refresh list
      } else {
        toast.error(result.error || "Gagal membuat tamu");
      }
    } catch (err) {
      toast.error("Terjadi kesalahan jaringan");
    } finally {
      setIsLoading(false);
    }
  };

  const inputClass = "w-full px-4 py-2.5 rounded-lg bg-white/5 border border-white/10 text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all placeholder-slate-500";
  const labelClass = "block text-xs font-semibold text-slate-300 uppercase tracking-widest mb-2";

  return (
    <div className="min-h-screen bg-slate-950 py-8 px-4 font-sans text-slate-200">
      <div className="max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 pb-4 border-b border-white/10">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">Dashboard Pengelola</h1>
              <p className="text-slate-400 text-sm">Kelola undangan digital dan kirimkan langsung via WhatsApp</p>
            </div>
            <div className="flex gap-3 mt-4 sm:mt-0">
              <button onClick={() => navigate("/")} className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-sm font-medium flex items-center gap-2 transition-colors">
                <Eye className="w-4 h-4" /> Preview
              </button>
              <button 
                onClick={() => { logout(); navigate("/login"); }} 
                className="px-4 py-2 bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors"
              >
                <LogOut className="w-4 h-4" /> Keluar
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Konfigurasi Dasar */}
            <div className="lg:col-span-1 space-y-6">
              <div className="bg-slate-900 border border-white/5 shadow-xl rounded-2xl p-6">
                <h2 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">Data Acara Utama</h2>
                <div className="space-y-4">
                  <div>
                    <label className={labelClass}>Judul Utama / Nama Pengantin</label>
                    <input className={inputClass} value={data.title} onChange={(e) => setData({ ...data, title: e.target.value })} />
                  </div>
                  <div>
                    <label className={labelClass}>Tanggal Acara</label>
                    <input type="datetime-local" className={inputClass} value={data.eventDate} onChange={(e) => setData({ ...data, eventDate: e.target.value })} />
                  </div>
                  <div className="pt-2">
                    <label className={labelClass}>Template Pesan WA</label>
                    <textarea 
                      className={inputClass + " resize-y text-xs min-h-[140px] leading-relaxed"} 
                      value={waTemplate} 
                      onChange={(e) => setWaTemplate(e.target.value)} 
                    />
                    <div className="mt-2 text-[10px] text-slate-400 bg-black/20 p-2 rounded-lg border border-white/5">
                      <strong>Variabel:</strong> <br/>
                      <span className="text-primary font-mono">[NAMA_TAMU]</span> <br/>
                      <span className="text-primary font-mono">[JUDUL]</span> <br/>
                      <span className="text-primary font-mono">[LINK]</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* List & Tambah Tamu */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-slate-900 border border-slate-800 shadow-xl shadow-black/40 rounded-2xl p-6 relative overflow-hidden">
                {/* Glow decor */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10 pointer-events-none" />

                <h2 className="text-lg font-semibold text-white mb-4">Buat Undangan Baru</h2>
                <div className="flex flex-col sm:flex-row gap-3 mb-8">
                  <input
                    className={inputClass + " flex-1"}
                    placeholder="Nama Bapak/Ibu Tamu..."
                    value={newGuestName}
                    onChange={(e) => setNewGuestName(e.target.value)}
                  />
                  <input
                    className={inputClass + " flex-1"}
                    placeholder="No. WA (0812... / 62812...)"
                    value={newGuestWa}
                    onChange={(e) => setNewGuestWa(e.target.value)}
                  />
                  <button 
                    disabled={isLoading}
                    onClick={addGuest} 
                    className="px-6 py-2.5 rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground text-sm font-semibold flex items-center justify-center gap-2 transition-all disabled:opacity-50"
                  >
                    {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
                    Buat Link
                  </button>
                </div>

                <div className="flex items-center justify-between mb-4 mt-8 pb-2 border-b border-white/10">
                  <h3 className="text-sm font-semibold text-slate-300">Daftar Tamu Undangan Tersimpan ({guests.length})</h3>
                </div>

                {guests.length === 0 ? (
                  <div className="text-center py-10 bg-white/5 rounded-xl border border-dashed border-white/10">
                    <p className="text-slate-500 text-sm">Belum ada tamu yang didaftarkan. Buat link di atas.</p>
                  </div>
                ) : (
                  <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
                    {guests.map((g: any) => (
                      <div key={g.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-xl bg-slate-800/50 hover:bg-slate-800 border border-slate-700/50 transition-colors">
                        <div className="flex-1">
                          <h4 className="text-base font-medium text-white mb-1">{g.guestName}</h4>
                          <div className="flex items-center gap-3 text-xs text-slate-400">
                            <span className="flex items-center gap-1"><Check className="w-3 h-3 text-emerald-400" /> {format(new Date(g.createdAt), "dd MMM, HH:mm")}</span>
                            <span>•</span>
                            <span>{g.whatsapp || "Tanpa No. WA"}</span>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2 w-full sm:w-auto">
                          <button 
                            onClick={() => handleCopy(g.slug)} 
                            className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-medium transition-colors border border-white/5"
                            title="Salin Link"
                          >
                            {copied === g.slug ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                            {copied === g.slug ? "Disalin!" : "Salin"}
                          </button>
                          
                          <button 
                            onClick={() => handleSendWA(g)} 
                            className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-[#25D366]/10 text-[#25D366] hover:bg-[#25D366]/20 border border-[#25D366]/20 text-xs font-semibold transition-colors shadow-sm shadow-[#25D366]/5"
                          >
                            <Send className="w-4 h-4" /> WA
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Admin;
