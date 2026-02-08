import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Cloud, 
  Gauge, 
  Layers, 
  Droplets,
  MapPin 
} from "lucide-react";

export const WaterProfile = () => {
  const profileData = [
    {
      icon: Cloud,
      label: "Avg. Annual Rainfall",
      value: "1,250 mm",
      description: "Above regional average",
      status: "excellent"
    },
    {
      icon: Gauge,
      label: "Depth to Water Level",
      value: "12.5 m",
      description: "Moderate depth",
      status: "good"
    },
    {
      icon: Layers,
      label: "Principal Aquifer",
      value: "Alluvial",
      description: "Quaternary formations",
      status: "suitable"
    },
    {
      icon: Droplets,
      label: "Runoff Capacity",
      value: "165 kL",
      description: "Annual potential",
      status: "high"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "excellent":
        return "bg-green-100 text-green-800 border-green-200";
      case "good":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "suitable":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "high":
        return "bg-purple-100 text-purple-800 border-purple-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle className="text-xl font-semibold flex items-center gap-2">
          <MapPin className="w-5 h-5 text-primary" />
          Your Local Water Profile
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Hydrological characteristics for your area
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        {profileData.map((item, index) => {
          const IconComponent = item.icon;
          return (
            <div key={index} className="p-4 rounded-lg border bg-muted/30">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <IconComponent className="w-4 h-4 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="text-sm font-medium text-foreground">
                      {item.label}
                    </h4>
                    <Badge 
                      variant="outline" 
                      className={`text-xs ${getStatusColor(item.status)}`}
                    >
                      {item.status}
                    </Badge>
                  </div>
                  <div className="text-lg font-bold text-foreground mb-1">
                    {item.value}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
          );
        })}

        {/* Location Summary */}
        <div className="mt-6 pt-4 border-t">
          <div className="flex items-start gap-3">
            <MapPin className="w-4 h-4 text-muted-foreground mt-1" />
            <div>
              <h4 className="text-sm font-medium mb-1">Location Analysis</h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Your location shows excellent potential for rainwater harvesting with 
                favorable geological conditions and adequate rainfall patterns. The alluvial 
                aquifer provides good recharge characteristics.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};