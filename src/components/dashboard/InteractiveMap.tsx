import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Layers, Droplets, TrendingUp, Eye } from "lucide-react";
import { InfoTooltip } from "@/components/InfoTooltips";

interface InteractiveMapProps {
  location?: {
    city?: string;
    state?: string;
    pincode?: string;
  };
}

export const InteractiveMap = ({ location }: InteractiveMapProps) => {
  const mapLayers = [
    { name: "Rainfall Zones", active: true, color: "bg-blue-500" },
    { name: "Groundwater Depth", active: true, color: "bg-teal-500" },
    { name: "Soil Permeability", active: false, color: "bg-green-500" },
    { name: "Aquifer Boundaries", active: false, color: "bg-purple-500" }
  ];

  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle className="text-xl font-semibold flex items-center gap-2">
          <MapPin className="w-5 h-5 text-primary" />
          Location Analysis
          <InfoTooltip content="Interactive map showing rainfall patterns, groundwater levels, and optimal structure placement for your location." />
        </CardTitle>
        {location && (
          <div className="flex items-center gap-2">
            <Badge variant="secondary">{location.city}, {location.state}</Badge>
            <Badge variant="outline">{location.pincode}</Badge>
          </div>
        )}
      </CardHeader>
      <CardContent>
        {/* Map Placeholder with Location Marker */}
        <div className="relative bg-gradient-to-br from-blue-50 to-green-50 rounded-lg h-64 mb-4 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-100/50 to-green-100/50"></div>
          
          {/* Location Marker */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="relative">
              <div className="w-6 h-6 bg-destructive rounded-full border-2 border-white shadow-lg animate-pulse"></div>
              <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
                <div className="bg-card px-2 py-1 rounded shadow-md border text-xs font-medium whitespace-nowrap">
                  {location?.city || "Your Location"}
                </div>
              </div>
            </div>
          </div>

          {/* Rainfall Zones Overlay */}
          <div className="absolute top-4 right-4 w-20 h-16 bg-blue-200/60 rounded-lg border-2 border-blue-300">
            <div className="p-1 text-xs text-center text-blue-800 font-medium">High Rainfall Zone</div>
          </div>

          {/* Groundwater Depth Indicator */}
          <div className="absolute bottom-4 left-4 w-24 h-12 bg-teal-200/60 rounded-lg border-2 border-teal-300">
            <div className="p-1 text-xs text-center text-teal-800 font-medium">15m Depth</div>
          </div>

          {/* Scale */}
          <div className="absolute bottom-4 right-4 bg-white/80 px-2 py-1 rounded text-xs">
            <div className="flex items-center gap-2">
              <div className="w-8 h-0.5 bg-gray-800"></div>
              <span>500m</span>
            </div>
          </div>
        </div>

        {/* Map Controls */}
        <div className="space-y-4">
          <div>
            <h4 className="text-sm font-semibold mb-2 flex items-center gap-2">
              <Layers className="w-4 h-4" />
              Map Layers
            </h4>
            <div className="grid grid-cols-2 gap-2">
              {mapLayers.map((layer, index) => (
                <div key={index} className={`p-2 rounded border text-xs transition-all ${
                  layer.active ? 'bg-primary/10 border-primary/30' : 'bg-muted border-border'
                }`}>
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${layer.color} ${layer.active ? 'opacity-100' : 'opacity-40'}`}></div>
                    <span className={layer.active ? 'font-medium' : 'text-muted-foreground'}>{layer.name}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Location Insights */}
          <div className="grid grid-cols-2 gap-4">
            <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex items-center gap-2 mb-1">
                <Droplets className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-medium text-blue-800">Annual Rainfall</span>
              </div>
              <div className="text-lg font-bold text-blue-900">1,250mm</div>
              <div className="text-xs text-blue-700">18% above average</div>
            </div>
            
            <div className="p-3 bg-teal-50 rounded-lg border border-teal-200">
              <div className="flex items-center gap-2 mb-1">
                <TrendingUp className="w-4 h-4 text-teal-600" />
                <span className="text-sm font-medium text-teal-800">Water Table</span>
              </div>
              <div className="text-lg font-bold text-teal-900">15.2m</div>
              <div className="text-xs text-teal-700">Stable depth</div>
            </div>
          </div>

          <Button className="w-full" variant="outline" size="sm">
            <Eye className="w-4 h-4 mr-2" />
            View Detailed Geological Survey
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};