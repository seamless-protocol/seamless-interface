import {
  TableRow,
  TableCell,
  FlexCol,
  FlexRow,
} from "@shared";

export const TableDesktopRowComponent: React.FC<{
  hideBorder?: boolean;
  name: React.ReactNode;
  description: React.ReactNode;
  logo: React.ReactNode;
  tag: React.ReactNode;
  tokenAmount: React.ReactNode;
  dollarAmount: React.ReactNode;
  profitPercentage: React.ReactNode;
  profitValue: React.ReactNode;
  rewards: React.ReactNode;
  imageInfoGroup: React.ReactNode;
  tableButtons: React.ReactNode;
}> = ({
  hideBorder,
  name,
  description,
  logo,
  tag,
  tokenAmount,
  dollarAmount,
  profitPercentage,
  profitValue,
  rewards,
  imageInfoGroup,
  tableButtons,
}) => {
    return (
      <TableRow
        className={`hidden md:grid grid-cols-20 cursor-pointer items-center border-solid min-h-[148px] ${hideBorder ? "" : "border-b border-b-navy-100"
          }`}
      >
        <TableCell alignItems="items-start col-span-6 pr-6">
          <FlexRow className="gap-4 items-center max-w-full">
            {logo}
            <FlexCol className="gap-2 text-start max-w-full">
              <FlexCol className="gap-[2px] max-w-full">
                {name}
                {description}
              </FlexCol>
            </FlexCol>
          </FlexRow>
        </TableCell>

        <TableCell className="col-span-2">{tag}</TableCell>
        <TableCell className="col-span-3">
          <FlexCol>
            {tokenAmount}
            {dollarAmount}
          </FlexCol>
        </TableCell>
        <TableCell className="col-span-3">
          <FlexCol>
            {profitPercentage}
            {profitValue}
          </FlexCol>
        </TableCell>
        <TableCell className="col-span-2">
          <FlexCol>
            {rewards}
            {imageInfoGroup}
          </FlexCol>
        </TableCell>
        <TableCell className="col-span-4 flex justify-evenly items-center cursor-default">
          {tableButtons}
        </TableCell>
      </TableRow>
    );
  };
