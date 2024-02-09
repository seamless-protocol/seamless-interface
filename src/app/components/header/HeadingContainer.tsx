import { GoBackButton } from "../temporary-components/GoBackButton";

export const HeadingContainer: React.FC<{
  children: React.ReactNode;
  displayBackButton?: boolean;
}> = ({ children, displayBackButton }) => {
  return (
    <div className="bg-background-header">
      <div className="flex flex-col xxl:items-center pt-12 pb-20">
        <div className="mx-2 lg:mx-10 xl:mx-24 xxl:w-[1440px] xxl:items-start">
          <div className="md:px-6">
            {displayBackButton && (
              <div className="mb-2">
                <GoBackButton />
              </div>
            )}
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};
