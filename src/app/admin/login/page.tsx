'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const PROVISIONAL_PASSWORD = "1234";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (password === PROVISIONAL_PASSWORD) {
      localStorage.setItem("frank-auth", "true");
      setLoading(false);
      router.push("/admin/dashboard");
    } else {
      setLoading(false);
      toast.error("Contraseña incorrecta.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#232323]">
      <div className="w-full max-w-md bg-[#201E1F] rounded-2xl border border-[#4e4e4e] shadow-lg p-8 text-white">
        <h1 className="text-2xl text-center font-bold mb-6 text-[#DAFF02]">
          Acceso Administrativo <span className="text-[#DAFF02]">- Frank Duque</span>
        </h1>
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block mb-1 text-[#DAFF02] font-semibold">Email de Frank</label>
            <input
              type="email"
              placeholder="frank@duque.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              className="bg-white text-black rounded-[8px] border border-[#DAFF02] w-full px-3 py-2"
            />
          </div>
          <div>
            <label className="block mb-1 text-[#DAFF02] font-semibold">Contraseña</label>
            <input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              className="bg-white text-black rounded-[8px] border border-[#DAFF02] w-full px-3 py-2"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-[#201E1F] text-white font-bold rounded-[8px] border border-[#4e4e4e] py-2 transition-colors disabled:opacity-60 hover:bg-[#DAFF02] hover:text-black"
            disabled={loading}
          >
            {loading ? "Accediendo..." : "Ingresar"}
          </button>
        </form>
      </div>
    </div>
  );
}