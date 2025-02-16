import { useState } from 'react'
import AdminNav from '../components/AdminNav'
import Alerta from '../components/Alerta'
import useAuth from '../hooks/useAuth'

const CambiarPassword = () => {
    const { guardarPassword } = useAuth()
    const [ alerta, setAlerta ] = useState({})
    const [ password, setPassword  ] = useState({
      pwd_actual: '',
      pwd_nuevo: ''
    })

    const handleSubmit = async e => {
        e.preventDefault()

        if(Object.values(password).some( campo => campo === '' )) {
            setAlerta({
                msg: 'Todos los campos son obligatorios',
                error: true
            })

            return
        }

        if(password.pwd_nuevo.length < 6) {
            setAlerta({
                msg: 'La contraseña debe tener minimo 6 caracteres',
                error: true
            })

            return
        }

        const respuesta = await guardarPassword(password)
        setAlerta(respuesta)
    }

    const msg = alerta

  return (  
    <>
        <AdminNav />
        {msg && <Alerta alerta={alerta} />}

        <h2 className='font-black text-3xl text-center mt-10'>Cambiar Password</h2>

        <p className='text-xl mt-5 mb-10 text-center'>Modifica tu {''}<span className='text-indigo-600 font-bold'>contraseña aquí</span></p>

        <div className='flex justify-center'>
            <div className='w-full md:w-1/2 bg-white shadow rounded-lg p-5'>
                <form
                    onSubmit={handleSubmit}
                >
                    <div className='my-3'>
                        <label htmlFor='pwd_actual' className='uppercase font-bold text-gray-700'>Contraseña actual</label>
                        <input
                            type='password'
                            className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-lg'
                            name='pwd_actual'
                            placeholder='Escribe tu contraseña actual'
                            onChange={e => setPassword({
                              ...password,
                              [e.target.name] : e.target.value
                            })}/>
                    </div>

                    <div className='my-3'>
                        <label htmlFor='pwd_nuevo' className='uppercase font-bold text-gray-700'>Nueva contraseña</label>
                        <input
                            type='password'
                            className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-lg'
                            name='pwd_nuevo'
                            placeholder='Escribe tu nueva contraseña'
                            onChange={e => setPassword({
                              ...password,
                              [e.target.name] : e.target.value
                            })}/>
                    </div>

                    <input
                        type='submit'
                        value='Actualizar contraseña'
                        className='bg-indigo-600 text-white w-full p-3 mt-5 uppercase font-bold cursor-pointer hover:bg-indigo-800 rounded-lg transition-colors'
                    />
                </form>
            </div>
        </div>
    </>
  )
}

export default CambiarPassword