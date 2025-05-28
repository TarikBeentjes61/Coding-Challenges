import Navigation from '../components/Navigation';
import CreateChallengeForm from '../components/CreateChallengeForm';
import { Container } from 'react-bootstrap';

function CreateChallenge() {
  return (
    <Container>
      <Navigation />
      <CreateChallengeForm />
    </Container>
  );
}

export default CreateChallenge;