import { Suspense } from "react";
import DesktopConnectedClient from "./DesktopConnectedClient";
import LogoMark from "../components/LogoMark";

export const metadata = { title: "Desktop app connected" };

export default function DesktopConnectedPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-mesh px-margin-mobile relative overflow-hidden">
      <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-on-background/[0.035] rounded-full blur-[140px] pointer-events-none" />

      <div className="w-full max-w-sm relative z-10">
        <div className="flex items-center gap-3 justify-center mb-stack-xl">
          <LogoMark className="w-8 h-8 rounded-lg" priority />
          <h1 className="font-headline-md text-headline-md font-semibold text-on-background leading-none">Metriq</h1>
        </div>

        <div className="glass-card p-8 md:p-10">
          <Suspense fallback={null}>
            <DesktopConnectedClient />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
