import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, CheckCircle } from "lucide-react";
import { FeasibilityResult } from "@/utils/feasibilityCalculator";

interface FeasibilityScoreProps {
  data?: FeasibilityResult;
}

export const FeasibilityScore = ({ data }: FeasibilityScoreProps) => {
  // Use data if provided, otherwise fallback to demo data
  const score = data?.score || 73;
  const grade = data?.grade || "Highly Feasible";
  const factors = data?.factors || {
    rainfall: { score: 85, status: "Excellent", description: "1,250mm annual average" },
    roofArea: { score: 78, status: "Good", description: "180 sq.m catchment" },
    soilConditions: { score: 75, status: "Suitable", description: "Permeable for recharge" },
    waterDemand: { score: 65, status: "Moderate", description: "45,000L annual requirement" }
  };
  
  const strokeDasharray = 2 * Math.PI * 45;
  const strokeDashoffset = strokeDasharray - (strokeDasharray * score) / 100;

  return (
    <Card className="shadow-md">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-semibold flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-sustainable-green" />
            Feasibility Score
          </CardTitle>
          <Badge 
            variant="secondary" 
            className={`${
              grade === 'Excellent' ? 'bg-sustainable-light text-sustainable-green border-sustainable-green/20' :
              grade === 'Good' ? 'bg-blue-50 text-blue-700 border-blue-200' :
              grade === 'Fair' ? 'bg-yellow-50 text-yellow-700 border-yellow-200' :
              'bg-red-50 text-red-700 border-red-200'
            }`}
          >
            {grade}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          {/* Semi-circle Gauge */}
          <div className="relative">
            <svg width="200" height="120" viewBox="0 0 200 120" className="overflow-visible">
              {/* Background arc */}
              <path
                d="M 20 100 A 80 80 0 0 1 180 100"
                fill="none"
                stroke="hsl(var(--muted))"
                strokeWidth="12"
                strokeLinecap="round"
              />
              {/* Progress arc */}
              <path
                d="M 20 100 A 80 80 0 0 1 180 100"
                fill="none"
                stroke="hsl(var(--sustainable-green))"
                strokeWidth="12"
                strokeLinecap="round"
                strokeDasharray={strokeDasharray}
                strokeDashoffset={strokeDashoffset}
                style={{
                  transformOrigin: "100px 100px",
                  transform: "rotate(-90deg)"
                }}
              />
              {/* Center text */}
              <text
                x="100"
                y="85"
                textAnchor="middle"
                className="text-3xl font-bold fill-foreground"
              >
                {score}%
              </text>
              <text
                x="100"
                y="105"
                textAnchor="middle"
                className="text-sm fill-muted-foreground"
              >
                Feasibility
              </text>
            </svg>
          </div>

          {/* Key Factors */}
          <div className="flex-1 ml-8 space-y-4">
            <h3 className="font-semibold text-lg mb-4">Key Success Factors</h3>
            
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <CheckCircle className={`w-4 h-4 ${factors.rainfall.score >= 75 ? 'text-sustainable-green' : 'text-yellow-600'}`} />
                <div className="flex-1">
                  <p className="text-sm font-medium">Adequate Rainfall</p>
                  <p className="text-xs text-muted-foreground">{factors.rainfall.description}</p>
                </div>
                <Badge variant="outline" className="text-xs">{factors.rainfall.status}</Badge>
              </div>
              
              <div className="flex items-center gap-3">
                <CheckCircle className={`w-4 h-4 ${factors.roofArea.score >= 75 ? 'text-sustainable-green' : 'text-yellow-600'}`} />
                <div className="flex-1">
                  <p className="text-sm font-medium">Roof Area</p>
                  <p className="text-xs text-muted-foreground">{factors.roofArea.description}</p>
                </div>
                <Badge variant="outline" className="text-xs">{factors.roofArea.status}</Badge>
              </div>
              
              <div className="flex items-center gap-3">
                <CheckCircle className={`w-4 h-4 ${factors.soilConditions.score >= 75 ? 'text-sustainable-green' : 'text-yellow-600'}`} />
                <div className="flex-1">
                  <p className="text-sm font-medium">Soil Conditions</p>
                  <p className="text-xs text-muted-foreground">{factors.soilConditions.description}</p>
                </div>
                <Badge variant="outline" className="text-xs">{factors.soilConditions.status}</Badge>
              </div>
              
              <div className="flex items-center gap-3">
                <CheckCircle className={`w-4 h-4 ${factors.waterDemand.score >= 75 ? 'text-sustainable-green' : 'text-efficiency-blue'}`} />
                <div className="flex-1">
                  <p className="text-sm font-medium">Water Demand</p>
                  <p className="text-xs text-muted-foreground">{factors.waterDemand.description}</p>
                </div>
                <Badge variant="outline" className="text-xs">{factors.waterDemand.status}</Badge>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};