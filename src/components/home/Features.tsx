import { DiscoveryShowcase } from "./DiscoveryShowcase";
import { FlightExplorerDemo } from "./FlightExplorerDemo";
import { FlightDetailsShowcase } from "./FlightDetailsShowcase";
import { FeaturesCTA } from "./FeaturesCTA";

export function Features() {
  return (
    <section
      id="features"
      className="scroll-mt-24 overflow-hidden border-t border-white/6 bg-background"
    >
      <DiscoveryShowcase />
      <FlightExplorerDemo />
      <FlightDetailsShowcase />
      <FeaturesCTA />
    </section>
  );
}
