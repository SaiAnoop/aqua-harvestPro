import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Legend, Tooltip } from "recharts";
import { Droplets, Zap } from "lucide-react";

const data = [
  {
    month: "Jan",
    potential: 8500,
    demand: 4200,
  },
  {
    month: "Feb", 
    potential: 6200,
    demand: 3800,
  },
  {
    month: "Mar",
    potential: 4800,
    demand: 4500,
  },
  {
    month: "Apr",
    potential: 12500,
    demand: 4800,
  },
  {
    month: "May",
    potential: 18200,
    demand: 5200,
  },
  {
    month: "Jun",
    potential: 22800,
    demand: 5500,
  },
  {
    month: "Jul",
    potential: 26500,
    demand: 5200,
  },
  {
    month: "Aug",
    potential: 24200,
    demand: 4800,
  },
  {
    month: "Sep",
    potential: 19600,
    demand: 4500,
  },
  {
    month: "Oct",
    potential: 14200,
    demand: 4200,
  },
  {
    month: "Nov",
    potential: 9800,
    demand: 3900,
  },
  {
    month: "Dec",
    potential: 7200,
    demand: 3800,
  },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-card border rounded-lg shadow-lg p-3">
        <p className="font-semibold mb-2">{`${label} 2024`}</p>
        <p className="text-sm text-water-primary">
          <span className="inline-block w-3 h-3 bg-water-primary rounded-full mr-2"></span>
          {`Potential: ${payload[0].value.toLocaleString()}L`}
        </p>
        <p className="text-sm text-sustainable-green">
          <span className="inline-block w-3 h-3 bg-sustainable-green rounded-full mr-2"></span>
          {`Demand: ${payload[1].value.toLocaleString()}L`}
        </p>
        <p className="text-xs text-muted-foreground mt-2">
          Surplus: {(payload[0].value - payload[1].value).toLocaleString()}L
        </p>
      </div>
    );
  }
  return null;
};

export const HarvestPotentialChart = () => {
  const totalPotential = data.reduce((sum, item) => sum + item.potential, 0);
  const totalDemand = data.reduce((sum, item) => sum + item.demand, 0);
  const surplusPercentage = ((totalPotential - totalDemand) / totalDemand * 100).toFixed(0);

  return (
    <Card className="shadow-md">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-semibold flex items-center gap-2">
            <Droplets className="w-5 h-5 text-water-primary" />
            Harvest Potential vs Water Demand
          </CardTitle>
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-sustainable-green" />
              <span className="font-medium text-sustainable-green">+{surplusPercentage}% Surplus</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-6 text-sm text-muted-foreground">
          <span>Annual comparison showing monthly potential vs household requirements</span>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 5,
              }}
              barGap={8}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis 
                dataKey="month" 
                tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
                tickLine={{ stroke: "hsl(var(--border))" }}
              />
              <YAxis 
                tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
                tickLine={{ stroke: "hsl(var(--border))" }}
                tickFormatter={(value) => `${(value / 1000).toFixed(0)}K`}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend 
                wrapperStyle={{ fontSize: '14px', paddingTop: '20px' }}
              />
              <Bar 
                dataKey="potential" 
                name="Rainwater Potential"
                fill="var(--chart-primary)"
                radius={[2, 2, 0, 0]}
              />
              <Bar 
                dataKey="demand" 
                name="Household Demand"
                fill="var(--chart-secondary)"
                radius={[2, 2, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
        
        <div className="grid grid-cols-2 gap-4 mt-6 pt-4 border-t">
          <div className="text-center">
            <div className="text-2xl font-bold text-water-primary">
              {(totalPotential / 1000).toFixed(0)}K L
            </div>
            <div className="text-sm text-muted-foreground">Annual Potential</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-sustainable-green">
              {(totalDemand / 1000).toFixed(0)}K L
            </div>
            <div className="text-sm text-muted-foreground">Annual Demand</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};