import { Modal, FlexCol, Typography } from '../../../../../../shared'
import { TokenDescriptionDict } from '../../../../../../shared/state/meta-data-queries/useTokenDescription'

export const TableButtons = () => {
  const buttonProps = {
    disabled: {
      children: "Enter amount",
      className: "border border-black text-bold3 text-black bg-neutral-100 rounded-[100px] py-4 px-32 items-center text-center",
    },
    enabled: {
      children: "Add to strategy",
      className: "text-bold3 bg-metalic text-neutral-0 rounded-[100px] py-4 px-32 items-center text-center",
    }
  }

  return (
    <Modal
      ref={modalRef}
      size="normal"
      buttonProps={{
        ...(Number(amount) ? buttonProps.enabled : buttonProps.disabled),
        disabled: !Number(amount)
      }}
      headerComponent={
        <FlexCol className="gap-1 ">
          <Typography type="bold4">Add to strategy</Typography>
          <Typography type="regular3">{TokenDescriptionDict[asset]?.strategyTitle}</Typography>
        </FlexCol>
      }
    >x</Modal>
  )
}
