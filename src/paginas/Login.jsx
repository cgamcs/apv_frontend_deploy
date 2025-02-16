import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import Alerta from '../components/Alerta'
import clienteAxios from '../config/axios';

const Login = () => {
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ alerta, setAlerta ] = useState({})

  const { setAuth } = useAuth();

  const navigate = useNavigate();

  const handlerSubmit = async e => {
    e.preventDefault();

    if([email, password].includes('')) {
      setAlerta({
        msg: 'Todos los campos son obligatorios',
        error: true
      })
    }

    try {
      const { data } = await clienteAxios.post('/veterinarios/login', { email, password });
      localStorage.setItem('token', data.token);
      setAuth(data);
      navigate('/admin');
    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true
      })
    }
  };

  const { msg } = alerta;

  return (
    <>
      {msg && <Alerta alerta={alerta}/>}
      <div>
          <h1 className="text-indigo-600 font-black text-6xl">
            Inicia sesión y Administra {" "}<span className="text-black">tus Pacientes</span>
          </h1>
      </div>
      <div className='mt-5 md:mt-0 shadow-lg px-5 py-7 rounded-xl bg-white'>
          <form action="" onSubmit={handlerSubmit}>
              <div className="relative group">
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

              <input
                type="submit"
                value="Iniciar sesión"
                className="bg-indigo-600 w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-6 hover:cursor-pointer hover:bg-indigo-700 transition-colors md:w-auto"
              />
          </form>

          <nav className="mt-10 text-gray-500 lg:flex lg:justify-between">
              <Link
                to="/registrar"
                className='block text-center mt-5 md:mt-0'
              >
                ¿No tienes una cuenta? Regístrate
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

export default Login