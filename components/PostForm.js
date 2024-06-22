import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useAuth } from '../utils/context/authContext';
import { createPost, updatePost } from '../utils/data/postData';
// import { getCategories } from '../../utils/data/categoryData';
// import { getTags } from '../../utils/data/tagData';

const initialState = {
  id: 0,
  title: '',
  imageUrl: '',
  content: '',
  categoryId: 0,
  tags: [],
};

const PostForm = ({ postObj }) => {
  const { user } = useAuth();
  const router = useRouter();
  const [currentPost, setCurrentPost] = useState(initialState);
  // const [categories, setCategories] = useState([]);
  // const [tags, setTags] = useState([]);

  useEffect(() => {
    // getCategories().then(setCategories);
    // getTags().then(setTags);

    if (postObj.id) {
      setCurrentPost({
        id: postObj.id,
        title: postObj.title,
        imageUrl: postObj.image_url,
        content: postObj.content,
        categoryId: postObj.categoryId,
        tags: postObj.tags.map((tag) => tag.id),
        rareUser: user.id,
      });
    }
  }, [postObj, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentPost((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // const handleTagChange = (e) => {
  //   const { checked, value } = e.target;
  //   setCurrentPost((prevState) => {
  //     if (checked) {
  //       return { ...prevState, tags: [...prevState.tags, parseInt(value, 10)] };
  //     }
  //     return { ...prevState, tags: prevState.tags.filter((tag) => tag !== parseInt(value, 10)) };
  //   });
  // };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      ...currentPost,
      rareUser: user.id,
    };

    if (postObj.id) {
      updatePost(currentPost.id, payload).then(() => router.push('/posts'));
    } else {
      createPost(payload).then(() => router.push('/posts'));
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3">
        <Form.Label>Title</Form.Label>
        <Form.Control
          type="text"
          name="title"
          placeholder="What's the title?"
          required
          value={currentPost.title}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Image Url</Form.Label>
        <Form.Control
          type="text"
          name="imageUrl"
          placeholder="Pic!"
          value={currentPost.imageUrl}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Content</Form.Label>
        <Form.Control
          as="textarea"
          name="content"
          placeholder="Content"
          required
          value={currentPost.content}
          onChange={handleChange}
        />
      </Form.Group>

      {/* <Form.Group className="mb-3">
        <Form.Label>Category</Form.Label>
        <Form.Select
          name="categoryId"
          value={currentPost.categoryId}
          onChange={handleChange}
          required
        >
          <option value="">Select a category</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.label}
            </option>
          ))}
        </Form.Select>
      </Form.Group> */}

      {/* <Form.Group className="mb-3">
        <Form.Label>Tags</Form.Label>
        {tags.map((tag) => (
          <Form.Check
            key={tag.id}
            type="checkbox"
            label={tag.label}
            value={tag.id}
            checked={currentPost.tags.includes(tag.id)}
            onChange={handleTagChange}
          />
        ))}
      </Form.Group> */}

      <Button type="submit">{postObj.id ? 'Update' : 'Publish'} Post</Button>
    </Form>
  );
};

PostForm.propTypes = {
  postObj: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    image_url: PropTypes.string,
    content: PropTypes.string,
    categoryId: PropTypes.number,
    rareUser: PropTypes.number,
    publicationDate: PropTypes.string,
    tags: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number,
      label: PropTypes.string,
    })),
  }),
};

PostForm.defaultProps = {
  postObj: initialState,
};

export default PostForm;
