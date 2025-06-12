import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useApiHandler from '../useApiHandler';

function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const { request: post, error } = useApiHandler('users/login', 'POST');

  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();
    const result = await post({ username, password });
    console.log(result);
    if (result) {
      localStorage.setItem('token', result.token);
      localStorage.setItem('user', JSON.stringify(result.user));
      window.dispatchEvent(new Event('authChanged'));
      navigate('/home');
    }
  };

  useEffect(() => {
    if (error) setMessage(error);
  }, [error]);

  return (
      <div className="p-8 text-black dark:text-white">
      <form className="max-w-sm mx-auto" onSubmit={handleLogin}>
        <div className="mb-5">
          <label for="username" className="block mb-2 text-sm font-medium">Username</label>
          <input
            className="bg-gray-150 border border-gray-400 !text-black text-sm rounded-lg block w-full p-2.5 dark:text-black"
            type="text"
            value={username}
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="mb-5">
          <label for="password" className="block mb-2 text-sm font-medium">Password</label>
          <input
            className="bg-gray-150 border border-gray-400 text-sm rounded-lg block w-full p-2.5 dark:text-black"
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
            className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg
             text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
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
