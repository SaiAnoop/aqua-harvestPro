import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Wrench, 
  Ruler, 
  Download,
  CheckCircle 
} from "lucide-react";
import rechargePitDiagram from "@/assets/recharge-pit-diagram.png";
import { FeasibilityResult } from "@/utils/feasibilityCalculator";

interface RechargeRecommendationProps {
  data?: FeasibilityResult;
}

export const RechargeRecommendation = ({ data }: RechargeRecommendationProps) => {
  const specifications = [
    { label: "Length", value: `${data?.recommendations?.dimensions?.length || 3.0} m` },
    { label: "Width", value: `${data?.recommendations?.dimensions?.width || 3.0} m` },
    { label: "Depth", value: `${data?.recommendations?.dimensions?.depth || 2.5} m` },
    { label: "Total Volume", value: `${data?.recommendations?.dimensions?.volume || 22.5} m³` }
  ];

  const layers = [
    { name: "Top Soil/Clay", thickness: "0.5m", color: "bg-amber-600" },
    { name: "Coarse Sand", thickness: "1.0m", color: "bg-yellow-400" },
    { name: "Gravel", thickness: "1.0m", color: "bg-gray-500" }
  ];

  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle className="text-xl font-semibold flex items-center gap-2">
          <Wrench className="w-5 h-5 text-primary" />
          Recommended Recharge Solution
        </CardTitle>
        <Badge variant="secondary" className="w-fit">
          {data?.recommendations?.structureType || "Recharge Pit"} - Type A
        </Badge>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Diagram */}
        <div className="bg-muted/30 rounded-lg p-4">
          <img 
            src={rechargePitDiagram} 
            alt="Recharge Pit Cross-section"
            className="w-full h-48 object-contain rounded-lg"
          />
        </div>

        {/* Layer Information */}
        <div>
          <h4 className="text-sm font-semibold mb-3 flex items-center gap-2">
            <Ruler className="w-4 h-4" />
            Filter Layer Configuration
          </h4>
          <div className="space-y-2">
            {layers.map((layer, index) => (
              <div key={index} className="flex items-center gap-3 text-sm">
                <div className={`w-4 h-4 rounded ${layer.color}`}></div>
                <div className="flex-1">
                  <span className="font-medium">{layer.name}</span>
                  <span className="text-muted-foreground ml-2">({layer.thickness})</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Specifications */}
        <div>
          <h4 className="text-sm font-semibold mb-3">Calculated Dimensions</h4>
          <div className="grid grid-cols-2 gap-3">
            {specifications.map((spec, index) => (
              <div key={index} className="bg-muted/30 rounded-lg p-3 text-center">
                <div className="text-lg font-bold text-foreground">
                  {spec.value}
                </div>
                <div className="text-xs text-muted-foreground">
                  {spec.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Features */}
        <div className="space-y-2">
          <h4 className="text-sm font-semibold">Key Features</h4>
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <CheckCircle className="w-3 h-3 text-sustainable-green" />
              <span>Perforated PVC collection pipes</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <CheckCircle className="w-3 h-3 text-sustainable-green" />
              <span>Graded filter media for sediment removal</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <CheckCircle className="w-3 h-3 text-sustainable-green" />
              <span>Overflow outlet for excess water</span>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <Button className="w-full" variant="outline">
          <Download className="w-4 h-4 mr-2" />
          Download Technical Drawings
        </Button>
      </CardContent>
    </Card>
  );
};