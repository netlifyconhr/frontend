import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/context/AuthContext";
import { AvatarFallback } from "@radix-ui/react-avatar";
import { LogOut, User2Icon } from "lucide-react";
const getInitials = (fullName?: string): string => {
  if (!fullName) return "";

  const words = fullName.trim().split(" ");

  const first = words[0]?.[0] || "";
  const last = words.length > 1 ? words[words.length - 1] : "";

  return `${first}${last.charAt(0).toUpperCase()}`;
};

export default function AuthUser() {
  const { logout: logoutFn, user } = useAuth();
  console.log(getInitials(user?.name));
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="text-white font-semibold text-sm flex items-center justify-center uppercase">
          {getInitials(user?.name)}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent asChild>
        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-gray-200">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <button className=" cursor-pointer">
              <User2Icon />
              Profile
            </button>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <button onClick={logoutFn} className=" cursor-pointer">
              <LogOut />
              Logout
            </button>
          </DropdownMenuItem>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
