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

const SigninFormPage = () => {
  return (
    <Stack minH="100vh" direction="row">
      <Flex p={8} flex={1} align="center" justify="center">
        <Stack spacing={4} w="full" maxW="md">
          <Heading size="xl">Sign in to your account</Heading>
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
              Sign in
            </Button>
          </Stack>
        </Stack>
      </Flex>
    </Stack>
  );
};

export default SigninFormPage;
