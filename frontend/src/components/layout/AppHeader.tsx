import { Bell } from "lucide-react";
import { Avatar, AvatarFallback } from "../ui/avatar";
// import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export function AppHeader() {
  return (
    <header className="h-16 border-b px-6 flex items-center justify-between">
      <div>
        <h1 className="font-semibold text-2xl">
          Dashboard
        </h1>

        <p className="text-muted-foreground text-sm">
          Welcome back, Procurement Officer
        </p>
      </div>

      <div className="flex items-center gap-4">
        <Bell className="h-5 w-5" />

        <Avatar>
          <AvatarFallback>PD</AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}