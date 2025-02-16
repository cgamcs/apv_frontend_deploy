import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Alerta from '../components/Alerta';
import clienteAxios from '../config/axios';

function NuevoPassword() {
    const [password, setPassword] = useState('');
    const [alerta, setAlerta] = useState({});
    const [tokenValido, setTokenValido] = useState(false);
    const [passwordModificado, setPasswordModificado] = useState(false);

    const params = useParams();
    const { token } = params;
    console.log(token)

    useEffect(() => {
        const comprobarToken = async () => {
            try {
                await clienteAxios(`/veterinarios/olvide-password/${token}`);
                setAlerta({ msg: 'Coloca tu nueva contraseña' });
                setTokenValido(true);
            } catch (error) {
              console.log(error);
                setAlerta({
                    msg: 'Hubo un error con el enlace',
                    error: true
                })
            }
        };
        comprobarToken();
    }, [])

    const { msg } = alerta

    const handleSubmit = async e => {
      e.preventDefault();

      if(password.length < 6) {
        setAlerta({
          msg: 'La contraseña debe tener al menos 6 caracteres',
          error: true
        })
        return;
      }

      try {
        const url = `/veterinarios/olvide-password/${token}`;
        const { data } = await clienteAxios.post(url, { password });
        setAlerta({
          msg: data.msg
        })
        setPasswordModificado(true);
      } catch (error) {
        setAlerta({
          msg: error.response.data.msg,
          error: true
        })
      }
    }

  return (
     <>
        {msg && <Alerta alerta={alerta} /> /* Muestra el mensaje de alerta */}

        <div>
            <h1 className="text-indigo-600 font-black text-6xl">
                Crea tu Cuenta y Administra {" "}<span className="text-black">tusPacientes</span>
            </h1>
        </div>

        <div className='mt-5 md:mt-0 shadow-lg px-5 py-7 rounded-xl bg-white'>
          {tokenValido && (
            <>
              <form action="" onSubmit={handleSubmit}>
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
                          Nueva Contraseña
                        </label>
                  </div>

                  <input
                    type="submit"
                    value="Restablecer contraseña"
                    className="bg-indigo-600 w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-6 hover:cursor-pointer hover:bg-indigo-700 transition-colors md:w-auto"
                  />
              </form>
            </>
          )}
          
          {passwordModificado && 
              <nav className="mt-10 text-gray-500 lg:flex lg:justify-between">
                <Link
                  to="/"
                  className='block text-center mt-5 md:mt-0'
                >
                  Inicia Sesión
                </Link>
              </nav>
          }
      </div>
    </>
  )
}

export default NuevoPassword