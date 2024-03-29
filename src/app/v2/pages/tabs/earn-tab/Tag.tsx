import { TypographyV2 } from "@shared";

export type TagType = "LEND" | "ILM";

const ColorByTypeDict = {
  LEND: "bg-neutral-100 border-green-1000",
  ILM: "bg-green-100 border-metallicBorder",
};

export const Tag: React.FC<{ tag: TagType }> = ({ tag }) => {
  return (
    <div className={`py-1 px-2 rounded-lg border border-solid ${ColorByTypeDict[tag]}`}>
      <TypographyV2 type="bold">{tag}</TypographyV2>
    </div>
  );
};
