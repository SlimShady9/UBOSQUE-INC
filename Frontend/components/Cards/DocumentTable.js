import React from "react";
import PropTypes from "prop-types";
import Link from "next/dist/client/link";
import Swal from "sweetalert2";
import { useState, useEffect } from "react"
// components

import TableDropdownDocument from "components/Dropdowns/TableDropdownDocument.js";

export default function DocumentTable({ color }, orden) {

  const [datos, setdatos] = useState([])

  useEffect(() => {
    fetch ("http://localhost:8080/api/v1/documents/"+JSON.parse(localStorage.getItem("User")).id)
    .then(response => {
      if (response.ok) {
        return response.json()
      } throw response 
    })
    .then(data => {
      console.log(data)
      setdatos(data)
      }) 
    .catch(() => Swal.fire("Error","Error en el servidor, intentelo más tarde", "error"))
  }, [])


  return (
    <>
      <div
        className={
          "relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded " +
          (color === "light" ? "bg-white" : "bg-blueGray-700 text-white")
        }
      >
        <div className="rounded-t mb-0 px-4 py-3 border-0">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full px-4 max-w-full flex-grow flex justify-between">
              <h3
                className={
                  "font-semibold text-lg " +
                  (color === "light" ? "text-blueGray-700" : "text-white")
                }
              >
                Documentos
              </h3>
              <Link href="/user/upload">
                <button
                className="bg-blueGray-700 text-white active:bg-blueGray-600 text-xs font-bold uppercase px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-150"
                >
                  Sube un nuevo documento
                </button>
              </Link>
            </div>
          </div>
        </div>
        <div className="block w-full overflow-x-auto">
          {/* Projects table */}
          <table className="items-center w-full bg-transparent border-collapse">
            <thead>
              <tr>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-blueGray-600 text-blueGray-200 border-blueGray-500")
                  }
                >
                  REFERENCIA
                </th>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-blueGray-600 text-blueGray-200 border-blueGray-500")
                  }
                >
                  NÚMERO DE ORDENES
                </th>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-blueGray-600 text-blueGray-200 border-blueGray-500")
                  }
                ></th>
              </tr>
            </thead>
            <tbody>
              {datos.map(i =>
              (<tr key={i.id}>
                <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left flex items-center">
                  <span
                    className={
                      "ml-3 font-bold " +
                      +(color === "light" ? "text-blueGray-600" : "text-white")
                    }
                    >
                    {i.reference}
                  </span>
                </th> 
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                  {i.order.length}
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-right">
                  <TableDropdownDocument/>
                </td>
              </tr>)
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

DocumentTable.defaultProps = {
  color: "light",
};

DocumentTable.propTypes = {
  color: PropTypes.oneOf(["light", "dark"]),
};
