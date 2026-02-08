import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, Droplets, MapPin, Calculator, TrendingUp } from "lucide-react";

interface LandingProps {
  onStartWizard: () => void;
}

export const Landing = ({ onStartWizard }: LandingProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/10 to-sustainable-light/20">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-water-primary to-sustainable-green flex items-center justify-center">
              <Droplets className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-water-primary to-sustainable-green bg-clip-text text-transparent">
              AquaHarvest Pro
            </h1>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 py-16 text-center">
        <div className="space-y-8">
          <div className="space-y-4">
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-water-primary via-sustainable-green to-conservation-teal bg-clip-text text-transparent leading-tight">
              Check Your Rooftop Rainwater Harvesting Feasibility
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Get personalized recommendations, cost analysis, and environmental impact assessment using official government data sources.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              onClick={onStartWizard}
              size="lg" 
              className="bg-gradient-to-r from-water-primary to-sustainable-green hover:shadow-lg transition-all duration-300 px-8 py-6 text-lg"
            >
              Start Feasibility Check
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button variant="outline" size="lg" className="px-8 py-6 text-lg">
              Watch Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="p-6 text-center space-y-4 border-0 shadow-lg bg-gradient-to-br from-card to-accent/5">
            <div className="w-12 h-12 rounded-lg bg-water-primary/10 flex items-center justify-center mx-auto">
              <Calculator className="w-6 h-6 text-water-primary" />
            </div>
            <h3 className="font-semibold text-lg">Smart Calculations</h3>
            <p className="text-sm text-muted-foreground">
              Advanced algorithms using rainfall, soil, and aquifer data
            </p>
          </Card>

          <Card className="p-6 text-center space-y-4 border-0 shadow-lg bg-gradient-to-br from-card to-sustainable-light/10">
            <div className="w-12 h-12 rounded-lg bg-sustainable-green/10 flex items-center justify-center mx-auto">
              <MapPin className="w-6 h-6 text-sustainable-green" />
            </div>
            <h3 className="font-semibold text-lg">Location-Specific</h3>
            <p className="text-sm text-muted-foreground">
              Localized data from CGWB, IMD, and NRSC databases
            </p>
          </Card>

          <Card className="p-6 text-center space-y-4 border-0 shadow-lg bg-gradient-to-br from-card to-efficiency-blue/10">
            <div className="w-12 h-12 rounded-lg bg-efficiency-blue/10 flex items-center justify-center mx-auto">
              <TrendingUp className="w-6 h-6 text-efficiency-blue" />
            </div>
            <h3 className="font-semibold text-lg">Cost-Benefit Analysis</h3>
            <p className="text-sm text-muted-foreground">
              ROI calculations and long-term savings projections
            </p>
          </Card>

          <Card className="p-6 text-center space-y-4 border-0 shadow-lg bg-gradient-to-br from-card to-conservation-teal/10">
            <div className="w-12 h-12 rounded-lg bg-conservation-teal/10 flex items-center justify-center mx-auto">
              <Droplets className="w-6 h-6 text-conservation-teal" />
            </div>
            <h3 className="font-semibold text-lg">3D Visualization</h3>
            <p className="text-sm text-muted-foreground">
              Interactive models of recommended recharge structures
            </p>
          </Card>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="border-t bg-muted/30">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="text-center space-y-4">
            <p className="text-sm text-muted-foreground font-medium">
              Powered by Official Government Data Sources
            </p>
            <div className="flex flex-wrap justify-center items-center gap-8 text-xs text-muted-foreground">
              <span>Central Ground Water Board (CGWB)</span>
              <span>•</span>
              <span>India Meteorological Department (IMD)</span>
              <span>•</span>
              <span>National Remote Sensing Centre (NRSC)</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-water-primary to-sustainable-green flex items-center justify-center">
                <Droplets className="w-4 h-4 text-white" />
              </div>
              <span className="text-sm text-muted-foreground">
                AquaHarvest Pro • Smart Rainwater Harvesting Solutions
              </span>
            </div>
            <div className="flex gap-6 text-sm text-muted-foreground">
              <button className="hover:text-foreground transition-colors">About</button>
              <button className="hover:text-foreground transition-colors">Contact</button>
              <button className="hover:text-foreground transition-colors">Privacy</button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};