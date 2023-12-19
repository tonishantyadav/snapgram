import { Button, Divider, HStack, Image } from '@chakra-ui/react';
import { FaGear } from 'react-icons/fa6';

const Navbar = () => {
  return (
    <>
      <HStack justifyContent="space-between" margin={1}>
        <Image src="/assets/logo.svg" alt="logo" padding={2} />
        <Button
          variant="ghost"
          colorScheme="purple"
          borderRadius="50%"
          padding={2}
          onClick={() => console.log('Clicked')}
        >
          <FaGear size="1.5rem" />
        </Button>
      </HStack>
      <Divider />
    </>
  );
};

export default Navbar;
