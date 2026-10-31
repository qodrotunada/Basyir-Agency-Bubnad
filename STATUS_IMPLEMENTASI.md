# Status Implementasi Basyir Agency v3

## Fitur aplikasi

- Kampanye enam bab dengan 36 sublevel pembelajaran.
- Lima bukti investigasi per bab, puzzle empat potongan, pemilihan tersangka, sistem skor, dan checkpoint 10 soal.
- Penyimpanan progres, kamus detektif, riwayat kosakata, ekspor/impor JSON, validasi, dan pemulihan data.
- Audio Bahasa Arab menggunakan Nabra neural MSA dengan fallback suara Arab dari browser.
- Scene investigasi menggunakan enam gambar pilihan pengguna dalam format WebP 16:9.
- Area klik transparan tanpa penanda lokasi. Hotspot dipetakan ulang ke objek yang terlihat pada masing-masing gambar.
- Animasi zoom menyorot area objek yang dipilih, lalu membuka detail kosakata Arab, harakat, transliterasi, arti, dan penjelasan.
- ID bukti per bab dipertahankan agar progres lama tetap kompatibel.

## Pemetaan scene

1. Bab 1: pasar tradisional.
2. Bab 2: ruang pemeriksaan rumah sakit.
3. Bab 3: ruang keberangkatan bandara.
4. Bab 4: ruang persiapan keberangkatan jamaah haji.
5. Bab 5: laboratorium komputer.
6. Bab 6: pameran keberagaman Indonesia.

## Pemeriksaan yang berhasil

- Validator konfigurasi enam bab: 0 kesalahan.
- Validator memeriksa lima bukti per bab, referensi kosakata, area klik, struktur puzzle, tersangka, dan pertanyaan checkpoint.
- Keenam file WebP tersedia dan setiap file memiliki rasio 16:9.
- Preview gabungan enam scene dibuat untuk pemeriksaan visual.

## Pemeriksaan yang belum dapat dijalankan di lingkungan ini

- `npm install`, `npm test`, dan `npm run build` belum selesai karena koneksi DNS ke npm registry gagal. Jalankan perintah tersebut pada komputer yang memiliki koneksi internet sebelum deployment.
- Belum ada rekaman qari manusia yang diverifikasi. Audio TTS tidak menggantikan rekaman tilawah untuk materi Al-Qur'an.
- Harakat, transliterasi, arti, urutan kalimat, dan semua soal tetap memerlukan validasi guru/penutur Bahasa Arab.
- Aplikasi belum memiliki backend, akun, database server, atau sinkronisasi cloud.

## Revisi v4

- Audio Nabra dikonfigurasi ulang ke FP32/WASM dengan worker dan fallback workerless untuk kompatibilitas browser.
- Tombol audio menampilkan status loading/error dan dapat dicoba ulang.
- Teks Arab yang dikirim ke TTS mempertahankan harakat dan tidak mencampur transliterasi atau arti.
- Font puzzle, teks soal, pilihan jawaban, dan kosakata diperbesar.
- Puzzle menyediakan tombol Atur ulang dan menampilkan kunci urutan setelah jawaban salah.
- Audit statis enam kalimat puzzle berhasil: seluruh urutan yang dipublikasikan diterima oleh reducer. Build browser dan pemutaran audio nyata masih perlu diuji pada komputer pengguna karena dependency dan model suara harus diunduh melalui internet.
