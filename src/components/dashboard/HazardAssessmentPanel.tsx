import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Brain,
  AlertTriangle,
  Beaker,
  Thermometer,
  Droplets,
  Gauge,
  CheckCircle2,
  Shield,
  Fish,
  Loader2,
} from "lucide-react";

interface AssessmentResult {
  hazardLevel: "low" | "moderate" | "high" | "critical";
  coralBleachingRisk: string;
  recommendedAgent: string;
  dosage: string;
  estimatedTime: string;
  speciesAtRisk: string[];
  transparencyNote: string;
  alkalineShockCheck: boolean;
}

const pollutantOptions = [
  { value: "none", label: "None Detected" },
  { value: "zinc", label: "Zinc Trace" },
  { value: "lead", label: "Lead Trace" },
  { value: "mercury", label: "Mercury Trace" },
  { value: "sulfates", label: "Sulfates" },
  { value: "nitrates", label: "Nitrates" },
  { value: "phosphates", label: "Phosphates" },
];

const hazardStyles = {
  low: "bg-success/20 text-success border-success/30",
  moderate: "bg-warning/20 text-warning border-warning/30",
  high: "bg-accent/20 text-accent border-accent/30",
  critical: "bg-destructive/20 text-destructive border-destructive/30 animate-pulse",
};

export function HazardAssessmentPanel() {
  const [ph, setPh] = useState("7.0");
  const [temperature, setTemperature] = useState("25");
  const [pollutant, setPollutant] = useState("none");
  const [flowRate, setFlowRate] = useState("2000");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<AssessmentResult | null>(null);

  const analyzeDischarge = async () => {
    setIsAnalyzing(true);
    setResult(null);

    // Simulate AI processing
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const phNum = parseFloat(ph);
    const tempNum = parseFloat(temperature);
    const flowNum = parseFloat(flowRate);

    // AI Logic simulation based on parameters
    let hazardLevel: AssessmentResult["hazardLevel"] = "low";
    let coralBleachingRisk = "Minimal";
    let recommendedAgent = "No treatment required";
    let dosage = "0 L";
    let estimatedTime = "Immediate release";
    let speciesAtRisk: string[] = [];

    // pH assessment
    if (phNum < 5.0 || phNum > 9.0) {
      hazardLevel = "critical";
      coralBleachingRisk = "Severe - Immediate coral tissue damage expected";
    } else if (phNum < 6.0 || phNum > 8.5) {
      hazardLevel = "high";
      coralBleachingRisk = "High - Coral stress and bleaching likely within hours";
    } else if (phNum < 6.5 || phNum > 8.2) {
      hazardLevel = "moderate";
      coralBleachingRisk = "Moderate - Prolonged exposure may cause stress";
    }

    // Temperature assessment
    if (tempNum > 35) {
      hazardLevel = hazardLevel === "low" ? "high" : "critical";
      coralBleachingRisk = "Critical thermal shock - Immediate bleaching risk";
    } else if (tempNum > 30) {
      if (hazardLevel === "low") hazardLevel = "moderate";
      coralBleachingRisk += ". Thermal stress detected.";
    }

    // Pollutant assessment
    if (pollutant === "mercury" || pollutant === "lead") {
      hazardLevel = "critical";
      speciesAtRisk = ["All reef species", "Filter feeders", "Juvenile fish"];
    } else if (pollutant === "zinc" || pollutant === "sulfates") {
      if (hazardLevel === "low") hazardLevel = "moderate";
      speciesAtRisk = ["Sensitive corals", "Sea urchins"];
    } else if (pollutant !== "none") {
      speciesAtRisk = ["Algae-dependent species"];
    }

    // Determine neutralization approach
    if (phNum < 7.0) {
      recommendedAgent = "Sodium Bicarbonate (NaHCO₃)";
      const acidityDelta = 7.8 - phNum;
      const calculatedDose = (acidityDelta * flowNum * 0.001).toFixed(2);
      dosage = `${calculatedDose} L per minute`;
      estimatedTime = "45-90 seconds";
    } else if (phNum > 8.3) {
      recommendedAgent = "Citric Acid (diluted, marine-safe)";
      const alkalinityDelta = phNum - 7.8;
      const calculatedDose = (alkalinityDelta * flowNum * 0.0008).toFixed(2);
      dosage = `${calculatedDose} L per minute`;
      estimatedTime = "30-60 seconds";
    }

    if (tempNum > 28) {
      recommendedAgent += recommendedAgent ? " + Thermal Diffusion Chamber" : "Thermal Diffusion Chamber";
      estimatedTime = "2-3 minutes (cooling cycle)";
    }

    if (pollutant === "mercury" || pollutant === "lead") {
      recommendedAgent = "Activated Carbon Filter + Chelation Agent (EDTA)";
      estimatedTime = "5-8 minutes (full purification cycle)";
      dosage = "0.5 L EDTA + Carbon filtration";
    }

    // Generate transparency note
    const transparencyNote = generateTransparencyNote(
      phNum,
      tempNum,
      pollutant,
      recommendedAgent,
      hazardLevel
    );

    // Alkaline shock check
    const targetPh = phNum < 7.0 ? phNum + (7.8 - phNum) : phNum > 8.3 ? phNum - (phNum - 7.8) : phNum;
    const alkalineShockCheck = targetPh <= 8.5;

    setResult({
      hazardLevel,
      coralBleachingRisk,
      recommendedAgent,
      dosage,
      estimatedTime,
      speciesAtRisk: speciesAtRisk.length > 0 ? speciesAtRisk : ["None identified"],
      transparencyNote,
      alkalineShockCheck,
    });

    setIsAnalyzing(false);
  };

  const generateTransparencyNote = (
    ph: number,
    temp: number,
    pollutant: string,
    agent: string,
    level: string
  ): string => {
    if (level === "low") {
      return `Discharge analysis complete. Water parameters (pH ${ph}, ${temp}°C) fall within reef-safe ranges. No treatment required. Cleared for immediate release to marine environment.`;
    }

    const pollutantText = pollutant !== "none" ? ` Contamination detected: ${pollutant}.` : "";
    const phText = ph < 6.5 ? `acidic conditions (pH ${ph})` : ph > 8.2 ? `alkaline conditions (pH ${ph})` : `pH variance (${ph})`;
    const tempText = temp > 28 ? ` Thermal variance of +${(temp - 25).toFixed(1)}°C above ambient.` : "";

    return `Coral-Core AI detected ${phText}${tempText}.${pollutantText} Initiating bio-mimicry neutralization protocol using ${agent}. Treatment ensures water matches the local reef's healthy baseline before Sea-Gate release.`;
  };

  return (
    <div className="glass-card rounded-2xl p-6 border-primary/20">
      <div className="flex items-center gap-3 mb-6">
        <div className="rounded-xl bg-primary/10 p-2.5 animate-pulse-glow">
          <Brain className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h3 className="font-display text-xl font-bold text-foreground">
            Coral-Core AI Hazard Assessment
          </h3>
          <p className="text-sm text-muted-foreground">
            Input discharge parameters for real-time analysis
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Panel */}
        <div className="space-y-5">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="ph" className="flex items-center gap-2 text-sm">
                <Beaker className="h-4 w-4 text-primary" />
                pH Level
              </Label>
              <Input
                id="ph"
                type="number"
                step="0.1"
                min="0"
                max="14"
                value={ph}
                onChange={(e) => setPh(e.target.value)}
                className="bg-muted/50 border-border/50 focus:border-primary"
              />
              <p className="text-xs text-muted-foreground">Ocean range: 7.8-8.4</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="temp" className="flex items-center gap-2 text-sm">
                <Thermometer className="h-4 w-4 text-primary" />
                Temperature (°C)
              </Label>
              <Input
                id="temp"
                type="number"
                step="0.5"
                min="0"
                max="100"
                value={temperature}
                onChange={(e) => setTemperature(e.target.value)}
                className="bg-muted/50 border-border/50 focus:border-primary"
              />
              <p className="text-xs text-muted-foreground">Ambient: 24-26°C</p>
            </div>
          </div>

          <div className="space-y-2">
            <Label className="flex items-center gap-2 text-sm">
              <AlertTriangle className="h-4 w-4 text-primary" />
              Detected Pollutant
            </Label>
            <Select value={pollutant} onValueChange={setPollutant}>
              <SelectTrigger className="bg-muted/50 border-border/50">
                <SelectValue placeholder="Select pollutant type" />
              </SelectTrigger>
              <SelectContent>
                {pollutantOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="flow" className="flex items-center gap-2 text-sm">
              <Gauge className="h-4 w-4 text-primary" />
              Flow Rate (L/min)
            </Label>
            <Input
              id="flow"
              type="number"
              step="100"
              min="0"
              value={flowRate}
              onChange={(e) => setFlowRate(e.target.value)}
              className="bg-muted/50 border-border/50 focus:border-primary"
            />
          </div>

          <Button
            onClick={analyzeDischarge}
            disabled={isAnalyzing}
            className="w-full bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-primary-foreground font-semibold h-12"
          >
            {isAnalyzing ? (
              <>
                <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                Analyzing Discharge...
              </>
            ) : (
              <>
                <Brain className="h-5 w-5 mr-2" />
                Run AI Hazard Assessment
              </>
            )}
          </Button>
        </div>

        {/* Results Panel */}
        <div className="space-y-4">
          {isAnalyzing && (
            <div className="h-full flex items-center justify-center">
              <div className="text-center space-y-4">
                <div className="relative inline-block">
                  <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl animate-pulse" />
                  <Brain className="h-16 w-16 text-primary relative animate-float" />
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium text-foreground">
                    Coral-Core AI Processing...
                  </p>
                  <p className="text-xs text-muted-foreground animate-shimmer">
                    Analyzing chemical signatures against reef health baselines
                  </p>
                </div>
              </div>
            </div>
          )}

          {!isAnalyzing && !result && (
            <div className="h-full flex items-center justify-center border border-dashed border-border/50 rounded-xl p-8">
              <div className="text-center space-y-2">
                <Droplets className="h-12 w-12 text-muted-foreground/50 mx-auto" />
                <p className="text-sm text-muted-foreground">
                  Enter discharge parameters and run analysis
                </p>
              </div>
            </div>
          )}

          {result && (
            <div className="space-y-4 animate-in fade-in-50 duration-500">
              {/* Hazard Level Badge */}
              <div
                className={cn(
                  "flex items-center justify-between p-4 rounded-xl border",
                  hazardStyles[result.hazardLevel]
                )}
              >
                <div className="flex items-center gap-3">
                  <Shield className="h-6 w-6" />
                  <div>
                    <p className="text-xs uppercase tracking-wider opacity-80">
                      Hazard Level
                    </p>
                    <p className="font-display font-bold text-lg capitalize">
                      {result.hazardLevel}
                    </p>
                  </div>
                </div>
              </div>

              {/* Risk & Recommendation */}
              <div className="glass-card rounded-xl p-4 space-y-3">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">
                    Coral Bleaching Risk
                  </p>
                  <p className="text-sm text-foreground">
                    {result.coralBleachingRisk}
                  </p>
                </div>

                <div className="border-t border-border/30 pt-3">
                  <p className="text-xs text-muted-foreground mb-1">
                    Recommended Neutralization Agent
                  </p>
                  <p className="text-sm font-medium text-primary">
                    {result.recommendedAgent}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-2">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">
                      Precision Dose
                    </p>
                    <p className="text-sm font-semibold text-foreground">
                      {result.dosage}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">
                      Treatment Time
                    </p>
                    <p className="text-sm font-semibold text-foreground">
                      {result.estimatedTime}
                    </p>
                  </div>
                </div>
              </div>

              {/* Species at Risk */}
              <div className="flex items-center gap-2 flex-wrap">
                <Fish className="h-4 w-4 text-accent" />
                <span className="text-xs text-muted-foreground">At Risk:</span>
                {result.speciesAtRisk.map((species, i) => (
                  <span
                    key={i}
                    className="px-2 py-0.5 rounded-full bg-accent/10 text-accent text-xs"
                  >
                    {species}
                  </span>
                ))}
              </div>

              {/* Responsible AI Check */}
              <div
                className={cn(
                  "flex items-center gap-2 p-3 rounded-lg text-sm",
                  result.alkalineShockCheck
                    ? "bg-success/10 text-success"
                    : "bg-destructive/10 text-destructive"
                )}
              >
                <CheckCircle2 className="h-4 w-4" />
                {result.alkalineShockCheck
                  ? "✓ Alkaline Shock Check: Target pH will not exceed 8.5"
                  : "⚠ Warning: Treatment may cause alkaline shock - manual review required"}
              </div>

              {/* Transparency Note */}
              <div className="bg-secondary/30 rounded-xl p-4 border border-primary/10">
                <p className="text-xs text-primary font-medium mb-2">
                  📋 Public Dashboard Summary
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {result.transparencyNote}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
