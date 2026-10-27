import { useCallback, useEffect, useRef, useState } from "react";

export function useDialog<T>() {
  const [showDialog, setShowDialog] = useState<T | null>(null);
  const [mountedDialog, setMountedDialog] = useState(false);
  const unmountTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const close = useCallback(() => {
    if (unmountTimeout.current) clearTimeout(unmountTimeout.current);
    setShowDialog(null);
    unmountTimeout.current = setTimeout(() => {
      setMountedDialog(false);
      unmountTimeout.current = null;
    }, 300);
  }, []);

  const show = useCallback((value: T) => {
    if (unmountTimeout.current) clearTimeout(unmountTimeout.current);
    unmountTimeout.current = null;
    setShowDialog(value);
    setMountedDialog(true);
  }, []);

  useEffect(
    () => () => {
      if (unmountTimeout.current) clearTimeout(unmountTimeout.current);
    },
    [],
  );

  return {
    close,
    show,
    mounted: mountedDialog,
    value: showDialog,
  };
}
