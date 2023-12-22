import { Heading } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();
  const userSession = localStorage.getItem('userSession');

  useEffect(() => {
    if (userSession) {
      if (!JSON.parse(userSession)) navigate('/signin');
    }
  }, [userSession, navigate]);

  return <Heading>Homepage</Heading>;
};

export default HomePage;
