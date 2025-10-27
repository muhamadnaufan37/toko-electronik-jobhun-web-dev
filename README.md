# 🛒 Admin Elektronik Frontend

Frontend panel untuk mengelola data produk elektronik. Dibangun menggunakan **React**, **TailwindCSS**, dan **Framer Motion** dengan desain responsif dan struktur komponen yang modular.

---

## 🚀 Fitur Utama

- **Dashboard Admin**

  - Tampilan ringkasan produk dan data statistik.

- **Manajemen Produk**

  - Menampilkan daftar produk.
  - Tambah, ubah, dan hapus produk.
  - Menampilkan gambar produk dari URL API.

- **Animasi Halus**

  - Transisi halaman menggunakan Framer Motion.

- **Autentikasi**

  - Sistem login dan logout dengan context.

- **Desain Responsif**

  - Sidebar tetap di tempat, konten scroll terpisah.
  - Optimal untuk desktop & tablet.

---

## 🧩 Teknologi yang Digunakan

| Teknologi        | Kegunaan             |
| ---------------- | -------------------- |
| React 18         | Library UI utama     |
| React Router DOM | Routing halaman      |
| TailwindCSS      | Styling responsif    |
| Framer Motion    | Animasi transisi     |
| Axios            | HTTP request ke API  |
| Context API      | Manajemen auth state |
| React Icons      | Ikon antarmuka       |

---

## 🛠️ Instalasi & Setup

### 1. Clone Repository

```bash
git clone https://github.com/username/admin-elektronik-frontend.git
cd admin-elektronik-frontend
```

### 2. Install Dependencies

```bash
npm install
# atau
yarn install
```

### 3. Konfigurasi Environment

Buat file `.env` di root folder dan isi dengan:

```
VITE_API_BASE_URL=https://api-unibookstore.digitaldatagenerus.com/api
```

### 4. Jalankan Aplikasi

```bash
npm run dev
```

Lalu buka di browser:

```
http://localhost:5173
```

---

## 📁 Struktur Folder

```
src/
├── components/
│   ├── Layout/
│   │   ├── Layout.tsx
│   │   ├── Sidebar.tsx
│   │   └── Topbar.tsx
│   ├── ProductCard.tsx
│   └── ModalDelete.tsx
├── pages/
│   ├── Dashboard.tsx
│   └── Products.tsx
├── contexts/
│   └── AuthContext.tsx
├── App.tsx
├── main.tsx
└── styles/
    └── index.css
```

---

## 🧹 Fitur Responsif Sidebar

- Sidebar **tetap terlihat** di desktop.
- Pada layar kecil, sidebar dapat disembunyikan.
- Hanya konten utama yang **scrollable**, bukan seluruh layout.

---

## 🧩 Kontribusi

1. Fork repository ini.
2. Buat branch fitur baru:

   ```bash
   git checkout -b fitur-baru
   ```

3. Commit perubahan:

   ```bash
   git commit -m "Tambah fitur baru"
   ```

4. Push dan buat pull request.

---

## 📄 Lisensi

MIT License © 2025 - Admin Elektronik
