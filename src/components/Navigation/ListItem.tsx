import Link from "next/link";

import { cn } from "@/lib/utils";

type ListItemProps = {
  title: string;
  path: string;
  isActive: boolean;
  className?: string;
};

const ListItem = ({ title, path, isActive, className }: ListItemProps) => {
  return (
    <Link
      href={path}
      className={cn(
        "flex select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-[#624DE3]",
        isActive && "bg-accent text-[#624DE3]",
        className,
      )}
    >
      <div className="text-sm font-medium leading-none">{title}</div>
    </Link>
  );
};

export default ListItem;
