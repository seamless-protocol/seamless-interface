import { useEffect, useRef } from 'react';

export function useFocusOnAssetChange(asset?: string, focusOnAssetChange?: boolean) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current && focusOnAssetChange) {
      inputRef.current.focus();
    }
  }, [asset, focusOnAssetChange]);

  return inputRef;
}
