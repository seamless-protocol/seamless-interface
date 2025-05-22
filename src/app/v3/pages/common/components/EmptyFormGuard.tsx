// src/components/EmptyFormGuard.tsx
import React from "react";
import { Displayable, Typography } from "@shared";

interface EmptyFormGuardProps<T> {
  data: Displayable<T | undefined>;
  children: React.ReactNode;
  minHeight?: string;
}

export function EmptyFormGuard<T>({ data, children, minHeight = "min-h-[300px]" }: EmptyFormGuardProps<T>) {
  if (data.error) {
    console.error("FormGuard error or missing data");
    if (data.error) console.error("FormGuard error", data.error);

    return (
      <div className={minHeight}>
        <Typography type="medium3" className="text-red-600">
          Error while fetching data: {data.error?.message}
        </Typography>
      </div>
    );
  }

  if (!data.data && !data.isLoading) {
    console.error("FormGuard missing data");

    return (
      <div className={minHeight}>
        <Typography type="medium3" className="text-error-light">
          Data not found
        </Typography>
      </div>
    );
  }

  return <>{children}</>;
}
