"use client";

import { type FC } from "react";

import { cn } from "@/lib/utils";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface DialogWrapperProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
  trigger?: React.ReactNode;
  title?: string;
  className?: string;
}

const DialogWrapper: FC<DialogWrapperProps> = ({
  children,
  onOpenChange,
  open,
  className,
  trigger,
  title,
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
      <DialogContent className={cn("max-w-2xl", className)}>
        <DialogDescription className="hidden">hidden</DialogDescription>
        <DialogHeader>
          <DialogTitle hidden={!title}>{title ?? "default title"}</DialogTitle>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
};

export default DialogWrapper;
