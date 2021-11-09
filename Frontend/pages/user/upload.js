import React from "react";
import { useState } from "react";
import Swal from 'sweetalert2';
import Link from "next/dist/client/link";
// layout for page

export default function Upload() {
  const [nameFile, setNameFile] = useState("Selecciona un documento");
  const subirArchivo = async event => {
    event.preventDefault();
    if (event.target.archivo.value) {
      console.log('Todo gucci');
    } else Swal.fire("Error", "Debe seleccionar un archivo valido para subir", "error")
  }
  return (
    <>
     <div className=" w-screen h-screen  grid items-center bg-blueGray-800 bg-no-repeat bg-cover" style={{ backgroundImage: "url('/img/register_bg_2.png')", }}>
        <div className="flex content-center items-center justify-center h-full">
          <div className="w-full lg:w-6/12">
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">
              <div className="flex justify-between p-4">
                  <h4 className="text-xl text-gray-500 font-bold">Subir documento</h4>
                  <Link href="/user/tables" ><p className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded 
                  shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1  ease-linear transition-all duration-150">Volver</p></Link>
              </div>
              <form className="p-4" onSubmit={subirArchivo}>
                <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                      >
                        Tipo de solicitud
                      </label>
                      <input name = "solicitud" pattern="[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]{2,48}" required  type="text" className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" />
                </div>

                <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Número de referencia
                    </label>
                    <input name="referencia" pattern="d+"
                    required min="0" type="number" className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" />
                </div>

                <div className="relative w-full mb-3">
                  <label
                    className="w-64 flex justify-center px-4 py-6 bg-white rounded-md shadow-md tracking-wide uppercase border border-blue cursor-pointer hover:bg-purple-600 hover:text-white text-purple-600 ease-linear transition-all duration-150">
                    <i className="fas fa-cloud-upload-alt fa-3x mr-4"></i>
                    <span className="mt-2 text-base leading-normal">{nameFile}</span>
                    <input onChange={(event) => setNameFile(event.target.value)} type='file' name="archivo" className="hidden" accept=".xlsx, .xls"/>
                  </label>
                </div>

                <div className="text-center mt-6">
                    <button
                      className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                      type="submit"

                    >
                      Subir
                    </button>
                </div>


              </form>
            </div> 
          </div>
        </div> 
      </div>     
    </>
  );
}
