import { FileText, Fish, Shell, Waves } from "lucide-react";

interface TransparencyNoteProps {
  cycleId: string;
  timestamp: string;
  summary: string;
  speciesProtected: string[];
}

export function TransparencyNote({
  cycleId,
  timestamp,
  summary,
  speciesProtected,
}: TransparencyNoteProps) {
  return (
    <div className="glass-card rounded-xl p-5 border-primary/20">
      <div className="flex items-start gap-4">
        <div className="rounded-lg bg-primary/10 p-2.5">
          <FileText className="h-5 w-5 text-primary" />
        </div>
        <div className="flex-1 space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="font-display font-semibold text-foreground">
              Transparency Note
            </h4>
            <span className="text-xs font-mono text-muted-foreground">
              Cycle #{cycleId}
            </span>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {summary}
          </p>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs text-muted-foreground">
              Species Protected:
            </span>
            {speciesProtected.map((species, index) => (
              <span
                key={index}
                className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-medium"
              >
                {index === 0 ? (
                  <Fish className="h-3 w-3" />
                ) : index === 1 ? (
                  <Shell className="h-3 w-3" />
                ) : (
                  <Waves className="h-3 w-3" />
                )}
                {species}
              </span>
            ))}
          </div>
          <p className="text-xs text-muted-foreground">{timestamp}</p>
        </div>
      </div>
    </div>
  );
}
