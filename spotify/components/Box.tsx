import React, { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface BoxProps {
  children: ReactNode;
  className?: string;
}

const Box = ({ children, className }: BoxProps) => {
  return (
    <div
      className={twMerge(
        `
        rounded-lg
        h-fit
        w-full`,
        className
      )}
    >
      {children}
    </div>
  );
};

export default Box;
