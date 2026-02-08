import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { MapPin, Home, Droplets, Calculator, CheckCircle, AlertCircle, HelpCircle } from "lucide-react";
import { z } from "zod";
import { InfoTooltip, RunoffCoefficientTooltip } from "@/components/InfoTooltips";

// Input validation schema
const inputSchema = z.object({
  location: z.object({
    city: z.string().min(1, "City is required"),
    state: z.string().min(1, "State is required"),
    pincode: z.string().regex(/^\d{6}$/, "Valid 6-digit pincode required"),
  }),
  property: z.object({
    roofArea: z.number().min(10, "Minimum 10 sq.m roof area required").max(10000, "Maximum 10,000 sq.m allowed"),
    propertyType: z.string().min(1, "Property type is required"),
    openSpace: z.number().min(0, "Open space cannot be negative").max(5000, "Maximum 5,000 sq.m allowed"),
    floors: z.number().min(1, "Minimum 1 floor").max(10, "Maximum 10 floors"),
  }),
  requirements: z.object({
    waterDemand: z.number().min(100, "Minimum 100L daily demand").max(50000, "Maximum 50,000L daily demand"),
    currentSource: z.string().min(1, "Current water source is required"),
    budget: z.number().min(5000, "Minimum ₹5,000 budget required").max(1000000, "Maximum ₹10,00,000 budget"),
  }),
});

export type WizardData = z.infer<typeof inputSchema>;

interface WizardStepsProps {
  onComplete: (data: WizardData) => void;
  onDemoLoad: () => void;
}

export const WizardSteps = ({ onComplete, onDemoLoad }: WizardStepsProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<WizardData>({
    location: { city: "", state: "", pincode: "" },
    property: { roofArea: 0, propertyType: "", openSpace: 0, floors: 1 },
    requirements: { waterDemand: 0, currentSource: "", budget: 0 },
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  const totalSteps = 3;
  const progress = (currentStep / totalSteps) * 100;

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {};
    
    try {
      if (step === 1) {
        inputSchema.shape.location.parse(formData.location);
      } else if (step === 2) {
        inputSchema.shape.property.parse(formData.property);
      } else if (step === 3) {
        inputSchema.shape.requirements.parse(formData.requirements);
      }
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        error.errors.forEach((err) => {
          newErrors[err.path.join('.')] = err.message;
        });
      }
      setErrors(newErrors);
      return false;
    }
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      if (currentStep < totalSteps) {
        setCurrentStep(currentStep + 1);
      } else {
        handleSubmit();
      }
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    
    // Simulate API validation and data fetching
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    try {
      const validatedData = inputSchema.parse(formData);
      onComplete(validatedData);
    } catch (error) {
      console.error("Validation failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateFormData = (section: keyof WizardData, field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const StepHeader = ({ step, title, icon }: { step: number; title: string; icon: React.ReactNode }) => (
    <div className="flex items-center gap-4 mb-6">
      <div className={`p-3 rounded-full ${currentStep >= step ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>
        {currentStep > step ? <CheckCircle className="w-5 h-5" /> : icon}
      </div>
      <div>
        <h2 className="text-xl font-semibold">{title}</h2>
        <p className="text-sm text-muted-foreground">Step {step} of {totalSteps}</p>
      </div>
    </div>
  );

  return (
    <div className="max-w-2xl mx-auto">
      {/* Demo Mode Banner */}
      <Card className="mb-6 border-sustainable-green/30 bg-sustainable-light">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Badge variant="secondary" className="bg-sustainable-green text-white">
                Quick Demo
              </Badge>
              <span className="text-sm font-medium">Try with Chennai sample data</span>
            </div>
            <Button variant="outline" size="sm" onClick={onDemoLoad}>
              Load Demo Data
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between text-sm text-muted-foreground mb-2">
          <span>Step {currentStep} of {totalSteps}</span>
          <span>{Math.round(progress)}% Complete</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      <Card className="shadow-lg">
        <CardHeader>
          {currentStep === 1 && (
            <StepHeader step={1} title="Location Details" icon={<MapPin className="w-5 h-5" />} />
          )}
          {currentStep === 2 && (
            <StepHeader step={2} title="Property Information" icon={<Home className="w-5 h-5" />} />
          )}
          {currentStep === 3 && (
            <StepHeader step={3} title="Water Requirements" icon={<Droplets className="w-5 h-5" />} />
          )}
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Step 1: Location */}
          {currentStep === 1 && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="city">City *</Label>
                  <Input
                    id="city"
                    placeholder="e.g., Chennai"
                    value={formData.location.city}
                    onChange={(e) => updateFormData('location', 'city', e.target.value)}
                    className={errors['location.city'] ? 'border-destructive' : ''}
                  />
                  {errors['location.city'] && (
                    <p className="text-sm text-destructive mt-1">{errors['location.city']}</p>
                  )}
                </div>
                <div>
                  <Label htmlFor="state">State *</Label>
                  <Select onValueChange={(value) => updateFormData('location', 'state', value)}>
                    <SelectTrigger className={errors['location.state'] ? 'border-destructive' : ''}>
                      <SelectValue placeholder="Select state" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="tamil-nadu">Tamil Nadu</SelectItem>
                      <SelectItem value="karnataka">Karnataka</SelectItem>
                      <SelectItem value="kerala">Kerala</SelectItem>
                      <SelectItem value="andhra-pradesh">Andhra Pradesh</SelectItem>
                      <SelectItem value="telangana">Telangana</SelectItem>
                      <SelectItem value="maharashtra">Maharashtra</SelectItem>
                      <SelectItem value="gujarat">Gujarat</SelectItem>
                      <SelectItem value="rajasthan">Rajasthan</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors['location.state'] && (
                    <p className="text-sm text-destructive mt-1">{errors['location.state']}</p>
                  )}
                </div>
              </div>
              <div>
                <Label htmlFor="pincode">Pincode *</Label>
                <Input
                  id="pincode"
                  placeholder="600001"
                  value={formData.location.pincode}
                  onChange={(e) => updateFormData('location', 'pincode', e.target.value)}
                  className={errors['location.pincode'] ? 'border-destructive' : ''}
                />
                {errors['location.pincode'] && (
                  <p className="text-sm text-destructive mt-1">{errors['location.pincode']}</p>
                )}
              </div>
              <div className="p-4 bg-muted rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertCircle className="w-4 h-4 text-amber-600" />
                  <span className="text-sm font-medium">Data Sources</span>
                </div>
                <p className="text-xs text-muted-foreground">
                  Rainfall data from IMD (Indian Meteorological Department) • Groundwater data from CGWB (Central Ground Water Board)
                </p>
              </div>
            </div>
          )}

          {/* Step 2: Property */}
          {currentStep === 2 && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Label htmlFor="roofArea">Roof Area (sq.m) *</Label>
                    <RunoffCoefficientTooltip />
                  </div>
                  <Input
                    id="roofArea"
                    type="number"
                    placeholder="180"
                    value={formData.property.roofArea || ''}
                    onChange={(e) => updateFormData('property', 'roofArea', Number(e.target.value))}
                    className={errors['property.roofArea'] ? 'border-destructive' : ''}
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Catchment area for rainwater collection
                  </p>
                  {errors['property.roofArea'] && (
                    <p className="text-sm text-destructive mt-1">{errors['property.roofArea']}</p>
                  )}
                </div>
                <div>
                  <Label htmlFor="floors">Number of Floors *</Label>
                  <Select onValueChange={(value) => updateFormData('property', 'floors', Number(value))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select floors" />
                    </SelectTrigger>
                    <SelectContent>
                      {[1,2,3,4,5,6,7,8,9,10].map(num => (
                        <SelectItem key={num} value={num.toString()}>{num}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="propertyType">Property Type *</Label>
                  <Select onValueChange={(value) => updateFormData('property', 'propertyType', value)}>
                    <SelectTrigger className={errors['property.propertyType'] ? 'border-destructive' : ''}>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="residential">Residential</SelectItem>
                      <SelectItem value="commercial">Commercial</SelectItem>
                      <SelectItem value="industrial">Industrial</SelectItem>
                      <SelectItem value="institutional">Institutional</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors['property.propertyType'] && (
                    <p className="text-sm text-destructive mt-1">{errors['property.propertyType']}</p>
                  )}
                </div>
                <div>
                  <Label htmlFor="openSpace">Available Open Space (sq.m)</Label>
                  <Input
                    id="openSpace"
                    type="number"
                    placeholder="50"
                    value={formData.property.openSpace || ''}
                    onChange={(e) => updateFormData('property', 'openSpace', Number(e.target.value))}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Requirements */}
          {currentStep === 3 && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Label htmlFor="waterDemand">Daily Water Demand (Liters) *</Label>
                    <InfoTooltip content="Average daily water consumption for household, garden, and other uses. Typical Indian household: 150L per person per day." />
                  </div>
                  <Input
                    id="waterDemand"
                    type="number"
                    placeholder="500"
                    value={formData.requirements.waterDemand || ''}
                    onChange={(e) => updateFormData('requirements', 'waterDemand', Number(e.target.value))}
                    className={errors['requirements.waterDemand'] ? 'border-destructive' : ''}
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Include drinking, cooking, bathing, and gardening needs
                  </p>
                  {errors['requirements.waterDemand'] && (
                    <p className="text-sm text-destructive mt-1">{errors['requirements.waterDemand']}</p>
                  )}
                </div>
                <div>
                  <Label htmlFor="budget">Budget (₹) *</Label>
                  <Input
                    id="budget"
                    type="number"
                    placeholder="50000"
                    value={formData.requirements.budget || ''}
                    onChange={(e) => updateFormData('requirements', 'budget', Number(e.target.value))}
                    className={errors['requirements.budget'] ? 'border-destructive' : ''}
                  />
                  {errors['requirements.budget'] && (
                    <p className="text-sm text-destructive mt-1">{errors['requirements.budget']}</p>
                  )}
                </div>
              </div>
              <div>
                <Label htmlFor="currentSource">Current Water Source *</Label>
                <Select onValueChange={(value) => updateFormData('requirements', 'currentSource', value)}>
                  <SelectTrigger className={errors['requirements.currentSource'] ? 'border-destructive' : ''}>
                    <SelectValue placeholder="Select current source" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="municipal">Municipal Supply</SelectItem>
                    <SelectItem value="borewell">Borewell</SelectItem>
                    <SelectItem value="tanker">Water Tanker</SelectItem>
                    <SelectItem value="mixed">Mixed Sources</SelectItem>
                  </SelectContent>
                </Select>
                {errors['requirements.currentSource'] && (
                  <p className="text-sm text-destructive mt-1">{errors['requirements.currentSource']}</p>
                )}
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between pt-6">
            <Button
              variant="outline"
              onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
              disabled={currentStep === 1}
            >
              Previous
            </Button>
            <Button onClick={handleNext} disabled={isLoading} className="min-w-32">
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                  Processing...
                </div>
              ) : currentStep === totalSteps ? (
                <div className="flex items-center gap-2">
                  <Calculator className="w-4 h-4" />
                  Calculate Results
                </div>
              ) : (
                "Next"
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};