# Basyir Agency v3

Aplikasi pembelajaran Bahasa Arab berbasis React + Vite dengan pendekatan game investigasi Hidden Object. Proyek ini berjalan di sisi klien dan menyimpan progres pada browser pengguna.

## Isi aplikasi

- Enam bab pembelajaran Bahasa Arab MA Kelas XI.
- Setiap bab memiliki lima target objek investigasi, puzzle susun kalimat, pemilihan tersangka, ringkasan skor, dan checkpoint penguasaan materi.
- Kamus kosakata, riwayat latihan, penyimpanan progres lokal, serta ekspor/impor data JSON.
- Audio teks Arab menggunakan Nabra neural MSA sebagai mesin utama dan suara Arab bawaan browser sebagai fallback.
- Enam scene gambar baru pilihan pengguna, masing-masing untuk pasar, rumah sakit, bandara, persiapan haji, laboratorium komputer, dan pameran keberagaman Indonesia.
- Hotspot transparan tanpa lingkaran, panah, nomor, kotak, atau glow. Area pencarian mengikuti objek yang terlihat pada scene.
- Setelah pemain menemukan objek, aplikasi memperbesar area objek dan menampilkan kosakata Arab berharakat, transliterasi, arti, penjelasan, dan kontrol audio.

## Menjalankan aplikasi

Membutuhkan Node.js 20 atau lebih baru.

```bash
npm install
npm run dev
```

Untuk pemeriksaan dan build produksi:

```bash
npm test
npm run build
npm run preview
```

Lihat `DEPLOYMENT.md` untuk panduan hosting statis. Pengguna Windows dapat menjalankan `run-windows.bat`.

## Catatan penting

1. Aplikasi belum menggunakan backend, akun, atau database server. Progres tersimpan pada browser dan perangkat yang digunakan.
2. Audio neural mengucapkan Bahasa Arab Fusha untuk latihan bahasa. TTS bukan rekaman penutur manusia dan bukan rujukan tajwid Al-Qur'an.
3. Materi bahasa, harakat, transliterasi, terjemahan, dan soal tetap perlu validasi guru atau penutur Arab sebelum dipakai sebagai bahan ajar resmi.
4. Enam gambar scene berada di `public/scenes/*-v3.webp`. Nama file berversi agar browser tidak memakai gambar lama dari cache.
5. ID lima slot bukti per bab tetap dipertahankan untuk menjaga kompatibilitas progres yang tersimpan. Beberapa label kosakata bukti mengikuti objek baru yang tampak pada gambar.

## Struktur utama

```text
src/
  App.jsx
  components/SceneArt.jsx
  data/campaign.js
  engine/
  services/audioService.js
  styles.css
public/scenes/
  scene-shopping-v3.webp
  scene-health-v3.webp
  scene-travel-v3.webp
  scene-hajj-umrah-v3.webp
  scene-technology-v3.webp
  scene-religions-v3.webp
```
