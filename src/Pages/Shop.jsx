import React from "react";
import { Link, Outlet } from "react-router";
import Sidebar from "../Components/Shop/Sidebar";

export default function Shop() {
  return (
    <section className=" my-8">
      <h1 className="text-3xl font-bold text-green-700 mb-6">Shop Page</h1>
      <section className="flex gap-6">
        <Sidebar />
        <section className="p-8 flex-grow border-2 border-green-900 rounded-2xl shadow-2xl bg-white">
          <Outlet />
        </section>
      </section>
    </section>
  );
}
