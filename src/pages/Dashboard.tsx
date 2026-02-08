import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { GamificationBadges } from "@/components/dashboard/GamificationBadges";
import { FeasibilityScore } from "@/components/dashboard/FeasibilityScore";
import { AIRecommendations } from "@/components/dashboard/AIRecommendations";
import { HarvestPotentialChart } from "@/components/dashboard/HarvestPotentialChart";
import { CostBenefitAnalysis } from "@/components/dashboard/CostBenefitAnalysis";
import { GovernmentSubsidies } from "@/components/dashboard/GovernmentSubsidies";
import { WaterProfile } from "@/components/dashboard/WaterProfile";
import { RechargeModel3D } from "@/components/dashboard/RechargeModel3D";
import { ARViewer } from "@/components/dashboard/ARViewer";
import { RechargeRecommendation } from "@/components/dashboard/RechargeRecommendation";
import { Reports } from "@/components/dashboard/Reports";
import { Projects } from "@/components/dashboard/Projects";
import { Resources } from "@/components/dashboard/Resources";
import { WizardSteps, WizardData } from "@/components/WizardSteps";
import { AboutSection } from "@/components/AboutSection";
import { LoadingDashboard, ProcessingMessage } from "@/components/LoadingStates";
import { DataSources } from "@/components/dashboard/DataSources";
import { InteractiveMap } from "@/components/dashboard/InteractiveMap";
import { HelpModal } from "@/components/dashboard/HelpModal";
import { calculateFeasibility, generateDemoData, FeasibilityResult } from "@/utils/feasibilityCalculator";
import { AlertCircle, RotateCcw } from "lucide-react";

interface DashboardProps {
  onLogout: () => void;
  wizardData: WizardData | null;
  feasibilityResult: FeasibilityResult | null;
}

export const Dashboard = ({ onLogout, wizardData, feasibilityResult }: DashboardProps) => {
  const [activeTab, setActiveTab] = useState("dashboard");

  const handleStartOver = () => {
    onLogout(); // This will take us back to landing
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/30">
      <DashboardHeader onLogout={onLogout} />
      
      <div className="bg-gradient-to-r from-primary/10 to-sustainable-green/10 py-5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-sustainable-green bg-clip-text text-transparent mb-2">
                Your Rainwater Harvesting Analysis
              </h1>
              <p className="text-muted-foreground">
                {wizardData?.location.city}, {wizardData?.location.state} • {wizardData?.property.roofArea} sq.m
              </p>
            </div>
            <Button variant="outline" size="sm" onClick={handleStartOver}>
              <RotateCcw className="w-4 h-4 mr-2" />
              Start Over
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="about">About</TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6">
            {/* Impact Summary */}
            <GamificationBadges />
            
            {/* Key Results */}
            <div className="grid lg:grid-cols-2 gap-6">
              <FeasibilityScore data={feasibilityResult} />
              <InteractiveMap location={wizardData?.location} />
            </div>

            {/* Harvest Chart - Full Width */}
            <HarvestPotentialChart />

            {/* Location & Structure */}
            <div className="grid lg:grid-cols-2 gap-6">
              <WaterProfile />
              <RechargeRecommendation data={feasibilityResult} />
            </div>

            {/* Cost Analysis - Full Width */}
            <CostBenefitAnalysis data={feasibilityResult} />

            {/* 3D Model & AI Insights */}
            <div className="grid lg:grid-cols-2 gap-6">
              <RechargeModel3D />
              <div className="space-y-6">
                <AIRecommendations />
                <ARViewer />
              </div>
            </div>

            {/* Subsidies & Data Sources */}
            <div className="grid lg:grid-cols-2 gap-6">
              <GovernmentSubsidies />
              <DataSources location={wizardData?.location} />
            </div>
          </TabsContent>

          <TabsContent value="reports"><Reports /></TabsContent>
          <TabsContent value="projects"><Projects /></TabsContent>
          <TabsContent value="about"><AboutSection /></TabsContent>
        </Tabs>
      </div>
      
      {/* Floating Help Button */}
      <HelpModal />
    </div>
  );
};