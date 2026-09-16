import { notFound } from "next/navigation";
import { InteractionSpike } from "@/components/spikes/InteractionSpike";

export const dynamic = "force-dynamic";

export default function InteractionsSpikePage() {
  const enabled =
    process.env.NODE_ENV !== "production" ||
    process.env.ENABLE_RISK_SPIKES === "true";

  if (!enabled) notFound();

  return <InteractionSpike />;
}
