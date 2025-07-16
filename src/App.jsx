import React, { useEffect, useState } from 'react';
import Home from '@/screens/Home/home';
import Swal from 'sweetalert2';

export default function App() {
  const [checked, setChecked] = useState(false); // Controla si ya evaluamos el token
  const [validToken, setValidToken] = useState(false); // Si hay token válido

  useEffect(() => {
    const token = localStorage.getItem('access_token');

    if (!token) {
      Swal.fire({
        title: 'Sesión expirada',
        icon: 'warning',
        confirmButtonText: 'Continuar',
        allowOutsideClick: false,
        allowEscapeKey: false,
        allowEnterKey: false,
      }).then(() => {
        window.location.href = '/login';
      });
    } else {
      setValidToken(true); // Solo si hay token válido
    }

    setChecked(true); // Marcar que ya evaluamos
  }, []);

  if (!checked) return null; // Mostrar nada mientras evaluamos

  return validToken ? <Home /> : null;
}
