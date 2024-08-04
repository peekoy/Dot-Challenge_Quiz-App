import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../../components/card/Card';

export default function Login() {
  const [user, setUser] = useState({ username: '', password: '' });
  const navigate = useNavigate();

  function handleChange(e) {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!user.username || !user.password) return;
    navigate('/home');
  }

  return (
    <>
      <Card>
        <h1>Login</h1>
        <form action='' onSubmit={handleSubmit}>
          <input
            type='text'
            placeholder='username'
            name='username'
            onChange={handleChange}
          />
          <input
            type='password'
            placeholder='password'
            name='password'
            onChange={handleChange}
          />
          <button>Masuk</button>
        </form>
      </Card>
    </>
  );
}
