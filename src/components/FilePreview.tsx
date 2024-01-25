import { Image, Text } from '@chakra-ui/react';

interface FilePreviewProps {
  url?: string;
  file?: File;
}

const FilePreview = ({ url, file }: FilePreviewProps) => {
  if (url) {
    return (
      <Image
        src={url}
        alt="Uploaded"
        width="100%"
        objectFit="cover"
        borderRadius="10px"
      />
    );
  } else if (file) {
    if (!file) return null;
    if (file.type.startsWith('image/')) {
      return (
        <Image
          src={URL.createObjectURL(file)}
          alt="Uploaded"
          width="100%"
          borderRadius="10px"
        />
      );
    } else if (file.type.startsWith('video/')) {
      return <video src={URL.createObjectURL(file)} controls width="100%" />;
    }
  }

  return <Text>File type not supported</Text>;
};

export default FilePreview;
