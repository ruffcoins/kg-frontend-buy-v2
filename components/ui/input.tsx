import * as React from "react";

import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-9 w-full rounded-lg border border-kaiglo_grey-500 bg-transparent px-3 py-1 text-base transition-colors file:border-0 file:bg-transparent file:text-base file:font-medium placeholder:text-kaiglo_grey-500 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 focus:border-kaiglo_brand-base",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";

export { Input };
