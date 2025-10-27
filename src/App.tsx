import { Routes, Route, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import NotFoundPage from "./page/error/404";
import { AnimatePresence } from "framer-motion";
// import AdminPage from "./page/beranda/admin";
// import KelolaDataBuku from "./page/beranda/admin/buku";
// import KelolaDataPenerbit from "./page/beranda/admin/penerbit";
// import UpdatePenerbit from "./page/beranda/admin/penerbit/page/UpdatePenerbit";
// import DetailPenerbit from "./page/beranda/admin/penerbit/page/DetailPenerbit";
// import AddPenerbit from "./page/beranda/admin/penerbit/page/CreatePenerbit";
// import AddBuku from "./page/beranda/admin/buku/page/CreateBuku";
// import DetailBuku from "./page/beranda/admin/buku/page/DetailBuku";
// import UpdateBuku from "./page/beranda/admin/buku/page/UpdateBuku";
// import PengadaanBuku from "./page/beranda/pengadaan";
// import KelolaDataKategori from "./page/beranda/admin/buku/kategori";
// import AddKategoriBuku from "./page/beranda/admin/buku/kategori/page/CreateKategoriBuku";
// import DetailKategoriBuku from "./page/beranda/admin/buku/kategori/page/DetailKategoriBuku";
// import UpdateKategoriBuku from "./page/beranda/admin/buku/kategori/page/UpdatePenerbit";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import Layout from "./Layout/Layout";
import ProdukPage from "./page/produk";
import DashboardPage from "./page/dashboard";
import ProductFormPage from "./page/produk/ProductFormPage";
import EmployeeProductsPage from "./page/employe";
import CodeRunnerPage from "./page/coderunner";
import ChartsPage from "./page/chart";
import MultimediaPage from "./page/multimedia";
import LoginPage from "./page/login";

const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  return <>{children}</>;
};

function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <div className="min-h-screen bg-slate-50">
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/login" element={<LoginPage />} />

              <Route
                path="/"
                element={
                  <PrivateRoute>
                    <Layout />
                  </PrivateRoute>
                }
              >
                <Route index element={<DashboardPage />} />
                <Route path="products" element={<ProdukPage />} />
                <Route path="products/new" element={<ProductFormPage />} />
                <Route path="products/:id/edit" element={<ProductFormPage />} />
                <Route
                  path="employees/products"
                  element={<EmployeeProductsPage />}
                />
                <Route path="code-runner" element={<CodeRunnerPage />} />
                <Route path="charts" element={<ChartsPage />} />
                <Route path="multimedia" element={<MultimediaPage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Route>
            </Routes>
          </AnimatePresence>
        </div>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
