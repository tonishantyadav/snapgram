import { Divider, Grid, GridItem } from '@chakra-ui/react';
import { PostCreateForm } from '..';

const PostCreatePage = () => {
  return (
    <Grid
      templateAreas={{
        base: `'main main'`,
        md: `'divider main'`,
        lg: `'divider main'`,
      }}
      templateColumns={`1px 1fr`}
    >
      <GridItem area="divider" height="100%">
        <Divider orientation="vertical" />
      </GridItem>
      <GridItem area="main">
        <PostCreateForm />
      </GridItem>
    </Grid>
  );
};

export default PostCreatePage;
