import { Box, Skeleton, Divider, SkeletonText } from '@chakra-ui/react';

const PostCardSkeleton = () => {
  return (
    <>
      <Box padding={10}>
        <Box paddingBottom={3} borderRadius="10px">
          <Skeleton width="20%" height="10px" />
        </Box>
        <Box paddingBottom={3}>
          <Skeleton width="100%" height="35vh" borderRadius="5px" />
        </Box>
        <Box paddingBottom={5}>
          <SkeletonText height="10px" />
        </Box>
      </Box>
      <Divider width="100%" />
    </>
  );
};

export default PostCardSkeleton;
