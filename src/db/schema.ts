import { pgTable, text, serial, timestamp, jsonb, boolean } from "drizzle-orm/pg-core";

export const invitations = pgTable("invitations", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(), // Bride & Groom Name
  eventDate: timestamp("event_date"), // Date of the event
  guestName: text("guest_name").notNull(), // The invited guest
  whatsapp: text("whatsapp"), // Guest whatsapp number
  slug: text("slug").unique().notNull(), // Unique slug for URL: budi-ani-untuk-ahmad-123
  data: jsonb("data"), // Additional data like location, theme, etc
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const systemSettings = pgTable("system_settings", {
  id: serial("id").primaryKey(), // usually only one row
  title: text("title").notNull().default("Eka & Pasangan"),
  eventDate: timestamp("event_date").defaultNow(),
  lokasiAcara: text("lokasi_acara").default("Lantai 7 FIKTI, Universitas Muhammadiyah Sumatera Utara"),
  modePelaksanaan: text("mode_pelaksanaan").default("Offline (Tanpa Zoom)"),
  thesisTitle: text("thesis_title").default("Perancangan dan Implementasi Sistem Informasi Berbasis Web"),
  pembimbing: text("pembimbing").default("Dr. Ahmad Fauzi, M.Kom."),
  pembahas: text("pembahas").default("Prof. Dr. Budi Santoso, M.T."),
  waTemplate: text("wa_template").default("Halo [NAMA_TAMU]!\nKami mengundang Bapak/Ibu/Saudara/i untuk hadir di acara spesial kami '[JUDUL]'.\n\nSilakan buka link undangan berikut untuk info lebih detail:\n[LINK]\n\nKami sangat menantikan kehadiran Anda!"),
  updatedAt: timestamp("updated_at").defaultNow(),
});
