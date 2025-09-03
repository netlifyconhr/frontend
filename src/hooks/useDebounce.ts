import { useState, useEffect } from "react";

/**
 * Debounces a changing value by a given delay.
 * @param value - The value to debounce.
 * @param delay - Delay in milliseconds.
 * @returns Debounced value.
 */
export function useDebounce<T>(value: T, delay = 300): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(timer); // Cleanup
  }, [value, delay]);

  return debouncedValue;
}
