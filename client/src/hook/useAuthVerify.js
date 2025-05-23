import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const useAuthVerify = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('authtoken');

    if (!token) {
      navigate('/auth/login');
      return;
    }
    const verify = async () => {
      try {
        await axios.post(
          'http://localhost:8080/verify',
          {},
          {
            headers: {
              'Content-Type': 'application/json',
              authorization: `Bearer ${token}`,
            },
          }
        );
      } catch (err) {
        console.error('Token verification failed:', err);
        navigate('/auth/login');
      }
    };

    verify();
  }, [navigate]);
};

export default useAuthVerify;
