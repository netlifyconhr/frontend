import React from "react";
import { ReleaseLetterContext } from ".";
import useReleaseLetter from "../hooks/useReleaseLetter";

export const ReleaseLetterProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const data = useReleaseLetter();

  return (
    <ReleaseLetterContext.Provider value={data}>
      {children}
    </ReleaseLetterContext.Provider>
  );
};
