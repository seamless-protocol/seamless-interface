// src/components/EmptyFormGuard.tsx
import React from "react";
import { Displayable, Typography } from "@shared";

interface EmptyFormGuardProps<T> {
  data: Displayable<T | undefined>;
  children: React.ReactNode;
  minHeight?: string;
  errorSource?: string;
}

export function EmptyFormGuard<T>({
  data,
  children,
  minHeight = "min-h-[300px]",
  errorSource,
}: EmptyFormGuardProps<T>) {
  if (data.error) {
    console.error(`EmptyFormGuard: Error happend in ${errorSource} error: ${data.error.message}`, data.error);

    return (
      <div className={minHeight}>
        <Typography type="medium3" className="text-red-600">
          Error while fetching data: {data.error?.message}
        </Typography>
      </div>
    );
  }

  if (!data.data && !data.isLoading && data.isFetched) {
    console.error(`FormGuard missing data, Error happend in ${errorSource}`);

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
