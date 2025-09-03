import { type PropsWithChildren } from "react";

export default function Heading({ children }: PropsWithChildren) {
  return (
    <h1 className="text-lg md:text-xl font-bold bg-gradient-to-r from-red-600 to-blue-600 bg-clip-text text-transparent text-center md:text-left">
      {children}
    </h1>
  );
}
