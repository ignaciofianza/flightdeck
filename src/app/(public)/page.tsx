import { Hero } from "@/components/home/Hero";
import { Features } from "@/components/home/Features";
import { CallToAction } from "@/components/home/CTA";
import { HowItWorks } from "@/components/home/HowItWorks";

export default function HomePage() {
  return (
    <main>
      <Hero />
      <Features />
      <HowItWorks />
      <CallToAction />
    </main>
  );
}
