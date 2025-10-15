import React from "react";
import Sidebar from "../../components/admin/Sidebar";

export default function CategoryLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-yellow-50 ">
      <Sidebar />
      <main className="flex-1 p-10 ml-64 overflow-y-auto">{children}</main>
    </div>
  );
}
