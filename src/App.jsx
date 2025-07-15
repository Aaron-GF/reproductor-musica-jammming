import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '@/screens/Home/home';
import Login from '@/screens/auth/login';
import ProtectedRoute from '@/screens/auth/protectedRoute';

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />
    </Routes>
  )
}