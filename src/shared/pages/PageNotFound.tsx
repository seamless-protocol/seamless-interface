import { Typography } from "../components/text/Typography/Typography";

export const PageNotFound = () => {
  return (
    <div className="bg-background-default px-2 text-center">
      <div className="h-screen flex flex-col justify-center items-center">
        <Typography type="h1" className="text-error-light">
          404 😕
        </Typography>
        <Typography type="h2" className="text-text-secondary">
          Page Not Found
        </Typography>
        <br />
        <Typography type="body1" className="text-text-secondary">
          We&apos;re sorry, but the page you are looking for doesn&apos;t exist or has been moved.
          <br />
          Please check the URL or go back to the homepage.
        </Typography>
      </div>
    </div>
  );
};
