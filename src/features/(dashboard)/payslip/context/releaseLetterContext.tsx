import React from "react";
import { ReleaseLetterContext } from ".";
import usePayslip from "../hooks/usePayslip";

export const ReleaseLetterProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const data = usePayslip();

  return (
    <ReleaseLetterContext.Provider value={data}>
      {children}
    </ReleaseLetterContext.Provider>
  );
};
