import { PropsWithChildren } from "react";

export const HeadingContainer: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="bg-background-header">
      <div className="flex flex-col xxl:items-center pt-12 pb-20">
        <div className="mx-2 lg:mx-10 xl:mx-24 xxl:w-[1440px] xxl:items-start">
          {children}
        </div>
      </div>
    </div>
  );
};
