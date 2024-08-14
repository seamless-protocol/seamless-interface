import { TableRow, TableCell, Typography } from '@shared'
import { MyStrategiesDesktopTableRow } from './MyStrategiesDesktopTableRow'
import { Address } from 'viem';

const stateMock = {
  data: [
    {
      name: "Strategy 1",
      address: "0x0" as Address,
    },
    {
      name: "Strategy 2",
      address: "0x1" as Address,
    },
    {
      name: "Strategy 3",
      address: "0x2" as Address,
    }
  ]
}
export const IlmTableContainer = () => {
  const state = stateMock;

  return (
    <div>
      <div className="bg-neutral-0 shadow-card rounded-2xl">
        <TableRow className="hidden md:grid grid-cols-7 py-[9px] bg-neutral-0 mt-0 max-h-9 justify-center rounded-t-2xl">
          <TableCell className="col-span-2 justify-center" alignItems="items-start">
            <Typography type="bold1">ILM Strategies</Typography>
          </TableCell>
          <TableCell className="col-span-1">
            <Typography type="bold1">Type</Typography>
          </TableCell>
          <TableCell className="col-span-1">
            <Typography type="bold1">Available supply cap</Typography>
          </TableCell>
          <TableCell className="col-span-1">
            <Typography type="bold1">30d historical return</Typography>
          </TableCell>
          <TableCell className="col-span-1">
            <Typography type="bold1">Rewards APY</Typography>
          </TableCell>
          <TableCell className="col-span-1">
            <Typography type="bold1">TVL</Typography>
          </TableCell>
        </TableRow>

        {state.data?.map((strategy, index) => (
          <div key={index}>
            <MyStrategiesDesktopTableRow strategy={strategy.address} hideBorder={index === state.data.length - 1} />
          </div>
        ))}
      </div></div>
  )
}
