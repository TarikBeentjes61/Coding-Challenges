import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import usePostHandler from '../usePostHandler';

function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const { post, error } = usePostHandler('users/login');

  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const result = await post({ username, password });
      if (result.token) {
        localStorage.setItem('token', result.token);
        localStorage.setItem('user', JSON.stringify(result.user));
        setMessage('Login successful');
      } else {
        setMessage(error.message);
      }
      navigate('/home');
    } catch (err) {
      setMessage(err.message);
    }
  };

  return (
      <div className="mt-8">
      <form className="max-w-sm mx-auto" onSubmit={handleLogin}>
        <div className="mb-5">
          <label for="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username</label>
          <input
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            type="text"
            value={username}
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="mb-5">
          <label for="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
          <input
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            type="password"
            value={password}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="flex items-start mb-5">
          <button
            type="submit"
            className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Login
          </button>
        </div>
        {message && (
        <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <span class="block sm:inline">{message}</span>
          <span class="absolute top-0 bottom-0 right-0 px-4 py-3" onClick={() => setMessage('')}>
            X
          </span>
        </div>
        )}
      </form>
    </div>
  );
}

export default LoginForm;
