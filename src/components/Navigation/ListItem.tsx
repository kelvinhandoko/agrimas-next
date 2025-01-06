import Link from "next/link";

import { cn } from "@/lib/utils";

type ListItemProps = {
  title: string;
  path: string;
  isActive: boolean;
};

const ListItem = ({ title, path, isActive }: ListItemProps) => {
  return (
    <Link
      href={path}
      className={cn(
        "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-[#624DE3]",
        isActive && "bg-accent text-[#624DE3]",
      )}
    >
      <div className="text-sm font-medium leading-none">{title}</div>
    </Link>
  );
};

export default ListItem;
