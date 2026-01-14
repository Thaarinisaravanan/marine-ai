import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface MetricCardProps {
  title: string;
  value: string | number;
  unit?: string;
  icon: LucideIcon;
  status?: "normal" | "warning" | "critical" | "safe";
  trend?: "up" | "down" | "stable";
  className?: string;
}

const statusStyles = {
  normal: "border-primary/30 bg-primary/5",
  warning: "border-warning/50 bg-warning/10",
  critical: "border-destructive/50 bg-destructive/10 animate-pulse-glow",
  safe: "border-success/50 bg-success/10 glow-success",
};

const statusIconColors = {
  normal: "text-primary",
  warning: "text-warning",
  critical: "text-destructive",
  safe: "text-success",
};

export function MetricCard({
  title,
  value,
  unit,
  icon: Icon,
  status = "normal",
  className,
}: MetricCardProps) {
  return (
    <div
      className={cn(
        "glass-card rounded-xl p-5 transition-all duration-300 hover:scale-[1.02]",
        statusStyles[status],
        className
      )}
    >
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <div className="flex items-baseline gap-1">
            <span className="text-3xl font-display font-bold text-foreground">
              {value}
            </span>
            {unit && (
              <span className="text-sm text-muted-foreground">{unit}</span>
            )}
          </div>
        </div>
        <div
          className={cn(
            "rounded-lg p-2.5 bg-card/50",
            statusIconColors[status]
          )}
        >
          <Icon className="h-5 w-5" />
        </div>
      </div>
    </div>
  );
}
