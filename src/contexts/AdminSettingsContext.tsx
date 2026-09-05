import React, { createContext, useContext, useState, useEffect } from "react";

type AdminSettings = {
  title: string;
  eventDate: string;
  waTemplate: string;
  lokasiAcara?: string;
  modePelaksanaan?: string;
  thesisTitle?: string;
  pembimbing?: string;
  pembahas?: string;
};

type AdminSettingsContextType = {
  settings: AdminSettings;
  updateSettings: (newSettings: Partial<AdminSettings>) => void;
};

const defaultSettings: AdminSettings = {
  title: "Eka & Pasangan",
  eventDate: "2026-04-18T09:00:00",
  waTemplate: "Halo [NAMA_TAMU]!\nKami mengundang Bapak/Ibu/Saudara/i untuk hadir di acara spesial kami '[JUDUL]'.\n\nSilakan buka link undangan berikut untuk info lebih detail:\n[LINK]\n\nKami sangat menantikan kehadiran Anda!"
};

const AdminSettingsContext = createContext<AdminSettingsContextType | undefined>(undefined);

export const AdminSettingsProvider = ({ children }: { children: React.ReactNode }) => {
  const [settings, setSettings] = useState<AdminSettings>(defaultSettings);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    fetch('/api/settings')
      .then(r => r.json())
      .then(d => {
        if(d.data) {
          // Format date for datetime-local input safely
          let formattedDate = d.data.eventDate;
          if (formattedDate) {
            const dateObj = new Date(formattedDate);
            const pad = (n: number) => String(n).padStart(2, '0');
            formattedDate = `${dateObj.getFullYear()}-${pad(dateObj.getMonth()+1)}-${pad(dateObj.getDate())}T${pad(dateObj.getHours())}:${pad(dateObj.getMinutes())}`;
          }
          setSettings({ ...d.data, eventDate: formattedDate || defaultSettings.eventDate });
        }
      })
      .catch(console.error)
      .finally(() => setIsLoaded(true));
  }, []);

  const updateSettings = async (newSettings: Partial<AdminSettings>) => {
    try {
      const res = await fetch('/api/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newSettings)
      });
      if (!res.ok) {
        throw new Error("Gagal terhubung ke database");
      }
      
      // Fetch fresh data to ensure state is in sync with DB
      const fresh = await fetch('/api/settings');
      const d = await fresh.json();
      if(d.data) {
        let formattedDate = d.data.eventDate;
        if (formattedDate) {
          const dateObj = new Date(formattedDate);
          const pad = (n: number) => String(n).padStart(2, '0');
          formattedDate = `${dateObj.getFullYear()}-${pad(dateObj.getMonth()+1)}-${pad(dateObj.getDate())}T${pad(dateObj.getHours())}:${pad(dateObj.getMinutes())}`;
        }
        setSettings({ ...d.data, eventDate: formattedDate || defaultSettings.eventDate });
      }
      return true;
    } catch(err) {
      console.error(err);
      throw err;
    }
  };

  if(!isLoaded) return null; // Prevent showing forms before settings fetched

  return (
    <AdminSettingsContext.Provider value={{ settings, updateSettings }}>
      {children}
    </AdminSettingsContext.Provider>
  );
};

export const useAdminSettings = () => {
  const context = useContext(AdminSettingsContext);
  if (context === undefined) {
    throw new Error("useAdminSettings must be used within an AdminSettingsProvider");
  }
  return context;
};
