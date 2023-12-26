import { Divider, Grid, GridItem } from '@chakra-ui/react';
import { PostForm } from '../components';

const CreatePostPage = () => {
  return (
    <Grid
      templateAreas={{
        base: `'main main'`,
        md: `'divider main'`,
        lg: `'divider main'`,
      }}
      templateColumns={`1px 1fr`}
    >
      <GridItem height="100vh">
        <Divider orientation="vertical" />
      </GridItem>
      <GridItem area="main">
        <PostForm />
      </GridItem>
    </Grid>
  );
};

export default CreatePostPage;
