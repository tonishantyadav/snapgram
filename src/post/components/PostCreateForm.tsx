import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Image,
  Input,
  Spinner,
  Stack,
  Text,
  Textarea,
} from '@chakra-ui/react';
import { useState } from 'react';
import { FieldValues } from 'react-hook-form';
import { usePostCreate } from '..';
import { FileDropzone } from '../../components';
import { useForm } from '../../hooks';
import { useUserStore } from '../../user';
import { PostFormSchema } from '../../utils/validation';

const PostCreateForm = () => {
  const [uploadFile, setUploadFile] = useState<File[]>([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm(PostFormSchema);
  const { user } = useUserStore();
  const { isLoading, handlePostCreate } = usePostCreate();

  const handleFileUpload = (acceptedFiles: File[]) => {
    setUploadFile(acceptedFiles);
  };

  const onSubmit = (formData: FieldValues) => {
    const tags = formData.tags?.replace(/ /g, '').split(',') || [];

    if (user && uploadFile.length > 0) {
      handlePostCreate({
        userId: user.$id,
        caption: formData.caption,
        file: uploadFile,
        location: formData.location,
        tags: tags,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
        boxShadow="none"
      >
        <CardHeader>
          <Flex gap={2}>
            <Image src="/assets/icons/add-post.svg" />
            <Heading>Create Post</Heading>
          </Flex>
        </CardHeader>
        <CardBody>
          <Stack spacing={4}>
            <FormControl>
              <FormLabel>Caption</FormLabel>
              <Textarea
                placeholder="Enter caption here"
                {...register('caption')}
              />
              {errors.caption && (
                <Text color="red.300" paddingTop={2}>
                  {errors.caption.message}
                </Text>
              )}
            </FormControl>
            <FormControl>
              <FormLabel>Upload image or video</FormLabel>
              <FileDropzone
                isFileUpload={uploadFile}
                onFileUpload={handleFileUpload}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Location</FormLabel>
              <Input
                type="text"
                placeholder="Enter location"
                {...register('location')}
              />
              {errors.location && (
                <Text color="red.300" paddingTop={2}>
                  {errors.location.message}
                </Text>
              )}
            </FormControl>
            <FormControl>
              <FormLabel>Tags</FormLabel>
              <Input
                type="text"
                placeholder="Enter tags separated by commas"
                {...register('tags')}
              />
              {errors.tags && (
                <Text color="red.300" paddingTop={2}>
                  {errors.tags.message}
                </Text>
              )}
            </FormControl>
          </Stack>
        </CardBody>
        <CardFooter justifyContent="flex-end">
          <ButtonGroup spacing="2" display="flex">
            <Button
              variant="outline"
              _hover={{
                background: 'red.500',
              }}
              type="reset"
            >
              Cancel
            </Button>
            <Button
              variant="solid"
              bg="purpleBg"
              _hover={{
                background: 'lightPurpleBg',
              }}
              type="submit"
              isDisabled={!uploadFile.length ? true : false}
            >
              {isLoading ? <Spinner /> : 'Submit'}
            </Button>
          </ButtonGroup>
        </CardFooter>
      </Card>
    </form>
  );
};

export default PostCreateForm;
