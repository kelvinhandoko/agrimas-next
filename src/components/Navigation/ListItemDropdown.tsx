import Link from "next/link";

import { cn } from "@/lib/utils";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type DropdownMenus = {
  title: string;
  path: string;
};

type ListItemDropdownProps = {
  title: string;
  path: string;
  isActive?: boolean;
  className?: string;
  dropdownMenus: DropdownMenus[];
};
const ListItemDropdown = ({
  title,
  path,
  isActive,
  dropdownMenus,
}: ListItemDropdownProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={cn(
          "flex select-none space-y-1 rounded-md p-3 font-medium leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-[#624DE3]",
          isActive && "bg-accent text-[#624DE3]",
        )}
      >
        {title}
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>
          <Link href={path}>{title}</Link>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {dropdownMenus.map((menu, index) => (
          <Link href={menu.path} key={index}>
            <DropdownMenuItem className={cn("cursor-pointer")}>
              {menu.title}
            </DropdownMenuItem>
          </Link>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ListItemDropdown;
