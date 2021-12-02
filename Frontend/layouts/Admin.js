import React from "react";
import Router from "next/router";
import { useEffect } from "react";
// components

import AdminSidebar from "components/Sidebar/AdminSidebar.js";


export default function Admin({ children }) {
  useEffect(() => {
    const user = JSON.parse(window.localStorage.getItem("User"))
    const isAdmin = user ? user.rol === 1 : false;
    if (!isAdmin) Router.push("/")
  })
  return (
    <>
      <AdminSidebar/>
      <div className="relative md:ml-64">
        <div className="px-4 md:px-10 mx-auto w-full py-8">
          {children}
        </div>
      </div>
    </>
  );
}