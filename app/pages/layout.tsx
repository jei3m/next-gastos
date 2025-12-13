import Navbar from "@/components/custom/navbar";
import { Dock } from "@/components/custom/dock";
import { Toaster } from "@/components/ui/sonner";
import { Suspense } from "react";
import Loader from "@/components/custom/loader";

export default function TransactionsLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <Suspense fallback={<Loader/>}>
      <div className="max-w-[600px] m-auto">
        <Navbar/>
        {children}
        <Toaster
          position="top-center"
          expand={false}
        />
        <Dock
          showLabels={true}
        />
      </div>      
    </Suspense>
  );
};