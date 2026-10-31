# Revisi Basyir Agency v3: Audio Arab dan Hidden Object Investigation

Paket ini mempertahankan enam bab, alur pembelajaran, sistem skor, puzzle, tersangka, checkpoint, kamus, serta penyimpanan progres. Enam gambar scene diganti dengan gambar pilihan pengguna.

## 1. Audio teks Arab

- Kontrol audio tersedia pada teks Arab yang ditampilkan dalam materi, bukti, puzzle, pertanyaan, pilihan jawaban, kamus, dan latihan.
- Mesin utama menggunakan Nabra neural Bahasa Arab Modern Standard Arabic (MSA/Fusha) dan mempertahankan harakat pada teks sumber.
- Jika mesin neural tidak dapat berjalan, aplikasi mencoba suara Arab yang tersedia pada browser atau sistem operasi.
- Pemakaian pertama memerlukan koneksi internet untuk mengunduh model suara dan runtime.

**Catatan pelafalan:** TTS membantu latihan pelafalan Bahasa Arab Fusha. TTS bukan rekaman penutur manusia dan tidak menjamin ketepatan tajwid seperti qari Al-Qur'an. Untuk ayat Al-Qur'an atau materi tilawah, gunakan rekaman qari yang telah diverifikasi.

## 2. Enam gambar scene terbaru

1. Bab 1: pasar tradisional.
2. Bab 2: rumah sakit.
3. Bab 3: ruang keberangkatan bandara.
4. Bab 4: persiapan keberangkatan jamaah haji.
5. Bab 5: laboratorium komputer.
6. Bab 6: pameran keberagaman Indonesia.

Gambar disimpan sebagai WebP 16:9 pada `public/scenes/*-v3.webp`. Aset memakai nama berversi agar cache browser tidak menampilkan gambar lama. Gambar pasar dipotong secukupnya ke rasio 16:9 agar konsisten dengan lima scene lainnya.

## 3. Mekanisme Hidden Object

Pemain membaca daftar target, mengamati scene, lalu mengeklik objek yang terlihat. Area klik tidak menampilkan lingkaran, nomor, panah, kotak, glow, atau petunjuk visual. Klik yang keliru hanya memberikan feedback dan tidak mengurangi progres.

Hotspot disesuaikan dengan objek yang terlihat pada masing-masing gambar. Beberapa target Bab 3, Bab 4, dan Bab 5 juga disesuaikan agar objek yang dicari benar-benar tersedia pada gambar baru. ID lima slot bukti per bab tetap dipertahankan untuk menjaga progres tersimpan.

Setelah pemain menemukan objek, tampilan melakukan zoom ke area objek. Panel detail menampilkan kosakata Arab berharakat, transliterasi, arti, penjelasan, dan kontrol audio.

## 4. Progres dan kompatibilitas

- Enam bab, lima slot bukti per bab, puzzle, pemilihan tersangka, skor, checkpoint, kamus, dan penyimpanan progres tetap dipertahankan.
- ID bukti per bab tetap sama. Perubahan label dan area klik tidak memerlukan reset progres.
- Bab 4 menambahkan kosakata yang sesuai dengan objek pada gambar persiapan jamaah: paspor, koper, buku panduan haji, dan sajadah.
- Tidak ada backend atau sinkronisasi cloud dalam paket ini.

## 5. Cara menjalankan

1. Cadangkan folder proyek lama.
2. Ekstrak paket revisi dan buka folder `basyir-agency`.
3. Jalankan `npm install` jika dependency belum tersedia.
4. Jalankan `npm run dev` untuk pemeriksaan lokal.
5. Jalankan `npm test` dan `npm run build` sebelum deployment.
6. Unggah isi folder `dist` hasil build terbaru. Jangan memakai folder `dist` lama.

## 6. Pemeriksaan teknis

Validator konfigurasi enam bab berhasil dengan nol kesalahan. Keenam file WebP tersedia dalam rasio 16:9. Build produksi dan test runner belum dapat dijalankan di lingkungan penyusunan paket karena koneksi DNS ke npm registry gagal. Jalankan instalasi dependency, test, dan build pada komputer yang memiliki koneksi internet sebelum deployment.

## Catatan audio untuk revisi v4

Mesin neural Nabra menggunakan FP32 dan backend WASM dengan worker agar tidak bergantung pada WebGPU. Jika worker diblokir oleh kebijakan browser, aplikasi mencoba mode kompatibilitas tanpa worker. Pemutaran pertama memerlukan internet untuk mengunduh model suara dan runtime. Setelah berhasil, browser menyimpan model dalam cache.

Jika tombol audio menunjukkan pesan gagal, coba gunakan Chrome atau Edge terbaru, pastikan internet aktif, lalu muat ulang halaman. Nabra mengambil model dari Hugging Face dan runtime WASM dari jsDelivr. Jika neural TTS gagal, fallback browser memerlukan voice Bahasa Arab yang terpasang pada sistem operasi. Di Windows, tambahkan paket bahasa Arab melalui Settings > Time & language > Language & region, kemudian tutup dan buka kembali browser.
