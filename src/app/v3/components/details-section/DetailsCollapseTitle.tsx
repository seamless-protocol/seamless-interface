import { Typography } from "@shared";

// todo rename this, remove local
export const LocalCollapseTitle: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  return (
    <div className="collapse-title">
      <Typography type="medium4">{children}</Typography>
    </div>
  );
};
