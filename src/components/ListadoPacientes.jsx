import usePacientes from '../hooks/usePacientes'
import Paciente from './Paciente'
import { motion, AnimatePresence } from 'framer-motion'

const ListadoPacientes = () => {
  const { pacientes } = usePacientes()

  // Definimos las configuraciones de animación para que todo esté sincronizado
  const animationConfig = {
    duration: 0.5,
    type: "tween",
    ease: "easeInOut"
  }

  return (
    <>
      {pacientes.length ? (
        <>
          <h2 className='font-black text-3xl text-center'>Listado de Pacientes</h2>

          <p className='text-xl mt-5 mb-10 text-center'>
            Adminstra tus {''}
            <span className='text-indigo-600 font-bold'>Pacientes y Citas</span>
          </p>

          <AnimatePresence>
            {pacientes.map((paciente, index) => (
              <motion.div
                key={paciente._id}
                initial={paciente.isNew ? { opacity: 0, scale: 0, height: 0 } : { opacity: 1, scale: 1 }}
                animate={{ opacity: 1, scale: 1, height: 'auto' }}
                exit={{ opacity: 0, scale: 0, height: 0 }}
                transition={animationConfig}
                layout={true} // Simplificado a true para mejor comportamiento
                  className="mb-5" // Margen inferior fijo para cada item
              >
                <Paciente paciente={paciente} />
              </motion.div>
            ))}
          </AnimatePresence>
        </>
      ) : (
        <>
          <h2 className='font-black text-3xl text-center'>No Hay Pacientes</h2>

          <p className='text-xl mt-5 mb-10 text-center'>
            Comienza agregando pacientes {''}
            <span className='text-indigo-600 font-bold'>y aparecerán en este lugar</span>
          </p>
        </>
      )}
    </>
  )
}

export default ListadoPacientes