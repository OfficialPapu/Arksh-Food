import { AdminHeader } from "@/Components/Admin/Layout/Navbar";

export default function AdminLayout({ children }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <AdminHeader />
      <div className="flex">
        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}
