import { Heading } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <Link to="/profile">
      <Heading bg="red">Sidebar</Heading>
    </Link>
  );
};

export default Sidebar;
