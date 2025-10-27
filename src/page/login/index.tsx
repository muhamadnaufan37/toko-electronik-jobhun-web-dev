import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../../contexts/AuthContext";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (login(username, password)) navigate("/");
    else alert("Login gagal");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-slate-50 p-6">
      <motion.form
        onSubmit={submit}
        initial={{ scale: 0.98, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.28 }}
        className="w-full max-w-md bg-white rounded-2xl p-8 shadow-lg"
      >
        <h2 className="text-2xl font-bold mb-2 text-indigo-600">
          Masuk ke Admin
        </h2>
        <p className="text-sm text-slate-500 mb-6">
          Masukkan akun Anda untuk melanjutkan.
        </p>

        <label className="block text-sm font-medium text-slate-600">
          Username
        </label>
        <input
          className="w-full px-3 py-2 rounded-md border mt-1 mb-4"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <label className="block text-sm font-medium text-slate-600">
          Password
        </label>
        <input
          type="password"
          className="w-full px-3 py-2 rounded-md border mt-1 mb-6"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="w-full py-2 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700">
          Login
        </button>
      </motion.form>
    </div>
  );
}
