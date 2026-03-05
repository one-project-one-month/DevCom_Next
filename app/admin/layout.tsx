import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { DesktopSidebar } from "./_components/sidebar";
import AdminHeader from "./_components/header";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();

  // UI-prep guard: uses cookie role until backend auth is integrated.
  const role = cookieStore.get("admin_role")?.value ?? "ADMIN";

  if (role !== "ADMIN") {
    redirect("/admin/not-authorized");
  }

  return (
    <div className="flex h-screen bg-background">
      <DesktopSidebar />

      <div className="flex flex-1 flex-col">
        <AdminHeader />
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
}
