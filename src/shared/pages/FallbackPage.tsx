import { Typography } from "../components/text/Typography/Typography";

export const FallbackPage = () => {
  return (
    <div className="bg-background-default px-2 text-center">
      <div className="h-screen flex flex-col justify-center items-center">
        <Typography type="h1" className="text-error-light">
          Error 😭
        </Typography>
        <Typography type="h2" className="text-text-secondary">
          Something went wrong
        </Typography>
        <br />
        <Typography type="body1" className="text-text-secondary">
          We apologize for the inconvenience. Please try refreshing the page.
        </Typography>
      </div>
    </div>
  );
};
