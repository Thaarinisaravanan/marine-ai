import { cn } from "@/lib/utils";
import { ShieldCheck, ShieldAlert, Lock, Unlock } from "lucide-react";

interface SeaGateStatusProps {
  isLocked: boolean;
  reefSafetyScore: number;
  lastVerified: string;
}

export function SeaGateStatus({
  isLocked,
  reefSafetyScore,
  lastVerified,
}: SeaGateStatusProps) {
  const isSafe = reefSafetyScore >= 95;

  return (
    <div
      className={cn(
        "glass-card rounded-2xl p-6 transition-all duration-500",
        isLocked
          ? "border-warning/50 bg-warning/5"
          : isSafe
          ? "border-success/50 bg-success/5 glow-success"
          : "border-destructive/50 bg-destructive/5"
      )}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-display text-lg font-semibold text-foreground">
          Sea-Gate Status
        </h3>
        <div
          className={cn(
            "flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium",
            isLocked
              ? "bg-warning/20 text-warning"
              : isSafe
              ? "bg-success/20 text-success"
              : "bg-destructive/20 text-destructive"
          )}
        >
          {isLocked ? (
            <>
              <Lock className="h-4 w-4" />
              LOCKED
            </>
          ) : (
            <>
              <Unlock className="h-4 w-4" />
              OPEN
            </>
          )}
        </div>
      </div>

      <div className="flex items-center gap-6">
        <div
          className={cn(
            "relative h-24 w-24 rounded-full flex items-center justify-center",
            "bg-gradient-to-br from-card to-muted"
          )}
        >
          <div
            className={cn(
              "absolute inset-1 rounded-full flex items-center justify-center",
              isSafe ? "bg-success/10" : "bg-warning/10"
            )}
          >
            {isSafe ? (
              <ShieldCheck className="h-10 w-10 text-success animate-float" />
            ) : (
              <ShieldAlert className="h-10 w-10 text-warning" />
            )}
          </div>
          {/* Circular progress indicator */}
          <svg className="absolute inset-0 -rotate-90" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="currentColor"
              strokeWidth="4"
              className="text-muted"
            />
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="currentColor"
              strokeWidth="4"
              strokeDasharray={`${reefSafetyScore * 2.83} 283`}
              strokeLinecap="round"
              className={cn(
                "transition-all duration-1000",
                isSafe ? "text-success" : "text-warning"
              )}
            />
          </svg>
        </div>

        <div className="flex-1 space-y-3">
          <div>
            <p className="text-sm text-muted-foreground mb-1">
              Reef Safety Score
            </p>
            <p className="text-2xl font-display font-bold text-foreground">
              {reefSafetyScore}%
            </p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-1">Last Verified</p>
            <p className="text-sm font-medium text-foreground">{lastVerified}</p>
          </div>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-border/50">
        <p className="text-xs text-muted-foreground">
          {isLocked
            ? "⚠️ Gate locked pending water quality verification"
            : isSafe
            ? "✅ Water verified as 100% reef-compatible"
            : "⚠️ Additional treatment cycle in progress"}
        </p>
      </div>
    </div>
  );
}
