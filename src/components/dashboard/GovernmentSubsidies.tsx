import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Building, IndianRupee, FileText, ExternalLink, CheckCircle, Clock, AlertCircle } from "lucide-react";

export const GovernmentSubsidies = () => {
  const subsidies = [
    {
      scheme: "PM-KUSUM Scheme",
      authority: "Ministry of New & Renewable Energy",
      subsidy: "30-60%",
      maxAmount: "₹1,50,000",
      status: "Available",
      description: "Subsidies for solar water pumping systems integrated with rainwater harvesting",
      eligibility: "Farmers and water user associations",
      deadline: "March 2025",
      applyLink: "#",
      statusColor: "bg-green-100 text-green-800"
    },
    {
      scheme: "MGNREGA Water Conservation",
      authority: "Ministry of Rural Development", 
      subsidy: "100%",
      maxAmount: "₹75,000",
      status: "Active",
      description: "Complete funding for community rainwater harvesting structures",
      eligibility: "Rural households below poverty line",
      deadline: "Ongoing",
      applyLink: "#",
      statusColor: "bg-blue-100 text-blue-800"
    },
    {
      scheme: "State RWH Incentive (Tamil Nadu)",
      authority: "Tamil Nadu Water Supply Department",
      subsidy: "50%",
      maxAmount: "₹25,000", 
      status: "Available",
      description: "State subsidy for residential rooftop rainwater harvesting systems",
      eligibility: "Urban residential buildings",
      deadline: "December 2024",
      applyLink: "#",
      statusColor: "bg-green-100 text-green-800"
    },
    {
      scheme: "Atal Mission for Rejuvenation",
      authority: "Ministry of Housing & Urban Affairs",
      subsidy: "35%",
      maxAmount: "₹2,00,000",
      status: "Processing",
      description: "Support for urban water harvesting and groundwater recharge projects",
      eligibility: "Urban local bodies and institutions",
      deadline: "February 2025", 
      applyLink: "#",
      statusColor: "bg-yellow-100 text-yellow-800"
    }
  ];

  const eligibilityCheck = {
    location: "Chennai, Tamil Nadu",
    roofArea: "150 sq.m",
    buildingType: "Residential",
    qualified: 3,
    total: 4
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Building className="w-6 h-6 text-primary" />
          <CardTitle>Government Subsidies & Schemes</CardTitle>
          <Badge variant="secondary" className="bg-green-100 text-green-800">
            ₹4.5L+ Available
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground">
          Maximize your savings with government incentives and subsidies
        </p>
      </CardHeader>
      <CardContent>
        {/* Eligibility Summary */}
        <div className="mb-4 p-3 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border border-green-200">
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-semibold text-green-800">Your Eligibility Status</h4>
            <Badge className="bg-green-600 text-white">
              {eligibilityCheck.qualified}/{eligibilityCheck.total} Schemes Qualified
            </Badge>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
            <div>
              <span className="text-muted-foreground">Location:</span>
              <p className="font-medium">{eligibilityCheck.location}</p>
            </div>
            <div>
              <span className="text-muted-foreground">Roof Area:</span>
              <p className="font-medium">{eligibilityCheck.roofArea}</p>
            </div>
            <div>
              <span className="text-muted-foreground">Building Type:</span>
              <p className="font-medium">{eligibilityCheck.buildingType}</p>
            </div>
            <div>
              <span className="text-muted-foreground">Total Benefits:</span>
              <p className="font-medium text-green-700">₹4,50,000</p>
            </div>
          </div>
        </div>

        {/* Subsidies List */}
        <div className="space-y-4">
          {subsidies.map((subsidy, index) => (
            <div key={index} className="border rounded-lg p-3 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-semibold">{subsidy.scheme}</h4>
                    <Badge className={subsidy.statusColor}>
                      {subsidy.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{subsidy.authority}</p>
                  <p className="text-sm">{subsidy.description}</p>
                </div>
                <div className="text-right min-w-[120px]">
                  <div className="flex items-center gap-1 text-primary font-bold">
                    <IndianRupee className="w-4 h-4" />
                    {subsidy.maxAmount}
                  </div>
                  <p className="text-sm text-muted-foreground">{subsidy.subsidy} subsidy</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 pt-4 border-t">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span className="text-sm font-medium">Eligibility</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{subsidy.eligibility}</p>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Clock className="w-4 h-4 text-orange-600" />
                    <span className="text-sm font-medium">Deadline</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{subsidy.deadline}</p>
                </div>
              </div>
              
              <div className="flex items-center justify-between mt-4">
                <Button variant="outline" size="sm">
                  <FileText className="w-4 h-4 mr-2" />
                  View Details
                </Button>
                <Button size="sm" className="bg-gradient-to-r from-primary to-primary/80">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Apply Now
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Action Steps */}
        <div className="mt-4 p-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
          <div className="flex items-center gap-2 mb-3">
            <AlertCircle className="w-5 h-5 text-blue-600" />
            <h4 className="font-semibold text-blue-800">Next Steps</h4>
          </div>
          <ul className="text-sm text-blue-700 space-y-2">
            <li>• Download and complete application forms for qualified schemes</li>
            <li>• Prepare required documents: property papers, Aadhaar, bank details</li>
            <li>• Get technical approval from local water department</li>
            <li>• Install system through empaneled contractors for subsidy eligibility</li>
            <li>• Submit completion certificate for subsidy disbursement</li>
          </ul>
          <Button className="mt-4 bg-gradient-to-r from-blue-600 to-purple-600">
            Download Application Kit
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};