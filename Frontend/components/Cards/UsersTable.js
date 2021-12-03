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

  const handleInputChange = (event, i) => {
    setSelectedUsers(selectedUsers.map(user => (user.id === i.id ? { ...user, [event.target.name]: event.target.value } : user)));
  }

  const editUser = (i) => {
    i.rol = parseInt(i.rol);
    const URL = process.env.NODE_ENV === 'production' ? 'https://mondsinc.herokuapp.com/api/v1/users/' : 'http://localhost:8080/api/v1/users/';
    fetch(URL + i.id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
        },
      body: JSON.stringify(i)
      })
      .then((res) => res.json())
      .then((data) => {
        data.edit = false;
        console.log(data);
        setUsers(users.map(user => user.id === i.id ? {...data } : user));
        setSelectedUsers(users.slice(selectedUsers.length - pagination, selectedUsers.length));
      });
  }



  const cancelEdit = () => {
    setSelectedUsers(users.slice(selectedUsers.length - pagination, selectedUsers.length));
  };

  const retireveUsers = () => {
    const URL = process.env.NODE_ENV === 'production' ? 'https://mondsinc.herokuapp.com/api/v1/users' : 'http://localhost:8080/api/v1/users';
    fetch(URL)
      .then((res) => res.json())
      .then((data) => {
        const data2 = data.filter((user) => user.id !== JSON.parse(localStorage.getItem("User")).id);
        data2.forEach(element => {
          element.edit = false;
        });
        setUsers(data2);
        setSelectedUsers(data2.slice(0, pagination));
      });
    };

  useEffect( () => {
    retireveUsers();
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
              {selectedUsers.map(i => {
                if (!i.edit) {

                return (
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
                    <TableDropdown id = {i.id} users={selectedUsers} setUsers={setSelectedUsers} />
                  </td>
                </tr>
                )} else {
                  return (
                    
                    <tr key={i.id}>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 focus:border focus:border-blue-500 transition-colors duration-200">
                        <input value={i.nombre} name="nombre" onChange={e => handleInputChange(e, i)}
                        className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap py-3 text-black" />
                      </td>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                        <select value={i.tipoDocumento} name="tipoDocumento" onChange={e => handleInputChange(e, i)}
                        className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap py-3 text-black">
                          <option value="CC">CC</option>
                          <option value="NIT">NIT</option>
                        </select>
                      </td>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                        <input value={i.documento} name="documento" onChange={e => handleInputChange(e, i)}
                        className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap py-3 text-black" />
                      </td>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                        <select value={i.rol} name="rol"onChange={e => handleInputChange(e, i)} 
                        className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap py-3 text-black">
                          <option value={2}>Usuario</option>
                          <option value={1}>Administrador</option>
                        </select>
                      </td>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                        <input value={i.correo} name="correo" onChange={e => handleInputChange(e, i)}
                        className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap py-3 text-black" />
                      </td>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-right">
                        <div className="flex align-middle">
                        <button className="fas fa-check text-lg mx-4 px-3 text-blueGray-500"
                        onClick={() => editUser(i)}>
                        </button>
                        <button className="fas fa-times mx-4 px-3 text-lg text-blueGray-500"
                        onClick={() => cancelEdit()}>
                        </button>

                        </div>
                      </td>
                    </tr>
                   )
                }
              })}
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
