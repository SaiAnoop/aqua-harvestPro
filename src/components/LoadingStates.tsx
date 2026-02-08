import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Droplets, Calculator, TrendingUp } from "lucide-react";

export const LoadingDashboard = () => {
  return (
    <div className="space-y-6">
      {/* Hero Loading */}
      <Card>
        <CardHeader className="text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-primary/10 rounded-full">
              <Droplets className="w-8 h-8 text-primary animate-pulse" />
            </div>
            <div>
              <Skeleton className="h-6 w-48" />
              <Skeleton className="h-4 w-32 mt-2" />
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Loading Cards Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Feasibility Score Loading */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Calculator className="w-5 h-5 text-primary animate-pulse" />
                <Skeleton className="h-5 w-32" />
              </div>
              <Skeleton className="h-6 w-24" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-8">
              <div className="relative">
                <div className="w-32 h-32 rounded-full border-8 border-muted animate-pulse" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Skeleton className="h-8 w-16" />
                </div>
              </div>
              <div className="flex-1 space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center gap-3">
                    <Skeleton className="w-4 h-4 rounded-full" />
                    <div className="flex-1">
                      <Skeleton className="h-4 w-24 mb-1" />
                      <Skeleton className="h-3 w-32" />
                    </div>
                    <Skeleton className="h-5 w-16" />
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Cost Analysis Loading */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-primary animate-pulse" />
                <Skeleton className="h-5 w-40" />
              </div>
              <Skeleton className="h-6 w-20" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="h-48 flex items-center justify-center">
                <div className="w-24 h-24 border-4 border-muted border-t-primary rounded-full animate-spin" />
              </div>
              <div className="grid grid-cols-3 gap-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="text-center">
                    <Skeleton className="h-8 w-16 mx-auto mb-2" />
                    <Skeleton className="h-4 w-20 mx-auto" />
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Additional Loading Cards */}
      <div className="grid md:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <Card key={i}>
            <CardHeader>
              <Skeleton className="h-5 w-32" />
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-8 w-24" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export const ProcessingMessage = ({ step }: { step: string }) => {
  return (
    <Card className="border-primary/30 bg-primary/5">
      <CardContent className="flex items-center gap-4 p-6">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        <div>
          <div className="font-semibold text-primary">Processing your data...</div>
          <div className="text-sm text-muted-foreground">{step}</div>
        </div>
      </CardContent>
    </Card>
  );
};

export const ErrorState = ({ 
  title = "Something went wrong", 
  message = "Please try again later",
  onRetry 
}: { 
  title?: string; 
  message?: string; 
  onRetry?: () => void;
}) => {
  return (
    <Card className="border-destructive/30 bg-destructive/5">
      <CardContent className="text-center p-8">
        <div className="w-16 h-16 mx-auto mb-4 bg-destructive/10 rounded-full flex items-center justify-center">
          <span className="text-2xl">⚠️</span>
        </div>
        <h3 className="font-semibold text-destructive mb-2">{title}</h3>
        <p className="text-sm text-muted-foreground mb-4">{message}</p>
        {onRetry && (
          <button 
            onClick={onRetry}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
          >
            Try Again
          </button>
        )}
      </CardContent>
    </Card>
  );
};