import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FileText, Download, Eye, Calendar, BarChart3, TrendingUp, MapPin } from "lucide-react";

export const Reports = () => {
  const reports = [
    {
      title: "CGWB Technical Manual - Rooftop Rainwater Harvesting",
      type: "Technical Guide",
      authority: "Central Ground Water Board",
      year: "2024",
      pages: 156,
      description: "Comprehensive guidelines for RTRWH system design, installation, and maintenance based on latest research.",
      status: "Updated",
      downloadUrl: "#",
      viewUrl: "#"
    },
    {
      title: "Artificial Recharge Structures - Design Guidelines", 
      type: "Design Manual",
      authority: "CGWB",
      year: "2023",
      pages: 89,
      description: "Detailed specifications for recharge pits, trenches, and shafts with site-specific recommendations.",
      status: "Current",
      downloadUrl: "#",
      viewUrl: "#"
    },
    {
      title: "State-wise RWH Potential Assessment Report",
      type: "Research Study",
      authority: "Ministry of Jal Shakti",
      year: "2024",
      pages: 312,
      description: "Comprehensive analysis of rainwater harvesting potential across Indian states with district-level data.",
      status: "New",
      downloadUrl: "#", 
      viewUrl: "#"
    },
    {
      title: "Chennai Metro RWH Success Stories",
      type: "Case Study",
      authority: "Tamil Nadu Water Supply Department",
      year: "2024",
      pages: 45,
      description: "Real-world implementation examples and lessons learned from Chennai's mandatory RWH program.",
      status: "Featured",
      downloadUrl: "#",
      viewUrl: "#"
    }
  ];

  const analytics = [
    { metric: "Total Downloads", value: "12,450", change: "+15%", trend: "up" },
    { metric: "Most Popular", value: "CGWB Manual", change: "3,200 downloads", trend: "up" },
    { metric: "Recent Updates", value: "4 Reports", change: "This month", trend: "up" },
    { metric: "User Rating", value: "4.8/5", change: "+0.2", trend: "up" }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "New": return "bg-green-100 text-green-800";
      case "Updated": return "bg-blue-100 text-blue-800";
      case "Featured": return "bg-purple-100 text-purple-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold mb-2">Reports & Research</h2>
        <p className="text-muted-foreground text-lg">
          Official CGWB publications, technical manuals, and research studies on rainwater harvesting
        </p>
      </div>

      {/* Analytics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {analytics.map((item, index) => (
          <Card key={index}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{item.metric}</p>
                  <p className="text-2xl font-bold">{item.value}</p>
                  <div className="flex items-center gap-1 mt-1">
                    <TrendingUp className="w-3 h-3 text-green-600" />
                    <span className="text-xs text-green-600">{item.change}</span>
                  </div>
                </div>
                <BarChart3 className="w-8 h-8 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Reports Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {reports.map((report, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <FileText className="w-5 h-5 text-primary" />
                    <Badge className={getStatusColor(report.status)}>
                      {report.status}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg leading-tight mb-2">
                    {report.title}
                  </CardTitle>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span>{report.authority}</span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {report.year}
                    </span>
                    <span>{report.pages} pages</span>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                {report.description}
              </p>
              <div className="flex items-center gap-2">
                <Button size="sm" variant="outline">
                  <Eye className="w-4 h-4 mr-2" />
                  Preview
                </Button>
                <Button size="sm" className="bg-primary">
                  <Download className="w-4 h-4 mr-2" />
                  Download PDF
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* CGWB Resources Section */}
      <Card className="bg-gradient-to-r from-blue-50 to-green-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="w-6 h-6 text-blue-600" />
            Official CGWB Resources
          </CardTitle>
          <p className="text-muted-foreground">
            Direct access to Central Ground Water Board's official publications and guidelines
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-white rounded-lg border">
              <h4 className="font-semibold mb-2">Technical Guidelines</h4>
              <p className="text-sm text-muted-foreground mb-3">
                Official design and implementation guidelines for various recharge structures.
              </p>
              <Button size="sm" variant="outline">
                Access Guidelines
              </Button>
            </div>
            <div className="p-4 bg-white rounded-lg border">
              <h4 className="font-semibold mb-2">FAQ Database</h4>
              <p className="text-sm text-muted-foreground mb-3">
                Frequently asked questions and answers on artificial recharge techniques.
              </p>
              <Button size="sm" variant="outline">
                Browse FAQs
              </Button>
            </div>
            <div className="p-4 bg-white rounded-lg border">
              <h4 className="font-semibold mb-2">Best Practices</h4>
              <p className="text-sm text-muted-foreground mb-3">
                Compilation of successful implementation examples across India.
              </p>
              <Button size="sm" variant="outline">
                View Examples
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};