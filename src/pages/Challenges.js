import Navigation from '../components/Navigation';
import ChallengeTable from '../components/ChallengeTable';
import { Container } from 'react-bootstrap';

function Challenges() {
  return (
    <><Navigation />
    <Container>
      <div className="mt-8 ml-0 mr-0 lg:ml-48 lg:mr-48 h-full text-black dark:text-white">
        <h1 className="text-3xl font-bold mb-4">Challenges</h1>
        <ChallengeTable/>
      </div>
    </Container></>
  );
}
export default Challenges;

