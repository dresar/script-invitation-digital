fetch('http://127.0.0.1:8181/api/settings', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    title: "TEST FROM NODE",
    eventDate: "2026-04-18T09:00",
    lokasiAcara: "Lantai 7 FIKTI",
    waTemplate: "Halo [NAMA_TAMU]!\nIni baris baru."
  })
}).then(res => res.json()).then(console.log).catch(console.error);
