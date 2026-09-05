import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/components/AuthProvider";
import { toast } from "sonner";
import { Lock, ArrowRight, Code } from "lucide-react";

const Login = () => {
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "admin123") { // Hardcode for simple usage
      login("dummy_token");
      toast.success("Login berhasil!");
      navigate("/admin");
    } else {
      toast.error("Password salah!");
    }
  };

  const handleDevLogin = () => {
    login("dev_bypass_token");
    toast.success("Developer Login Bypass!");
    navigate("/admin");
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/20 blur-[100px] rounded-full pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-sm"
      >
        <div className="glass-strong rounded-2xl p-8 border border-white/10 shadow-2xl relative z-10 backdrop-blur-xl bg-white/5">
          <div className="flex justify-center mb-6">
            <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center border border-primary/30">
              <Lock className="w-6 h-6 text-primary" />
            </div>
          </div>
          
          <h1 className="text-2xl font-bold text-white text-center mb-2">Admin Panel</h1>
          <p className="text-slate-400 text-sm text-center mb-8">Masuk untuk mengelola daftar tamu</p>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <input
                type="password"
                placeholder="Masukkan Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-black/20 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 rounded-lg bg-primary text-primary-foreground font-medium flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
            >
              Masuk <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Tombol Dev Bypass - Hanya Muncul di Development! */}
          {import.meta.env.DEV && (
            <div className="mt-6 pt-6 border-t border-white/10">
              <button
                onClick={handleDevLogin}
                className="w-full py-2.5 rounded-lg border border-dashed border-emerald-500/50 text-emerald-400 font-medium flex items-center justify-center gap-2 hover:bg-emerald-500/10 transition-colors text-sm"
              >
                <Code className="w-4 h-4" /> Dev Auto-Login
              </button>
              <p className="text-xs text-center text-slate-500 mt-2">Tombol ini akan hilang di mode Production</p>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
