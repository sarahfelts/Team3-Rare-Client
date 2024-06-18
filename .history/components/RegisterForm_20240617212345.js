import PropTypes from 'prop-types';
import { useState } from 'react';
import { useRouter } from 'next/router';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { registerUser } from '../utils/auth';

function RegisterForm({ user, updateUser }) {
  const router = useRouter();
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email:user.fbUser.email,
    bio: '',
    uid: user.uid,
    profile_image_url: '',
    created_on: new Date().toISOString().split('T')[0],
    active: true,
    is_staff: false,
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password !== formData.verify_password) {
      alert('Passwords do not match!');
      return;
    }

    registerUser(formData).then(() => {
      updateUser(user.uid);
      router.push('/');
    });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3">
        <Form.Label>First Name</Form.Label>
        <Form.Control type="text" name="first_name" required placeholder="Enter your first name" value={formData.first_name} onChange={({ target }) => setFormData((prev) => ({ ...prev, [target.name]: target.value }))} />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Last Name</Form.Label>
        <Form.Control type="text" name="last_name" required placeholder="Enter your last name" value={formData.last_name} onChange={({ target }) => setFormData((prev) => ({ ...prev, [target.name]: target.value }))} />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Email</Form.Label>
        <Form.Control type="email" name="email" required placeholder="Enter your email" value={formData.email} onChange={({ target }) => setFormData((prev) => ({ ...prev, [target.name]: target.value }))} />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Username</Form.Label>
        <Form.Control type="text" name="username" required placeholder="Enter your username" onChange={({ target }) => setFormData((prev) => ({ ...prev, [target.name]: target.value }))} />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" name="password" required placeholder="Enter your password" onChange={({ target }) => setFormData((prev) => ({ ...prev, [target.name]: target.value }))} />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Verify Password</Form.Label>
        <Form.Control type="password" name="verify_password" required placeholder="Enter your password again" onChange={({ target }) => setFormData((prev) => ({ ...prev, [target.name]: target.value }))} />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Profile Image URL</Form.Label>
        <Form.Control 
          type="text" 
          name="profile_image_url"
          placeholder="Enter your profile image URL"
          value={formData.profile_image_url} 
          onChange={({ target }) => setFormData((prev) => ({ ...prev, [target.name]: target.value }))}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Bio</Form.Label>
        <Form.Control as="textarea" name="bio" placeholder="Enter your bio" onChange={({ target }) => setFormData((prev) => ({ ...prev, [target.name]: target.value }))} />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}
RegisterForm.propTypes = {
  user: PropTypes.shape({
    uid: PropTypes.string.isRequired,
    displayName: PropTypes.string,
    photoURL: PropTypes.string,
    first_name: PropTypes.string,
    last_name: PropTypes.string,
    profile_image_url: PropTypes.string,
    email: PropTypes.string,
  }).isRequired,
  updateUser: PropTypes.func.isRequired,
};

export default RegisterForm;