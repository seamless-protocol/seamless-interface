import React, { useEffect, useMemo } from "react";
import { DisplayValue, DisplayValueProps } from "@shared";

interface AssetApyProps extends DisplayValueProps {}

export const RandomNumber: React.FC<AssetApyProps> = (props) => {
  const data = useMemo(() => {
    // Generates a random number between 0 and 999
    return Math.floor(Math.random() * 1000);
  }, []);

  const [isFetched, setIsFetched] = React.useState(false);

  useEffect(() => {
    const id = setTimeout(() => {
      setIsFetched(true);
    }, 200);

    return () => clearTimeout(id);
  }, []);

  return (
    <DisplayValue
      {...props}
      isFetched={isFetched}
      viewValue={data.toString()}
      className={props.className}
      loaderSkeleton
    />
  );
};
