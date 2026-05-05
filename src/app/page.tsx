import Link from "next/link";
import { ParkIcon } from "@/components/ParkIcon";

export default function Home() {
  return (
    <div className="relative min-h-screen flex items-center justify-center p-5 overflow-hidden bg-[#0f172a]">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://images.unsplash.com/photo-1506521781263-d8422e82f27a?w=1400&q=80"
          alt=""
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0f172a]/40 via-transparent to-[#0f172a]/90" />
      </div>

      {/* Language pill */}
      <div className="absolute top-4 right-4 z-10 flex gap-2">
        {["ES", "EN"].map((lang) => (
          <button
            key={lang}
            className={`px-3 py-1 rounded-full text-xs font-semibold border transition-all ${
              lang === "EN"
                ? "bg-[#00C9A7] border-[#00C9A7] text-white"
                : "bg-transparent border-white/30 text-white/60 hover:border-white/60"
            }`}
          >
            {lang}
          </button>
        ))}
      </div>

      {/* Card */}
      <div className="relative z-10 w-full max-w-sm bg-white/8 backdrop-blur-2xl border border-white/15 rounded-3xl p-8 flex flex-col gap-4 shadow-2xl">
        {/* Logo */}
        <div className="flex flex-col items-center gap-1 mb-1">
          <div className="flex items-center gap-2.5">
            <ParkIcon size={44} />
            <span className="text-white text-3xl font-black tracking-tight">ClickPark</span>
            <span className="text-white/30 text-xs self-start mt-1">™</span>
          </div>
          <p className="text-[#00C9A7] font-semibold text-sm tracking-wide">
            Parking Made Easy
          </p>
        </div>

        {/* Location */}
        <div className="flex items-center gap-3 bg-white/10 border border-white/20 rounded-2xl px-4 py-3">
          <div className="w-9 h-9 rounded-xl bg-[#00C9A7]/20 flex items-center justify-center shrink-0">
            <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" fill="#00C9A7"/>
            </svg>
          </div>
          <div>
            <p className="text-white font-semibold text-sm">2153 NW 2nd Ave</p>
            <p className="text-white/50 text-xs">2153 NW 2nd Ave</p>
          </div>
        </div>

        {/* CTA */}
        <Link
          href="/guest/phone"
          className="w-full bg-[#00C9A7] hover:bg-[#00a88c] text-white font-bold py-4 rounded-2xl text-center text-[15px] transition-all hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(0,201,167,.4)] active:translate-y-0"
        >
          Continue as guest
        </Link>

        {/* Login / Signup */}
        <div className="flex gap-3">
          <Link
            href="/guest/phone"
            className="flex-1 bg-white/10 hover:bg-white/18 border border-white/20 text-white font-semibold py-3 rounded-2xl text-center text-sm transition-all"
          >
            Log in
          </Link>
          <Link
            href="/guest/phone"
            className="flex-1 bg-transparent hover:bg-white/10 border border-white/25 text-white font-semibold py-3 rounded-2xl text-center text-sm transition-all"
          >
            Sign up
          </Link>
        </div>

        {/* Divider */}
        <div className="flex items-center gap-3">
          <div className="flex-1 h-px bg-white/15" />
          <span className="text-white/40 text-xs font-medium">or</span>
          <div className="flex-1 h-px bg-white/15" />
        </div>

        {/* SSO */}
        <p className="text-center text-white/50 text-xs font-medium">Continue with</p>
        <div className="flex justify-center gap-4">
          {/* Google */}
          <button className="w-14 h-14 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center transition-all hover:scale-105">
            <svg viewBox="0 0 24 24" className="w-6 h-6">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
          </button>
          {/* Apple */}
          <button className="w-14 h-14 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center transition-all hover:scale-105">
            <svg viewBox="0 0 24 24" className="w-6 h-6 fill-white">
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
