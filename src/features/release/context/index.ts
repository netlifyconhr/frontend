import { createContext, useContext } from "react";
import type useReleaseLetter from "../hooks/useReleaseLetter";

export const ReleaseLetterContext = createContext<
  ReturnType<typeof useReleaseLetter> | undefined
>(undefined);

export const useReleaseLetterContext = () => {
  const context = useContext(ReleaseLetterContext);
  if (!context)
    throw new Error("useReleaseLetter must be used within <ReleaseLetter>");
  return context;
};
