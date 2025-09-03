import React from "react";
import { ReleaseLetterContext } from ".";
import useExamForm from "../hooks/useExamForm";

export const ReleaseLetterProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const data = useExamForm();

  return (
    <ReleaseLetterContext.Provider value={data}>
      {children}
    </ReleaseLetterContext.Provider>
  );
};
