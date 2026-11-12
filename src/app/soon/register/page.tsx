import type { Metadata } from "next";

import { RegisterForm } from "@/components/auth/RegisterForm";

export const metadata: Metadata = {
  title: "Request Access",
  description: "Create an account and request access to FlightDeck.",
};

export default function RegisterPage() {
  return <RegisterForm />;
}
