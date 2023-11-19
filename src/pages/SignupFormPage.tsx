import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Image,
  Input,
  Show,
  Stack,
} from "@chakra-ui/react";
import "../index.css";

const SignupFormPage = () => {
  return (
    <Stack direction="row" minH="100vh">
      <Show above="xl">
        <Flex flex={1}>
          <video autoPlay muted loop height="auto">
            <source src="/assets/signup.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </Flex>
      </Show>
      <Flex p={8} flex={1} align="center" justify="center">
        <Stack spacing={4} w="full" maxW="md">
          <Image src="/assets/logo.svg" />
          <Heading size="sm" textAlign="center" paddingTop={5}>
            Welcome! Join our community to access exclusive content and
            features. Sign up now!
          </Heading>
          <FormControl id="name">
            <FormLabel>Name</FormLabel>
            <Input type="text" variant="filled" />
          </FormControl>
          <FormControl id="username">
            <FormLabel>Username</FormLabel>
            <Input type="text" variant="filled" />
          </FormControl>
          <FormControl id="email">
            <FormLabel>Email address</FormLabel>
            <Input type="email" variant="filled" />
          </FormControl>
          <FormControl id="password">
            <FormLabel>Password</FormLabel>
            <Input type="password" variant="filled" />
          </FormControl>
          <Stack paddingTop={3}>
            <Button variant="solid" bg="purpleBg">
              Sign up
            </Button>
          </Stack>
        </Stack>
      </Flex>
      <Flex bg="white"></Flex>
    </Stack>
  );
};

export default SignupFormPage;
