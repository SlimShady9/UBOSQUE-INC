import React from "react";
import Link from "next/link";
import { useState } from "react";
import Router from "next/router";
import Swal from 'sweetalert2/dist/sweetalert2.js'

// layout for page

import Auth from "layouts/Auth.js";



export default function Login() {
  const [correo, setCorreo] = useState("slim.shady99q@gmail.com");
  const [clave, setClave] = useState("Mivida123");
  const iniciarSesion  = async event => {
    event.preventDefault()
    const usuario = {
      correo: correo,
      clave: clave,
    };
    const res = await fetch('http://localhost:8080/api/v1/auth/authentication/', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(usuario),
    })
    const data = await res.json();
    if (res.ok == true) {
      console.log(data);
      localStorage.setItem('Token', data.Token);
      localStorage.setItem('User', JSON.stringify(data.User));
      console.log(localStorage.getItem('User'));
      const ruta = data.User.rol == 1 ? "/admin/dashboard" : "/user/dashboard";
      Router.push(ruta)
    } else {
      console.log(data);
    }
  }
  return (
    <>
      <div className="container mx-auto px-4 h-full">
        <div className="flex content-center items-center justify-center h-full">
          <div className="w-full lg:w-4/12 px-4">
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0"> 
              <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                <div className="text-blueGray-400 text-center mb-3 font-bold">
                  <h4 className="p-4">Inicio de sesión</h4>
                </div>
                <form onSubmit={iniciarSesion}>
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Correo
                    </label>
                    <input
                      type="text"
                      value={correo}
                      onChange={(e) => setCorreo(e.target.value)}
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Ingrese su correo"
                    />
                  </div>

                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Contraseña
                    </label>
                    <input
                      type="password"
                      value={clave}
                      onChange={(e) => setClave(e.target.value)}
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Ingrese su contraseña"
                    />
                  </div>
                  <div className="text-center mt-6">
                    <button
                      className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                      type="submit"
                    >
                      Inciar sesión
                    </button>
                  </div>
                </form>
              </div>
            </div>
            <div className="flex flex-wrap mt-6 relative">
              <div className="w-1/2">
                <a
                  href="#pablo"
                  onClick={(e) => e.preventDefault()}
                  className="text-blueGray-200"
                >
                  <small>Olvidaste la contraseña?</small>
                </a>
              </div>
              <div className="w-1/2 text-right">
                <Link href="/auth/register">
                  <a href="#pablo" className="text-blueGray-200">
                    <small>Crear nueva cuenta</small>
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

Login.layout = Auth;
