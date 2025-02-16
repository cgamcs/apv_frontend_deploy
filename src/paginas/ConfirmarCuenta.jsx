import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Alerta from '../components/Alerta';
import clienteAxios from '../config/axios';

const ConfirmarCuenta = () => {
  const [ cuentaConfirmada, setCuentaConfirmada ] = useState(false);
  const [ cargando, setCargando ] = useState(true);
  const [ alerta, setAlerta ] = useState({});

  const params = useParams();
  const { token } = params;

  useEffect( () => {
    const confirmarCuenta = async () => {
      try {
        const url = `/veterinarios/confirmar/${ token }`;
        const { data } = await clienteAxios(url);
        setCuentaConfirmada(true);
        setAlerta({
          msg: data.msg,
          error: false
        })
      } catch (error) {
        setAlerta({
          msg: error.response.data.msg,
          error: true
        })
      }

      setCargando(false);
    }
    confirmarCuenta();
  }, [])

  return (
    <>
      <div>
          <h1 className="text-indigo-600 font-black text-6xl">
            Confirma tu Cuenta y Empieza a Administra {" "}<span className="text-black">tus Pacientes</span>
          </h1>
      </div>
      <div className='mt-5 md:mt-0 h-[5.5rem] overflow-hidden shadow-lg px-5 py-7 rounded-xl bg-white relative flex items-center justify-center'>
          {
            !cargando && <Alerta
              alerta={alerta}
            />
          }

          {
            cuentaConfirmada && (
              <Link to="/" className='text-gray-500 block text-center mt-5 md:mt-0 uppercase font-bold'>Inicia Sesión</Link>
            )
          }
      </div>
    </>
  )
}

export default ConfirmarCuenta