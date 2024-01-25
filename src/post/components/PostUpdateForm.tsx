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
  useDisclosure,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { FieldValues } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { PostFormSchema } from '@utils/form-schemas';
import FileDropzone from '@components/FileDropZone';
import ConfirmationModal from '@components/ConfirmationModal';
import useForm from '@hooks/useForm';
import usePost from '@post/hooks/usePost';
import usePostUpdate from '@post/hooks/usePostUpdate';

const PostUpdateForm = () => {
  const [uploadFile, setUploadFile] = useState<File[]>([]);
  const [formData, setFormData] = useState<FieldValues | null>(null);

  const { id: postId } = useParams();
  const { post } = usePost(postId ?? '');
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm(PostFormSchema, {
    caption: post?.caption || '',
    file: [],
    location: post?.location || '',
    tags: post.tags.length > 0 ? post.tags.join(',') : '',
  });
  const { isLoading, isSuccess, handlePostUpdate } = usePostUpdate();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleFileUpload = (acceptedFiles: File[]) => {
    setUploadFile(acceptedFiles);
  };

  const handleConfirmation = () => {
    handlePostUpdate({
      id: post ? post.$id : '',
      caption: formData?.caption || '',
      imageId: post ? post.imageId : '',
      image: post ? post.image : '',
      file: uploadFile,
      location: formData?.location || '',
      tags: formData?.tags || '',
    });
    onClose();
  };

  const onSubmit = (formData: FieldValues) => {
    onOpen();
    setFormData(formData);
  };

  useEffect(() => {
    if (isSuccess) {
      window.location.reload();
    }
  }, [isSuccess]);

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
            <Image src="/assets/icons/edit.svg" alt="edit" />
            <Heading>Edit Post</Heading>
          </Flex>
        </CardHeader>
        <CardBody>
          <Stack spacing={4}>
            <FormControl>
              <FormLabel fontWeight="semibold">Caption</FormLabel>
              <Textarea placeholder="Enter caption" {...register('caption')} />
              {errors.caption && (
                <Text color="red.300" paddingTop={2}>
                  {errors.caption.message}
                </Text>
              )}
            </FormControl>
            <FormControl>
              <FormLabel fontWeight="semibold">Upload image or video</FormLabel>
              <FileDropzone
                isFileUrl={post.image ? post.image : ''}
                isFileUpload={uploadFile}
                onFileUpload={handleFileUpload}
              />
            </FormControl>
            <FormControl>
              <FormLabel fontWeight="semibold">Location</FormLabel>
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
              <FormLabel fontWeight="semibold">Tags</FormLabel>
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
          <ButtonGroup>
            <Button
              variant="outline"
              type="reset"
              _hover={{
                background: 'red.500',
              }}
            >
              Clear
            </Button>
            <Button
              bg="purpleBg"
              type="submit"
              isDisabled={
                post.image ? false : !uploadFile.length ? true : false
              }
              _hover={{
                background: 'lightPurpleBg',
              }}
              onClick={onOpen}
            >
              <ConfirmationModal
                action="update"
                isOpen={isOpen}
                onClose={onClose}
                handleConfirmation={handleConfirmation}
              />
              {isLoading ? <Spinner /> : 'Submit'}
            </Button>
          </ButtonGroup>
        </CardFooter>
      </Card>
    </form>
  );
};

export default PostUpdateForm;
