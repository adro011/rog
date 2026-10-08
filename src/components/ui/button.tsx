import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 font-medium transition-[opacity,transform,background-color,color] duration-150 ease-out active:not-disabled:scale-[0.96] disabled:opacity-40 disabled:pointer-events-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
  {
    variants: {
      variant: {
        primary: "bg-ink text-accent-fg hover:opacity-90",
        ghost:
          "bg-transparent text-ink hover:bg-surface border border-transparent hover:border-line",
        outline: "border border-line text-ink hover:bg-surface bg-transparent",
        ember: "bg-ember text-ink hover:opacity-90",
      },
      size: {
        sm: "h-10 px-3.5 text-sm rounded-lg",
        md: "h-12 px-5 text-sm rounded-xl",
        lg: "h-14 px-6 text-base rounded-2xl",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

export function Button({
  className,
  variant,
  size,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants>) {
  return (
    <button className={cn(buttonVariants({ variant, size }), className)} {...props} />
  );
}
