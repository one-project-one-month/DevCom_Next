import { redirect } from "next/navigation"
import { DesktopSidebar } from "./_components/sidebar"
import AdminHeader from "./_components/header"


export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  
  // Temporary mock admin
  const currentUser = {
    name: "Kyaw Hsan",
    role: "ADMIN", // change to USER to test 403
  }

  if (currentUser.role !== "ADMIN") {
    redirect("/admin/not-authorized")
  }

  return (
    <div className="flex h-screen bg-background">
      <DesktopSidebar />

      <div className="flex flex-col flex-1">
        <AdminHeader />
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  )
}