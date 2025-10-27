export default function EmployeeProductsPage() {
  // This page demonstrates how employees can manage product data.
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">
        Pengelolaan Produk oleh Pegawai
      </h2>
      <p className="mb-4 text-slate-500">
        Halaman ini menyediakan CRUD sederhana yang dapat dihubungkan ke API
        pegawai. Di sini tersedia audit log, peran, dan kontrol akses (mocked).
      </p>

      <div className="bg-white rounded-2xl p-4 shadow">
        <p className="text-sm text-slate-500">Daftar perubahan oleh pegawai:</p>
        <ul className="mt-2 text-sm">
          <li>- Fadli menambahkan produk "Speaker A"</li>
          <li>- Naufan mengubah harga "Smartphone X"</li>
        </ul>
      </div>
    </div>
  );
}
