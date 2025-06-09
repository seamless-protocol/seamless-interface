import { FlexCol, FlexRow, Icon, DisplayText } from "../../../../shared";
import { PointsProgram } from "../../../statev3/settings/config";

export const PointsProgramsComponent: React.FC<{
  programs?: PointsProgram[];
}> = ({ programs }) => {
  if (!programs) return null;
  return (
    <div>
      {programs.map((program) => (
        <FlexCol className="items-center gap-1">
          <FlexRow className=" bg-blue-200 items-center gap-2 border border-solid px-2 py-1.5 rounded-[100px] border-metallicBorder max-w-max">
            <Icon src={program.icon} alt="points-icon" width={16} />
            <DisplayText typography="medium2" viewValue={program.viewValue} />
          </FlexRow>
        </FlexCol>
      ))}
    </div>
  );
};
