"use client";

import { useEffect, useState } from "react";
import {
  Search,
  MoreHorizontal,
  ShieldCheck,
  UserX,
} from "lucide-react";

import { User } from "../_data/admin";
import { fetchUsers } from "../_data/admin-service";

import { DataTable, Column, Action } from "../_components/data-table";
import Pagination from "../_components/pagination";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

export default function UsersPage() {
  
  const [users, setUsers] = useState<User[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const limit = 10;

  const loadUsers = async () => {
    const res = await fetchUsers(page, limit, search);
    setUsers(res.data);
    setTotalPages(res.totalPages);
  };

  useEffect(() => {
    loadUsers();
  }, [page, search]);

  const columns: Column<User>[] = [
    {
      header: "Developer",
      accessor: (user) => (
        <div className="flex items-center gap-3">
          <Avatar className="h-9 w-9 border border-slate-200">
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback className="bg-primary-dull/10 text-primary font-bold">
              {user.name.substring(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="font-medium text-slate-900 dark:text-slate-100 leading-none">
              {user.name}
            </span>
            <span className="text-xs text-slate-500">{user.handle}</span>
          </div>
        </div>
      ),
    },
    {
      header: "Email",
      accessor: (user) => (
        <span className="text-slate-600 dark:text-slate-400 text-sm">
          {user.email}
        </span>
      ),
    },
    {
      header: "Role",
      accessor: (user) => (
        <Badge
          variant="outline"
          className={
            user.role === "ADMIN"
              ? "border-primary text-primary bg-primary-dull/10"
              : "border-slate-200 text-slate-600 bg-slate-50"
          }
        >
          {user.role}
        </Badge>
      ),
    },
    {
      header: "Status",
      accessor: (user) => (
        <div className="flex items-center gap-1.5">
          <div
            className={`h-2 w-2 rounded-full ${user.status === "ACTIVE" ? "bg-green-500" : "bg-slate-300"}`}
          />
          <span
            className={`text-xs font-medium ${user.status === "ACTIVE" ? "text-green-700" : "text-slate-500"}`}
          >
            {user.status}
          </span>
        </div>
      ),
    },
    {
      header: "Joined At",
      accessor: (user) => (
        <span className="text-slate-500 text-sm">
          {new Date(user.joinedAt).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}
        </span>
      ),
    },
  ];

  const actions: Action<User>[] = [
    {
      label: "View Profile",
      icon: <MoreHorizontal className="w-4 h-4" />,
      onClick: (row) => console.log("View", row),
    },
    {
      label: "Promote to Admin",
      icon: <ShieldCheck className="w-4 h-4" />,
      onClick: (row) => console.log("Promote", row),
    },
    {
      label: "Suspend User",
      icon: <UserX className="w-4 h-4" />,
      onClick: (row) => console.log("Suspend", row),
    },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border shadow-sm">
        <div className="relative w-full md:max-w-half">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
          <Input
            placeholder="Search by name, handle or email..."
            className="pl-10 h-10 border-slate-200 focus-visible:ring-primary transition-all"
            value={search}
            onChange={(e) => {
              setPage(1);
              setSearch(e.target.value);
            }}
          />
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-xl border shadow-sm overflow-hidden">
        <DataTable<User> data={users} columns={columns} actions={actions} />
      </div>

      <div className="flex items-center justify-between px-2">
        <p className="text-sm text-slate-500 italic">
          Showing page {page} of {totalPages}
        </p>
        <Pagination page={page} totalPages={totalPages} onChange={setPage} />
      </div>
    </div>
  );
}