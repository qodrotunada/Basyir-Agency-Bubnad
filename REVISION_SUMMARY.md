# Ringkasan Revisi Basyir Agency

## Audio Bahasa Arab
- Kontrol audio ditambahkan pada teks Arab yang tampil di seluruh alur pembelajaran.
- Nabra neural MSA menjadi mesin utama, browser Arabic SpeechSynthesis menjadi fallback.
- Harakat pada teks sumber dipertahankan.
- Audio TTS diberi batasan penggunaan yang jelas untuk materi tajwid Al-Qur'an.

## Hidden Object Investigation
- Enam ilustrasi scene menggunakan gambar terbaru yang dipilih pengguna dan dikonversi ke WebP 16:9 untuk pemuatan web yang lebih ringan.
- Seluruh penanda lokasi berupa lingkaran, angka, panah, kotak, dan glow dihapus.
- Area klik objek dibuat transparan dan dipetakan ulang ke objek yang terlihat pada keenam gambar terbaru.
- Klik objek yang keliru hanya menampilkan feedback dan tidak mengurangi progres.
- Daftar target hanya menampilkan nama benda, bukan tautan untuk membuka bukti.
- Setelah objek benar dipilih, scene melakukan animasi zoom ke objek lalu menampilkan kosakata Arab, transliterasi, arti, dan penjelasan.

## Kompatibilitas
- Enam bab dan 30 ID bukti dipertahankan.
- ID kosakata, puzzle, tersangka, skor, dan penyimpanan progres tetap dipertahankan.
- Tidak ada dependency baru.

## Scene gambar versi 3
- Bab 1 sampai Bab 6 memakai enam gambar pilihan pengguna.
- Aset gambar disimpan sebagai WebP 16:9 dengan nama ber-versi untuk menghindari cache gambar lama.
- Hotspot pencarian dan teks petunjuk disesuaikan dengan objek yang terlihat pada masing-masing gambar.
- Bab 4 memakai kosakata objek yang benar-benar tampak pada ruang persiapan jamaah: pakaian ihram, paspor, koper, buku panduan haji, dan sajadah.
- Bab 3 memakai target yang terlihat di terminal: paspor, papan keberangkatan, koper, pesawat, dan pelancong.

## Revisi v4 berdasarkan masukan pengguna

- Memperbaiki mesin audio Arab: Nabra neural TTS menggunakan konfigurasi FP32 + WASM agar lebih kompatibel lintas perangkat, tetap memakai worker, dan memiliki fallback ke mode tanpa worker jika worker diblokir browser.
- Memperbaiki status tombol audio: tombol menunjukkan status memuat, berhasil, atau gagal; pesan kesalahan memberi langkah pemecahan masalah.
- Memastikan teks yang dikirim ke mesin audio hanya berisi aksara Arab, tetap mempertahankan harakat, dan tidak mencampur transliterasi/arti.
- Memperbesar font Arab, transliterasi, dan arti pada puzzle pengurutan kalimat serta memperbesar teks soal dan pilihan jawaban.
- Menambahkan tombol Atur ulang pada puzzle.
- Menampilkan kunci urutan Bahasa Indonesia setelah pemain mengirim susunan yang salah.
- Menambahkan audit otomatis untuk enam jawaban puzzle, 60 indeks jawaban checkpoint, dan ekstraksi teks audio Arab.
