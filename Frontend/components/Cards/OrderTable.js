import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import { useRouter } from 'next/router'

// components

export default function OrderTable({ color }) {

  const router = useRouter();
  const [orders, setOrders] = useState([]);
  const { id } = router.query;
  let pagination = 10;
  const [selectedOrders, setSelectedOrders] = useState([]);

  const nextPagination = () => {
    if (selectedOrders.length < orders.length) {
      setSelectedOrders(orders.slice(selectedOrders.length, selectedOrders.length + pagination));
      pagination += pagination;
    }
  };

  const prevPagination = () => {
    if (selectedOrders.length > 0) {
      setSelectedOrders(orders.slice(selectedOrders.length - pagination, selectedOrders.length));
      pagination -= pagination;
    }
  };
  // Llamada al api de la orden
  const getOrder = async () => {
    const URL = process.env.NODE_ENV === 'production' ? 'https://mondsinc.herokuapp.com/api/v1/documents/' : 'http://localhost:8080/api/v1/documents/';
    const response = await fetch(`${URL}${id}`);
    const data = await response.json();
    setOrders(data.order);
    setSelectedOrders(orders.slice(0, pagination));
  };

  useEffect(async () => {
    await getOrder();
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
            <div className="relative w-full px-4 max-w-full flex-grow flex justify-between">
              <h3
                className={
                  "font-semibold text-lg " +
                  (color === "light" ? "text-blueGray-700" : "text-white")
                }
              >
                Información del documento
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
                  DOCUMENTO
                </th>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-blueGray-600 text-blueGray-200 border-blueGray-500")
                  }
                >
                  NOMBRE CONTRIBUYENTE
                </th>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-blueGray-600 text-blueGray-200 border-blueGray-500")
                  }
                >
                  AÑO
                </th>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-blueGray-600 text-blueGray-200 border-blueGray-500")
                  }
                >
                  MES
                </th>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-blueGray-600 text-blueGray-200 border-blueGray-500")
                  }
                >
                  ESTADO PENSIÓN
                </th>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-blueGray-600 text-blueGray-200 border-blueGray-500")
                  }
                >
                  ESTADO SALUD
                </th>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-blueGray-600 text-blueGray-200 border-blueGray-500")
                  }
                >
                  ESTADO ARL
                </th>
              </tr>
            </thead>
            <tbody>
              {selectedOrders.map((order) => (
              <tr key={order.id}>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                  {order.tpDocumment}
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                  {order.nomContributor}
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                  {order.year}
                </td> 
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                  {order.month}
                </td>  
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                  {order.estadoPension}
                </td> 
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                  {order.estadoSalud}
                </td> 
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                  {order.estadoArl}
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

OrderTable.defaultProps = {
  color: "light",
};

OrderTable.propTypes = {
  color: PropTypes.oneOf(["light", "dark"]),
};
