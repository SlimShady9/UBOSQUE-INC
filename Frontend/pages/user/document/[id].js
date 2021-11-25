import React from "react";

// components

import OrderTable from "components/Cards/OrderTable.js";

// layout for page

import User from "layouts/User";

export default function Document() {
  return (
    <>
      <div className="flex flex-wrap mt-4">
        <div className="w-full mb-12 px-4">
          <OrderTable/>
        </div>
      </div>
    </>
  );
}

Document.layout = User;
