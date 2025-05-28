import React from 'react';
import Navigation from '../components/Navigation';
import { Container } from 'react-bootstrap';

function Home() {
  return (
    <Container>
      <Navigation />
      <h1>Welcome to the Home Page</h1>
    </Container>
  );
}

export default Home;
