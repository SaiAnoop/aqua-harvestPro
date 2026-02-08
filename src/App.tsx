import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { Landing } from "./pages/Landing";
import { Dashboard } from "./pages/Dashboard";
import { WizardSteps, WizardData } from "@/components/WizardSteps";
import { calculateFeasibility, generateDemoData, FeasibilityResult } from "@/utils/feasibilityCalculator";

const queryClient = new QueryClient();

type AppScreen = 'landing' | 'wizard' | 'processing' | 'dashboard';

const App = () => {
  const [currentScreen, setCurrentScreen] = useState<AppScreen>('landing');
  const [wizardData, setWizardData] = useState<WizardData | null>(null);
  const [feasibilityResult, setFeasibilityResult] = useState<FeasibilityResult | null>(null);

  const handleStartWizard = () => {
    setCurrentScreen('wizard');
  };

  const handleWizardComplete = async (data: WizardData) => {
    setWizardData(data);
    setCurrentScreen('processing');
    
    // Simulate processing
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    const result = calculateFeasibility(data);
    setFeasibilityResult(result);
    setCurrentScreen('dashboard');
  };

  const handleBackToLanding = () => {
    setCurrentScreen('landing');
    setWizardData(null);
    setFeasibilityResult(null);
  };

  const handleDemoLoad = () => {
    const demoData = generateDemoData();
    handleWizardComplete(demoData);
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'landing':
        return <Landing onStartWizard={handleStartWizard} />;
      
      case 'wizard':
        return (
          <div className="min-h-screen bg-gradient-to-br from-background to-muted/30">
            <div className="max-w-7xl mx-auto px-6 py-12">
              <WizardSteps onComplete={handleWizardComplete} onDemoLoad={handleDemoLoad} />
            </div>
          </div>
        );
        
      case 'processing':
        return (
          <div className="min-h-screen bg-gradient-to-br from-background to-muted/30 flex items-center justify-center">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
              <h2 className="text-2xl font-bold">Processing Your Data...</h2>
              <p className="text-muted-foreground">Analyzing with government data sources</p>
            </div>
          </div>
        );
        
      case 'dashboard':
        return (
          <Dashboard 
            onLogout={handleBackToLanding}
            wizardData={wizardData}
            feasibilityResult={feasibilityResult}
          />
        );
        
      default:
        return <Landing onStartWizard={handleStartWizard} />;
    }
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        {renderScreen()}
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
