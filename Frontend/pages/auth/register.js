import React from "react";
import Swal from 'sweetalert2';
// layout for page

import Auth from "layouts/Auth.js";

export default function Register() {
  
  async function registrarUsuario(event) {
    event.preventDefault();
    if (event.target.clave.value !== event.target.confirmar.value) {
      Swal.fire('Error', 'Sus claves no coinciden', 'error')
    } else {
      const URL = process.env.NODE_ENV === 'production' ? 'https://mondsinc.herokuapp.com/api/v1/users/' : 'http://localhost:8080/api/v1/users/';
      const res = await fetch(URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ 
          nombre: event.target.nombre.value,
          correo: event.target.email.value,
          documento: event.target.documento.value,
          tipoDocumento: event.target.tipo.value,
          clave: event.target.clave.value,
          rol: 2
        })
      })
      if (res.ok) {
        Swal.fire('Exito', 'Usuario registrado exitosamente', 'success')
      } else {
        Swal.fire('Error', 'Usuario no registrado', 'error')
      }
    }
  }
  // validaciones

  return (
    <>
      <div className="container mx-auto px-4 h-full">
        <div className="flex content-center items-center justify-center h-full">
          <div className="w-full lg:w-6/12 px-4">
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">
              <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                <div className="text-blueGray-400 text-center mb-3 font-bold">
                  <h4 className="p-4">Registrate</h4>
                </div>
                <form onSubmit={registrarUsuario}>
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Nombre
                    </label>
                    <input name = "nombre" pattern="[a-zA-Z??????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????? ,.'-]{2,48}" required  type="text" className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" />
                  </div>

                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Email
                    </label>
                    <input name = "email" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
                    required  type="email"  className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" />
  
                  </div>

                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Documento
                    </label>
                    <input name="documento" pattern={ '((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])'}
                    required  type="number" className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" />
                  </div>
                  
                  <div className="flex flex-col relative w-full mb-3">
                    <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                    Tipo documento
                    </label>
                    <select name="tipo" className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" >
                        <option value="CC">
                          CC
                        </option>
                        <option value="NIT">
                          NIT
                        </option>
                      </select>
                  </div>

                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Contrase??a
                    </label>
                    <input
                      type="password"
                      name="clave"
                      minLength="8"
                      maxLength="12"
                      required
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Ingresar contrase??a"
                    />
                  </div>

                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Confirmar contrase??a
                    </label>
                    <input
                      type="password"
                      required
                      name="confirmar"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Confirmar contrase??a"
                    />
                  </div>

                  <div className="text-center mt-6">
                    <button 
                      className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                      type="submit"
                    >
                      Registrarse
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

Register.layout = Auth;
