import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { getPosts } from '../../utils/data/postData';
import PostCard from '../../components/cards/PostCard';

function PostHome() {
  const [posts, setPosts] = useState([]); // State to store the list of posts
  const router = useRouter(); // Hook to handle routing/navigation

  const showPosts = () => {
    getPosts().then((data) => setPosts(data)); // Fetch posts and update state
  };

  useEffect(() => {
    showPosts(); // Fetch posts when the component mounts
  }, []);

  return (
    <>
      <div className="post-header">
        <h1 className="welcome-text">Posts</h1>
        <Button
          className="register-btn"
          onClick={() => {
            router.push('/posts/new'); // Navigate to the "new post" page
          }}
        >
          Register New Post
        </Button>
      </div>
      <hr />
      <div style={{
        display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center',
      }}
      >
        {posts.map((post) => (
          <div key={`post--${post.id}`} className="post">
            <PostCard
              obj={post} // Pass each post object to the PostCard component
              onUpdate={showPosts} // Pass the showPosts function for updates
            />
          </div>
        ))}
      </div>
    </>
  );
}

export default PostHome;
