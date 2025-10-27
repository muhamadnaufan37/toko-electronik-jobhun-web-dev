import { useEffect, useRef, useState } from "react";
import { Toast } from "primereact/toast";
import { useQuery } from "react-query";
import { axiosServices } from "../../services/axios";
import { InputText } from "primereact/inputtext";
import { motion } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { Button } from "primereact/button";
import { Link } from "react-router-dom";

const HomePage = () => {
  const toastRef = useRef<Toast>(null);
  const [filterInput, setFilterInput] = useState("");
  const [page, setPage] = useState(1);
  const [rows, setRows] = useState(4);
  const [lastPage, setLastPage] = useState(1);

  const fetchData = async () => {
    try {
      const res = await axiosServices().get(
        `/api/v1/unibookstore/products?keyword=${filterInput}&page=${page}&per-page=${rows}`
      );
      console.log(res.data);

      return res.data;
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
    }
  };

  const {
    data: dataListProduk,
    isFetching: isRefetchingListProduk,
    refetch: refetchListProduk,
  } = useQuery({
    queryKey: "listProduk" + page + rows,
    queryFn: fetchData,
    refetchOnWindowFocus: false,
    onSuccess: (data) => {
      setLastPage(data?.last_page);
    },
  });

  const onResetFilter = () => {
    setPage(1);
    setRows(4);
    setFilterInput("");
  };

  const onPageChange = (event: any) => {
    setPage(event.page + 1);
    setRows(event.rows);
  };

  useEffect(() => {
    if (filterInput === "") {
      refetchListProduk();
    }
  }, [filterInput]);

  return (
    <>
      <Toast ref={toastRef} />
      <div className="relative md:h-full p-4">
        {isRefetchingListProduk && (
          <div className="absolute inset-0 bg-white bg-opacity-70 flex items-center justify-center">
            <div className="flex items-center space-x-2">
              <svg
                className="animate-spin h-6 w-6 text-blue-600"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                />
              </svg>
            </div>
          </div>
        )}
        <div className="flex flex-col justify-center gap-3 h-full">
          <div className="flex items-center justify-between bg-white p-3 rounded-xl mb-4">
            <h2 className="text-2xl font-bold text-gray-800">Daftar Produk</h2>
            <Link
              to="/products/new"
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition-all"
            >
              Tambah Produk
            </Link>
          </div>

          <div className="grid base-card bg-background gap-2 bg-white">
            <div className="font-semibold text-xl">Data Produk</div>
            <div className="grid base-card-with-title p-2 gap-4">
              <div className="flex items-center gap-3 md:flex-row flex-col w-full">
                <InputText
                  className="p-inputtext-sm w-full text-xs"
                  placeholder="Cari data produk"
                  onKeyDown={(event) => {
                    if (event.key === "Enter") {
                      refetchListProduk();
                    }
                  }}
                  value={filterInput}
                  onChange={(event) => setFilterInput(event.target.value)}
                />
                <Button
                  type="button"
                  label="Reset"
                  className="w-full md:w-fit p-button-sm text-xs"
                  icon="pi pi-refresh"
                  severity="danger"
                  onClick={onResetFilter}
                  size="small"
                  disabled={isRefetchingListProduk}
                />
              </div>
            </div>
          </div>
          <div className="md:flex-row gap-2 flex-1 basis-auto overflow-auto rounded-xl">
            <div>
              {isRefetchingListProduk ? (
                <div className="text-center py-10 text-gray-500">
                  Memuat data...
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 min-w-full ">
                    {dataListProduk?.data?.data?.map((p: any) => (
                      <motion.div
                        key={p.id}
                        className="bg-white rounded-2xl shadow-md hover:shadow-lg hover:scale-[1.02] transition-all duration-300 overflow-hidden"
                        whileHover={{ y: -3 }}
                      >
                        <div className="relative h-44 bg-gray-100 flex items-center justify-center overflow-hidden">
                          <img
                            src={
                              p.image_url ||
                              "https://via.placeholder.com/300x300?text=No+Image"
                            }
                            alt={p.name}
                            className="h-full w-full object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                        </div>
                        <div className="p-4">
                          <h3 className="font-semibold text-gray-800 line-clamp-1">
                            {p.name}
                          </h3>
                          <p className="text-indigo-600 font-semibold text-lg mt-1">
                            Rp {Number(p.price).toLocaleString("id-ID")}
                          </p>
                          <p className="text-sm text-gray-500 mt-1">
                            Stok: <span className="font-medium">{p.stock}</span>
                          </p>
                          <div className="mt-3 flex gap-2">
                            <Link
                              to={`/products/${p.id}/edit`}
                              className="flex-1 px-3 py-1 text-center text-sm font-medium border border-indigo-500 text-indigo-600 rounded-lg hover:bg-indigo-50 transition-all"
                            >
                              Edit
                            </Link>
                            <button
                              // onClick={() => remove(p.id)}
                              className="flex-1 px-3 py-1 text-center text-sm font-medium border border-red-500 text-red-600 rounded-lg hover:bg-red-50 transition-all"
                            >
                              Hapus
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center text-sm p-3 bg-white rounded-xl gap-3">
            {/* Jumlah item */}
            <div className="flex items-center">
              <span className="mr-2">Tampilkan</span>
              <select
                className="border rounded px-2 py-1 mr-2"
                value={rows}
                onChange={(e) =>
                  onPageChange({
                    page: 0,
                    first: 0,
                    rows: parseInt(e.target.value),
                  })
                }
              >
                {[10, 25, 50, 100].map((v) => (
                  <option key={v} value={v}>
                    {v}
                  </option>
                ))}
              </select>
              <span>
                Item dari total <b>{dataListProduk?.total}</b>
              </span>
            </div>

            {/* Navigasi halaman */}
            <div className="flex items-center gap-1">
              <span className="mr-2">Halaman</span>

              <input
                type="number"
                min={1}
                max={lastPage}
                className="border w-12 px-1 py-1 text-center rounded"
                value={page}
                onChange={(e) => {
                  let newPage = parseInt(e.target.value);
                  if (!isNaN(newPage) && newPage >= 1 && newPage <= lastPage) {
                    onPageChange({
                      page: newPage - 1,
                      first: (newPage - 1) * rows,
                      rows,
                    });
                  }
                }}
              />
              <span className="mx-2">dari {lastPage}</span>

              {/* First */}
              <button
                className="border p-1 rounded btn-nav"
                disabled={page <= 1}
                onClick={() => onPageChange({ page: 0, first: 0, rows })}
              >
                <ChevronsLeft className="w-4 h-4" />
              </button>

              {/* Prev */}
              <button
                className="border p-1 rounded btn-nav"
                disabled={page <= 1}
                onClick={() => {
                  if (page > 1) {
                    onPageChange({
                      page: page - 2,
                      first: (page - 2) * rows,
                      rows,
                    });
                  }
                }}
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              {/* Next */}
              <button
                className="border p-1 rounded btn-nav"
                disabled={page >= lastPage}
                onClick={() => {
                  if (page < lastPage) {
                    onPageChange({
                      page: page,
                      first: page * rows,
                      rows,
                    });
                  }
                }}
              >
                <ChevronRight className="w-4 h-4" />
              </button>

              {/* Last */}
              <button
                className="border p-1 rounded btn-nav"
                disabled={page >= lastPage}
                onClick={() =>
                  onPageChange({
                    page: lastPage - 1,
                    first: (lastPage - 1) * rows,
                    rows,
                  })
                }
              >
                <ChevronsRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
