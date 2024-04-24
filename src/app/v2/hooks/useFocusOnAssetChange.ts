import { useEffect, useRef } from 'react';

export function useFocusOnAssetChange(asset?: string, focusOnAssetChange?: boolean) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    console.log({ focusOnAssetChange })
    console.log({ rg: inputRef.current })
    if (inputRef.current && focusOnAssetChange) {
      inputRef.current.focus();
      console.log('focused')
    }
  }, [asset, focusOnAssetChange]);

  return inputRef;
}
