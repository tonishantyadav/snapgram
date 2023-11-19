import {
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Text,
} from "@chakra-ui/react";
import "../index.css";

const SignupFormPage = () => {
  return (
    <Stack direction="row" minH="100vh">
      <Flex flex={1} bg="purpleBg"></Flex>
      <Flex p={8} flex={1} align="center" justify="center">
        <Stack spacing={4} w="full" maxW="md">
          <Heading size="xl">Create a new account</Heading>
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
          <Stack spacing={6}>
            <Stack
              direction={{ base: "column", sm: "row" }}
              align="start"
              justify="space-between"
            >
              <Checkbox>Remember me</Checkbox>
              <Text color="purple.300">Forgot password?</Text>
            </Stack>
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
