import React from "react";
import { Check } from "lucide-react";
import { twMerge } from "tailwind-merge";

interface AnimatedCheckboxProps {
  checked: boolean;
  onChange: (event: unknown) => void;
  className?: string;
  disabled?: boolean;
}

export const AnimatedCheckbox: React.FC<AnimatedCheckboxProps> = ({
  checked,
  onChange,
  className = "",
  disabled = false,
}) => {
  return (
    <button
      type="button"
      disabled={disabled}
      aria-checked={checked}
      role="checkbox"
      onClick={onChange}
      className={twMerge(
        "relative inline-flex items-center justify-center w-5 h-5 rounded border-[1.5px] transition-all duration-300",
        "focus:outline-none focus:ring-2 focus:ring-blue-500",
        checked
          ? "bg-gradient-to-br from-blue-500 to-purple-600 text-white border-transparent shadow-sm"
          : "bg-white border-gray-600 text-transparent hover:bg-gray-50",
        disabled && "opacity-50 cursor-not-allowed",
        className
      )}
    >
      <Check
        className={`w-4 h-4 transition-opacity ${
          checked ? "opacity-100" : "opacity-0"
        }`}
      />
    </button>
  );
};
