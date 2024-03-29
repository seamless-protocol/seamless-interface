import { Typography } from "@shared";
import { Link } from "react-router-dom";

interface MobileMenuRowProps {
  label: string;
  href: string;
}

export const MobileMenuRow: React.FC<MobileMenuRowProps> = ({ label, href }) => {
  return (
    <Link to={href}>
      <Typography className="text-base text-gray-300 block rounded-md px-4 py-3 h1" type="h3" color="primary">
        {label}
      </Typography>
    </Link>
  );
};
