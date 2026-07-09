import { useRouter } from "next/router";
import { useEffect, useRef } from "react";

type ResetHandler = () => void;

export function useResetOnFlag(onReset: ResetHandler) {
  const router = useRouter();
  const didResetRef = useRef(false);

  useEffect(() => {
    if (!router.isReady) {
      return;
    }

    const reset = router.query.reset;
    const shouldReset = Array.isArray(reset)
      ? reset.length > 0
      : reset !== undefined;

    if (!shouldReset || didResetRef.current) {
      return;
    }

    didResetRef.current = true;
    onReset();

    const queryWithoutReset = { ...router.query };
    delete queryWithoutReset.reset;

    void router.replace(
      {
        pathname: router.pathname,
        query: queryWithoutReset,
      },
      undefined,
      { shallow: true },
    );
  }, [onReset, router]);
}
