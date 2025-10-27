import { motion } from "framer-motion";

export function Card({ children, className = "", animate = true }: any) {
  return (
    <motion.div
      initial={animate ? { opacity: 0, y: 10 } : {}}
      animate={animate ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.3 }}
      className={`bg-white rounded-2xl shadow-sm p-4 border border-slate-100 ${className}`}
    >
      {children}
    </motion.div>
  );
}

export function CardHeader({ title, subtitle }: any) {
  return (
    <div className="mb-3">
      <h4 className="text-base font-semibold text-slate-800">{title}</h4>
      {subtitle && <p className="text-sm text-slate-500">{subtitle}</p>}
    </div>
  );
}

export function CardContent({ children, className = "" }: any) {
  return <div className={`text-slate-700 ${className}`}>{children}</div>;
}
