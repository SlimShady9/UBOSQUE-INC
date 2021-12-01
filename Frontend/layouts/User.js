import React from "react";
import Router from "next/router";
import { useEffect } from "react";
// components

import Sidebar from "components/Sidebar/UserSidebar";

export default function User({ children }) {
  useEffect(() => {
    const user = JSON.parse(window.localStorage.getItem("User"))
    const isAdmin = user ? user.rol === 2 : false;
    if (!isAdmin) Router.push("/")
  })

  return (
    <div>
      <Sidebar />
      <div className="relative md:ml-64 ">

        <div className="py-8 px-4 md:px-10 mx-auto w-full">
          {children}
        </div>
      </div>
    </div>
  );
}
