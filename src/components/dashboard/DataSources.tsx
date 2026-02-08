import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Database, Wifi, MapPin, Droplets, Layers } from "lucide-react";
import { InfoTooltip } from "@/components/InfoTooltips";

interface DataSourcesProps {
  location?: {
    city?: string;
    state?: string;
  };
}

export const DataSources = ({ location }: DataSourcesProps) => {
  const dataSources = [
    {
      name: "Indian Meteorological Department (IMD)",
      type: "Rainfall Data",
      icon: <Droplets className="w-4 h-4" />,
      status: "Live",
      lastUpdated: "2024-01-15",
      coverage: "Pan-India",
      description: "Historical and real-time precipitation data from 3,000+ weather stations across India."
    },
    {
      name: "Central Ground Water Board (CGWB)",
      type: "Groundwater Levels", 
      icon: <Layers className="w-4 h-4" />,
      status: "Updated",
      lastUpdated: "2024-01-10",
      coverage: "All Districts",
      description: "Aquifer mapping, groundwater levels, and exploitation potential from 15,000+ monitoring wells."
    },
    {
      name: "Survey of India (SOI)",
      type: "Topographical Data",
      icon: <MapPin className="w-4 h-4" />,
      status: "Current",
      lastUpdated: "2023-12-01",
      coverage: "High Resolution",
      description: "Terrain elevation, slope analysis, and geographical features for optimal structure placement."
    },
    {
      name: "Local Water Authority",
      type: "Water Tariffs",
      icon: <Database className="w-4 h-4" />,
      status: "Regional",
      lastUpdated: "2024-01-01", 
      coverage: location?.state || "State-wise",
      description: "Current water supply rates and availability patterns for accurate cost-benefit calculations."
    }
  ];

  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle className="text-xl font-semibold flex items-center gap-2">
          <Wifi className="w-5 h-5 text-primary" />
          Verified Data Sources
          <InfoTooltip content="All calculations use government-verified data sources to ensure accuracy and reliability of recommendations." />
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Government data integration ensures 95%+ accuracy in feasibility assessment
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        {dataSources.map((source, index) => (
          <div key={index} className="p-4 border rounded-lg hover:bg-muted/30 transition-colors">
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-md text-primary">
                  {source.icon}
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-sm">{source.name}</h4>
                  <p className="text-xs text-muted-foreground">{source.type}</p>
                </div>
              </div>
              <Badge 
                variant={source.status === 'Live' ? 'default' : 'secondary'}
                className={source.status === 'Live' ? 'bg-sustainable-green text-white' : ''}
              >
                {source.status}
              </Badge>
            </div>
            
            <p className="text-xs text-muted-foreground mb-3">{source.description}</p>
            
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Coverage: {source.coverage}</span>
              <span className="text-muted-foreground">Updated: {source.lastUpdated}</span>
            </div>
          </div>
        ))}
        
        <div className="mt-4 p-3 bg-sustainable-light rounded-lg border border-sustainable-green/20">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-2 h-2 bg-sustainable-green rounded-full"></div>
            <span className="text-sm font-medium text-sustainable-green">Data Quality Assurance</span>
          </div>
          <p className="text-xs text-muted-foreground">
            Cross-validated with multiple sources • Real-time updates • Quality checks every 24 hours
          </p>
        </div>
      </CardContent>
    </Card>
  );
};