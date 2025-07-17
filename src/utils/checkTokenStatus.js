import Swal from 'sweetalert2';

export const checkTokenStatus = () => {
  const token = localStorage.getItem('access_token');
  const expiresAt = parseInt(localStorage.getItem('expires_at'), 10);
  const isExpired = !expiresAt || Date.now() >= expiresAt;

  if (!token || isExpired) {
    Swal.fire({
      title: 'Sesión expirada',
      text: 'Tu sesión ha expirado. Debes iniciar sesión nuevamente.',
      icon: 'warning',
      confirmButtonText: 'Aceptar',
      allowOutsideClick: false,
      allowEscapeKey: false,
    })
      .then((result) => {
        if (result.isConfirmed) {
        window.location.href = '/login';
        localStorage.removeItem('access_token');
        localStorage.removeItem('expires_at');
        }
      })
  }
};
