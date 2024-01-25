import { useToast } from '@chakra-ui/react';
import { api } from '@services/appwrite-api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { UserUpdate } from '@user/types';
import { QUERY } from '@utils/query';

const useProfile = () => {
  const toast = useToast();
  const queryClient = useQueryClient();
  const ProfileUpdateMutation = useMutation({
    mutationFn: (user: UserUpdate) => api.userProfileUpdate(user),
    onSuccess: () => {
      queryClient.invalidateQueries([QUERY.USER]);
    },
    onError: () => {
      toast({
        title: 'Profile update failed',
        description: 'Please try again after sometime.',
        status: 'error',
        isClosable: true,
        duration: 3000,
        position: 'top',
      });
    },
  });

  const handleProfileUpdate = (user: UserUpdate) => {
    ProfileUpdateMutation.mutate(user);
  };

  return {
    isLoading: ProfileUpdateMutation.isLoading,
    isSuccess: ProfileUpdateMutation.isSuccess,
    isError: ProfileUpdateMutation.isError,
    handleProfileUpdate,
  };
};

export default useProfile;
