import {
  Avatar,
  Box,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  Heading,
  Image,
  Input,
  Spinner,
  Stack,
  Text,
  Textarea,
  useDisclosure,
} from '@chakra-ui/react';
import { Models } from 'appwrite';
import React, { useEffect, useState } from 'react';
import { FieldValues } from 'react-hook-form';
import { ProfileUpdateSchema } from '@utils/form-schemas';
import useForm from '@hooks/useForm';
import useProfile from '@user/hooks/useProfile';
import ConfirmationModal from '@components/ConfirmationModal';

interface Props {
  user: Models.Document;
}

const ProfileUpdateForm = ({ user }: Props) => {
  const [username, setUsername] = useState(user?.username || '');
  const [bio, setBio] = useState(user?.bio || '');
  const [imageFile, setImageFile] = useState<FileList | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(user?.image || null);
  const [formData, setFormData] = useState<FieldValues | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm(ProfileUpdateSchema);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isLoading, isSuccess, handleProfileUpdate } = useProfile();

  const maxCharacters = 150;

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setUsername(value);
  };

  const handleBioChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setBio(value);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const imageUrl = URL.createObjectURL(files[0]);
      setImageFile(files);
      setImageUrl(imageUrl);
    }
  };

  const handleInputClear = () => {
    setUsername('');
    setBio('');
  };

  const handleConfirmation = () => {
    if (user && formData) {
      let files: File[] = [];

      if (imageFile) {
        files = Array.from(imageFile);
      }

      handleProfileUpdate({
        id: user?.$id,
        username: formData?.username,
        image: user?.image || '',
        file: files,
        bio: formData?.bio,
      });
    }
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
            <Image src="/assets/icons/edit.svg" />
            <Heading>Edit Profile</Heading>
          </Flex>
        </CardHeader>
        <CardBody>
          <Stack spacing={4}>
            <FormControl>
              <Box bg={'gray.700'} borderRadius="10px">
                <Flex
                  justifyContent="space-between"
                  paddingX={2}
                  paddingY={3}
                  direction="column"
                  rowGap={5}
                >
                  <HStack justifyContent="center" alignItems="center" gap={4}>
                    <Avatar size="lg" src={imageUrl || user?.image} />
                    <Flex direction="column" fontSize="sm" paddingTop={2}>
                      <Text fontWeight="semibold">@{user?.username}</Text>
                      <Text color="gray.500">{user?.name}</Text>
                    </Flex>
                    <Input
                      type="file"
                      accept="image/*"
                      display="none"
                      onChange={handleImageChange}
                      id="imageInput"
                    />
                  </HStack>
                  <label htmlFor="imageInput">
                    <Button
                      as="span"
                      cursor="pointer"
                      w="full"
                      borderRadius="20px"
                      _hover={{
                        background: 'lightPurpleBg',
                      }}
                    >
                      Change photo
                    </Button>
                  </label>
                </Flex>
              </Box>
            </FormControl>
            <FormControl>
              <FormLabel fontWeight="semibold">Username</FormLabel>
              <Input
                type="text"
                placeholder="Enter username"
                {...register('username')}
                value={username}
                onChange={handleUsernameChange}
              />
              {errors.username && (
                <Text color="red.500" paddingTop={2}>
                  {errors.username.message}
                </Text>
              )}
            </FormControl>
            <FormControl>
              <FormLabel fontWeight="semibold">Bio</FormLabel>
              <Textarea
                placeholder="Enter bio"
                {...register('bio')}
                value={bio}
                resize="none"
                focusBorderColor={bio.length > maxCharacters ? 'red.500' : ''}
                onChange={handleBioChange}
              />
              {errors.bio && (
                <Text color="red.500" paddingTop={2}>
                  {errors.bio.message}
                </Text>
              )}
              <Text
                mt={2}
                position="absolute"
                right={0}
                fontSize="x-small"
                color={bio.length > maxCharacters ? 'red.500' : 'gray.500'}
              >
                {bio.length} / {maxCharacters}
              </Text>
            </FormControl>
          </Stack>
        </CardBody>
        <CardFooter justifyContent="flex-end">
          <ButtonGroup>
            <Button
              variant="outline"
              _hover={{
                background: 'red.500',
              }}
              onClick={handleInputClear}
            >
              Clear
            </Button>
            <Button
              bg="purpleBg"
              type="submit"
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

export default ProfileUpdateForm;
