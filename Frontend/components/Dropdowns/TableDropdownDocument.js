import React, { useEffect } from "react";
import { createPopper } from "@popperjs/core";
import Swal from 'sweetalert2'
import Link from "next/link";

const TableDropdownDocument = ({id}) => {
  // dropdown props
  const [dropdownPopoverShow, setDropdownPopoverShow] = React.useState(false);
  const btnDropdownRef = React.createRef();
  const popoverDropdownRef = React.createRef();
  const openDropdownPopover = () => {
    createPopper(btnDropdownRef.current, popoverDropdownRef.current, {
      placement: "left-start",
    });
    setDropdownPopoverShow(true);
  };
  const closeDropdownPopover = () => {
    setDropdownPopoverShow(false);
  };

  const eliminar = async () => {
    const URL = process.env.NODE_ENV === 'production' ? 'https://mondsinc.herokuapp.com/api/v1/documents/' : 'http://localhost:8080/api/v1/documents/';
    const res = await fetch(URL + id, {
      method: "DELETE"
    });
    if (res.ok === true) {
      Swal.fire("Exito", "Documento eliminado exitosamente", "success")
      //setUsers(users.filter(user => user.id !== id))
    } else {
      Swal.fire("Error", "No se pudo eliminar, intentelo mas tarde", "error")
    }
  }


  const eli = () => {
    Swal.fire({
      title: '¿Esta seguro?',
      text: "¿Quiere eliminar este documento?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        eliminar()
      }
    })
  }


  return (
    <>
      <a
        className="text-blueGray-500 py-1 px-3"
        href="#pablo"
        ref={btnDropdownRef}
        onClick={(e) => {
          e.preventDefault();
          dropdownPopoverShow ? closeDropdownPopover() : openDropdownPopover();
        }}
      >
        <i className="fas fa-ellipsis-v"></i>
      </a>
      <div
        ref={popoverDropdownRef}
        className={
          (dropdownPopoverShow ? "block " : "hidden ") +
          "bg-white text-base z-50 float-left py-2 list-none text-left rounded shadow-lg min-w-48"
        }
      >
        <Link
          href={"/user/document/" + id}
        >
          <button
            className={
              "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
            }
          > Ver más dsetalle</button>
        </Link>
        <button
          className={
            "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
          }
          
          onClick={() => eli()}
        >
          Eliminar
        </button>
      </div>
    </>
  );
};

export default TableDropdownDocument;
