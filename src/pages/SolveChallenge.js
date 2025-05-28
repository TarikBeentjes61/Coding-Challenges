import { useParams } from 'react-router-dom';
import Navigation from '../components/navigation/Navigation.js';
import useGetHandler from "../useGetHandler";
import SolveChallengeForm from '../components/SolveChallengeForm.js';

function SolveChallenge() {
    const { id } = useParams();
    const { data: challenge, loading, error } = useGetHandler(`challenges/${id}`, { method: 'GET' });
    return (
    <>
      <Navigation />
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div>
        {challenge && <SolveChallengeForm challengeId={id}/>}
      </div>
    </>
  );
    
}
export default SolveChallenge;