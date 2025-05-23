# Aisky Web Interface

Aisky adalah AI website UI yang di design oleh Dzarel menggunakan API resmi Gemini. Aisky dirancang untuk memberikan pengalaman interaksi yang intuitif dan cerdas, memadukan teknologi AI terkini dengan antarmuka yang modern dan responsif. Platform ini memanfaatkan kemampuan Gemini API untuk memberikan respons yang akurat dan kontekstual pada setiap interaksi pengguna.

## Fitur

- **Autentikasi Pengguna**
  - Login manual (email & password)
  - Login via Google (OAuth 2.0)
  - Registrasi pengguna baru

- **Chatbot dengan Gemini AI**
  - Percakapan real-time
  - Respons cerdas dari model AI Gemini
  - Personalisasi gaya komunikasi AI

- **Manajemen Riwayat**
  - Simpan riwayat percakapan
  - Lihat dan lanjutkan percakapan sebelumnya
  - Hapus percakapan

- **Pengaturan Pengguna**
  - Pilihan tema terang/gelap
  - Ubah bahasa antarmuka
  - Atur gaya AI dan temperatur

## Cara Menjalankan Aplikasi

### Prasyarat

- Node.js versi 14 atau lebih tinggi
- API key dari Google Gemini

### Langkah-langkah

1. **Klon repositori**

```bash
git clone https://github.com/DzarelDeveloper/aisky-web.git
cd aisky-web
```

2. **Instal dependensi**

```bash
npm install
```

3. **Konfigurasi API Gemini**

Edit file `src/utils/geminiApi.ts` dan ganti `YOUR_GEMINI_API_KEY` dengan API key Gemini Anda:

```typescript
const API_KEY = 'YOUR_GEMINI_API_KEY';
```

4. **Jalankan aplikasi**

```bash
npm run dev
```

5. **Buka aplikasi di browser**

Buka [http://localhost:5173](http://localhost:5173) di browser Anda.

## Cara Mendapatkan API Gemini

1. Kunjungi [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Login dengan akun Google Anda
3. Buat API key baru
4. Salin API key dan gunakan di aplikasi

## Struktur Proyek

```
aisky-web/
├── public/
│   └── logo/
│       ├── logo-ai.jpg
│       └── logo-owner.jpg
├── src/
│   ├── components/
│   │   ├── auth/
│   │   ├── chat/
│   │   ├── layout/
│   │   ├── settings/
│   │   └── ui/
│   ├── context/
│   ├── pages/
│   ├── types/
│   ├── utils/
│   ├── App.tsx
│   └── main.tsx
└── package.json
```

## Teknologi yang Digunakan

- React
- TypeScript
- Vite
- Tailwind CSS
- Lucide React
- Google Generative AI SDK

## Developer

Dibuat dengan ❤️ oleh DzarelDeveloper

© 2024 DzarelDeveloper. All rights reserved.