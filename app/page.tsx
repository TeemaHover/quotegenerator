import Image from "next/image";
import QuoteGenerator from "./components/quotegenerator";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 relative z-0">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center "></div>
      </div>

      <div className="relative flex place-items-center justify-center w-3/5 z-[-1]">
        <QuoteGenerator />
      </div>

      <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left"></div>
    </main>
  );
}
