import {
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  Heading,
  Input,
  Spinner,
  Stack,
  Text,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useSigninForm } from "../hooks";
import { FieldValues } from "react-hook-form";

const SigninFormPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useSigninForm();

  const onSubmit = (formData: FieldValues) => {
    console.log(formData);
  };

  const isLoading = false;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack minH="100vh" direction="row">
        <Flex p={8} flex={1} align="center" justify="center">
          <Stack spacing={4} w="full" maxW="md">
            <Heading size="xl">Sign in to your account</Heading>
            <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              <Input type="email" variant="filled" {...register("email")} />
              {errors.email && (
                <Text color="red.300" paddingTop={2}>
                  {errors.email.message}
                </Text>
              )}
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                variant="filled"
                {...register("password")}
              />
              {errors.password && (
                <Text color="red.300" paddingTop={2}>
                  {errors.password.message}
                </Text>
              )}
            </FormControl>
            <Stack spacing={6}>
              <Stack
                direction={{ base: "column", sm: "row" }}
                align="start"
                justify="space-between"
              >
                <Checkbox>Remember me</Checkbox>
                <Link to="/forgot-password">
                  <Text color="purple.300">Forgot password?</Text>
                </Link>
              </Stack>
              <Button variant="solid" bg="purpleBg" type="submit">
                {isLoading ? <Spinner /> : "Sign in"}
              </Button>
              <HStack justify="center">
                <Text>Don't have an account?</Text>
                <Link to="/signup">
                  <Text color="purple.300">Sign up</Text>
                </Link>
              </HStack>
            </Stack>
          </Stack>
        </Flex>
      </Stack>
    </form>
  );
};

export default SigninFormPage;
