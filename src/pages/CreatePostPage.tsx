import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Flex,
  Heading,
  Image
} from '@chakra-ui/react';
import PostForm from '../components/PostForm';

const CreatePostPage = () => {
  return (
    <Card
      maxW={{
        sm: 'md',
        md: 'lg',
        lg: 'xl',
      }}
      mx="auto"
      textAlign="center"
      bg="none"
      marginTop={3}
    >
      <CardHeader>
        <Flex gap={2}>
          <Image src="/assets/icons/add-post.svg" />
          <Heading>Create Post</Heading>
        </Flex>
      </CardHeader>
      <CardBody>
        <PostForm />
      </CardBody>
      <CardFooter justifyContent="flex-end">
        <ButtonGroup spacing="2" display="flex">
          <Button
            variant="outline"
            _hover={{
              background: 'red.500',
            }}
          >
            Cancel
          </Button>
          <Button
            variant="solid"
            bg="purpleBg"
            _hover={{
              background: 'lightPurpleBg',
            }}
          >
            Submit
          </Button>
        </ButtonGroup>
      </CardFooter>
    </Card>
  );
};

export default CreatePostPage;
