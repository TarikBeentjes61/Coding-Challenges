import { useState } from 'react';
import usePostHandler from '../usePostHandler';
import { useNavigate } from 'react-router-dom';

function RegisterForm() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  const { post }  = usePostHandler('users/register');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await post({ username, password, email });
      localStorage.setItem('token', result.token);
      localStorage.setItem('user', JSON.stringify(result.user));
      setMessage('Registration successful');
      navigate('/home');
    } catch (err) {
      setMessage('Registration failed: ' + err.message);
    }
  };
  return (
    <div style={{ maxWidth: '300px', margin: 'auto' }}>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input 
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
        /><br/><br/>
        <input
         type="email"
         value={email}
         onChange={(e) => setEmail(e.target.value)}
         placeholder="Email"
        /><br/><br/>
        <input
         type="password"
         value={password}
         onChange={(e) => setPassword(e.target.value)}
         placeholder="Password"
        /><br/><br/>
        <input
         type="password"
         value={confirmPassword}
         onChange={(e) => setConfirmPassword(e.target.value)}
         placeholder="Confirm Password"
        /><br/><br/>
        <button type="submit">Register</button>
      </form>
      {message && <p>{message}</p>}

    </div>
  );
}

export default RegisterForm;
