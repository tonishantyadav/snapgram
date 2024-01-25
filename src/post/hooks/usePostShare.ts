import { Models } from 'appwrite';

const usePostShare = (post: Models.Document) => {
  const handleShare = () => {
    // Implement the logic to handle sharing the post
    // This function will define how the post should be shared (e.g., via social media, copying link, etc.)

    // For example, sharing the post link using the browser's share API (navigator.share)
    if (navigator.share) {
      navigator
        .share({
          title: 'Check out this post!',
          text: post.caption, // You can use post content or caption here
          url: `http://127.0.0.1:5173/posts/${post.$id}`, // Replace with your post URL
        })
        .then(() => {
          console.log('Post shared successfully');
        })
        .catch((error) => {
          console.error('Error sharing post:', error);
        });
    } else {
      // Fallback for browsers that don't support the share API
      // Here you can provide alternative sharing options or copy the post link to the clipboard
      console.log('Share API not supported. Implement fallback logic.');
      // Implement fallback logic for sharing (e.g., copy post link to clipboard)
    }
  };
  return { handleShare };
};

export default usePostShare;
