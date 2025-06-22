import { useEffect, useRef } from "react";

type MutationCallback = (
  mutations: MutationRecord[],
  observer: MutationObserver,
) => void;

/**
 * useMutationObserver hook
 * @param ref - React ref to the target element
 * @param options - MutationObserver options
 * @param callback - MutationObserver callback
 */
export function useMutationObserver(
  ref: React.RefObject<Element | null>,
  options: MutationObserverInit,
  callback: MutationCallback,
) {
  const observerRef = useRef<MutationObserver | null>(null);

  useEffect(() => {
    if (!ref.current) return;

    observerRef.current = new MutationObserver(callback);
    observerRef.current.observe(ref.current, options);

    return () => {
      observerRef.current?.disconnect();
      observerRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref, callback, JSON.stringify(options)]);
}
