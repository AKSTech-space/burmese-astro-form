import { cn } from "@/lib/utils";

interface StatusBadgeProps {
  isRequired: boolean;
  className?: string;
}

export function StatusBadge({ isRequired, className }: StatusBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2 py-1 rounded-full text-xs font-medium transition-colors",
        isRequired
          ? "bg-destructive/20 text-destructive border border-destructive/30"
          : "bg-success/20 text-success border border-success/30",
        className
      )}
    >
      {isRequired ? "လိုအပ်" : "OK"}
    </span>
  );
}