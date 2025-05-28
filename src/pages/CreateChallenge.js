import Navigation from '../components/navigation/Navigation';
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