import Home from './pages/Home';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Register from './pages/Register';
import Logout from './pages/Logout';
import Challenges from './pages/Challenges';
import CreateChallenge from './pages/CreateChallenge';
import SolveChallenge from './pages/SolveChallenge';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';

import './App.css';

function App() {
  return (
      <div className="min-h-screen w-full bg-white dark:bg-gray-800">
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/logout" element={
              <PrivateRoute>
                <Logout />
              </PrivateRoute>
              } />
            <Route path="/profile/:username" element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>} />"
            <Route path="/home" element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>} />
            <Route path="/challenges" element={
              <PrivateRoute>
                <Challenges />
              </PrivateRoute>} />
            <Route path="/createChallenge" element={
              <PrivateRoute>
                <CreateChallenge />
              </PrivateRoute>} />
            <Route path="/challenges/:id" element={
              <PrivateRoute>
                <SolveChallenge />
              </PrivateRoute>} />
            <Route path="/" element={<Login />} />
          </Routes>
        </Router>
      </div>
  );
}
export default App;
