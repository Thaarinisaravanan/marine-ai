import { MetricCard } from "@/components/ui/MetricCard";
import { SeaGateStatus } from "@/components/ui/SeaGateStatus";
import { Beaker, Thermometer, AlertTriangle, Gauge, Droplets, Wind } from "lucide-react";

export function MonitoringGrid() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
      {/* Left column - Metrics */}
      <div className="lg:col-span-2 space-y-4">
        <h3 className="font-display text-lg font-semibold text-foreground mb-4">
          Ocean Sentinels • Real-Time Data
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <MetricCard
            title="pH Level"
            value="7.8"
            unit="pH"
            icon={Beaker}
            status="safe"
          />
          <MetricCard
            title="Water Temp"
            value="24.5"
            unit="°C"
            icon={Thermometer}
            status="normal"
          />
          <MetricCard
            title="Alkalinity"
            value="8.2"
            unit="dKH"
            icon={Droplets}
            status="safe"
          />
          <MetricCard
            title="Flow Rate"
            value="1,850"
            unit="L/min"
            icon={Gauge}
            status="normal"
          />
          <MetricCard
            title="Heavy Metals"
            value="0.02"
            unit="ppm"
            icon={AlertTriangle}
            status="safe"
          />
          <MetricCard
            title="Dissolved O₂"
            value="7.1"
            unit="mg/L"
            icon={Wind}
            status="normal"
          />
        </div>
      </div>

      {/* Right column - Sea Gate */}
      <div>
        <h3 className="font-display text-lg font-semibold text-foreground mb-4">
          Safe-Tide Gate Control
        </h3>
        <SeaGateStatus
          isLocked={false}
          reefSafetyScore={98}
          lastVerified="2 minutes ago"
        />
      </div>
    </div>
  );
}
