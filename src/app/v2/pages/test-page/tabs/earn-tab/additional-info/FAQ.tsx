import { FlexCol, Icon, Typography } from "@shared";
import dotSvg from "@assets/common/dot.svg";
import React from "react";
import { Address } from "viem";
import { assetsConfig, strategiesConfig } from "../../../../../../state/settings/config";

const FAQItem: React.FC<{
  question: React.ReactNode;
  answer: React.ReactNode;
}> = ({ question, answer }) => (
  <div className="mb-4">
    <div className="flex items-center">
      <Icon src={dotSvg} alt="dot" width={24} />
      <Typography type="bold2" className="ml-[-4px]">
        {question}
      </Typography>
    </div>
    <div className="pl-7">
      <Typography type="medium2">{answer}</Typography>
    </div>
  </div>
);

export const FAQ: React.FC<{
  asset: Address;
}> = ({ asset }) => {
  if (strategiesConfig[asset]?.faq) {
    return (
      <FlexCol>
        {strategiesConfig[asset]?.faq?.map((faq, index) => (
          <FAQItem key={index} question={faq.question} answer={faq.answer} />
        ))}
      </FlexCol>
    );
  }
  if (!assetsConfig[asset]?.faq) {
    return (
      <FlexCol>
        {assetsConfig[asset]?.faq?.map((faq, index) => (
          <FAQItem key={index} question={faq.question} answer={faq.answer} />
        ))}
      </FlexCol>
    );
  }

  return null;
};
