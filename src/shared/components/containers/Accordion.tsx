import React, { useState, FC } from "react";
import { TypographyType } from "../text/TypographyV2/mappers";
import { TypographyV2 } from "../text/TypographyV2/TypographyV2";

type AccordionItemProps = {
  title: string;
  children: React.ReactNode;
  typography?: TypographyType;
};

export const AccordionItem: FC<AccordionItemProps> = ({
  title,
  children,
  typography,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="">
      <button
        className="w-full flex justify-between items-center gap-6"
        onClick={() => setIsOpen(!isOpen)}
      >
        <TypographyV2 type={typography || "bold3"} className="text-start">
          {title}
        </TypographyV2>
        <div
          className={`rounded-full border border-navy-600 p-1 transition-transform duration-300 ${isOpen ? "transform rotate-180" : ""}`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
          >
            <path
              d="M6.46458 7.34759C6.13914 7.02216 5.61151 7.02216 5.28607 7.34759C4.96063 7.67303 4.96063 8.20067 5.28607 8.5261L9.40447 12.6445C9.40656 12.6466 9.40867 12.6488 9.41079 12.6509C9.57352 12.8136 9.7868 12.895 10.0001 12.895C10.2134 12.895 10.4266 12.8136 10.5894 12.6509C10.5915 12.6488 10.5936 12.6466 10.5957 12.6445L14.7141 8.5261C15.0395 8.20067 15.0395 7.67303 14.7141 7.34759C14.3887 7.02216 13.861 7.02216 13.5356 7.34759L10.0001 10.8831L6.46458 7.34759Z"
              fill="#0B254F"
            />
          </svg>
        </div>
      </button>
      {isOpen && <div className="mt-4">{children}</div>}
    </div>
  );
};

type AccordionProps = {
  children: React.ReactNode;
};

export const Accordion: FC<AccordionProps> = ({ children }) => {
  return <div className="w-full">{children}</div>;
};
