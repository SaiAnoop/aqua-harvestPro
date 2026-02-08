import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";
import { DollarSign, TrendingUp, Calculator } from "lucide-react";
import { FeasibilityResult } from "@/utils/feasibilityCalculator";

interface CostBenefitAnalysisProps {
  data?: FeasibilityResult;
}

const costData = [
  { name: "Excavation", value: 15000, color: "hsl(var(--water-primary))" },
  { name: "Piping", value: 8000, color: "hsl(var(--sustainable-green))" },
  { name: "Filter Unit", value: 12000, color: "hsl(var(--efficiency-blue))" },
  { name: "Labor", value: 10000, color: "hsl(var(--conservation-teal))" }
];

const savingsData = [
  { year: "Year 1", savings: 8500 },
  { year: "Year 5", savings: 18200 },
  { year: "Year 10", savings: 32800 }
];

const totalCost = costData.reduce((sum, item) => sum + item.value, 0);

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-card border rounded-lg shadow-lg p-3">
        <p className="font-medium">{payload[0].name}</p>
        <p className="text-sm text-primary">
          ₹{payload[0].value.toLocaleString()}
        </p>
        <p className="text-xs text-muted-foreground">
          {((payload[0].value / totalCost) * 100).toFixed(1)}% of total
        </p>
      </div>
    );
  }
  return null;
};

const SavingsTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-card border rounded-lg shadow-lg p-3">
        <p className="font-medium mb-1">{label}</p>
        <p className="text-sm text-sustainable-green">
          Annual Savings: ₹{payload[0].value.toLocaleString()}
        </p>
      </div>
    );
  }
  return null;
};

export const CostBenefitAnalysis = ({ data }: CostBenefitAnalysisProps) => {
  // Use provided data or fallback to default
  const costData = data ? [
    { name: "Excavation", value: data.costBreakdown.excavation, color: "hsl(var(--water-primary))" },
    { name: "Piping", value: data.costBreakdown.piping, color: "hsl(var(--sustainable-green))" },
    { name: "Filter Unit", value: data.costBreakdown.filterUnit, color: "hsl(var(--efficiency-blue))" },
    { name: "Labor", value: data.costBreakdown.labor, color: "hsl(var(--conservation-teal))" }
  ] : [
    { name: "Excavation", value: 15000, color: "hsl(var(--water-primary))" },
    { name: "Piping", value: 8000, color: "hsl(var(--sustainable-green))" },
    { name: "Filter Unit", value: 12000, color: "hsl(var(--efficiency-blue))" },
    { name: "Labor", value: 10000, color: "hsl(var(--conservation-teal))" }
  ];

  const savingsData = data ? [
    { year: "Year 1", savings: data.projectedSavings.year1 },
    { year: "Year 5", savings: data.projectedSavings.year5 },
    { year: "Year 10", savings: data.projectedSavings.year10 }
  ] : [
    { year: "Year 1", savings: 8500 },
    { year: "Year 5", savings: 18200 },
    { year: "Year 10", savings: 32800 }
  ];

  const totalCost = costData.reduce((sum, item) => sum + item.value, 0);
  const paybackPeriod = data?.recommendations.paybackPeriod.toFixed(1) || (totalCost / savingsData[0].savings).toFixed(1);
  const roi10Year = (((savingsData[2].savings * 10) - totalCost) / totalCost * 100).toFixed(0);

  return (
    <Card className="shadow-md">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-semibold flex items-center gap-2">
            <Calculator className="w-5 h-5 text-primary" />
            Cost & Benefit Analysis
          </CardTitle>
          <Badge variant="secondary" className="bg-sustainable-light text-sustainable-green">
            ROI: {roi10Year}% (10 years)
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground">
          Investment breakdown and projected financial returns
        </p>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-2 gap-6">
          {/* Cost Breakdown - Pie Chart */}
          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-primary" />
              Investment Breakdown
            </h3>
            <div className="h-52">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={costData}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={80}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {costData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            
            <div className="space-y-2 mt-4">
              {costData.map((item, index) => (
                <div key={index} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: item.color }}
                    ></div>
                    <span>{item.name}</span>
                  </div>
                  <span className="font-medium">₹{item.value.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Savings Projection - Bar Chart */}
          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-sustainable-green" />
              Projected Savings
            </h3>
            <div className="h-52">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={savingsData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis 
                    dataKey="year" 
                    tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
                  />
                  <YAxis 
                    tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
                    tickFormatter={(value) => `₹${(value / 1000)}K`}
                  />
                  <Tooltip content={<SavingsTooltip />} />
                  <Bar 
                    dataKey="savings" 
                    fill="var(--chart-secondary)"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6 pt-6 border-t">
          <div className="text-center">
            <div className="text-2xl font-bold text-destructive">
              ₹{totalCost.toLocaleString()}
            </div>
            <div className="text-sm text-muted-foreground">Total Investment</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-efficiency-blue">
              {paybackPeriod} years
            </div>
            <div className="text-sm text-muted-foreground">Payback Period</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-sustainable-green">
              ₹{(savingsData[2].savings * 10).toLocaleString()}
            </div>
            <div className="text-sm text-muted-foreground">10-Year Savings</div>
          </div>
        </div>

        {/* Real Chennai Example */}
        <div className="mt-4 p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border-2 border-green-200">
          <div className="text-center mb-3">
            <h4 className="text-xl font-bold text-green-800 mb-2">🏆 Real Chennai Success Story</h4>
            <div className="text-lg font-semibold text-green-900 mb-3">
              "150 sq.m roof in T.Nagar → 1.8 lakh liters/year → ₹25k setup → payback in 2.5 years"
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-3 mb-3">
            <div className="text-center p-3 bg-white/70 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">1.8L</div>
              <div className="text-sm text-blue-800">Liters annually</div>
            </div>
            <div className="text-center p-3 bg-white/70 rounded-lg">
              <div className="text-2xl font-bold text-green-600">₹25k</div>
              <div className="text-sm text-green-800">Setup cost</div>
            </div>
            <div className="text-center p-3 bg-white/70 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">2.5</div>
              <div className="text-sm text-purple-800">Years payback</div>
            </div>
          </div>
          
          <div className="text-center">
            <p className="text-sm font-medium text-green-800 mb-2">
              <strong>Your System Impact:</strong> ₹{(totalCost/1000).toFixed(0)}k investment returns ₹{((savingsData[2].savings * 10 - totalCost)/1000).toFixed(0)}k profit over 10 years.
            </p>
            <p className="text-sm text-green-700">
              That's turning <span className="font-semibold">wasted rainwater into ₹{Math.round((savingsData[2].savings * 10 - totalCost)/10000)}k annual income!</span> 💰
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};