# 🚀 Portofolio V1

Selamat datang di repositori **Portofolio V1**. Ini adalah website portofolio pribadi modern yang dibangun dengan **React + Vite**, mengusung desain futuristik dengan skema warna _Electric Violet_ dan _Lime Neon_. Website ini sudah sepenuhnya responsif dan dilengkapi dengan fitur interaktif.

## ✨ Fitur Utama

- **🎨 Desain Premium**: Estetika modern mirip dengan website profesional (inspirasi dari ekizr.com).
- **🚀 Animasi Halus**: Menggunakan sistem _Scroll Reveal_ kustom dan efek _Tilt_ pada kartu proyek.
- **📱 Responsif**: Optimal untuk tampilan Desktop, Tablet, hingga Smartphone.
- **💬 Guestbook (Real-time)**: Terintegrasi dengan **Firebase Firestore** untuk fitur komentar pengunjung.
- **📂 Manajemen Proyek**: Tampilan proyek yang rapi dengan kategori filter dan mockup browser premium.

## 🛠 Tech Stack

- **Frontend**: React.js, Vite
- **Styling**: Vanilla CSS (Modern Flexbox & Grid)
- **Database**: Firebase Firestore (untuk Guestbook)
- **Deployment**: Vercel

---

## ⚙️ Cara Menjalankan Proyek Secara Lokal

Jika Anda ingin menggunakan atau mengembangkan proyek ini di komputer Anda, ikuti langkah-langkah berikut:

### 1. Clone Repositori

```bash
git clone https://github.com/rullzyc/portofolio-v1.git
cd portofolio-v1
```

### 2. Instal Dependensi

Pastikan Anda sudah menginstal [Node.js](https://nodejs.org/). Lalu jalankan:

```bash
npm install
```

### 3. Konfigurasi Firebase

Proyek ini membutuhkan Firebase untuk fitur Guestbook.

1. Buat proyek baru di [Firebase Console](https://console.firebase.google.com/).
2. Aktifkan **Firestore Database**.
3. Buat file `.env` di root folder proyek dan masukkan konfigurasi Firebase Anda:

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_APP_ID=your_app_id
```

### 4. Jalankan Server Development

```bash
npm run dev
```

Website sekarang bisa diakses di `http://localhost:5173`.

---

## 🚀 Deployment ke Vercel

1. Hubungkan repositori GitHub Anda ke [Vercel](https://vercel.com/).
2. Masukkan semua variabel yang ada di file `.env` ke bagian **Environment Variables** di dashboard Vercel.
3. Klik **Deploy**. Selesai!

## 📄 Lisensi

Proyek ini dibuat oleh [Arul](https://github.com/rullzyc). Anda bebas menggunakannya untuk referensi belajar.

---

Dibuat oleh Arul.
