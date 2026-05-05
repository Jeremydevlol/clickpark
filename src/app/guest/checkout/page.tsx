"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import TopBar from "@/components/TopBar";
import { useParkingCtx } from "@/context/ParkingContext";
import { MapPin, Car, Clock, Tag, ShieldCheck } from "lucide-react";

type PayMethod = "card" | "google" | "apple";

export default function CheckoutPage() {
  const router = useRouter();
  const { data } = useParkingCtx();
  const [payMethod, setPayMethod] = useState<PayMethod>("card");

  const durationStr =
    data.hours > 0 || data.minutes > 0
      ? `${data.hours}h ${data.minutes > 0 ? `${data.minutes}min` : ""}`.trim()
      : "Sin seleccionar";

  const summaryItems = [
    { icon: <MapPin size={16} className="text-[#00C9A7]" />, label: "Ubicación", value: "2153 NW 2nd Ave" },
    { icon: <Car size={16} className="text-[#00C9A7]" />, label: "Matrícula", value: data.plate || "—" },
    { icon: <Clock size={16} className="text-[#00C9A7]" />, label: "Duración", value: durationStr },
    {
      icon: <Tag size={16} className="text-[#00C9A7]" />,
      label: "Tipo",
      value: data.parkingType === "short" ? "Corto plazo" : "Largo plazo",
    },
  ];

  const payOptions: { id: PayMethod; label: string; icon: React.ReactNode }[] = [
    {
      id: "card",
      label: "Tarjeta de crédito/débito",
      icon: (
        <div className="w-9 h-6 rounded bg-slate-800 flex items-center justify-center shrink-0">
          <div className="w-5 h-1.5 rounded bg-[#00C9A7]" />
        </div>
      ),
    },
    {
      id: "google",
      label: "Google Pay",
      icon: (
        <svg viewBox="0 0 24 24" className="w-7 h-7 shrink-0">
          <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
          <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
          <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
          <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
        </svg>
      ),
    },
    {
      id: "apple",
      label: "Apple Pay",
      icon: (
        <svg viewBox="0 0 24 24" className="w-6 h-6 shrink-0 fill-slate-800">
          <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
        </svg>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-slate-100 page-enter">
      <TopBar backHref="/guest/parking" step={3} />

      <main className="max-w-sm mx-auto px-5 py-6 flex flex-col gap-5">
        <h2 className="text-xl font-black text-slate-900">Resumen del pago</h2>

        {/* Summary card */}
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
          {summaryItems.map((item, i) => (
            <div
              key={i}
              className={`flex items-center gap-3 px-4 py-3.5 ${
                i < summaryItems.length - 1 ? "border-b border-slate-100" : ""
              }`}
            >
              <div className="w-8 h-8 rounded-lg bg-[#e6faf7] flex items-center justify-center shrink-0">
                {item.icon}
              </div>
              <div className="flex-1">
                <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                  {item.label}
                </p>
                <p className="text-sm font-bold text-slate-800 mt-0.5">{item.value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Payment methods */}
        <div>
          <h3 className="text-sm font-bold text-slate-900 mb-3">Método de pago</h3>
          <div className="flex flex-col gap-2.5">
            {payOptions.map((opt) => (
              <button
                key={opt.id}
                onClick={() => setPayMethod(opt.id)}
                className={`flex items-center gap-3 px-4 py-3.5 rounded-2xl border-2 text-sm font-medium transition-all text-left ${
                  payMethod === opt.id
                    ? "border-[#00C9A7] bg-[#e6faf7] text-[#00a88c]"
                    : "border-slate-200 bg-white text-slate-700 hover:border-slate-300"
                }`}
              >
                {opt.icon}
                <span className="font-semibold">{opt.label}</span>
                {payMethod === opt.id && (
                  <div className="ml-auto w-5 h-5 rounded-full bg-[#00C9A7] flex items-center justify-center">
                    <svg viewBox="0 0 24 24" fill="none" className="w-3 h-3">
                      <path d="M5 12l4 4L19 7" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Total */}
        <div className="flex items-center justify-between bg-[#0f172a] rounded-2xl px-5 py-4">
          <span className="text-white/60 text-sm font-semibold">Total a pagar</span>
          <span className="text-[#00C9A7] text-3xl font-black">
            ${data.total.toFixed(2)}
          </span>
        </div>

        {/* Pay button */}
        <button
          onClick={() => router.push("/guest/success")}
          className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-[#00C9A7] to-[#0099cc] text-white font-bold py-4 rounded-2xl text-[15px] hover:-translate-y-0.5 hover:shadow-[0_10px_30px_rgba(0,201,167,.45)] transition-all"
        >
          <ShieldCheck size={20} />
          Pagar ahora
        </button>

        <p className="flex items-center justify-center gap-1.5 text-slate-400 text-xs">
          <ShieldCheck size={13} />
          Pago seguro con encriptación SSL 256-bit
        </p>
      </main>
    </div>
  );
}
