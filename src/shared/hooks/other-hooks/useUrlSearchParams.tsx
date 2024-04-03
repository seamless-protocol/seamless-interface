import { useState, useEffect, Dispatch, SetStateAction } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export const useUrlSearchParams = (
  key: string,
  defaultValue = "",
  disableUrlSyncing = false
): [string | undefined, Dispatch<SetStateAction<string | undefined>>] => {
  const location = useLocation();
  const navigate = useNavigate();
  const [value, setValue] = useState<string | undefined>(defaultValue);

  useEffect(() => {
    const urlSearchParams = new URLSearchParams(location.search);
    const valueFromUrl = urlSearchParams.get(key);
    if (valueFromUrl !== null) {
      setValue(valueFromUrl);
    } else if (!disableUrlSyncing && defaultValue) {
      urlSearchParams.set(key, defaultValue);
      navigate({ search: urlSearchParams.toString() }, { replace: true });
    }
  }, [key, defaultValue, disableUrlSyncing, navigate, location.search]);

  useEffect(() => {
    if (!disableUrlSyncing) {
      const urlSearchParams = new URLSearchParams(location.search);
      if (value != null) {
        urlSearchParams.set(key, value);
      } else {
        urlSearchParams.delete(key);
      }
      navigate({ search: urlSearchParams.toString() }, { replace: true });
    }
  }, [value, disableUrlSyncing, navigate, location.search, key]);

  return [value, setValue];
};
