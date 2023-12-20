import { Divider, HStack, Image } from '@chakra-ui/react';
import Settings from './Settings';

const Navbar = () => {
  return (
    <>
      <HStack justifyContent="space-between" margin={1}>
        <Image src="/assets/logo.svg" alt="logo" padding={2} />
        <Settings />
      </HStack>
      <Divider />
    </>
  );
};

export default Navbar;
