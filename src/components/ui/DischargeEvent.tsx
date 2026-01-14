import { cn } from "@/lib/utils";
import { Droplets, Thermometer, AlertTriangle, CheckCircle2 } from "lucide-react";

export interface DischargeEventData {
  id: string;
  timestamp: string;
  ph: number;
  temperature: number;
  pollutant: string;
  flowRate: number;
  status: "treated" | "pending" | "critical";
  neutralizationAgent?: string;
}

interface DischargeEventProps {
  event: DischargeEventData;
}

const statusConfig = {
  treated: {
    icon: CheckCircle2,
    label: "Treated",
    className: "bg-success/20 text-success border-success/30",
  },
  pending: {
    icon: Droplets,
    label: "Processing",
    className: "bg-warning/20 text-warning border-warning/30",
  },
  critical: {
    icon: AlertTriangle,
    label: "Critical",
    className: "bg-destructive/20 text-destructive border-destructive/30 animate-pulse",
  },
};

export function DischargeEvent({ event }: DischargeEventProps) {
  const config = statusConfig[event.status];
  const StatusIcon = config.icon;

  return (
    <div className="glass-card rounded-xl p-4 transition-all duration-300 hover:bg-card/90">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div
            className={cn(
              "flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border",
              config.className
            )}
          >
            <StatusIcon className="h-3.5 w-3.5" />
            {config.label}
          </div>
          <span className="text-xs text-muted-foreground">{event.timestamp}</span>
        </div>
        <span className="text-xs font-mono text-muted-foreground">
          #{event.id}
        </span>
      </div>

      <div className="grid grid-cols-4 gap-3">
        <div className="space-y-1">
          <p className="text-xs text-muted-foreground">pH Level</p>
          <p
            className={cn(
              "text-sm font-semibold",
              event.ph < 6 || event.ph > 8.5
                ? "text-destructive"
                : "text-foreground"
            )}
          >
            {event.ph.toFixed(1)}
          </p>
        </div>
        <div className="space-y-1">
          <p className="text-xs text-muted-foreground flex items-center gap-1">
            <Thermometer className="h-3 w-3" /> Temp
          </p>
          <p
            className={cn(
              "text-sm font-semibold",
              event.temperature > 30 ? "text-warning" : "text-foreground"
            )}
          >
            {event.temperature}°C
          </p>
        </div>
        <div className="space-y-1">
          <p className="text-xs text-muted-foreground">Pollutant</p>
          <p className="text-sm font-semibold text-foreground">
            {event.pollutant}
          </p>
        </div>
        <div className="space-y-1">
          <p className="text-xs text-muted-foreground">Flow Rate</p>
          <p className="text-sm font-semibold text-foreground">
            {event.flowRate} L/min
          </p>
        </div>
      </div>

      {event.neutralizationAgent && (
        <div className="mt-3 pt-3 border-t border-border/30">
          <p className="text-xs text-muted-foreground">
            Neutralization Agent:{" "}
            <span className="text-primary font-medium">
              {event.neutralizationAgent}
            </span>
          </p>
        </div>
      )}
    </div>
  );
}
