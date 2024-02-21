import { Typography } from "../../../text/Typography/Typography";

export const MicroButton: React.FC<{
  handleClick: () => void;
  text?: string;
}> = ({ handleClick, text }) => {
  return (
    <button
      onClick={handleClick}
      className="inline-flex items-center justify-center 
                  relative box-border border-solid border-[#eaebef] 
                  cursor-pointer select-none align-middle appearance-none 
                  no-underline min-w-[64px] border shadow-none rounded 
                  font-medium leading-6 text-sm text-white m-0 px-2 py-[1px]  
                  outline-none transition-all duration-250 ease-in-out 
                  bg-background-surface tracking-[0.009375rem]
                  hover:bg-success-200 hover:text-gray-900"
    >
      <Typography type="buttonS">{text}</Typography>
    </button>
  );
};
