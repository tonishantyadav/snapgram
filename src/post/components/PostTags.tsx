import { Box, Flex, Text, useTheme } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

interface Props {
  tags: string[];
}

const PostTags = ({ tags }: Props) => {
  const theme = useTheme();
  return (
    <Box>
      <Flex as={Link} gap={1} paddingX={2}>
        {tags.map(
          (tag, index) =>
            tag && (
              <Text
                key={index}
                variant="link"
                fontSize="sm"
                color={theme.colors.gray[500]}
                borderRadius="md"
                _hover={{ textDecoration: 'underline' }}
              >
                #{tag.toLowerCase()}
              </Text>
            )
        )}
      </Flex>
    </Box>
  );
};

export default PostTags;
