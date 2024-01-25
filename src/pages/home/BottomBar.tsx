import { Avatar, Box, Button, Divider, HStack, Image } from '@chakra-ui/react';
import { smNavLinks } from '@constants/navigation';
import useUserStore from '@user/hooks/useUserStore';
import { Link } from 'react-router-dom';

const BottomBar = () => {
  const { user } = useUserStore();
  return (
    <Box>
      <Divider />
      <HStack padding={2} height="auto" justifyContent="space-evenly">
        {smNavLinks.map((smNavLink) => (
          <Button
            key={smNavLink.route}
            as={Link}
            to={smNavLink.route}
            variant={
              location.pathname === '/'
                ? 'ghost'
                : location.pathname != smNavLink.route
                ? 'ghost'
                : 'solid'
            }
          >
            <Image src={smNavLink.imgURL} />
          </Button>
        ))}
        <Button
          as={Link}
          to={`/profile/${user?.$id}`}
          variant={
            location.pathname === `/profile/${user?.$id}` ? 'solid' : 'ghost'
          }
        >
          <Avatar src={user?.image} size="sm" />
        </Button>
      </HStack>
    </Box>
  );
};

export default BottomBar;
