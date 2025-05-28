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
import { Container } from 'react-bootstrap';
import { ThemeProvider } from './components/ThemeProvider';

import './App.css';

function App() {
  return (
    <ThemeProvider>
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
    </ThemeProvider>
  );
}
export default App;
