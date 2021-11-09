import React from "react";
import Router from "next/router";
import { useEffect } from "react";
// components

import AdminNavbar from "components/Navbars/AdminNavbar.js";
import AdminSidebar from "components/Sidebar/AdminSidebar.js";
import HeaderStats from "components/Headers/HeaderStats.js";
import FooterAdmin from "components/Footers/FooterAdmin.js";


export default function Admin({ children }) {
  useEffect(() => {
    const user = JSON.parse(window.localStorage.getItem("User"))
    const isAdmin = user ? user.rol === 1 : false;
    if (!isAdmin) Router.push("/")
  })
  return (
    <>
      <AdminSidebar/>
      <div className="relative md:ml-64 bg-blueGray-100">
        <AdminNavbar />
        {/* Header */}
        <HeaderStats />
        <div className="px-4 md:px-10 mx-auto w-full -m-24">
          {children}
          <FooterAdmin />
        </div>
      </div>
    </>
  );
}