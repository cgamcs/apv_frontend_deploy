import { Link } from 'react-router-dom'
import useAuth from '../hooks/useAuth'

const Header = () => {
    // Obtiene la funcion para cerrar sesion y eliminar el token
    const { cerrarSesion } = useAuth();

    return (
        <header className="py-10 bg-indigo-600">
            <div className="container mx-auto flex flex-col gap-3 lg:flex-row justify-between items-center">
                <h1 className="font-medium text-2xl text-center text-indigo-200">
                    Administrador de Pacientes de {''}
                    <span className="text-white font-bold">Veterinaria</span>
                </h1>

                <nav className='flex gap-4'>
                    <Link to="/admin" className='text-white text-sm uppercase font-bold'>Pacientes</Link>
                    <Link to="/admin/perfil" className='text-white text-sm uppercase font-bold'>Perfil</Link>

                    <button 
                        type='button'
                        className='text-white text-sm uppercase font-bold'
                        onClick={cerrarSesion}
                    >Cerrar Sesión</button>
                </nav>
            </div>
        </header>
    )
}

export default Header