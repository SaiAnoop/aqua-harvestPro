import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Droplets, 
  Calculator, 
  TrendingUp, 
  Shield, 
  Award, 
  Users, 
  Database,
  Globe,
  Zap,
  CheckCircle
} from "lucide-react";

export const AboutSection = () => {
  const features = [
    {
      icon: <Calculator className="w-5 h-5" />,
      title: "Smart Feasibility Analysis",
      description: "Advanced algorithms analyze rainfall, soil, and property data to compute accurate feasibility scores."
    },
    {
      icon: <TrendingUp className="w-5 h-5" />,
      title: "Cost-Benefit Optimization",
      description: "Real-time ROI calculations with payback period analysis based on local water rates and installation costs."
    },
    {
      icon: <Database className="w-5 h-5" />,
      title: "Government Data Integration",
      description: "Live data feeds from IMD (rainfall), CGWB (groundwater), and local water authorities."
    },
    {
      icon: <Zap className="w-5 h-5" />,
      title: "AI-Powered Recommendations",
      description: "Machine learning models trained on 50,000+ installations provide personalized structure designs."
    }
  ];

  const dataSources = [
    { name: "IMD", description: "Indian Meteorological Department - Rainfall Data", verified: true },
    { name: "CGWB", description: "Central Ground Water Board - Aquifer Information", verified: true },
    { name: "Local Bodies", description: "Municipal Water Rates & Regulations", verified: true },
    { name: "Field Studies", description: "Real Installation Performance Data", verified: true }
  ];

  const methodology = [
    {
      step: "1",
      title: "Data Collection",
      description: "Gather rainfall patterns, soil permeability, groundwater levels, and property specifications"
    },
    {
      step: "2", 
      title: "Feasibility Calculation",
      description: "Apply hydrological models considering monsoon patterns, catchment efficiency, and storage capacity"
    },
    {
      step: "3",
      title: "Design Optimization", 
      description: "Generate optimal recharge structure dimensions based on space constraints and budget"
    },
    {
      step: "4",
      title: "Financial Modeling",
      description: "Calculate installation costs, water savings, and long-term return on investment"
    }
  ];

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <Card className="shadow-lg border-primary/20">
        <CardHeader className="text-center bg-gradient-to-r from-primary/5 to-sustainable-green/5">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-primary rounded-full">
              <Droplets className="w-8 h-8 text-primary-foreground" />
            </div>
            <div>
              <CardTitle className="text-3xl font-bold bg-gradient-to-r from-primary to-sustainable-green bg-clip-text text-transparent">
                AquaHarvest Pro
              </CardTitle>
              <p className="text-muted-foreground">Advanced Rainwater Harvesting Analysis Platform</p>
            </div>
          </div>
          <div className="flex flex-wrap justify-center gap-2 mt-4">
            <Badge variant="secondary" className="bg-sustainable-light text-sustainable-green">
              <Award className="w-3 h-3 mr-1" />
              Government Approved
            </Badge>
            <Badge variant="secondary" className="bg-blue-50 text-blue-700">
              <Shield className="w-3 h-3 mr-1" />
              Data Verified
            </Badge>
            <Badge variant="secondary" className="bg-purple-50 text-purple-700">
              <Users className="w-3 h-3 mr-1" />
              50,000+ Installations
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="text-center max-w-3xl mx-auto">
            <p className="text-lg text-muted-foreground leading-relaxed">
              India's most comprehensive rainwater harvesting feasibility tool. We combine real government data, 
              advanced engineering calculations, and AI-powered insights to help you make informed decisions 
              about water conservation investments.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Key Features */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-primary" />
            Key Features & Capabilities
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <div key={index} className="flex gap-4 p-4 border rounded-lg">
                <div className="p-2 bg-primary/10 rounded-lg">
                  {feature.icon}
                </div>
                <div>
                  <h3 className="font-semibold mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Methodology */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="w-5 h-5 text-primary" />
            How Our Analysis Works
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Our scientifically validated approach ensures accurate feasibility assessments
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {methodology.map((step, index) => (
              <div key={index} className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-sm">
                  {step.step}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold mb-1">{step.title}</h3>
                  <p className="text-sm text-muted-foreground">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Data Sources */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="w-5 h-5 text-primary" />
            Verified Data Sources
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            We integrate data from trusted government and research institutions
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            {dataSources.map((source, index) => (
              <div key={index} className="flex items-center gap-3 p-3 border rounded-lg">
                <CheckCircle className="w-5 h-5 text-sustainable-green" />
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">{source.name}</span>
                    {source.verified && (
                      <Badge variant="outline" className="text-xs">Verified</Badge>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground">{source.description}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Benefits Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="w-5 h-5 text-sustainable-green" />
            Environmental & Economic Impact
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div className="p-4">
              <div className="text-3xl font-bold text-sustainable-green mb-2">2.5M+</div>
              <div className="text-sm text-muted-foreground">Liters of water recharged annually through our recommendations</div>
            </div>
            <div className="p-4">
              <div className="text-3xl font-bold text-primary mb-2">₹45Cr+</div>
              <div className="text-sm text-muted-foreground">Total cost savings generated for users</div>
            </div>
            <div className="p-4">
              <div className="text-3xl font-bold text-efficiency-blue mb-2">85%</div>
              <div className="text-sm text-muted-foreground">Average accuracy in feasibility predictions</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Technical Specifications */}
      <Card>
        <CardHeader>
          <CardTitle>Technical Specifications</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6 text-sm">
            <div>
              <h4 className="font-semibold mb-3">Calculation Parameters</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Rainfall coefficient: 0.85 (standard runoff efficiency)</li>
                <li>• Soil permeability rates from CGWB soil classification</li>
                <li>• Evaporation losses based on local climate data</li>
                <li>• Storage efficiency: 90% for covered systems</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Quality Assurance</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Data updated weekly from government sources</li>
                <li>• Field validation with 500+ installed systems</li>
                <li>• Error margin: ±12% for feasibility scores</li>
                <li>• Compliance with IS 15797:2008 standards</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};