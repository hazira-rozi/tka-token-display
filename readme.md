
---

## ⚙️ Fitur Utama  

| Fitur | Keterangan |
|-------|-------------|
| 🎯 **Realtime Update** | Token dan pengaturan langsung diperbarui di layar tanpa reload. |
| 🎨 **Color Picker** | Warna teks token bisa diubah dengan pemilih warna interaktif. |
| 📏 **Ukuran Dinamis** | Ukuran teks token dapat disesuaikan dengan slider (32–300px). |
| 🏫 **Nama Sekolah** | Ditampilkan otomatis di layar utama. |
| 🕓 **Waktu Otomatis** | Menampilkan tanggal dan waktu dalam format Indonesia secara realtime. |
| 🖥️ **Fullscreen Mode** *(opsional)* | Dapat ditambahkan untuk menampilkan layar penuh seperti YouTube. |
| 💾 **Penyimpanan Otomatis** | Semua pengaturan disimpan di `localStorage`. |

---

## 🚀 Cara Penggunaan  

### 1️⃣ Buka Halaman Pengaturan  
Buka file berikut di browser:

### 2️⃣ Isi Data  
Masukkan:
- **Nama Sekolah**
- **Token**
- Pilih warna token menggunakan color picker.
- Atur ukuran token dengan slider.

### 3️⃣ Tampilkan Token  
Klik:
- **Update Token** → hanya memperbarui tampilan tanpa membuka tab baru.  
- **Update & Tampilkan** → memperbarui sekaligus membuka tampilan token di tab baru.

---

## 🖼️ Tampilan  
### 🔧 Halaman Pengaturan (`index.html`)
Tampilan modern dengan desain biru lembut dan pengaturan intuitif.

### 🧾 Halaman Tampilan (`display.html`)
Tampilan layar penuh dengan:
- Judul “Tes Kemampuan Akademik 2025”
- Nama sekolah
- Waktu dan tanggal otomatis
- Token besar di tengah layar putih dengan teks biru tua
- Tulisan “Semoga Sukses” di bagian bawah

---

## 📡 Mekanisme Komunikasi  
Kedua halaman berkomunikasi melalui **BroadcastChannel API**,  
memungkinkan update token secara realtime antar tab tanpa server.

