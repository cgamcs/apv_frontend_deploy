import { useState, useEffect } from 'react';

const Alerta = ({alerta}) => {
  // Usamos un estado para generar una key única
  const [key, setKey] = useState(0);

  // Reiniciamos la animación cada vez que la alerta cambie
  useEffect(() => {
    setKey((prevKey) => prevKey + 1);
  }, [alerta]);

  return (
    <div
      key={key}
      className={` ${alerta.error ? 'from-red-500 to-red-600' : 'from-indigo-500 to-indigo-600'} fixed top-5 right-5 bg-gradient-to-r text-center p-3 rounded-xl uppercase text-white font-bold animate-entrance`}
    >
        {alerta.msg}
    </div>
  )
}

export default Alerta