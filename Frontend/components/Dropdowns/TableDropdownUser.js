import React from "react";
import { createPopper } from "@popperjs/core";
import Swal from 'sweetalert2'

const NotificationDropdown = ({id, users, setUsers}) => {
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

  const eliminar = async (id) => {
    const res= await fetch("http://localhost:8080/api/v1/users/" + id, {
      method: "DELETE"
    })
    if (res.ok === true) {
      Swal.fire("Exito","usuario eliminado exitosamente","success")
      setUsers(users.filter(user => user.id !== id))
    }else{
      Swal.fire("Error","No se pudo eliminar, intentelo mas tarde","error")
    }
  }

  const eli = (id) => {
    Swal.fire({
      title: 'Esta seguro?',
      text: "¿Quiere eliminar este usuario?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        eliminar(id)
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
        <a
          href="#pablo"
          className={
            "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
          }
          onClick={(e) => e.preventDefault()}
        >
          Editar
        </a>
        <a
          href="#pablo"
          className={
            "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
          }
          onClick={() => eli(id)}
        >
          Eliminar
        </a>
      </div>
    </>
  );
};

export default NotificationDropdown;
