import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Search, 
  BookOpen, 
  Video, 
  FileText, 
  Users, 
  Calculator,
  MapPin,
  Phone,
  ExternalLink,
  Star,
  Download
} from "lucide-react";

export const Resources = () => {
  const resourceCategories = [
    {
      title: "CGWB Official Manuals",
      icon: <BookOpen className="w-5 h-5" />,
      count: 12,
      description: "Technical guidelines and design manuals",
      color: "bg-blue-100 text-blue-800"
    },
    {
      title: "Video Tutorials",
      icon: <Video className="w-5 h-5" />,
      count: 24,
      description: "Step-by-step installation guides",
      color: "bg-green-100 text-green-800"
    },
    {
      title: "Case Studies",
      icon: <FileText className="w-5 h-5" />,
      count: 18,
      description: "Real-world implementation examples",
      color: "bg-purple-100 text-purple-800"
    },
    {
      title: "Expert Network",
      icon: <Users className="w-5 h-5" />,
      count: 156,
      description: "Certified professionals in your area",
      color: "bg-orange-100 text-orange-800"
    }
  ];

  const quickTools = [
    {
      name: "RWH Calculator",
      description: "Calculate harvest potential and system requirements",
      icon: <Calculator className="w-6 h-6" />,
      popular: true
    },
    {
      name: "Soil Percolation Test",
      description: "Determine soil suitability for recharge structures",
      icon: <MapPin className="w-6 h-6" />,
      popular: false
    },
    {
      name: "Cost Estimator",
      description: "Get accurate cost estimates for your project", 
      icon: <Calculator className="w-6 h-6" />,
      popular: true
    },
    {
      name: "Subsidy Finder",
      description: "Find applicable government schemes and subsidies",
      icon: <FileText className="w-6 h-6" />,
      popular: true
    }
  ];

  const expertDirectory = [
    {
      name: "Dr. Rajesh Kumar",
      specialization: "Hydrogeologist",
      experience: "15+ years",
      location: "Chennai, Tamil Nadu",
      rating: 4.9,
      projects: 120,
      contact: "+91-98765-43210",
      expertise: ["Recharge Pit Design", "Soil Analysis", "Water Quality Testing"],
      verified: true
    },
    {
      name: "Priya Sharma",
      specialization: "RWH System Designer",
      experience: "10+ years", 
      location: "Bangalore, Karnataka",
      rating: 4.8,
      projects: 95,
      contact: "+91-98765-43211",
      expertise: ["Rooftop Systems", "Filter Design", "Maintenance"],
      verified: true
    },
    {
      name: "Mohammed Ali",
      specialization: "Civil Contractor", 
      experience: "12+ years",
      location: "Hyderabad, Telangana",
      rating: 4.7,
      projects: 80,
      contact: "+91-98765-43212",
      expertise: ["Construction", "Installation", "Quality Control"],
      verified: true
    }
  ];

  const learningResources = [
    {
      title: "RWH Fundamentals Course",
      type: "Online Course",
      duration: "6 hours",
      level: "Beginner",
      rating: 4.8,
      enrolled: 2340,
      free: true
    },
    {
      title: "Advanced Recharge Techniques",
      type: "Workshop",
      duration: "2 days",
      level: "Advanced",
      rating: 4.9,
      enrolled: 156,
      free: false
    },
    {
      title: "Maintenance & Troubleshooting",
      type: "Video Series",
      duration: "3 hours",
      level: "Intermediate", 
      rating: 4.7,
      enrolled: 890,
      free: true
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header with Search */}
      <div>
        <h2 className="text-3xl font-bold mb-2">Resources & Learning</h2>
        <p className="text-muted-foreground text-lg mb-4">
          Comprehensive collection of CGWB resources, expert guidance, and learning materials
        </p>
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input 
            placeholder="Search resources, experts, or topics..." 
            className="pl-10"
          />
        </div>
      </div>

      {/* Resource Categories */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {resourceCategories.map((category, index) => (
          <Card key={index} className="hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-6 text-center">
              <div className={`w-12 h-12 mx-auto mb-3 rounded-lg flex items-center justify-center ${category.color}`}>
                {category.icon}
              </div>
              <h3 className="font-semibold mb-2">{category.title}</h3>
              <p className="text-sm text-muted-foreground mb-3">{category.description}</p>
              <Badge variant="outline">{category.count} items</Badge>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Tools */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="w-5 h-5 text-primary" />
            Quick Tools & Calculators
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {quickTools.map((tool, index) => (
              <div key={index} className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    {tool.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-semibold">{tool.name}</h4>
                      {tool.popular && (
                        <Badge className="bg-orange-100 text-orange-800">Popular</Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">{tool.description}</p>
                    <Button size="sm">
                      <ExternalLink className="w-3 h-3 mr-2" />
                      Launch Tool
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Expert Directory */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5 text-primary" />
            Expert Directory
          </CardTitle>
          <p className="text-muted-foreground">
            Connect with certified RWH professionals and CGWB experts
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {expertDirectory.map((expert, index) => (
              <div key={index} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-semibold">{expert.name}</h4>
                      {expert.verified && (
                        <Badge className="bg-green-100 text-green-800">
                          ✓ Verified
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mb-1">{expert.specialization}</p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>{expert.experience}</span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {expert.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                        {expert.rating}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-primary">{expert.projects}</p>
                    <p className="text-xs text-muted-foreground">Projects</p>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-2 mb-3">
                  {expert.expertise.map((skill, skillIndex) => (
                    <Badge key={skillIndex} variant="outline" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Phone className="w-3 h-3" />
                    {expert.contact}
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      View Profile
                    </Button>
                    <Button size="sm">
                      Contact Expert
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Learning Resources */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-primary" />
            Learning & Training
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {learningResources.map((resource, index) => (
              <div key={index} className="p-4 border rounded-lg">
                <div className="mb-3">
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="outline">{resource.type}</Badge>
                    {resource.free && (
                      <Badge className="bg-green-100 text-green-800">Free</Badge>
                    )}
                  </div>
                  <h4 className="font-semibold mb-1">{resource.title}</h4>
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <span>{resource.duration}</span>
                    <span>{resource.level}</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-1">
                    <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm">{resource.rating}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {resource.enrolled.toLocaleString()} enrolled
                  </span>
                </div>
                
                <Button size="sm" className="w-full">
                  <Download className="w-3 h-3 mr-2" />
                  {resource.free ? 'Start Free' : 'Enroll Now'}
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};