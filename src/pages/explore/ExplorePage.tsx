import {
  Box,
  Divider,
  Flex,
  Grid,
  GridItem,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  SimpleGrid,
} from '@chakra-ui/react';
import { ExploreGrid, ExplorePosts } from '@pages/explore';
import { Models } from 'appwrite';
import { useEffect, useState } from 'react';
import { BsSearch } from 'react-icons/bs';
import useDebounce from '@hooks/useDebounce';
import usePostList from '@post/hooks/usePostList';
import usePostSearch from '@post/hooks/usePostSearch';

const ExplorePage = () => {
  const [searchText, setSearchText] = useState<string>('');
  const [explorePosts, setExplorePosts] = useState<ExplorePosts | undefined>(
    undefined
  );
  const debouncedSearch = useDebounce(searchText, 500);

  const posts = usePostList();
  const searchPosts = usePostSearch(debouncedSearch);

  const handleSearchText = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchText(value);
  };

  useEffect(() => {
    if (searchText !== '') {
      setExplorePosts({
        posts: searchPosts.data as Models.Document[] | undefined,
        isLoading: searchPosts.isLoading,
        isSuccess: searchPosts.isSuccess,
        isError: searchPosts.isError,
      });
    } else {
      setExplorePosts({
        posts: posts.data as Models.Document[] | undefined,
        isLoading: posts.isLoading,
        isSuccess: posts.isSuccess,
        isError: posts.isError,
      });
    }
  }, [searchPosts.data, posts.data]);

  return (
    <Grid
      templateAreas={{
        base: `'main main'`,
        md: `'divider main'`,
        lg: `'divider main'`,
      }}
      templateColumns={`1px 1fr`}
    >
      <GridItem area="divider" minHeight="100vh">
        <Divider orientation="vertical" />
      </GridItem>
      <GridItem area="main">
        <SimpleGrid templateRows="auto 1fr" templateColumns="1fr">
          <Box>
            <Flex direction="column" pt={6} rowGap={6} paddingX={5}>
              <Heading
                paddingStart={1}
                size={{
                  base: 'md',
                  md: 'lg',
                  lg: 'xl',
                }}
              >
                Explore Your Interests
              </Heading>
              <InputGroup>
                <InputLeftElement children={<BsSearch />} />
                <Input
                  borderRadius={20}
                  placeholder="Search posts..."
                  variant="filled"
                  onChange={handleSearchText}
                />
              </InputGroup>
            </Flex>
          </Box>
          <Box>
            {explorePosts && <ExploreGrid explorePosts={explorePosts} />}
          </Box>
        </SimpleGrid>
      </GridItem>
    </Grid>
  );
};

export default ExplorePage;
