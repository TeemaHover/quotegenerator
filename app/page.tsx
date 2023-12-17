"use client";
import Image from "next/image";
import QuoteGenerator from "./components/quotegenerator";
import Navbar from "./components/navbar";
import About from "./components/about";
import Footer from "./components/footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <div className="flex justify-center items-center max-w-7xl mx-auto text-center pt-12 flex-col">
        <h3 className="text-5xl md:text-7xl font-extrabold tracking-tight text-gray-900">Quote Generator to Create Unique Quotes in Seconds</h3>
        <p className="mt-6 max-w-2xl mx-auto text-md md:text-lg leading-7 text-gray-600 md:leading-8">Looking for the random quote? Our Random Quote Generator provides a seamless experience in finding quotes that resonate and inspire. Generate quotes that stand out and make an impact.</p>
      </div>
      <main className="flex flex-col items-center justify-between p-24 relative z-0">

        <QuoteGenerator />
      </main>
      <div className="flex justify-center items-center max-w-7xl mx-auto pt-12 flex-col">
        <About />
      </div>
      <Footer />
    </>
  );
}
