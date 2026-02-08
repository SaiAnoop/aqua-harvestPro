import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Plus, MapPin, Calendar, Users, Droplets, CheckCircle, Clock, AlertTriangle } from "lucide-react";

export const Projects = () => {
  const myProjects = [
    {
      id: 1,
      name: "Residential RWH - Chennai Home",
      location: "T. Nagar, Chennai",
      type: "Residential",
      status: "Active",
      progress: 75,
      startDate: "2024-01-15",
      targetCompletion: "2024-03-30",
      budgetAllocated: 45000,
      budgetSpent: 33750,
      waterSaved: 12500,
      targetWaterSaving: 18000,
      description: "150 sq.m rooftop rainwater harvesting with recharge pit",
      nextAction: "Install filter unit",
      team: ["You", "Local Contractor", "CGWB Expert"]
    },
    {
      id: 2, 
      name: "Community Center RWH",
      location: "Adyar, Chennai",
      type: "Community",
      status: "Planning",
      progress: 25,
      startDate: "2024-02-01",
      targetCompletion: "2024-05-15",
      budgetAllocated: 125000,
      budgetSpent: 15000,
      waterSaved: 0,
      targetWaterSaving: 50000,
      description: "Large-scale community rainwater harvesting system",
      nextAction: "Get municipal approvals",
      team: ["You", "Community Leader", "Engineer", "CGWB Advisor"]
    }
  ];

  const nearbyProjects = [
    {
      name: "Anna Nagar Apartment Complex",
      location: "Anna Nagar, Chennai",
      distance: "2.3 km",
      capacity: "25,000L/month",
      status: "Completed",
      rating: 4.8,
      contact: "rajesh.kumar@email.com"
    },
    {
      name: "Guindy School RWH Project", 
      location: "Guindy, Chennai",
      distance: "3.1 km", 
      capacity: "40,000L/month",
      status: "In Progress",
      rating: 4.6,
      contact: "principal@guindyschool.edu"
    },
    {
      name: "Velachery Housing Society",
      location: "Velachery, Chennai", 
      distance: "4.7 km",
      capacity: "60,000L/month",
      status: "Completed",
      rating: 4.9,
      contact: "society@velachery.org"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active": return "bg-green-100 text-green-800";
      case "Planning": return "bg-yellow-100 text-yellow-800";
      case "Completed": return "bg-blue-100 text-blue-800";
      case "In Progress": return "bg-orange-100 text-orange-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Active": return <CheckCircle className="w-4 h-4" />;
      case "Planning": return <Clock className="w-4 h-4" />;
      case "Completed": return <CheckCircle className="w-4 h-4" />;
      case "In Progress": return <AlertTriangle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold mb-2">My Projects</h2>
          <p className="text-muted-foreground text-lg">
            Track and manage your rainwater harvesting projects
          </p>
        </div>
        <Button className="bg-gradient-to-r from-primary to-primary/80">
          <Plus className="w-4 h-4 mr-2" />
          New Project
        </Button>
      </div>

      {/* My Projects */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {myProjects.map((project) => (
          <Card key={project.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg mb-1">{project.name}</CardTitle>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {project.location}
                    </span>
                    <Badge variant="outline">{project.type}</Badge>
                  </div>
                </div>
                <Badge className={getStatusColor(project.status)}>
                  {getStatusIcon(project.status)}
                  {project.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">{project.description}</p>
              
              {/* Progress */}
              <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">Project Progress</span>
                  <span className="text-sm text-muted-foreground">{project.progress}%</span>
                </div>
                <Progress value={project.progress} className="h-2" />
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="p-3 bg-blue-50 rounded-lg">
                  <div className="flex items-center gap-2 mb-1">
                    <Droplets className="w-4 h-4 text-blue-600" />
                    <span className="text-xs text-blue-600">Water Saved</span>
                  </div>
                  <p className="text-lg font-bold text-blue-800">
                    {project.waterSaved.toLocaleString()}L
                  </p>
                  <p className="text-xs text-blue-600">
                    of {project.targetWaterSaving.toLocaleString()}L target
                  </p>
                </div>
                <div className="p-3 bg-green-50 rounded-lg">
                  <div className="flex items-center gap-2 mb-1">
                    <Calendar className="w-4 h-4 text-green-600" />
                    <span className="text-xs text-green-600">Budget</span>
                  </div>
                  <p className="text-lg font-bold text-green-800">
                    ₹{project.budgetSpent.toLocaleString()}
                  </p>
                  <p className="text-xs text-green-600">
                    of ₹{project.budgetAllocated.toLocaleString()}
                  </p>
                </div>
              </div>

              {/* Team */}
              <div className="mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <Users className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm font-medium">Team</span>
                </div>
                <div className="flex flex-wrap gap-1">
                  {project.team.map((member, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {member}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Next Action */}
              <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg mb-4">
                <p className="text-sm font-medium text-yellow-800 mb-1">Next Action</p>
                <p className="text-sm text-yellow-700">{project.nextAction}</p>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <Button size="sm" variant="outline">
                  View Details
                </Button>
                <Button size="sm" className="bg-primary">
                  Update Progress
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Nearby Projects */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-primary" />
            Nearby Projects
          </CardTitle>
          <p className="text-muted-foreground">
            Connect with other rainwater harvesting projects in your area
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {nearbyProjects.map((project, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                <div className="flex-1">
                  <h4 className="font-semibold mb-1">{project.name}</h4>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {project.location}
                    </span>
                    <span>{project.distance} away</span>
                    <Badge className={getStatusColor(project.status)} variant="outline">
                      {project.status}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-4 mt-2">
                    <span className="text-sm font-medium text-blue-600">
                      {project.capacity} capacity
                    </span>
                    <span className="text-sm text-yellow-600">
                      ⭐ {project.rating}/5
                    </span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline">
                    Contact
                  </Button>
                  <Button size="sm">
                    Visit
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};