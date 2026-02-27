"use client";
import { Avatar } from "@/components/ui/avatar";
import profile from "@/assets/img/default.png";
import { Bookmark } from "lucide-react";
import { Button } from "@/components/ui/button";
import React from "react";

export const ProfileSection = () => {
  const [save, setSave] = React.useState(false);
  return (
    <div className="flex items-center  justify-between bg-slate-100 dark:bg-slate-800 p-4 rounded-md">
      <div className="flex items-center gap-3">
        <Avatar size="lg">
          <img src={profile.src ?? profile} alt="User Avatar" />
        </Avatar>
        <div>
          <p className="text-sm font-medium">John Doe</p>
          <p className="text-xs text-slate-500">Joined 2 years ago</p>
        </div>
      </div>
      <Button
        variant="outline"
        className={`px-3 py-1 ${save ? "bg-green-500 text-white" : ""}`}
        size="sm"
        onClick={() => setSave(!save)}
      >
        {save ? (
          <span className="flex items-center gap-1">
            <Bookmark className="h-4 w-4" />
            Saved
          </span>
        ) : (
          <span className="flex items-center gap-1">
            <Bookmark className="h-4 w-4" />
            Save
          </span>
        )}
      </Button>
    </div>
  );
};
