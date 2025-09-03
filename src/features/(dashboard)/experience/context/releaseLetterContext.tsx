import React from "react";
import { ReleaseLetterContext } from ".";
import useExperienceLetter from "../hooks/useExperienceLetter";

export const ReleaseLetterProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const data = useExperienceLetter();

  return (
    <ReleaseLetterContext.Provider value={data}>
      {children}
    </ReleaseLetterContext.Provider>
  );
};
