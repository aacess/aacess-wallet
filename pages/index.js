import Image from "next/image";
import { Inter } from "next/font/google";
import { Button } from "@/components/ui/button";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <h1 className="text-4xl font-bold text-center">
        Welcome to AACESS Wallet
      </h1>
      <img src="/aacesslogo.png" alt="logo" className="Image" />
      <Button>Test</Button>
    </main>
  );
}
