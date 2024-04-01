import TabButton from "./TabButton";

export const TabSelector: React.FC<{
  selectedCard: "overview" | "yourInfo";
  setSelectedCard: (value: "overview" | "yourInfo") => void;
}> = ({ selectedCard, setSelectedCard }) => {
  return (
    <div
      role="group"
      className="inline-flex w-full sm:w-auto border-[0.86px] text-subheader1 rounded bg-[rgb(56,61,81)] p-1 border-[rgba(235,235,237,0.12)] lg:hidden"
    >
      <TabButton
        label="Overview"
        isSelected={selectedCard === "overview"}
        onClick={() => setSelectedCard("overview")}
      />
      <TabButton
        label="Your Info"
        isSelected={selectedCard === "yourInfo"}
        onClick={() => setSelectedCard("yourInfo")}
      />
    </div>
  );
};
