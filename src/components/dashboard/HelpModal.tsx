import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  HelpCircle, 
  Calculator, 
  Droplets, 
  TrendingUp, 
  MapPin,
  BookOpen,
  Phone,
  Mail
} from "lucide-react";

export const HelpModal = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="fixed bottom-6 right-6 z-50 rounded-full shadow-lg">
          <HelpCircle className="w-4 h-4 mr-2" />
          Help
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">How AquaHarvest Pro Works</DialogTitle>
        </DialogHeader>
        
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="methodology">Methodology</TabsTrigger>
            <TabsTrigger value="data">Data Sources</TabsTrigger>
            <TabsTrigger value="support">Support</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-6 mt-6">
            <div>
              <h3 className="text-lg font-semibold mb-3">What is Rainwater Harvesting?</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Rainwater harvesting is the collection and storage of rainwater for reuse before it reaches the aquifer. 
                Our tool analyzes your property to recommend the most effective harvesting solution.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 border rounded-lg">
                <Calculator className="w-6 h-6 text-primary mb-2" />
                <h4 className="font-semibold mb-2">Feasibility Analysis</h4>
                <p className="text-sm text-muted-foreground">
                  We calculate feasibility based on rainfall patterns, roof area, soil conditions, and water demand using government data.
                </p>
              </div>
              
              <div className="p-4 border rounded-lg">
                <Droplets className="w-6 h-6 text-sustainable-green mb-2" />
                <h4 className="font-semibold mb-2">Structure Design</h4>
                <p className="text-sm text-muted-foreground">
                  Get personalized recommendations for recharge pits, trenches, or wells optimized for your property.
                </p>
              </div>
              
              <div className="p-4 border rounded-lg">
                <TrendingUp className="w-6 h-6 text-efficiency-blue mb-2" />
                <h4 className="font-semibold mb-2">Cost Analysis</h4>
                <p className="text-sm text-muted-foreground">
                  Detailed cost breakdown and projected savings to understand the financial benefits over time.
                </p>
              </div>
              
              <div className="p-4 border rounded-lg">
                <MapPin className="w-6 h-6 text-conservation-teal mb-2" />
                <h4 className="font-semibold mb-2">Location Insights</h4>
                <p className="text-sm text-muted-foreground">
                  Interactive mapping with local rainfall, groundwater, and geological data for your area.
                </p>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="methodology" className="space-y-6 mt-6">
            <div>
              <h3 className="text-lg font-semibold mb-3">Calculation Methodology</h3>
              <div className="space-y-4">
                <div className="p-4 bg-muted/30 rounded-lg">
                  <h4 className="font-semibold text-sm mb-2">1. Rainfall Assessment</h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    Using IMD (Indian Meteorological Department) data for historical rainfall patterns in your location.
                  </p>
                  <Badge variant="outline" className="text-xs">Weight: 30%</Badge>
                </div>
                
                <div className="p-4 bg-muted/30 rounded-lg">
                  <h4 className="font-semibold text-sm mb-2">2. Catchment Area Analysis</h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    Roof area determines the volume of water that can be collected. Runoff coefficient varies by roof material.
                  </p>
                  <Badge variant="outline" className="text-xs">Weight: 25%</Badge>
                </div>
                
                <div className="p-4 bg-muted/30 rounded-lg">
                  <h4 className="font-semibold text-sm mb-2">3. Soil Permeability</h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    Based on property type and local geological surveys to determine infiltration rates.
                  </p>
                  <Badge variant="outline" className="text-xs">Weight: 25%</Badge>
                </div>
                
                <div className="p-4 bg-muted/30 rounded-lg">
                  <h4 className="font-semibold text-sm mb-2">4. Water Demand Matching</h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    Comparing potential harvest with actual water requirements for optimal sizing.
                  </p>
                  <Badge variant="outline" className="text-xs">Weight: 20%</Badge>
                </div>
              </div>
            </div>
            
            <div className="p-4 bg-sustainable-light rounded-lg">
              <h4 className="font-semibold text-sustainable-green mb-2">Formula</h4>
              <code className="text-sm">
                Annual Harvest = Roof Area × Annual Rainfall × Runoff Coefficient × Collection Efficiency
              </code>
            </div>
          </TabsContent>
          
          <TabsContent value="data" className="space-y-6 mt-6">
            <div>
              <h3 className="text-lg font-semibold mb-3">Verified Data Sources</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-4 p-4 border rounded-lg">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Droplets className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold">Indian Meteorological Department (IMD)</h4>
                    <p className="text-sm text-muted-foreground mb-2">
                      Rainfall data from 3,000+ weather stations across India, updated daily.
                    </p>
                    <Badge className="bg-blue-100 text-blue-800">Real-time Data</Badge>
                  </div>
                </div>
                
                <div className="flex items-start gap-4 p-4 border rounded-lg">
                  <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-teal-600" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold">Central Ground Water Board (CGWB)</h4>
                    <p className="text-sm text-muted-foreground mb-2">
                      Groundwater levels and aquifer mapping from 15,000+ monitoring wells.
                    </p>
                    <Badge className="bg-teal-100 text-teal-800">Monthly Updates</Badge>
                  </div>
                </div>
                
                <div className="flex items-start gap-4 p-4 border rounded-lg">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold">Survey of India (SOI)</h4>
                    <p className="text-sm text-muted-foreground mb-2">
                      Topographical and geological surveys for optimal structure placement.
                    </p>
                    <Badge className="bg-green-100 text-green-800">Verified Maps</Badge>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="support" className="space-y-6 mt-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold mb-3">Need Help?</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 border rounded-lg">
                    <Phone className="w-5 h-5 text-primary" />
                    <div>
                      <div className="font-medium text-sm">Technical Support</div>
                      <div className="text-sm text-muted-foreground">1800-XXX-XXXX</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 p-3 border rounded-lg">
                    <Mail className="w-5 h-5 text-primary" />
                    <div>
                      <div className="font-medium text-sm">Email Support</div>
                      <div className="text-sm text-muted-foreground">support@aquaharvest.pro</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 p-3 border rounded-lg">
                    <BookOpen className="w-5 h-5 text-primary" />
                    <div>
                      <div className="font-medium text-sm">Documentation</div>
                      <div className="text-sm text-muted-foreground">Complete user guide available</div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-3">Quick Tips</h3>
                <div className="space-y-2">
                  <div className="p-3 bg-muted/30 rounded-lg">
                    <h4 className="font-semibold text-sm mb-1">Accurate Measurements</h4>
                    <p className="text-xs text-muted-foreground">
                      Measure your roof area carefully for precise calculations.
                    </p>
                  </div>
                  
                  <div className="p-3 bg-muted/30 rounded-lg">
                    <h4 className="font-semibold text-sm mb-1">Open Space</h4>
                    <p className="text-xs text-muted-foreground">
                      More open space allows for larger recharge structures.
                    </p>
                  </div>
                  
                  <div className="p-3 bg-muted/30 rounded-lg">
                    <h4 className="font-semibold text-sm mb-1">Budget Planning</h4>
                    <p className="text-xs text-muted-foreground">
                      Consider 3-5 year payback period for optimal ROI.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};