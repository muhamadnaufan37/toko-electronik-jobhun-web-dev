import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Toast } from "primereact/toast";

const API_BASE = import.meta.env.VITE_PUBLIC_REACT_APP_BASE_URL_API;

export default function ProductFormPage() {
  const toastRef = useRef<Toast>(null);
  const { id } = useParams();
  const isEdit = !!id;
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    category: "",
    price: "",
    stock: "",
    description: "",
    image: null as File | null,
  });
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Fetch data ketika edit
  useEffect(() => {
    if (isEdit) {
      axios
        .get(`${API_BASE}/api/v1/unibookstore/products/${id}`)
        .then((res) => {
          const data = res.data;
          setForm({
            name: data.name,
            category: data.category ?? "",
            price: data.price,
            stock: data.stock,
            description: data.description ?? "",
            image: null,
          });
          if (data.image) {
            setPreview(`${data.image_url}/${data.image}`);
          }
        })
        .catch((err) => console.error(err));
    }
  }, [id, isEdit]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setForm({ ...form, image: file });
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("category", form.category);
      formData.append("price", form.price);
      formData.append("stock", form.stock);
      formData.append("description", form.description);
      if (form.image) formData.append("image", form.image);

      if (isEdit) {
        await axios.post(
          `${API_BASE}/api/v1/unibookstore/products/${id}?_method=PUT`,
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
        toastRef.current?.show({
          severity: "success",
          summary: "Sukses",
          detail: "Produk berhasil diperbarui!",
          life: 3000,
        });
      } else {
        await axios.post(`${API_BASE}/api/v1/unibookstore/products`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        toastRef.current?.show({
          severity: "success",
          summary: "Sukses",
          detail: "Produk berhasil ditambahkan!",
          life: 3000,
        });
      }

      navigate("/products");
    } catch (error: any) {
      if (error.response) {
        const { status, data } = error.response;
        if (
          [
            400, 402, 403, 404, 405, 406, 407, 408, 409, 410, 411, 412, 413,
            414, 415, 416, 417, 418, 422, 423, 424, 425, 426, 428, 429, 431,
            451, 500, 501, 502, 503, 504, 505, 506, 507, 508, 510, 511,
          ].includes(status)
        ) {
          toastRef.current?.show({
            severity: "error",
            summary: "Error",
            detail: data.message || "Terjadi kesalahan",
            life: 3000,
          });
        }
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Toast ref={toastRef} />

      <form
        onSubmit={handleSubmit}
        className="max-w-2xl bg-white p-6 rounded-2xl shadow mx-auto mt-10"
      >
        <h2 className="text-xl font-semibold mb-4">
          {isEdit ? "Edit Produk" : "Tambah Produk"}
        </h2>

        <label className="block text-sm font-medium">Nama Produk</label>
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          className="w-full px-3 py-2 rounded-md border mb-3"
          required
        />

        <label className="block text-sm font-medium">Kategori</label>
        <input
          name="category"
          value={form.category}
          onChange={handleChange}
          className="w-full px-3 py-2 rounded-md border mb-3"
        />

        <label className="block text-sm font-medium">Harga</label>
        <input
          type="number"
          name="price"
          value={form.price}
          onChange={handleChange}
          className="w-full px-3 py-2 rounded-md border mb-3"
          required
        />

        <label className="block text-sm font-medium">Stok</label>
        <input
          type="number"
          name="stock"
          value={form.stock}
          onChange={handleChange}
          className="w-full px-3 py-2 rounded-md border mb-3"
          required
        />

        <label className="block text-sm font-medium">Deskripsi</label>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          className="w-full px-3 py-2 rounded-md border mb-3"
          rows={3}
        />

        <label className="block text-sm font-medium">Gambar Produk</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImage}
          className="w-full px-3 py-2 rounded-md border mb-4"
        />
        {preview && (
          <img
            src={preview}
            alt="Preview"
            className="w-40 h-40 object-cover rounded-lg mb-4 border"
          />
        )}

        <div className="flex gap-2">
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 rounded-lg bg-indigo-600 text-white disabled:opacity-50"
          >
            {loading ? "Menyimpan..." : "Simpan"}
          </button>
          <button
            type="button"
            onClick={() => navigate("/products")}
            className="px-4 py-2 rounded-lg border"
          >
            Batal
          </button>
        </div>
      </form>
    </>
  );
}
