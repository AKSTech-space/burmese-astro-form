import * as React from "react";
import { cn } from "@/lib/utils";

interface FormTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  remaining?: number;
  mystical?: boolean;
}

const FormTextarea = React.forwardRef<HTMLTextAreaElement, FormTextareaProps>(
  ({ className, label, error, remaining, mystical = false, ...props }, ref) => {
    return (
      <div className="space-y-2">
        {label && (
          <label className="text-sm font-medium text-card-foreground">
            {label}
          </label>
        )}
        <textarea
          className={cn(
            "flex min-h-[140px] w-full rounded-lg border bg-input px-3 py-2 text-sm text-card-foreground placeholder:text-muted-foreground",
            "border-border focus:border-ring focus:bg-input-focus focus:outline-none focus:ring-2 focus:ring-ring/20",
            "transition-all duration-200 resize-none",
            mystical && "focus:shadow-glow-primary",
            error && "border-destructive focus:border-destructive focus:ring-destructive/20",
            className
          )}
          ref={ref}
          {...props}
        />
        {remaining !== undefined && (
          <div className={cn(
            "text-xs",
            remaining < 50 ? "text-destructive" : "text-muted-foreground"
          )}>
            လက်ရှိကျန်ဆုံး စာလုံး: {remaining}
          </div>
        )}
        {error && (
          <p className="text-xs text-destructive">{error}</p>
        )}
      </div>
    );
  }
);

FormTextarea.displayName = "FormTextarea";

export { FormTextarea };