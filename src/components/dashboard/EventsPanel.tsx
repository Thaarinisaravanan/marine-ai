import { DischargeEvent, DischargeEventData } from "@/components/ui/DischargeEvent";
import { TransparencyNote } from "@/components/ui/TransparencyNote";
import { Clock, FileText } from "lucide-react";

const recentEvents: DischargeEventData[] = [
  {
    id: "MGC-2847",
    timestamp: "14:32:15",
    ph: 7.8,
    temperature: 24.5,
    pollutant: "None Detected",
    flowRate: 1850,
    status: "treated",
    neutralizationAgent: "Magnesium Hydroxide (0.5L)",
  },
  {
    id: "MGC-2846",
    timestamp: "14:28:42",
    ph: 5.2,
    temperature: 32,
    pollutant: "Zinc Trace",
    flowRate: 2100,
    status: "treated",
    neutralizationAgent: "Sodium Bicarbonate (2.1L)",
  },
  {
    id: "MGC-2845",
    timestamp: "14:25:08",
    ph: 6.9,
    temperature: 26,
    pollutant: "Minimal Sulfates",
    flowRate: 1920,
    status: "treated",
  },
  {
    id: "MGC-2844",
    timestamp: "14:21:33",
    ph: 4.8,
    temperature: 38,
    pollutant: "Lead Trace",
    flowRate: 2000,
    status: "pending",
    neutralizationAgent: "Processing...",
  },
];

export function EventsPanel() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Recent Discharge Events */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-display text-lg font-semibold text-foreground flex items-center gap-2">
            <Clock className="h-5 w-5 text-primary" />
            Recent Discharge Events
          </h3>
          <span className="text-xs text-muted-foreground">
            Last 30 minutes
          </span>
        </div>
        <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2">
          {recentEvents.map((event) => (
            <DischargeEvent key={event.id} event={event} />
          ))}
        </div>
      </div>

      {/* Transparency Notes */}
      <div className="space-y-4">
        <h3 className="font-display text-lg font-semibold text-foreground flex items-center gap-2">
          <FileText className="h-5 w-5 text-primary" />
          AI Transparency Log
        </h3>
        <div className="space-y-4">
          <TransparencyNote
            cycleId="2846"
            timestamp="Today at 14:28 UTC"
            summary="Incoming discharge detected with elevated acidity (pH 5.2) and thermal variance (+6°C above ambient). The Coral-Core AI initiated a precision neutralization protocol using marine-safe Sodium Bicarbonate to restore the water to reef-compatible parameters before release."
            speciesProtected={["Staghorn Coral", "Clownfish", "Sea Urchins"]}
          />
          <TransparencyNote
            cycleId="2844"
            timestamp="Today at 14:21 UTC"
            summary="Critical alert: Heavy metal contamination (Lead trace) detected alongside severe acidification (pH 4.8). Sea-Gate locked pending extended treatment cycle. Bio-mimicry dosing protocol activated to ensure zero harm to local reef ecosystem."
            speciesProtected={["Brain Coral", "Parrotfish", "Moray Eels"]}
          />
        </div>
      </div>
    </div>
  );
}
