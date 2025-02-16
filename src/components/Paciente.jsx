import { useState } from 'react'
import usePacientes from '../hooks/usePacientes'

const Paciente = ({paciente}) => {
  const { setEdicion, eliminarPaciente } = usePacientes()
  const { email, fecha, nombre, propietario, sintomas, _id } = paciente
  const [modalOpen, setModalOpen] = useState(false);

  const formatearFecha = fecha => {
    const nuevaFecha = new Date(fecha)
    return new Intl.DateTimeFormat('es-MX', {dateStyle: 'long'}).format(nuevaFecha)
  }
  
  return (
    <>
      <div className='bg-white py-10 px-5  mb-5 md:ml-10 rounded-xl shadow-md'>
        <p className='font-bold uppercase mb-2'>Nombre: <span className='font-normal normal-case'>{nombre}</span></p>
        <p className='font-bold uppercase mb-2'>Propietario: <span className='font-normal normal-case'> {propietario}</span></p>
        <p className='font-bold uppercase mb-2'>Email: <span className='font-normal normal-case'>{email}</span></p>
        <p className='font-bold uppercase mb-2'>Fecha: <span className='font-normal normal-case'>{formatearFecha(fecha)}</span></p>
        <p className='font-bold uppercase'>Sintomas: <span className='font-normal normal-case'>{sintomas}</span></p>

        <div className='flex justify-between mt-10'>
          <button
            type='button'
            className='flex justify-between items-center gap-2 py-2 px-10 bg-indigo-600 hover:bg-indigo-700 text-white uppercase font-bold rounded-lg'
            onClick={ () => setEdicion(paciente) }
          > Editar
          
            <svg
              fill="none"
              class="h-5 w-5"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              viewBox="0 0 24 24"
              stroke="currentColor">
              <path d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path>
            </svg>
          </button>

          <button
            type='button'
            id='eliminarButton'
            data-modal-target='eliminarModal'
            datos-modal-toggle='eliminarModal'
            className='flex justify-between items-center gap-2 py-2 px-10 bg-red-600 hover:bg-red-700 text-white uppercase font-bold rounded-lg'
            onClick={ () => setModalOpen(true) }
          > Eliminar
            <svg
              fill="none"
              class="h-5 w-5"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              viewBox="0 0 24 24"
              stroke="currentColor">
              <path d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </button>
        </div>
      </div>

      {modalOpen && (
        <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
          <div className='bg-white px-16 py-4 rounded-lg shadow-lg flex flex-col items-center text-center text-sm'>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="#6B7280"
              class="h-12 w-12"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1"
              viewBox="0 0 24 24"
              stroke="#6B7280">
              <path d="M17 4H22V6H20V21C20 21.5523 19.5523 22 19 22H5C4.44772 22 4 21.5523 4 21V6H2V4H7V2H17V4ZM9 9V17H11V9H9ZM13 9V17H15V9H13Z"></path>
            </svg>

            <h2 className='font-bold my-4'>¿Estás seguro de eliminar este paciente?</h2>
            <div className='flex justify-center gap-4'>
              <button
                onClick={() => setModalOpen(false)}
                className='text-gray-500 bg-transparent border border-gray-200 hover:bg-gray-100 hover:text-gray-900 font-bold py-2 px-4 rounded-md'
              >
                Cancelar
              </button>
              <button
                onClick={() => { eliminarPaciente(_id); setModalOpen(false); }}
                className='bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-md'
              >
                Sí, eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Paciente