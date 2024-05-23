import { FlexRow, Icon, Typography } from "@shared";
import gauntletIcon from "@assets/logos/logo-gauntlet.svg";
import { Link } from "react-router-dom";
import { gauntletOptimizedTwitterUrl } from "@router";

export const GauntletOptimized: React.FC<{
  className?: string;
}> = ({ className = "" }) => {
  return (
    <Link
      to={gauntletOptimizedTwitterUrl}
      rel="noopener noreferrer"
      target="_blank"
      onClick={(e) => e.stopPropagation()}
    >
      <FlexRow
        className={`gap-1 items-center border-metallicBorder py-1 px-2 rounded-lg 
    border border-solid bg-smallElements-rewardAPY ${className}`}
      >
        <Icon width={10} src={gauntletIcon} alt="gauntlet-icon" />
        <Typography type="bold" className="uppercase underline">
          optimized
        </Typography>
      </FlexRow>
    </Link>
  );
};
