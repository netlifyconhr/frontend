import React from "react";
import { ReleaseLetterContext } from ".";
import useOfferLetter from "../hooks/useOfferLetter";

export const OfferLetterProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const data = useOfferLetter();

  return (
    <ReleaseLetterContext.Provider value={data}>
      {children}
    </ReleaseLetterContext.Provider>
  );
};
