import React, { useState, useMemo } from "react";
import { FlexCol, FlexRow, Icon, Typography } from "@shared";
import { useFetchAllAssets } from "../../../state/common/hooks/useFetchAllAssets";
import { AssetPickerProps, AssetPicker } from "./AssetPicker";
import { TagType } from "../../../state/common/types/StateTypes";
import allIcon from "@assets/tags/all.svg";
import ilmIcon from "@assets/tags/ilm.svg";
import lendIcon from "@assets/tags/lend.svg";

export type FilterType = TagType | "ALL";

const FilterOptions: { label: string; tag: FilterType; icon: JSX.Element }[] = [
  {
    label: "All",
    tag: "ALL",
    icon: <Icon width={20} height={20} src={allIcon} alt="all" />,
  },
  {
    label: "ILMs",
    tag: "ILM",
    icon: <Icon width={20} height={20} src={ilmIcon} alt="ilm" />,
  },
  {
    label: "Lending",
    tag: "LEND",
    icon: <Icon width={20} height={20} src={lendIcon} alt="lend" />,
  },
];

export const AssetPickerWithFilter: React.FC<AssetPickerProps> = (props) => {
  const [selectedFilters, setSelectedFilters] = useState<FilterType[]>(["ALL"]);

  const { state } = useFetchAllAssets();

  const handleFilterClick = (tag: FilterType) => {
    if (tag === "ALL") {
      setSelectedFilters(["ALL"]);
    } else {
      setSelectedFilters((prevFilters) => {
        const newFilters = prevFilters.includes(tag)
          ? prevFilters.filter((filter) => filter !== tag)
          : prevFilters.filter((filter) => filter !== "ALL").concat(tag);
        return newFilters.length === 0 ? ["ALL"] : newFilters;
      });
    }
  };

  const filteredData = useMemo(() => {
    if (selectedFilters.includes("ALL")) {
      return state.data;
    }
    return state.data?.filter((item) => selectedFilters.some((filter) => item.tags.includes(filter as TagType)));
  }, [state.data, selectedFilters]);

  return (
    <FlexCol className="gap-3">
      <FlexRow className="items-center gap-2">
        {FilterOptions.map((option) => (
          <button
            type="button"
            key={option.tag}
            onClick={() => handleFilterClick(option.tag)}
            className={`inline-flex items-center gap-2 px-4 py-2 border shadow-button rounded-[100px] border-solid
              ${selectedFilters.includes(option.tag) ? "border-metallicBorder text-black" : "border-navy-100 text-gray-500 fill-gray-500"}`}
          >
            {option.icon}
            <Typography type="bold2">{option.label}</Typography>
          </button>
        ))}
      </FlexRow>
      <AssetPicker {...props} data={filteredData} />
    </FlexCol>
  );
};
