import { useState, useEffect } from 'react'
import Alerta from './Alerta'
import usePacientes from '../hooks/usePacientes'

const Formulario = () => {
    const [ nombre, setNombre ] = useState('')
    const [ propietario, setPropietario ] = useState('')
    const [ email, setEmail ] = useState('')
    const [ fecha, setFecha ] = useState('')
    const [ sintomas, setSintomas ] = useState('')
    const [ id, setId ] = useState(null)

    const [ alerta, setAlerta ] = useState({})

    const { guardarPaciente, paciente } = usePacientes()

    useEffect(() => {
        if(paciente?.nombre) {
            setNombre(paciente.nombre)
            setPropietario(paciente.propietario)
            setEmail(paciente.email)
            setFecha(paciente.fecha)
            setSintomas(paciente.sintomas)
            setId(paciente._id)
        }
    }, [paciente])

    const handlerSubmit = e => {
        e.preventDefault()

        // Validar el formulario
        if([nombre, propietario, email, fecha, sintomas].includes('')) {
            setAlerta({
                msg: 'Todos los campos son obligatorios',
                error: true
            })

            return
        }

        guardarPaciente({ nombre, propietario, email, fecha, sintomas, id })
        setAlerta({
            msg: 'Paciente guardado correctamente'
        })
        // Resetear formulario
        setNombre('')
        setPropietario('')
        setEmail('')
        setFecha('')
        setSintomas('')
        setId('')
    }

    const { msg } = alerta

  return (
    <>
    {msg && <Alerta alerta={alerta} />}

    <h2 className='font-black text-3xl text-center'>Administrador de Pacientes</h2>

    <p className='text-xl text-center mt-5 mb-10'>
        Añade tus pacientes y {''}
        <span className='text-indigo-600 font-bold'>Adminstralos</span>
    </p>
    
    <form
        className='bg-white py-10 px-5 mb-10 lg:mb-0 rounded-xl shadow-md'
        onSubmit={handlerSubmit}>
        <div className='mb-5'>
            <label
                htmlFor='nombre'
                className='text-gray-700 uppercase font-bold'
            >Paciente</label>
            <input
                id='nombre'
                type='text'
                placeholder='Nombre del paciente'
                className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-lg'
                value={nombre}
                onChange={e => setNombre(e.target.value)}
            />
        </div>

        <div className='mb-5'>
            <label
                htmlFor='propietario'
                className='text-gray-700 uppercase font-bold'
            >Propietario</label>
            <input
                id='propietario'
                type='text'
                placeholder='Nombre del propietario'
                className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-lg'
                value={propietario}
                onChange={e => setPropietario(e.target.value)}
            />
        </div>

        <div className='mb-5'>
            <label
                htmlFor='email'
                className='text-gray-700 uppercase font-bold'
            >Email</label>
            <input
                id='email'
                type='email'
                placeholder='Email del propietario'
                className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-lg'
                value={email}
                onChange={e => setEmail(e.target.value)}
            />
        </div>

        <div className='mb-5'>
            <label
                htmlFor='fecha'
                className='text-gray-700 uppercase font-bold'
            >Fecha Alta</label>
            <input
                id='fecha'
                type='date'
                className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-lg'
                value={fecha}
                onChange={e => setFecha(e.target.value)}
            />
        </div>

        <div className='mb-5'>
            <label
                htmlFor='sintomas'
                className='text-gray-700 uppercase font-bold'
            >Sitomas</label>
            <textarea
                id='sintomas'
                placeholder='Describe los sintomas'
                className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-lg'
                value={sintomas}
                onChange={e => setSintomas(e.target.value)}
            />
        </div>

        <input
            type='submit'
            className='bg-indigo-600 text-white w-full p-3 uppercase font-bold cursor-pointer hover:bg-indigo-800 rounded-lg transition-colors'
            value={id ? 'Guardar Cambios' : 'Agregar Paciente'}
        />
    </form>
    </>
  )
}

export default Formulario