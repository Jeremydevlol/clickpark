"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import TopBar from "@/components/TopBar";
import { useParkingCtx } from "@/context/ParkingContext";
import { Smartphone } from "lucide-react";

export default function PhonePage() {
  const router = useRouter();
  const { set } = useParkingCtx();
  const [phone, setPhone] = useState("");
  const [agreed, setAgreed] = useState(false);

  const isValid = phone.replace(/\s/g, "").length >= 10 && agreed;

  function handleConfirm() {
    if (!isValid) return;
    set({ phone });
    router.push("/guest/parking");
  }

  return (
    <div className="min-h-screen bg-slate-100 page-enter">
      <TopBar backHref="/" step={1} />

      <main className="max-w-sm mx-auto px-5 py-10 flex flex-col items-center text-center gap-6">
        {/* Icon */}
        <div className="w-24 h-24 rounded-full bg-[#e6faf7] flex items-center justify-center float-anim">
          <Smartphone size={44} className="text-[#00C9A7]" />
        </div>

        {/* Heading */}
        <div>
          <h1 className="text-2xl font-black text-slate-900 mb-2">
            Enter your phone number
          </h1>
          <p className="text-slate-500 text-sm leading-relaxed max-w-xs mx-auto">
            Thanks for choosing ClickPark™, the easiest way to park
          </p>
        </div>

        {/* Phone input */}
        <div className="w-full flex border-2 border-slate-200 focus-within:border-[#00C9A7] rounded-2xl overflow-hidden bg-white transition-colors shadow-sm">
          <div className="flex items-center gap-2 px-4 border-r border-slate-200 shrink-0">
            <span className="text-2xl">🇺🇸</span>
            <span className="font-bold text-slate-800 text-sm">+1</span>
            <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4 text-slate-400">
              <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </div>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Phone number"
            className="flex-1 px-4 py-4 text-base font-medium text-slate-800 placeholder-slate-400 outline-none bg-transparent"
            maxLength={12}
          />
        </div>

        {/* Confirm button */}
        <button
          onClick={handleConfirm}
          disabled={!isValid}
          className={`w-full py-4 rounded-2xl font-bold text-[15px] transition-all ${
            isValid
              ? "bg-[#00C9A7] text-white hover:bg-[#00a88c] hover:-translate-y-0.5 hover:shadow-[0_8px_28px_rgba(0,201,167,.4)]"
              : "bg-slate-200 text-slate-400 cursor-not-allowed"
          }`}
        >
          Confirm
        </button>

        {/* Terms */}
        <label className="flex items-start gap-3 cursor-pointer text-left w-full">
          <input
            type="checkbox"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
            className="custom-check mt-0.5"
          />
          <span className="text-sm text-slate-500 leading-relaxed">
            I agree to the{" "}
            <a href="#" className="text-[#00C9A7] font-semibold hover:underline">
              Terms and Conditions
            </a>
            . Your data will be processed according to our{" "}
            <a href="#" className="text-[#00C9A7] font-semibold hover:underline">
              Privacy Policy
            </a>
            .
          </span>
        </label>
      </main>
    </div>
  );
}
