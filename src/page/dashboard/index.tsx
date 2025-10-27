import { axiosServices } from "../../services/axios";
import { Card } from "../../component/ui/card";
import { motion } from "framer-motion";
import { useQuery } from "react-query";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

export default function DashboardPage() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["dashboard"],
    queryFn: async () => {
      const res = await axiosServices().get(
        `/api/v1/unibookstore/dashboard/statistics`
      );
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <p className="text-center text-slate-500 mt-10">
        Memuat data dashboard...
      </p>
    );
  }

  if (isError) {
    return (
      <p className="text-center text-red-500 mt-10">
        Terjadi kesalahan saat memuat data
      </p>
    );
  }

  const { total_products, sold_today, revenue_today, sales_chart } = data;

  // Format angka ke Rupiah
  const formatRupiah = (value: any) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(value);
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      {/* Statistik utama */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card className="p-4 shadow rounded-2xl">
          <h3 className="text-sm text-slate-500">Total Produk</h3>
          <p className="text-2xl font-bold">{total_products}</p>
        </Card>

        <Card className="p-4 shadow rounded-2xl">
          <h3 className="text-sm text-slate-500">Terjual Hari Ini</h3>
          <p className="text-2xl font-bold">{sold_today}</p>
        </Card>

        <Card className="p-4 shadow rounded-2xl">
          <h3 className="text-sm text-slate-500">Pendapatan Hari Ini</h3>
          <p className="text-2xl font-bold">{formatRupiah(revenue_today)}</p>
        </Card>
      </section>

      {/* Grafik & ringkasan */}
      <div className="grid grid-cols-1 gap-4">
        <Card className="p-4 shadow rounded-2xl">
          <h4 className="font-semibold mb-4">
            Grafik Pendapatan (7 Hari Terakhir)
          </h4>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={sales_chart}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" tick={{ fontSize: 12 }} />
              <YAxis
                tickFormatter={(val) => {
                  if (val >= 1000000000)
                    return `Rp ${(val / 1000000000).toFixed(1)} M`;
                  if (val >= 100000000)
                    return `Rp ${(val / 100000000).toFixed(0)} jt`; // per 100 juta
                  return `Rp ${(val / 1000000).toFixed(1)} jt`;
                }}
              />
              <Tooltip
                formatter={(value) => formatRupiah(value)}
                labelFormatter={(label) => `Tanggal: ${label}`}
              />
              <Line
                type="monotone"
                dataKey="total_revenue"
                stroke="#2563eb"
                strokeWidth={2}
                dot
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>
      </div>
    </motion.div>
  );
}
