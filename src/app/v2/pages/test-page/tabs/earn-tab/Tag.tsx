import { Typography } from "@shared";

export type TagType = "LEND" | "ILM";

const ColorByTypeDict = {
  LEND: "bg-smallElements-lend border-green-1000",
  ILM: "bg-smallElements-ilm border-metallicBorder",
};

export const Tag: React.FC<{ tag: TagType }> = ({ tag }) => {
  return (
    <div className={`py-1 px-2 rounded-lg border border-solid ${ColorByTypeDict[tag]}`}>
      <Typography type="bold">{tag}</Typography>
    </div>
  );
};
