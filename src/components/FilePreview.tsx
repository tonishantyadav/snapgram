import { Image, Text } from '@chakra-ui/react';

interface FilePreviewProps {
  file: File | undefined;
}

const FilePreview = ({ file }: FilePreviewProps) => {
  if (!file) return null;

  if (file.type.startsWith('image/')) {
    return (
      <Image src={URL.createObjectURL(file)} alt="Uploaded" width="100%" />
    );
  } else if (file.type.startsWith('video/')) {
    return <video src={URL.createObjectURL(file)} controls width="100%" />;
  }

  return <Text>File type not supported</Text>;
};

export default FilePreview;
