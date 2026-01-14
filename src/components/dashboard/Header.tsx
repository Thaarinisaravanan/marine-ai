import { Waves, Bell, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-xl">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="absolute inset-0 bg-primary/30 blur-xl rounded-full" />
            <div className="relative bg-gradient-to-br from-primary to-primary/70 rounded-xl p-2">
              <Waves className="h-6 w-6 text-primary-foreground" />
            </div>
          </div>
          <div>
            <h1 className="font-display text-xl font-bold text-foreground">
              Marine-Guardian
              <span className="text-primary"> AI</span>
            </h1>
            <p className="text-xs text-muted-foreground">
              Digital Reef Warden • SDG 14
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="text-muted-foreground hover:text-foreground hover:bg-muted/50"
          >
            <Bell className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="text-muted-foreground hover:text-foreground hover:bg-muted/50"
          >
            <Settings className="h-5 w-5" />
          </Button>
          <div className="ml-2 flex items-center gap-2 px-3 py-1.5 rounded-full bg-success/10 border border-success/30">
            <span className="h-2 w-2 rounded-full bg-success animate-pulse" />
            <span className="text-xs font-medium text-success">
              System Online
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
