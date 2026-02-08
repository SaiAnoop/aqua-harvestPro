import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Bot, Lightbulb, TrendingUp, AlertTriangle, CheckCircle, Star } from "lucide-react";

export const AIRecommendations = () => {
  const recommendations = [
    {
      id: 1,
      priority: "High",
      icon: <AlertTriangle className="w-5 h-5" />,
      title: "Immediate Action Required",
      description: "Your soil permeability is 85% optimal. Installing a recharge pit now can boost efficiency by 40%.",
      action: "Install Recharge Pit",
      impact: "₹18,000 annual savings",
      confidence: 92
    },
    {
      id: 2,
      priority: "Medium", 
      icon: <TrendingUp className="w-5 h-5" />,
      title: "Seasonal Optimization",
      description: "Based on rainfall patterns, installing gutters with first-flush diverters will increase harvest by 25%.",
      action: "Add First-Flush System",
      impact: "₹12,000 additional harvest value",
      confidence: 87
    },
    {
      id: 3,
      priority: "Low",
      icon: <Star className="w-5 h-5" />,
      title: "Future Enhancement",
      description: "Consider solar-powered pumps for groundwater extraction. ROI positive within 3.2 years.",
      action: "Plan Solar Integration",
      impact: "₹25,000 long-term savings",
      confidence: 78
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High": return "bg-red-100 text-red-800 border-red-200";
      case "Medium": return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "Low": return "bg-green-100 text-green-800 border-green-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Bot className="w-6 h-6 text-primary" />
          <CardTitle>AI-Powered Recommendations</CardTitle>
          <Badge variant="secondary" className="bg-purple-100 text-purple-800">
            Powered by ML
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground">
          Smart insights based on 50,000+ installations across India
        </p>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recommendations.map((rec) => (
            <div key={rec.id} className="border rounded-lg p-4 space-y-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    {rec.icon}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-semibold">{rec.title}</h4>
                      <Badge className={getPriorityColor(rec.priority)}>
                        {rec.priority} Priority
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{rec.description}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <CheckCircle className="w-3 h-3" />
                    {rec.confidence}% confidence
                  </div>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div>
                    <p className="text-sm font-medium text-primary">{rec.impact}</p>
                    <p className="text-xs text-muted-foreground">Expected Impact</p>
                  </div>
                </div>
                <Button size="sm" className="bg-gradient-to-r from-primary to-primary/80">
                  {rec.action}
                </Button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-green-50 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <Lightbulb className="w-5 h-5 text-amber-600" />
            <h4 className="font-semibold text-gray-900">Pro Tip</h4>
          </div>
          <p className="text-sm text-gray-700">
            Implement recommendations in order of priority for maximum ROI. Our AI learns from your actions to provide better suggestions.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};