import React from 'react';
import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ children }) {
  const token = localStorage.getItem('access_token');
  const expiresAt = localStorage.getItem('expires_at');

  if (!token || !expiresAt || Date.now() > Number(expiresAt)) {
    localStorage.removeItem('access_token');
    localStorage.removeItem('expires_at');
    return <Navigate to="/login" replace />;
  }

  return children;
}
