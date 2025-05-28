import Navigation from '../components/Navigation';
import ChallengeTable from '../components/ChallengeTable';
import { Container } from 'react-bootstrap';

function Challenges() {
  return (
    <><Navigation />
    <Container>
      <ChallengeTable showSearch={false}
      />
    </Container></>
  );
}
export default Challenges;

