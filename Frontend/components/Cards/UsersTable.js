import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
// components

import TableDropdown from "components/Dropdowns/TableDropdownUser.js";

export default function UsersTable({ color }) {
  const [users, setUsers] = useState([]);
  let pagination = 10
  const [selectedUsers, setSelectedUsers] = useState([]);
  
  const nextPagination = () => {
    if (selectedUsers.length < users.length) {
      setSelectedUsers(users.slice(selectedUsers.length, selectedUsers.length + pagination));
      pagination += pagination;
    }
  };

  const prevPagination = () => {
    if (selectedUsers.length > 0) {
      setSelectedUsers(users.slice(selectedUsers.length - pagination, selectedUsers.length));
      pagination -= pagination;
    }
  };

  useEffect(() => {
    fetch("http://localhost:8080/api/v1/users")
      .then((res) => res.json())
      .then((data) => {
        const data2 = data.filter((user) => user.id !== JSON.parse(localStorage.getItem("User")).id);
        setUsers(data2);
        setSelectedUsers(data2.slice(0, pagination));
      });
  }, []);

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
            <div className="relative w-full px-4 max-w-full flex-grow flex-1">
              <h3
                className={
                  "font-semibold text-lg " +
                  (color === "light" ? "text-blueGray-700" : "text-white")
                }
              >
                Lista de usuarios
              </h3>
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
                  Nombre
                </th>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-blueGray-600 text-blueGray-200 border-blueGray-500")
                  }
                >
                  Tipo de documento
                </th>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-blueGray-600 text-blueGray-200 border-blueGray-500")
                  }
                >
                  Numero documento
                </th>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-blueGray-600 text-blueGray-200 border-blueGray-500")
                  }
                >
                  Rol
                </th>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-blueGray-600 text-blueGray-200 border-blueGray-500")
                  }
                >
                  Correo
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
              {selectedUsers.map((i) => (
                <tr key={i.id}>
                  <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs text-left whitespace-nowrap p-4">
                    <h4
                      className={
                        "ml-3 font-bold" +
                        +(color === "light"
                          ? "text-blueGray-600"
                          : "text-white")
                      }
                    >
                      {i.nombre}
                    </h4>
                  </th>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    {i.tipoDocumento}
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    {i.documento}
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    {(i.rol === 1 ? "Administrador" : "Usuario")}
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    {i.correo}
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-right">
                    <TableDropdown id = {i.id} users={users} setUsers={setUsers} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
        </div>
        <div className={"static w-full px-4 py-3 flex items-center justify-between border-t sm:px-6" + 
        (color === "light" ? "bg-white" : "bg-blueGray-700 text-white")}>
            <div className="flex-1 flex justify-between sm:hidden">
              <button onClick={() => prevPagination()}
              className={"relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md"+
              (color === "light" ? "bg-white" : "bg-blueGray-700 text-white")}>
                Anterior
              </button>
              <button onClick={() => nextPagination()}
              className={"relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md"+
              (color === "light" ? "bg-white" : "bg-blueGray-700 text-white")}>
                Siguiente
              </button>
            </div>
        </div>
      </div>
    </>
  );
}

UsersTable.defaultProps = {
  color: "light",
};

UsersTable.propTypes = {
  color: PropTypes.oneOf(["light", "dark"]),
};
