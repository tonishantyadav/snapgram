import {
  FormControl,
  FormLabel,
  Input,
  Stack,
  Textarea,
} from '@chakra-ui/react';
import FileDropzone from './FileDropzone';
import { useState } from 'react';

const PostForm = () => {
  const [uploadFile, setUploadFile] = useState<File[]>([]);

  const handleFileUpload = (acceptedFiles: File[]) => {
    setUploadFile(acceptedFiles);
  };

  return (
    <form>
      <Stack spacing={4}>
        <FormControl>
          <FormLabel>Add caption</FormLabel>
          <Textarea />
        </FormControl>
        <FormControl>
          <FormLabel>Add image or video</FormLabel>
          <FileDropzone
            uploadFile={uploadFile}
            onFileUpload={handleFileUpload}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Add location</FormLabel>
          <Input type="text" />
        </FormControl>
        <FormControl>
          <FormLabel>Add tags</FormLabel>
          <Input type="text" placeholder="Cooking, Playing, Studying" />
        </FormControl>
      </Stack>
    </form>
  );
};

export default PostForm;
