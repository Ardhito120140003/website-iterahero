import { useNavigate } from 'react-router-dom';

function GuardRoute({ children }) {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const auth = false;

  if (!auth) {
    navigate('/');
    return null;
  }

  return children;
}

export default GuardRoute;
