import { Button, HStack, Text, useTheme } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

interface Props {
  caption: string;
}

const PostCaption = ({ caption }: Props) => {
  const [postCaption, setPostCaption] = useState('');
  const [showFullCaption, setShowFullCaption] = useState(false);
  const theme = useTheme();

  const truncatedCaption = showFullCaption
    ? caption
    : `${caption.slice(0, 150)}`;

  useEffect(() => {
    if (truncatedCaption) {
      setPostCaption(`${truncatedCaption}...`);
    }
  }, [truncatedCaption, postCaption]);

  const handleToogleCaption = () => {
    setShowFullCaption(!showFullCaption);
  };

  return (
    <HStack>
      <Text>
        {postCaption}
        {postCaption.length > 150 && (
          <Button
            variant="unstyled"
            onClick={handleToogleCaption}
            size="xs"
            color={theme.colors.gray[500]}
            paddingLeft={1}
          >
            {showFullCaption ? 'less' : 'more'}
          </Button>
        )}
      </Text>
    </HStack>
  );
};

export default PostCaption;
