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
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
  Textarea,
  useDisclosure,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { User } from '..';

interface Props {
  user: User | null;
}

const ProfileUpdateForm = ({ user }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [username, setUsername] = useState(user?.username ?? '');
  const [bio, setBio] = useState(user?.bio ?? '');
  const [image, setImage] = useState<File | null>(null);

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
      const file = files[0];
      setImage(file);
    }
  };

  return (
    <form>
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
                    <Avatar
                      size="lg"
                      src={image ? URL.createObjectURL(image) : user?.image}
                    />
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
                value={username}
                onChange={handleUsernameChange}
              />
            </FormControl>
            <FormControl>
              <FormLabel fontWeight="semibold">Bio</FormLabel>
              <Textarea
                placeholder="Enter bio"
                onChange={handleBioChange}
                value={bio}
                resize="none"
                focusBorderColor={bio.length > maxCharacters ? 'red.500' : ''}
              />
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
          <ButtonGroup spacing="2" display="flex">
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
              variant="solid"
              bg="purpleBg"
              _hover={{
                background: 'lightPurpleBg',
              }}
              type="submit"
              onClick={onOpen}
              // isDisabled={
              //   post.image ? false : !uploadFile.length ? true : false
              // }
            >
              <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                  <ModalHeader>Confirmation</ModalHeader>
                  <ModalCloseButton />
                  <ModalBody>
                    <Text>Are you sure you want to update these details?</Text>
                  </ModalBody>

                  <ModalFooter>
                    <Button colorScheme="red" mr={3} onClick={onClose}>
                      No
                    </Button>
                    <Button colorScheme="whatsapp">Yes</Button>
                  </ModalFooter>
                </ModalContent>
              </Modal>
              {/* {isLoading ? <Spinner /> : 'Submit'} */}
              Submit
            </Button>
          </ButtonGroup>
        </CardFooter>
      </Card>
    </form>
  );
};

export default ProfileUpdateForm;
