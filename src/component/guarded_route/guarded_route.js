import { Routes, Navigate } from 'react-router-dom';

const isUserAuthorized = () =>
  // Implementasi logika autentikasi/otorisasi di sini
  // Misalnya, periksa apakah pengguna adalah pengguna tertentu
//   const isSpecialUser = // logika untuk memeriksa apakah pengguna adalah pengguna tertentu;
  isSpecialUser;
function SpecialUserRoutes({ children }) {
  if (isUserAuthorized()) {
    return <Routes>{children}</Routes>;
  }
  return <Navigate to="/unauthorized" replace />;
}

export default SpecialUserRoutes;
