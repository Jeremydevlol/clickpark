"use client";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { ParkIcon } from "./ParkIcon";

interface TopBarProps {
  backHref: string;
  step?: number; // 1-4
}

export default function TopBar({ backHref, step }: TopBarProps) {
  const steps = 4;
  return (
    <header className="sticky top-0 z-30 bg-[#0f172a] shadow-lg">
      {/* Progress */}
      {step && (
        <div className="h-1 bg-white/10">
          <div
            className="h-full bg-[#00C9A7] transition-all duration-500"
            style={{ width: `${(step / steps) * 100}%` }}
          />
        </div>
      )}
      <div className="flex items-center justify-between px-4 py-3 max-w-lg mx-auto">
        <Link
          href={backHref}
          className="w-10 h-10 flex items-center justify-center rounded-xl bg-white/10 text-white hover:bg-white/20 transition-colors"
        >
          <ArrowLeft size={20} />
        </Link>
        <div className="flex items-center gap-2 text-white font-bold text-base">
          <ParkIcon size={28} />
          <span>ClickPark</span>
          <span className="text-[10px] text-white/40 -mt-3">™</span>
        </div>
        <div className="w-10" />
      </div>
    </header>
  );
}
