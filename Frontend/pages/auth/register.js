import React from "react";
import { useState } from "react";
import { ErrorMessage } from "@hookform/error-message";
import { useForm } from 'react-hook-form';
// layout for page

import Auth from "layouts/Auth.js";

export default function Register() {
  
  const [confirmaClave, setConfirmaClave] = useState('');
  async function registrarUsuario(event) {

    if (datosUsuario.clave !== confirmaClave) {
      alert('Sus clave no coinciden >:c')
    } else {
      const res = await fetch('http://localhost:8080/api/v1/users/', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(datosUsuario)
      })
      if (res.ok) {
        alert('Usuario registrado exitosamente')
        console.log(res);
      } else {
        alert('Usuario no registrado')
      }
    }
  }
  // validaciones
  const {register, handleSubmit, formState: { errors } } = useForm({criteriaMode: "all"});

  const onSubmit = (data, e) => {
    console.log(data)
    e.target.reset()
  }

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
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Nombre
                    </label>
                    <input {...register('Nombre', { required: 'debe llenar el campo'} )}  
                    pattern={ '[a-zA-Z]+[a-zA-Z]'} required  type="text" className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" />
                    <ErrorMessage
                      errors={errors}
                      name="Nombre"
                      render={({ messages }) => {
                        console.log("messages", messages);
                        return messages
                          ? Object.entries(messages).map(([type, message]) => (
                              <p key={type} className="m-2 text-xs">{message}</p>
                            )): <p>no hay error</p>
                      }}
                    />
                  </div>

                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Email
                    </label>
                    <input {...register('Email', { required:'debe llenar el campo' })} pattern={ '/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,'}
                    required  type="email"  className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" />
                    <ErrorMessage
                      errors={errors}
                      name="Email"
                      render={({ messages }) => {
                        console.log("messages", messages);
                        return messages
                          ? Object.entries(messages).map(([type, message]) => (
                              <p key={type} className="m-2 text-xs">{message}</p>
                            )): <p>no hay error</p>
                      }}
                    />
                  </div>

                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Documento
                    </label>
                    <input {...register('Documento', { required: true.valueOf, required:'debe llenar el campo' })} pattern={ '((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])'}
                    required  type="number" className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" />
                    <ErrorMessage
                      errors={errors}
                      name="Documento"
                      render={({ messages }) => {
                        console.log("messages", messages);
                        return messages
                          ? Object.entries(messages).map(([type, message]) => (
                              <p key={type} className="m-2 text-xs">{message}</p>
                            )): <p>no hay error</p>
                      }}
                    />
                  </div>
                  
                  <div className="flex flex-col relative w-full mb-3">
                    <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                    Tipo documento
                    </label>
                    <select {...register('Tipo', { required: 'debe seleccionar el campo' })}  className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" >
                        <option value="C.C">
                          C.C
                        </option>
                        <option value="NIP">
                          NIP
                        </option>
                      </select>
                      <ErrorMessage
                      errors={errors}
                      name="Tipo"
                      render={({ messages }) => {
                        console.log("messages", messages);
                        return messages
                          ? Object.entries(messages).map(([type, message]) => (
                              <p key={type} className="m-2 text-xs">{message}</p>
                            )): <p>no hay error</p>
                      }}
                    />
                  </div>

                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Contraseña
                    </label>
                    <input {...register('Contraseña', { required: 'debe llenar el campo' })} className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" />
                    <ErrorMessage
                      errors={errors}
                      name="Contraseña"
                      render={({ messages }) => {
                        console.log("messages", messages);
                        return messages
                          ? Object.entries(messages).map(([type, message]) => (
                              <p key={type} className="m-2 text-xs">{message}</p>
                            )): <p>no hay error</p>
                      }}
                    />
                  </div>

                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Confirmar contraseña
                    </label>
                    <input {...register('Confirmar', { required: 'debe llenar el campo' })} className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" />
                    <ErrorMessage
                      errors={errors}
                      name="Confirmar"
                      render={({ messages }) => {
                        console.log("messages", messages);
                        return messages
                          ? Object.entries(messages).map(([type, message]) => (
                              <p key={type} className="m-2 text-xs">{message}</p>
                            )): <p>no hay error</p>
                      }}
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
