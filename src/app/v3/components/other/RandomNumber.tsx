import React, { useEffect, useMemo } from "react";
import { DisplayValue, DisplayValueProps } from "@shared";

interface RandomNumberProps extends DisplayValueProps {}

export const RandomNumber: React.FC<RandomNumberProps> = (props) => {
  const data = useMemo(() => {
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
