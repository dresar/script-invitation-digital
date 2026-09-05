import { useState, useEffect, useMemo, useRef } from "react";
import { useSearchParams, useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { format } from "date-fns";
import { id as localeId } from "date-fns/locale";
import { Disc3, Pause } from "lucide-react";
import HeroSection from "@/components/HeroSection";
import EventSection from "@/components/EventSection";
import ThesisSection from "@/components/ThesisSection";
import CountdownSection from "@/components/CountdownSection";
import FooterSection from "@/components/FooterSection";

import { MobileInvitationLayout } from "@/components/layout/MobileInvitationLayout";

const Index = () => {
  const [searchParams] = useSearchParams();
  const { slug } = useParams();
  
  // Format slug string (replace hyphens with spaces for display)
  const formatSlug = (str: string) => {
    if(!str) return null;
    return str.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };

  const guestName = formatSlug(slug as string) || searchParams.get("to") || searchParams.get("guest") || "Tamu Undangan";
  const [opened, setOpened] = useState(false);
  const [dbSettings, setDbSettings] = useState<any>(null);

  // Audio setup
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play().catch(e => console.log('Audio play failed', e));
        setIsPlaying(true);
      }
    }
  };

  const handleOpenInvitation = () => {
    setOpened(true);
    // Play music natively when button is clicked (fixes autoplay block)
    if (audioRef.current) {
      audioRef.current.play().catch(e => console.log('Autoplay blocked:', e));
      setIsPlaying(true);
    }
  };

  useEffect(() => {
    fetch('/api/settings')
      .then(res => res.json())
      .then(data => {
        if(data.data) setDbSettings(data.data);
      })
      .catch(console.error);
  }, []);

  const targetDate = useMemo(() => {
    if(dbSettings && dbSettings.eventDate) {
      const d = new Date(dbSettings.eventDate);
      return d;
    }
    return new Date();
  }, [dbSettings]);

  if (!dbSettings) {
    return (
      <MobileInvitationLayout>
        <div className="flex h-screen items-center justify-center">
           <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      </MobileInvitationLayout>
    );
  }

  // Format explicitly as WIB (+7 hours from UTC) if we want absolute certainty, 
  // but standard format() with locale should handle local browser timezone.
  const tanggalStr = format(targetDate, "EEEE, dd MMMM yyyy", { locale: localeId });
  const waktuStr = format(targetDate, "HH:mm") + " WIB";

  return (
    <MobileInvitationLayout>
      <audio ref={audioRef} src="/music.mp3" loop />
      
      <AnimatePresence mode="wait">
        {!opened ? (
          <motion.div key="hero" exit={{ opacity: 0, y: -30, transition: { duration: 0.5 } }} className="h-full w-full">
            <HeroSection 
              guestName={guestName} 
              nama={dbSettings.title} 
              onOpen={handleOpenInvitation} 
            />
          </motion.div>
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="w-full flex-1 relative pb-10"
          >
            <CountdownSection targetDate={targetDate} />
            <EventSection 
              tanggal={tanggalStr}
              waktu={waktuStr}
              lokasi={dbSettings.lokasiAcara}
              mode={dbSettings.modePelaksanaan}
            />
            <ThesisSection 
              judul={dbSettings.thesisTitle}
              pembimbing={dbSettings.pembimbing}
              pembahas={dbSettings.pembahas}
            />
            <FooterSection />

            {/* Floating Music Button */}
            <motion.button
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleMusic}
              className="fixed bottom-6 right-6 w-12 h-12 rounded-full bg-primary/20 backdrop-blur-md border border-primary/30 flex items-center justify-center text-primary z-50 shadow-lg glow-primary"
            >
              {isPlaying ? (
                <Disc3 className="w-6 h-6 animate-spin-slow" />
              ) : (
                <Pause className="w-6 h-6" />
              )}
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </MobileInvitationLayout>
  );
};

export default Index;
