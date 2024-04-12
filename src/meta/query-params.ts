import { QueryParamConfig } from "use-query-params";

export const StringOrUndefinedParam: QueryParamConfig<string | undefined, string | undefined> = {
  encode: (value: string | undefined): string | undefined => {
    if (value === undefined) return undefined;
    return value;
  },
  decode: (value: string | (string | null)[] | null | undefined): string | undefined => {
    if (value === null || value === undefined) return undefined;
    if (Array.isArray(value)) {
      return value.length > 0 ? value[0] || undefined : undefined;
    }
    return value;
  },
};
