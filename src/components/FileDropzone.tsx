import { Box, Image, Text, VStack, useColorModeValue } from '@chakra-ui/react';
import { FileRejection } from 'react-dropzone';
import { useFileUpload } from '../hooks';
import FilePreview from './FilePreview';

interface FileDropzoneProps {
  uploadFile: File[];
  onFileUpload: (acceptedFiles: File[], rejectedFiles: FileRejection[]) => void;
}

const FileDropzone = ({ uploadFile, onFileUpload }: FileDropzoneProps) => {
  const { getRootProps, getInputProps } = useFileUpload(onFileUpload);

  console.log(uploadFile);

  return (
    <Box
      p={4}
      borderWidth={2}
      borderStyle="dashed"
      borderColor={useColorModeValue('gray.300', 'gray.600')}
      borderRadius="md"
      textAlign="center"
      cursor="pointer"
      position="relative"
      {...getRootProps()}
    >
      <VStack spacing={2}>
        <input {...getInputProps()} />
        {!uploadFile.length ? (
          <>
            <Image src="/assets/icons/file-upload.svg" />
            <Text fontWeight="bold" color="gray">
              Drag and drop an image or video file here, or click to browse
            </Text>
          </>
        ) : (
          <FilePreview file={uploadFile[0]} />
        )}
      </VStack>
    </Box>
  );
};

export default FileDropzone;
