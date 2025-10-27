import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const sample = [
  { day: "Mon", sales: 1200 },
  { day: "Tue", sales: 2100 },
  { day: "Wed", sales: 800 },
  { day: "Thu", sales: 2000 },
  { day: "Fri", sales: 2780 },
];

export default function ChartsPage() {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Grafik Penjualan</h2>
      <div className="bg-white p-4 rounded-2xl shadow h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={sample}>
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="sales"
              stroke="#4f46e5"
              strokeWidth={3}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
