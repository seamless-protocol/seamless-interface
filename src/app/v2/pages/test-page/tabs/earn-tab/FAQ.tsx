import React from "react";
import { FlexCol, Icon, Typography } from "@shared";

import dotSvg from "@assets/common/dot.svg";

const FAQItem: React.FC<{
  question?: React.ReactNode;
  answer?: React.ReactNode;
}> = ({ question, answer }) => {
  return (
    <div className="mb-4">
      <div className="flex items-center">
        <Icon src={dotSvg} alt="dot-svg" width={24} />
        <Typography type="bold2">{question}</Typography>
      </div>
      <div className="pl-7">
        <Typography type="medium2">{answer}</Typography>
      </div>
    </div>
  );
};

export const FAQ = () => {
  return (
    <div className="max-w-4xl mx-auto p-4">
      <FlexCol>
        <FAQItem question="Where does the yield come from?" answer="..." />
        <FAQItem question="What are the risks?" answer="..." />
        <FAQItem question="What are the costs?" answer="..test." />
      </FlexCol>
    </div>
  );
};
