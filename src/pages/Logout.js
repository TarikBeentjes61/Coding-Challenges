import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('username');
    window.dispatchEvent(new Event('authChanged'));
    navigate('/login');
  }, [navigate]);

  return null;
}

export default Logout;
