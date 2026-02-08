import { HelpCircle } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface InfoTooltipProps {
  content: string;
  className?: string;
}

export const InfoTooltip = ({ content, className = "w-4 h-4 text-muted-foreground hover:text-primary" }: InfoTooltipProps) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <HelpCircle className={className} />
        </TooltipTrigger>
        <TooltipContent className="max-w-xs">
          <p className="text-sm">{content}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

// Pre-defined tooltips for common terms
export const FeasibilityTooltip = () => (
  <InfoTooltip content="Feasibility score considers rainfall patterns, roof catchment area, soil infiltration capacity, and water demand to determine rainwater harvesting viability." />
);

export const AquiferTooltip = () => (
  <InfoTooltip content="Underground layer of water-bearing permeable rock or sediments from which groundwater can be extracted. Rainwater recharge helps replenish these vital water sources." />
);

export const RunoffCoefficientTooltip = () => (
  <InfoTooltip content="Percentage of rainfall that can be collected from roof surfaces. Typical values: Concrete/Metal roofs: 85-95%, Tile roofs: 75-85%." />
);

export const PaybackPeriodTooltip = () => (
  <InfoTooltip content="Time required to recover the initial investment through water bill savings. Calculated based on current water rates and projected usage." />
);

export const RLSTooltip = () => (
  <InfoTooltip content="Recharge structures like pits, trenches, and wells that allow harvested rainwater to infiltrate into groundwater aquifers, increasing local water table levels." />
);