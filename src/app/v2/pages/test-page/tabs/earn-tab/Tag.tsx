import { Typography } from "@shared";
import { TagType } from "@state";

const ColorByTypeDict: { [key in TagType]: string } = {
  LEND: "bg-smallElements-lend border-green-1000",
  ILM: "bg-smallElements-ilm border-metallicBorder",
};

export const Tag: React.FC<{ tag?: TagType }> = ({ tag }) => {
  if (!tag) return null;
  return (
    <div className={`py-1 px-2 rounded-lg border border-solid ${ColorByTypeDict[tag]}`}>
      <Typography type="bold">{tag}</Typography>
    </div>
  );
};
