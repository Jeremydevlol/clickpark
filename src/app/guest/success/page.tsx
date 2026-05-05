"use client";
import Link from "next/link";
import { useParkingCtx } from "@/context/ParkingContext";
import { CheckCircle2 } from "lucide-react";

export default function SuccessPage() {
  const { data } = useParkingCtx();

  const durationStr =
    data.hours > 0 || data.minutes > 0
      ? `${data.hours}h ${data.minutes > 0 ? `${data.minutes}min` : ""}`.trim()
      : "—";

  const now = new Date();
  const dateStr = now.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
  const timeStr = now.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="min-h-screen bg-slate-100 page-enter flex items-center justify-center p-5">
      <div className="w-full max-w-sm flex flex-col items-center text-center gap-6">
        {/* Success icon */}
        <div className="w-28 h-28 rounded-full bg-[#e6faf7] flex items-center justify-center pop-anim">
          <CheckCircle2 size={60} className="text-[#00C9A7]" strokeWidth={1.5} />
        </div>

        <div>
          <h1 className="text-2xl font-black text-slate-900 mb-2">Payment confirmed!</h1>
          <p className="text-slate-500 text-sm leading-relaxed max-w-xs mx-auto">
            Your parking spot has been reserved successfully. You will receive an SMS confirmation.
          </p>
        </div>

        {/* Ticket */}
        <div className="w-full bg-white rounded-3xl overflow-hidden shadow-2xl">
          {/* Header */}
          <div className="bg-[#0f172a] px-5 py-4 flex items-center justify-between">
            <div className="flex items-center gap-2 text-white font-bold">
              <svg viewBox="0 0 40 40" fill="none" width="24" height="24">
                <circle cx="20" cy="20" r="20" fill="#00C9A7"/>
                <path d="M20 8C15 8 11 13 11 18C11 25 20 33 20 33C20 33 29 25 29 18C29 13 25 8 20 8Z" fill="white"/>
                <circle cx="20" cy="18" r="3.5" fill="#00C9A7"/>
              </svg>
              ClickPark™
            </div>
            <span className="bg-[#00C9A7] text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider">
              Confirmed
            </span>
          </div>

          {/* Rows */}
          {[
            ["Location", "2153 NW 2nd Ave"],
            ["License plate", data.plate || "—"],
            ["Duration", durationStr],
            ["Type", data.parkingType === "short" ? "Short-term" : "Long-term"],
            ["Date", dateStr],
            ["Entry time", timeStr],
          ].map(([k, v]) => (
            <div key={k} className="flex justify-between items-center px-5 py-3 border-b border-slate-100">
              <span className="text-slate-400 text-sm">{k}</span>
              <span className="text-slate-800 font-semibold text-sm">{v}</span>
            </div>
          ))}

          {/* Dashed divider */}
          <div className="ticket-dash my-0" />

          {/* Total */}
          <div className="flex justify-between items-center px-5 py-4">
            <span className="text-slate-700 font-bold">Total paid</span>
            <span className="text-[#00C9A7] text-2xl font-black">
              {data.total.toLocaleString("en-US", { style: "currency", currency: "USD" })}
            </span>
          </div>
        </div>

        {/* New booking */}
        <Link
          href="/"
          className="w-full bg-[#00C9A7] hover:bg-[#00a88c] text-white font-bold py-4 rounded-2xl text-center text-[15px] transition-all hover:-translate-y-0.5 hover:shadow-[0_8px_28px_rgba(0,201,167,.4)]"
        >
          New booking
        </Link>

        <p className="text-slate-400 text-xs">
          Booking ID:{" "}
          <span className="font-mono font-bold text-slate-600">
            CP-{Math.random().toString(36).slice(2,8).toUpperCase()}
          </span>
        </p>
      </div>
    </div>
  );
}
