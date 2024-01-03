import {
  Box,
  Button,
  Center,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Spinner,
} from '@chakra-ui/react';
import { IoIosSettings } from 'react-icons/io';
import { useSignout } from '../hooks';

const SignoutButton = () => {
  const { isLoading, handleSignout } = useSignout();
  return (
    <Box>
      <Popover>
        <PopoverTrigger>
          <Button bg="none" variant="unstyled">
            <Center>
              <Box
                display="flex"
                _hover={{
                  cursor: 'pointer',
                  background: 'gray.700',
                }}
                boxSize="35px"
                borderRadius="50%"
                justifyContent="center"
                alignItems="center"
              >
                <IoIosSettings size="1.5rem" />
              </Box>
            </Center>
          </Button>
        </PopoverTrigger>
        <PopoverContent borderRadius="20px">
          <Button
            width="100%"
            variant="unstyled"
            _hover={{
              background: 'red.500',
            }}
            borderRadius="20px"
            onClick={handleSignout}
          >
            {isLoading ? <Spinner /> : 'Loading'}
          </Button>
        </PopoverContent>
      </Popover>
    </Box>
  );
};

export default SignoutButton;
