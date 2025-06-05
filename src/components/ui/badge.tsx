import { type TRANSACTION_STATUS } from "@prisma/client";
import { type VariantProps, cva } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

type Variant = {
  variant: Record<
    "default" | "secondary" | "destructive" | "outline" | "success" | "error",
    string
  >;
  colorScheme: Record<keyof typeof TRANSACTION_STATUS | "default", string>;
};

const badgeVariants = cva<Variant>(
  "inline-flex uppercase font-mono items-center rounded-md border px-2.5 py-2 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80",
        outline: "text-foreground",
        success: "bg-[#EBF9F1] text-[#1F9254] border-transparent",
        error: "bg-[#FDEDED] text-[#D92D20] border-transparent",
      },
      colorScheme: {
        // Default scheme
        default:
          "bg-slate-100 text-slate-800 hover:bg-slate-200 dark:bg-slate-700 dark:text-slate-100 dark:hover:bg-slate-600",

        // Transaction status schemes

        // Delivery status schemes
        DIANTAR_SEBAGIAN:
          "bg-slate-100 text-slate-800 hover:bg-slate-200 dark:bg-slate-700 dark:text-slate-100 dark:hover:bg-slate-600",
        DIPROSES:
          "bg-indigo-100 text-indigo-800 hover:bg-indigo-200 dark:bg-indigo-900/30 dark:text-indigo-400 dark:hover:bg-indigo-900/50",

        SELESAI:
          "bg-teal-100 text-teal-800 hover:bg-teal-200 dark:bg-teal-900/30 dark:text-teal-400 dark:hover:bg-teal-900/50",
      },
    },
    defaultVariants: {
      variant: "default",
      colorScheme: "default",
    },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, colorScheme, ...props }: BadgeProps) {
  return (
    <div
      className={cn(badgeVariants({ variant, colorScheme }), className)}
      {...props}
    />
  );
}

export { Badge, badgeVariants };
