import * as React from "react";
import { cn } from "@/lib/utils";

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  mystical?: boolean;
}

const FormInput = React.forwardRef<HTMLInputElement, FormInputProps>(
  ({ className, label, error, mystical = false, ...props }, ref) => {
    return (
      <div className="space-y-2">
        {label && (
          <label className="text-sm font-medium text-card-foreground">
            {label}
          </label>
        )}
        <input
          className={cn(
            "flex h-11 w-full rounded-lg border bg-input px-3 py-2 text-sm text-card-foreground placeholder:text-muted-foreground",
            "border-border focus:border-ring focus:bg-input-focus focus:outline-none focus:ring-2 focus:ring-ring/20",
            "transition-all duration-200",
            mystical && "focus:shadow-glow-primary",
            error && "border-destructive focus:border-destructive focus:ring-destructive/20",
            className
          )}
          ref={ref}
          {...props}
        />
        {error && (
          <p className="text-xs text-destructive">{error}</p>
        )}
      </div>
    );
  }
);

FormInput.displayName = "FormInput";

export { FormInput };