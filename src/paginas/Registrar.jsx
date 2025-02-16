import { useState } from 'react';
import { Link } from 'react-router-dom';
import Alerta from '../components/Alerta';
import clienteAxios from '../config/axios';

const Registrar = () => {
  const [ nombre, setNombre ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ repetirPassword, setRepetirPassword ] = useState('');
  const [ alerta, setAlerta ] = useState({});

  const handleSubmit = async e => {
    e.preventDefault();

    if([nombre, email, password, repetirPassword].includes('')) {
      setAlerta({ msg: 'Hay campos vacios', error: true });
      return;
    }

    if(password !== repetirPassword) {
      setAlerta({ msg: 'Las contraseñas no son iguales', error: true });
      return;
    }

    if(password.length < 6) {
      setAlerta({ msg: 'La contraseñas debe de tener minimo 6 caracteres', error: true });
      return;
    }

    setAlerta({});

    // Crear el usuario en la API
    try {
      await clienteAxios.post('/veterinarios', { nombre, email, password });
      setAlerta({
        msg: 'Usuario creado correctamente, revisa tu email',
        error: false
      });
    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true
      })
    }
  }

  const { msg } = alerta;
    
  return (
    <>
      {msg && <Alerta
          alerta={alerta}
      />}

      <div>
          <h1 className="text-indigo-600 font-black text-6xl">
            Crea tu Cuenta y Administra {" "}<span className="text-black">tusPacientes</span>
          </h1>
      </div>
      <div className='mt-5 md:mt-0 shadow-lg px-5 py-7 rounded-xl bg-white'>
          <form action="" onSubmit={handleSubmit}>
              <div className="relative group">
                    <input
                      type="text"
                      id="nombre"
                      required
                      className="border w-full px-4 pt-6 pb-2 text-sm peer bg-gray-50 rounded-xl outline-none"
                      value={nombre}
                      onChange={e => setNombre(e.target.value)}
                    />
                    <label
                      for="nombre"
                      className="text-gray-400 hover:cursor-text transform transition-all absolute top-0 left-0 h-full flex items-center pl-4 text-sm group-focus-within:text-xs peer-valid:text-xs group-focus-within:h-1/2 peer-valid:h-1/2 group-focus-within:-translate-y-0 peer-valid:-translate-y-0"
                    >
                      Nombre
                    </label>
              </div>

              <div className="relative group mt-5">
                    <input
                      type="email"
                      id="email"
                      required
                      className="border w-full px-4 pt-6 pb-2 text-sm peer bg-gray-50 rounded-xl outline-none"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                    />
                    <label
                      for="email"
                      className="text-gray-400 hover:cursor-text transform transition-all absolute top-0 left-0 h-full flex items-center pl-4 text-sm group-focus-within:text-xs peer-valid:text-xs group-focus-within:h-1/2 peer-valid:h-1/2 group-focus-within:-translate-y-0 peer-valid:-translate-y-0"
                    >
                      Email
                    </label>
              </div>

              <div className="relative group mt-5">
                    <input
                      type="password"
                      id="password"
                      required
                      className="border w-full px-4 pt-5 pb-2 text-sm peer bg-gray-50 rounded-xl outline-none"
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                    />
                    <label
                      for="password"
                      className="text-gray-400 hover:cursor-text transform transition-all absolute top-0 left-0 h-full flex items-center pl-4 text-sm group-focus-within:text-xs peer-valid:text-xs group-focus-within:h-1/2 peer-valid:h-1/2 group-focus-within:-translate-y-0 peer-valid:-translate-y-0"
                    >
                      Contraseña
                    </label>
              </div>

              <div className="relative group mt-5">
                    <input
                      type="password"
                      id="repetirPassword"
                      required
                      className="border w-full px-4 pt-5 pb-2 text-sm peer bg-gray-50 rounded-xl outline-none"
                      value={repetirPassword}
                      onChange={e => setRepetirPassword(e.target.value)}
                    />
                    <label
                      for="repetirPassword"
                      className="text-gray-400 hover:cursor-text transform transition-all absolute top-0 left-0 h-full flex items-center pl-4 text-sm group-focus-within:text-xs peer-valid:text-xs group-focus-within:h-1/2 peer-valid:h-1/2 group-focus-within:-translate-y-0 peer-valid:-translate-y-0"
                    >
                      Confirmar Contraseña
                    </label>
              </div>

              <input
                type="submit"
                value="Crear Cuenta"
                className="bg-indigo-600 w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-6 hover:cursor-pointer hover:bg-indigo-700 transition-colors md:w-auto"
              />
          </form>

          <nav className="mt-10 text-gray-500 lg:flex lg:justify-between">
              <Link
                to="/"
                className='block text-center mt-5 md:mt-0'
              >
                ¿Ya tienes una cuenta? Inicia Sesión
              </Link>
              <Link 
                to="/olvide-password"
                className='block text-center mt-3 md:mt-0'
              >
                ¿Olvidaste tu contraseña?
              </Link>
          </nav>
      </div>
    </>
  )
}

export default Registrar