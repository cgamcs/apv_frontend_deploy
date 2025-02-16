import { useContext } from 'react';
import PacientesContext from '../context/PacientesProvider';

// Hook para acceder a los pacientes
const usePacientes = () => {
    return useContext(PacientesContext); // Devuelve los pacientes
}

export default usePacientes;