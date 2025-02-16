import { useEffect, useState } from 'react'
import AdminNav from '../components/AdminNav'
import useAuth from '../hooks/useAuth'
import Alerta from '../components/Alerta'

const EditarPerfil = () => {
    const { auth, actualizarPerfil } = useAuth()
    const [ perfil, setPerfil ] = useState({})
    const [ alerta, setAlerta ] = useState({})

    useEffect( () => {
        setPerfil(auth)
    }, [auth])

    const handleSubmit = async e => {
        e.preventDefault()

        const { nombre, email } = perfil
        if([nombre, email].includes('')) {
            setAlerta({
                msg: 'Email y  Nombre son obligatorios',
                error: true
            })

            return
        }

        const resultado = await actualizarPerfil(perfil)

        setAlerta(resultado)
    }

    const msg = alerta
  return (
    <>
        <AdminNav />

        {msg && <Alerta alerta={alerta} />}

        <h2 className='font-black text-3xl text-center mt-10'>Editar Perfil</h2>

        <p className='text-xl mt-5 mb-10 text-center'>Modifica tu {''}<span className='text-indigo-600 font-bold'>información aquí</span></p>

        <div className='flex justify-center'>
            <div className='w-full md:w-1/2 bg-white shadow rounded-lg p-5'>
                <form
                    onSubmit={handleSubmit}
                >
                    <div className='my-3'>
                        <label htmlFor='nombre' className='uppercase font-bold text-gray-700'>Nombre</label>
                        <input
                            type='text'
                            className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-lg'
                            name='nombre'
                            value={perfil.nombre}
                            onChange={ e => setPerfil({
                                ...perfil,
                                [e.target.name] : e.target.value
                            })}/>
                    </div>

                    <div className='my-3'>
                        <label htmlFor='web' className='uppercase font-bold text-gray-700'>Sitio Web</label>
                        <input
                            type='text'
                            className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-lg'
                            name='web'
                            value={perfil.web}
                            onChange={ e => setPerfil({
                                ...perfil,
                                [e.target.name] : e.target.value
                            })}/>
                    </div>

                    <div className='my-3'>
                        <label htmlFor='telefono' className='uppercase font-bold text-gray-700'>Teléfono</label>
                        <input
                            type='number'
                            className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-lg'
                            name='telefono'
                            value={perfil.telefono}
                            onChange={ e => setPerfil({
                                ...perfil,
                                [e.target.name] : e.target.value
                            })}/>
                    </div>

                    <div className='my-3'>
                        <label htmlFor='email' className='uppercase font-bold text-gray-700'>Email</label>
                        <input
                            type='email'
                            className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-lg'
                            name='email'
                            value={perfil.email}
                            onChange={ e => setPerfil({
                                ...perfil,
                                [e.target.name] : e.target.value
                            })}/>
                    </div>

                    <input
                        type='submit'
                        value='Guardar Cambios'
                        className='bg-indigo-600 text-white w-full p-3 mt-5 uppercase font-bold cursor-pointer hover:bg-indigo-800 rounded-lg transition-colors'
                    />
                </form>
            </div>
        </div>
    </>
  )
}

export default EditarPerfil