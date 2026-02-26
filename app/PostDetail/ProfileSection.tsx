
import { Avatar } from "@/components/ui/avatar";
import profile from "@/assets/img/default.png";
import { Ellipsis } from "lucide-react";

export const ProfileSection = () => {
  return (
    <div className="flex items-center  justify-between">
      <div className="flex items-center gap-3">
        <Avatar size="lg">
          <img src={profile.src ?? profile} alt="User Avatar" />
        </Avatar>
        <div>
          <p className="text-sm font-medium">John Doe</p>
          <p className="text-xs text-slate-500">Joined 2 years ago</p>
        </div>
      </div>
      <Ellipsis />
    </div>
  );
};
