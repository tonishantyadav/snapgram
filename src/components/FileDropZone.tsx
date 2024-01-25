import { Box, Image, Text, VStack, useColorModeValue } from '@chakra-ui/react';
import { FileRejection } from 'react-dropzone';
import fileUpload from '@assets/icons/file-upload.svg';
import FilePreview from '@components/FilePreview';
import useFileUpload from '@hooks/useFileUpload';

interface FileDropzoneProps {
  isFileUrl?: string;
  isFileUpload: File[];
  onFileUpload: (acceptedFiles: File[], rejectedFiles: FileRejection[]) => void;
}

const FileDropzone = ({
  isFileUrl,
  isFileUpload,
  onFileUpload,
}: FileDropzoneProps) => {
  const { getRootProps, getInputProps } = useFileUpload(onFileUpload);
  const isFileExist = isFileUrl && !isFileUpload.length;

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
        {isFileExist && <FilePreview url={isFileUrl} />}
        {!isFileUpload.length ? (
          <>
            <Image src={fileUpload} boxSize={isFileExist ? '50px' : ''} />
            <Text fontWeight="bold" color="gray">
              Drag and drop an image or video file here, or click to browse
            </Text>
          </>
        ) : (
          <FilePreview file={isFileUpload[0]} />
        )}
      </VStack>
    </Box>
  );
};

export default FileDropzone;
