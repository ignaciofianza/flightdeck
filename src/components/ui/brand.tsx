import Image from "next/image";
import Link from "next/link";

type BrandProps = {
  className?: string;
};

export function Brand({ className = "" }: BrandProps) {
  return (
    <Link
      href="/"
      aria-label="FlightDeck — Home"
      className={`inline-flex items-center ${className}`}
    >
      <Image
        src="/flightdeck-nobg.png"
        alt="FlightDeck"
        width={170}
        height={44}
        priority
        className="h-auto w-42.5 sm:w-47.5"
      />
    </Link>
  );
}
