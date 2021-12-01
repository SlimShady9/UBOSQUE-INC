import React from "react";

// components

import AdminDocumentsChart from "components/Cards/AdminDocumentsChart.js";
import AdminUserChart from "components/Cards/AdminUserChart";

// layout for page

import Admin from "layouts/Admin.js";

export default function Dashboard() {
  return (
    <>
      <div className="flex flex-wrap md:items-center">
        <div className="w-full xl:w-8/12 mb-12 mx-auto xl:mb-0 px-4">
          <AdminDocumentsChart />
        </div>
        <div className="w-full xl:w-8/12 mx-auto px-4">
          <AdminUserChart />
        </div>
      </div>
    </>
  );
}

Dashboard.layout = Admin;
