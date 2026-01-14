import { Shield, Activity, Droplets } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-secondary/50 to-card border border-border/50 p-8 mb-8">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-wave" />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-accent/5 rounded-full blur-3xl animate-wave" style={{ animationDelay: '2s' }} />
      </div>

      <div className="relative z-10 flex flex-col lg:flex-row items-center gap-8">
        <div className="flex-1 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium">
            <Shield className="h-4 w-4" />
            Coral-Core AI Active
          </div>
          
          <h2 className="font-display text-3xl lg:text-4xl font-bold text-foreground leading-tight">
            Protecting Coral Ecosystems
            <span className="block text-gradient-cyan">
              One Discharge at a Time
            </span>
          </h2>
          
          <p className="text-muted-foreground max-w-xl leading-relaxed">
            Marine-Guardian AI ensures every industrial discharge is not just neutral, 
            but <strong className="text-foreground">Marine-Compatible</strong>—preventing 
            acidification and thermal shock that lead to coral bleaching.
          </p>

          <div className="flex items-center gap-6 pt-4">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <Activity className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-display font-bold text-foreground">2,847</p>
                <p className="text-xs text-muted-foreground">Cycles Today</p>
              </div>
            </div>
            <div className="h-12 w-px bg-border" />
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-xl bg-success/10 flex items-center justify-center">
                <Droplets className="h-6 w-6 text-success" />
              </div>
              <div>
                <p className="text-2xl font-display font-bold text-foreground">99.7%</p>
                <p className="text-xs text-muted-foreground">Reef-Safe Rate</p>
              </div>
            </div>
          </div>
        </div>

        {/* Animated coral illustration placeholder */}
        <div className="relative w-64 h-64 lg:w-80 lg:h-80">
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 animate-pulse-glow" />
          <div className="absolute inset-4 rounded-full bg-card/50 backdrop-blur-sm border border-primary/20 flex items-center justify-center">
            <div className="text-center space-y-2">
              <div className="text-5xl">🪸</div>
              <p className="text-sm font-medium text-primary">Reef Protected</p>
              <p className="text-xs text-muted-foreground">Real-time Monitoring</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
