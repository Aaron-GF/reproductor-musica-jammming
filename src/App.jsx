import React from 'react';
import Home from '@/screens/home/Home.jsx';
import { Analytics } from '@vercel/analytics/react';

export default function App() {
  return (
    <div>
      <Home />
      <Analytics />
    </div>
  )
}