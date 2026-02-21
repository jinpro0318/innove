import Hero from "@/components/landing/Hero";
import Ticker from "@/components/landing/Ticker";
import Problem from "@/components/landing/Problem";
import Solution from "@/components/landing/Solution";
import Features from "@/components/landing/Features";
import Reviews from "@/components/landing/Reviews";
import Pricing from "@/components/landing/Pricing";
import CTA from "@/components/landing/CTA";
import FAQ from "@/components/landing/FAQ";

export default function Home() {
  return (
    <>
      <Hero />
      <Ticker />
      <Problem />
      <Solution />
      <Features />
      <Reviews />
      <Pricing />
      <CTA />
      <FAQ />
    </>
  );
}
