import React from "react";

// components

import DocumentTable from "components/Cards/DocumentTable";

// layout for page

import User from "layouts/User";

export default function Tables() {
  return (
    <>
      <div className="flex flex-wrap mt-4">
        <div className="w-full mb-12 px-4">
          <DocumentTable />
        </div>
      </div>
    </>
  );
}

Tables.layout = User;
