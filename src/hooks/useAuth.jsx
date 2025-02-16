import { useContext } from 'react';
import AuthContext from '../context/AuthProvider';

// Hook para acceder al contexto de autenticación
const useAuth = () => {
    return useContext(AuthContext); // Devuelve el contexto de autenticación
}

export default useAuth;