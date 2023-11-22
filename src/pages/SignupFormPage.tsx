import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  Heading,
  Image,
  Input,
  Show,
  Spinner,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { FieldValues } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useCreateUserAccount, useSignupForm } from "../hooks";

const SignupFormPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useSignupForm();
  const account = useCreateUserAccount();
  const navigate = useNavigate();
  const toast = useToast();

  const onSubmit = (data: FieldValues) => {
    account.mutate({
      name: data.name,
      email: data.email,
      username: data.username,
      password: data.password,
    });
  };

  useEffect(() => {
    if (account.isSuccess) {
      navigate("/");
    } else if (account.isError) {
      toast({
        title: "Account not created",
        description: "Your account has not been created",
        status: "error",
        isClosable: true,
        duration: 3000,
      });
    }
  }, [account.isSuccess, account.isError]);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack direction="row" minH="100vh">
          <Show above="xl">
            <Flex flex={1}>
              <video
                autoPlay
                muted
                loop
                height="auto"
                playsInline
                controlsList="nodownload"
              >
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
                <Input type="text" variant="filled" {...register("name")} />
                {errors.name && (
                  <Text color="red.300" paddingTop={2}>
                    {errors.name.message}
                  </Text>
                )}
              </FormControl>
              <FormControl id="username">
                <FormLabel>Username</FormLabel>
                <Input type="text" variant="filled" {...register("username")} />
                {errors.username && (
                  <Text color="red.300" paddingTop={2}>
                    {errors.username.message}
                  </Text>
                )}
              </FormControl>
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
              <Stack paddingTop={3} spacing={5}>
                <Button bg="purpleBg" type="submit">
                  {account.isLoading ? <Spinner /> : "Sign up"}
                </Button>
                <HStack justify="center">
                  <Text textAlign="center">Have an account?</Text>
                  <Link to="/signin">
                    <Text color="purple.300">Sign in</Text>
                  </Link>
                </HStack>
              </Stack>
            </Stack>
          </Flex>
        </Stack>
      </form>
    </>
  );
};

export default SignupFormPage;
