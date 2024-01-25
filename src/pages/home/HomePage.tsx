import {
  Box,
  Divider,
  Grid,
  GridItem,
  Show,
  SimpleGrid,
} from '@chakra-ui/react';
import { PostGrid } from '@post/components';
import { Stories, RightSideBar } from '@pages/home';

const HomePage = () => {
  return (
    <>
      <Grid
        templateAreas={{
          base: `'main'`,
          md: `'leftDivider main rightDivider rightSideBar'`,
          lg: `'leftDivider main rightDivider rightSideBar'`,
        }}
        templateColumns={{
          base: '1fr',
          md: '1px 1fr 1px 200px',
          lg: '1px 1fr 1px 300px',
          xl: '1px 1fr 1px 400px',
        }}
      >
        <GridItem area="leftDivider">
          <Divider orientation="vertical" />
        </GridItem>
        <GridItem area="main">
          <SimpleGrid templateRows={'90px 1px 1fr'} gap={5}>
            <Stories />
            <Box>
              <Divider />
            </Box>
            <PostGrid />
          </SimpleGrid>
        </GridItem>
        <GridItem area="rightDivider">
          <Divider orientation="vertical" />
        </GridItem>
        <Show above="md">
          <GridItem area="rightSideBar">
            <RightSideBar />
          </GridItem>
        </Show>
      </Grid>
    </>
  );
};

export default HomePage;
