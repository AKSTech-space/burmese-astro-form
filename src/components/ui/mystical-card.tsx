import * as React from "react";
import { cn } from "@/lib/utils";

interface MysticalCardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "cosmic" | "floating";
  glow?: boolean;
}

const MysticalCard = React.forwardRef<HTMLDivElement, MysticalCardProps>(
  ({ className, variant = "default", glow = false, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "bg-card border border-border shadow-card backdrop-blur-sm rounded-lg",
          {
            "bg-gradient-to-br from-card to-card-secondary": variant === "cosmic",
            "animate-cosmic-float": variant === "floating",
            "animate-mystical-glow": glow,
          },
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

MysticalCard.displayName = "MysticalCard";

const MysticalCardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("p-6 pb-4", className)}
    {...props}
  />
));

MysticalCardHeader.displayName = "MysticalCardHeader";

const MysticalCardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "text-xl font-semibold leading-none tracking-tight text-card-foreground",
      className
    )}
    {...props}
  />
));

MysticalCardTitle.displayName = "MysticalCardTitle";

const MysticalCardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground mt-2", className)}
    {...props}
  />
));

MysticalCardDescription.displayName = "MysticalCardDescription";

const MysticalCardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
));

MysticalCardContent.displayName = "MysticalCardContent";

export {
  MysticalCard,
  MysticalCardHeader,
  MysticalCardTitle,
  MysticalCardDescription,
  MysticalCardContent,
};