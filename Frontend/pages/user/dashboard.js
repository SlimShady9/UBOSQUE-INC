import React from "react";
// components

import UserDocsChart from "components/Cards/UserDocsChart.js";
import UserOrdersChart from "components/Cards/UserOrdersChart.js";

// layout for page

import User from "layouts/User.js";

export default function Dashboard() {
  return (
    <>
      <div className="flex flex-wrap md:items-center">
        <div className="w-full xl:w-8/12 mb-12 mx-auto xl:mb-0 px-4">
          <UserDocsChart/>
        </div>
        <div className="w-full xl:w-8/12 mx-auto px-4">
          <UserOrdersChart/>
        </div>
      </div>
    </>
  );
}

Dashboard.layout = User;
