import { Header } from "@/components/dashboard/Header";
import { HeroSection } from "@/components/dashboard/HeroSection";
import { MonitoringGrid } from "@/components/dashboard/MonitoringGrid";
import { EventsPanel } from "@/components/dashboard/EventsPanel";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container py-8">
        <HeroSection />
        <MonitoringGrid />
        <EventsPanel />
      </main>

      {/* Decorative wave at bottom */}
      <div className="fixed bottom-0 left-0 right-0 h-32 pointer-events-none wave-pattern opacity-50" />
    </div>
  );
};

export default Index;
