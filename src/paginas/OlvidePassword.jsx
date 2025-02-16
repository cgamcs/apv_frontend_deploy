import { useState } from 'react';
import { Link } from 'react-router-dom';
import Alerta from '../components/Alerta';
import clienteAxios from '../config/axios';

const OlvidePassword = () => {
  const [email, setEmail] = useState('');
  const [alerta, setAlerta] = useState({});

  const handlerSubmit = async e => {
    e.preventDefault();

    if(email === '' || email.length < 6) {
      setAlerta({ msg: 'El email es obligatorio', error: true });
    }

    try {
      const { data } = await clienteAxios.post('/veterinarios/olvide-password', { email });
      setAlerta({ msg: data.msg })
    } catch (error) {
      console.log(error)
      setAlerta({
        msg: error.response.data.msg,
        error: true
      });
    }
  }

  const { msg } = alerta;

  return (
    <>
      { msg && <Alerta
        alerta={alerta}
      />}

      <div>
          <h1 className="text-indigo-600 font-black text-6xl">
            Recupera tu Acceso y no Pierdas {" "}<span className="text-black">tus Pacientes</span>
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
                      value={ email }
                      onChange={e => setEmail(e.target.value)}
                    />
                    <label
                      for="email"
                      className="text-gray-400 hover:cursor-text transform transition-all absolute top-0 left-0 h-full flex items-center pl-4 text-sm group-focus-within:text-xs peer-valid:text-xs group-focus-within:h-1/2 peer-valid:h-1/2 group-focus-within:-translate-y-0 peer-valid:-translate-y-0"
                    >
                      Email
                    </label>
              </div>

              <input
                type="submit"
                value="Recuperar contraseña"
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
                to="/registrar"
                className='block text-center mt-3 md:mt-0'
              >
                ¿No tienes una cuenta? Regístrate
              </Link>
          </nav>
      </div>
    </>
  )
}

export default OlvidePassword