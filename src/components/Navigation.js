import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Moon, Sun } from 'lucide-react';

function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');
  const [token] = useState(localStorage.getItem('token'));
  const user = JSON.parse(localStorage.getItem('user'));

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
      if (theme === 'dark') {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
  };

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <nav className="bg-white dark:bg-gray-900 shadow px-4 py-3 border-b border-orange-300 text-black dark:text-white">
        <div className="max-w-8xl flex items-center">
          <div className="flex items-center space-x-6">
              <Link to="/home" className="text-xl font-bold">
                Coding Challenges
              </Link>
              {!token && (
                <ul className="hidden md:flex space-x-4">
                  <li><Link to="/login">Login</Link></li>
                  <li><Link to="/register">Register</Link></li>
                </ul>
              )}
              {token && (
              <ul className="hidden md:flex space-x-4">
                  <li><Link className="hover:text-blue-700 dark:hover:text-red-700" to={`/profile/${user.username}`}>Profile</Link></li>
                  <li><Link to="/challenges">Challenges</Link></li>
                  <li><Link to="/createChallenge">Create Challenge</Link></li>
                  <li><Link to="/leaderboards">Leaderboards</Link></li>
                  <li><Link to="/logout">Logout</Link></li>
              </ul>
              )}
            </div>
              <div className="ml-auto flex space-x-4">
                <button onClick={toggleTheme} >
                  {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
                </button>
                <button
                  className="md:hidden"
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                >☰</button>
              </div>
          </div>

      {(isMenuOpen && token) && (
        <ul className="md:hidden mt-2 flex flex-col space-y-3">
          <li><Link to="/profile">Profile</Link></li>
          <li><Link to="/challenges">Challenges</Link></li>
          <li><Link to="/createChallenge">Create Challenge</Link></li>
          <li><Link to="/leaderboards">Leaderboards</Link></li>
          <li><Link to="/logout">Logout</Link></li>
        </ul>
      )}
      {(isMenuOpen && !token) && (
        <ul className="md:hidden mt-2 flex flex-col space-y-3">
          <li><Link to="/login">Login</Link></li>
          <li><Link to="/register">Register</Link></li>
        </ul>
      )}

    </nav>
  );
}

export default Navigation;
