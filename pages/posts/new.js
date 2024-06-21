import PostForm from '../../components/PostForm';
import { useAuth } from '../../utils/context/authContext';

const NewPost = () => {
  const { user } = useAuth();
  return (
    <div>
      <h2>New Post</h2>
      <PostForm user={user} />
    </div>
  );
};

export default NewPost;
