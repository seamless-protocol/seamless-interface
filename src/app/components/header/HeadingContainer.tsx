import { PropsWithChildren } from "react";

export const HeadingContainer: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="bg-background-header">
      <div className="pt-12 pb-20">
        <div className="px-4 md:px-4 lg:px-10 xl:px-24">{children}</div>
      </div>
    </div>
  );
};
