import { ParkingProvider } from "@/context/ParkingContext";

export default function GuestLayout({ children }: { children: React.ReactNode }) {
  return <ParkingProvider>{children}</ParkingProvider>;
}
