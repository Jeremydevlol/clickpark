"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import TopBar from "@/components/TopBar";
import { useParkingCtx } from "@/context/ParkingContext";
import { MapPin, ScanLine } from "lucide-react";

const STATES = [
  "Alabama","Alaska","Arizona","Arkansas","California","Colorado","Connecticut",
  "Delaware","Florida","Georgia","Hawaii","Idaho","Illinois","Indiana","Iowa",
  "Kansas","Kentucky","Louisiana","Maine","Maryland","Massachusetts","Michigan",
  "Minnesota","Mississippi","Missouri","Montana","Nebraska","Nevada","New Hampshire",
  "New Jersey","New Mexico","New York","NYC","North Carolina","North Dakota","Ohio",
  "Oklahoma","Oregon","Pennsylvania","Rhode Island","South Carolina","South Dakota",
  "Tennessee","Texas","Utah","Vermont","Virginia","Washington","West Virginia",
  "Wisconsin","Wyoming",
];

const QUICK = [
  { label: "1 hr", hours: 1, mins: 0, price: 22.00 },
  { label: "2 hrs", hours: 2, mins: 0, price: 33.00 },
  { label: "8 hrs", hours: 8, mins: 0, price: 104.50 },
  { label: "24 hrs", hours: 24, mins: 0, price: 77.00 },
];

function calcPrice(hours: number, mins: number): number {
  const totalMins = hours * 60 + mins;
  if (totalMins === 0) return 0;
  // Rate: $22/hr, min 30 min billing
  const rate = 22 / 60; // per minute
  return parseFloat((Math.max(totalMins, 30) * rate).toFixed(2));
}

export default function ParkingPage() {
  const router = useRouter();
  const { data, set } = useParkingCtx();

  const [plate, setPlate] = useState(data.plate);
  const [state, setState] = useState(data.state);
  const [parkingType, setParkingType] = useState<"short" | "long">(data.parkingType);
  const [hours, setHours] = useState(data.hours);
  const [mins, setMins] = useState(data.minutes);
  const [total, setTotal] = useState(data.total);
  const [activeChip, setActiveChip] = useState<number | null>(null);

  useEffect(() => {
    if (activeChip === null) {
      setTotal(calcPrice(hours, mins));
    }
  }, [hours, mins, activeChip]);

  function applyChip(idx: number) {
    const chip = QUICK[idx];
    setHours(chip.hours);
    setMins(chip.mins);
    setTotal(chip.price);
    setActiveChip(idx);
  }

  function handleContinue() {
    set({ plate, state, parkingType, hours, minutes: mins, total });
    router.push("/guest/checkout");
  }

  const canContinue = plate.trim().length > 0;

  return (
    <div className="min-h-screen bg-slate-100 page-enter">
      <TopBar backHref="/guest/phone" step={2} />

      <main className="max-w-sm mx-auto px-5 py-6 flex flex-col gap-4">
        {/* Location */}
        <div className="flex items-center gap-3 bg-white border border-slate-200 rounded-2xl px-4 py-3 shadow-sm">
          <div className="w-9 h-9 bg-[#e6faf7] rounded-xl flex items-center justify-center shrink-0">
            <MapPin size={18} className="text-[#00C9A7]" />
          </div>
          <div className="flex-1">
            <p className="font-bold text-slate-900 text-sm">2153 NW 2nd Ave</p>
            <p className="text-slate-400 text-xs">2153 NW 2nd Ave</p>
          </div>
          <a href="#" className="text-[#00C9A7] text-sm font-semibold whitespace-nowrap hover:underline">
            Cambiar
          </a>
        </div>

        {/* Scan plate */}
        <button className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl border-2 border-[#00C9A7] bg-[#e6faf7] text-[#00a88c] font-semibold text-sm hover:bg-[#00C9A7] hover:text-white transition-all">
          <ScanLine size={20} />
          Escanear matrícula
        </button>

        {/* Divider */}
        <div className="flex items-center gap-3">
          <div className="flex-1 h-px bg-slate-200" />
          <span className="text-slate-400 text-xs font-medium">o</span>
          <div className="flex-1 h-px bg-slate-200" />
        </div>

        {/* Plate + State */}
        <div className="flex gap-2">
          <div className="flex-1 flex items-center bg-white border-2 border-slate-200 focus-within:border-[#00C9A7] rounded-2xl overflow-hidden transition-colors shadow-sm">
            <div className="px-3 border-r border-slate-200 py-3">
              <div className="w-11 h-7 bg-slate-800 rounded flex items-center justify-center">
                <span className="text-white text-[10px] font-black tracking-widest">CP</span>
              </div>
            </div>
            <input
              type="text"
              value={plate}
              onChange={(e) => setPlate(e.target.value.toUpperCase())}
              placeholder="Matrícula"
              className="flex-1 px-3 py-3.5 text-sm font-bold uppercase tracking-widest outline-none bg-transparent placeholder-slate-300"
              maxLength={10}
            />
          </div>
          <select
            value={state}
            onChange={(e) => setState(e.target.value)}
            className="w-32 border-2 border-slate-200 focus:border-[#00C9A7] rounded-2xl px-3 py-3.5 text-sm bg-white text-slate-700 font-medium outline-none cursor-pointer shadow-sm"
          >
            <option value="">Estado</option>
            {STATES.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>

        {/* Parking type toggle */}
        <div className="flex bg-white border-2 border-slate-200 rounded-2xl overflow-hidden shadow-sm">
          {(["short", "long"] as const).map((type) => (
            <button
              key={type}
              onClick={() => setParkingType(type)}
              className={`flex-1 py-3 text-sm font-semibold transition-all ${
                parkingType === type
                  ? "bg-[#00C9A7] text-white"
                  : "text-slate-500 hover:bg-slate-50"
              }`}
            >
              {type === "short" ? "Corto plazo" : "Largo plazo"}
            </button>
          ))}
        </div>

        {/* Duration */}
        <div>
          <h3 className="text-sm font-bold text-slate-900 mb-3">Elige la duración</h3>
          <div className="flex items-center justify-center gap-3 bg-white border-2 border-slate-200 rounded-2xl px-5 py-3 shadow-sm">
            <select
              value={hours}
              onChange={(e) => { setHours(+e.target.value); setActiveChip(null); }}
              className="text-2xl font-black text-slate-900 bg-transparent outline-none cursor-pointer px-2 py-1 rounded-xl hover:bg-slate-50 transition-colors"
            >
              {Array.from({ length: 25 }, (_, i) => (
                <option key={i} value={i}>{i}</option>
              ))}
            </select>
            <span className="text-sm text-slate-400 font-medium">hr</span>
            <span className="text-2xl font-black text-slate-400">:</span>
            <select
              value={mins}
              onChange={(e) => { setMins(+e.target.value); setActiveChip(null); }}
              className="text-2xl font-black text-slate-900 bg-transparent outline-none cursor-pointer px-2 py-1 rounded-xl hover:bg-slate-50 transition-colors"
            >
              {[0,5,10,15,20,25,30,35,40,45,50,55].map((m) => (
                <option key={m} value={m}>{String(m).padStart(2,"0")}</option>
              ))}
            </select>
            <span className="text-sm text-slate-400 font-medium">min</span>
          </div>
        </div>

        {/* Quick pricing */}
        <div className="grid grid-cols-2 gap-2.5">
          {QUICK.map((q, i) => (
            <button
              key={i}
              onClick={() => applyChip(i)}
              className={`py-3 rounded-2xl text-sm font-bold border-2 transition-all ${
                activeChip === i
                  ? "border-[#00C9A7] bg-[#e6faf7] text-[#00a88c]"
                  : "border-slate-200 bg-white text-slate-700 hover:border-[#00C9A7] hover:-translate-y-0.5"
              }`}
            >
              {q.label} · ${q.price.toFixed(2)}
            </button>
          ))}
        </div>

        {/* Total */}
        <div className="flex items-center justify-between bg-white border-2 border-slate-200 rounded-2xl px-5 py-4 shadow-sm">
          <span className="text-sm font-semibold text-slate-500">Total</span>
          <span className="text-2xl font-black text-[#00C9A7]">
            ${total.toFixed(2)}
          </span>
        </div>

        {/* Continue */}
        <button
          onClick={handleContinue}
          disabled={!canContinue}
          className={`w-full py-4 rounded-2xl font-bold text-[15px] transition-all ${
            canContinue
              ? "bg-[#00C9A7] text-white hover:bg-[#00a88c] hover:-translate-y-0.5 hover:shadow-[0_8px_28px_rgba(0,201,167,.4)]"
              : "bg-slate-200 text-slate-400 cursor-not-allowed"
          }`}
        >
          Continuar
        </button>
      </main>
    </div>
  );
}
