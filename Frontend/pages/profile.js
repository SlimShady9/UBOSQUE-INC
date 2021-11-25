import React, { useState } from "react";
import { useRouter } from "next/router";
import Swal from "sweetalert2";

export default function Profile() {
  const router = useRouter()
  const [edit, setEdit] = useState(false)
  const goBack = () => router.back()
  const datosUsuario = {...JSON.parse(localStorage.getItem('User'))}
  
  var roles = "administrador"
  if (datosUsuario.rol === 2) {
    roles = "empleado"
  }

  // make a function that updates the user using the api
  const updateUser = async (e) => {
    e.preventDefault()
    const data = {
      nombre: e.target.nombre.value,
      correo: e.target.correo.value,
      documento: e.target.documento.value,
      tipoDocumento: e.target.tipoDocumento.value,
    }
    const response = await fetch(`http://localhost:8080/api/v1/users/${datosUsuario.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    const dataJson = await response.json()
    if (response.ok) {
      localStorage.setItem('User', JSON.stringify(dataJson))
      setEdit(false)
      Swal.fire({
        title: 'Actualizado',
        text: 'Se actualizó correctamente',
        icon: 'success',
        confirmButtonText: 'Ok'
      })
    } else {
      Swal.fire({
        title: 'Error',
        text: 'No se pudo actualizar',
        icon: 'error',
        confirmButtonText: 'Ok'
      })
    }
  }


  return (
    <>
      <main className="profile-page">
        <section className="relative block h-500-px">
          <div
            className="absolute top-0 w-full h-screen bg-center bg-cover"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1499336315816-097655dcfbda?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2710&q=80')",
            }}
          >
            <span
              id="blackOverlay"
              className="w-full h-full absolute opacity-50 bg-black"
            ></span>
          </div>
          <div
            className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden h-16"
            style={{ transform: "translateZ(0)" }}
          >
          </div>
        </section>
        <section className="relative py-16 ">
          <div className="container mx-auto px-4">
            <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-64">
              <div className="px-6">
                <div className="flex flex-wrap justify-center">
                  <div className="w-full lg:w-3/12 px-4 justify-center flex">
                    <div className="relative hidden lg:block">
                      <img
                        alt="..."
                        src="/img/team-2-800x800.jpg"
                        className="shadow-xl rounded-full h-auto align-middle border-none  -m-16 -ml-20 lg:-ml-16 max-w-150-px"
                      />
                    </div>
                  </div>
                  <div className="w-full lg:w-4/12 px-4 lg:text-right lg:self-center">
                    <div className="flex justify-between flex-col sm:flex-row py-6 px-3">
                      <button
                        onClick={goBack}
                        className="bg-blueGray-700 active:bg-blueGray-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150"
                        type="button"
                      >
                        Volver al dashboard
                      </button>
                      <button
                        onClick={() => setEdit(!edit)}
                        className="bg-blueGray-700 active:bg-blueGray-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 ease-linear transition-all duration-150"
                        type="button"
                      >
                        Editar perfil
                      </button>
                    </div>
                  </div>
                </div>
                <form className="text-center sm:mt-12" onSubmit={updateUser}>
                  {!edit ? (
                    <h3 className="text-4xl font-semibold leading-normal text-blueGray-700 mb-2">
                    {datosUsuario.nombre}
                    </h3>):
                    (
                    <div className="flex flex-col">
                      <label className="block text-sm font-bold mb-2 self-start">Nombre</label>
                      <input name="nombre" type="text" className="text-xl w-3/5 font-semibold leading-normal text-blueGray-700 focus:bg-gray-400 mb-2" defaultValue={datosUsuario.nombre}></input>
                    </div>
                    )}
                  
                  {edit ? ( <p>{}</p>):
                  (
                    <div className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
                    <i className="fas fa-user-tag mr-2 text-lg text-blueGray-400"></i>{" "}
                    {roles}
                  </div>
                  )}
                  <div className="mb-2 text-blueGray-600 mt-4">
                    {!edit ? (
                      <div>
                        <i className="fas fa-briefcase mr-2 text-lg text-blueGray-400"></i>
                        {datosUsuario.correo}
                      </div>):
                      (
                      <div className="flex flex-col">
                        <label className="block text-sm font-bold mb-2 self-start">Correo</label>
                        <input name="correo" type="text" className="text-xl w-3/5 font-semibold leading-normal text-blueGray-700 mb-2" defaultValue={datosUsuario.correo}></input>
                      </div>)}
                    
                  </div>
                  {!edit ? (
                    <div className="mb-8 text-blueGray-600">
                      <i className="far fa-id-card mr-2 text-lg text-blueGray-400"></i>
                      {datosUsuario.tipoDocumento} {datosUsuario.documento}
                    </div>):
                    (
                    <div className="flex gap-12 md:flex-row flex-col">
                      <div className="flex flex-col">
                        <label className="block text-sm font-bold mb-2 self-start">Documento</label>
                        <select name="tipoDocumento" className="text-xl w-3/5 font-semibold leading-normal text-blueGray-700 mb-2" selected={datosUsuario.tipoDocumento}>
                          <option value="CC">CC</option>
                          <option value="NIT">NIT</option>
                        </select>
                      </div>
                      <div className="flex flex-col w-full">
                        <label className="block text-sm font-bold mb-2 self-start">Tipo documento</label>
                        <input type="text" name="documento" className="text-xl w-3/5 font-semibold leading-normal text-blueGray-700 mb-2" defaultValue={datosUsuario.documento}></input>
                      </div>
                    </div>)}
                  {edit ? (
                    <button type="submit"
                    className="bg-blueGray-700 active:bg-blueGray-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-4 ease-linear transition-all duration-150"
                    >Guardar</button>
                  ) : (<p>{ }</p>)}
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}