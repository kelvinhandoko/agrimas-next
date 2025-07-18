import { MoreVertical } from "lucide-react";
import { forwardRef } from "react";

import { cn } from "@/lib/utils";

import { Button } from "./ui/button";

interface DropdownTriggerIconProps {
  className?: string;
}

const DropdownTriggerIcon = forwardRef<
  HTMLButtonElement,
  DropdownTriggerIconProps
>(({ className, ...props }, ref) => (
  <Button
    ref={ref}
    variant="ghost"
    className={cn("h-8 w-8 p-0 data-[state=open]:bg-muted", className)}
    {...props}
  >
    <span className="sr-only">Buka menu</span>
    <MoreVertical className="h-4 w-4" />
  </Button>
));

DropdownTriggerIcon.displayName = "DropdownTriggerIcon";
export default DropdownTriggerIcon;
