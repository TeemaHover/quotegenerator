"use client";
import Image from "next/image";
import QuoteGenerator from "./components/quotegenerator";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 relative z-0">
        <QuoteGenerator />
    </main>
  );
}
