import Hero from "@/components/landing/Hero";
import FeatureStrip from "@/components/landing/Ticker";
import Problem from "@/components/landing/Problem";
import Solution from "@/components/landing/Solution";
import HowItWorks from "@/components/landing/HowItWorks";
import Founder from "@/components/landing/Founder";
import Features from "@/components/landing/Features";
import TargetUsers from "@/components/landing/Reviews";
import Pricing from "@/components/landing/Pricing";
import FAQ from "@/components/landing/FAQ";
import CTA from "@/components/landing/CTA";

export default function Home() {
  return (
    <>
      <Hero />
      <FeatureStrip />
      <Problem />
      <Solution />
      <HowItWorks />
      <Founder />
      <Features />
      <TargetUsers />
      <Pricing />
      <FAQ />
      <CTA />
    </>
  );
}
