import { useParams } from 'react-router-dom';
import Navigation from '../components/Navigation.js';
import useGetHandler from "../useGetHandler";
import SolveChallengeForm from '../components/SolveChallengeForm.js';
import EditChallengeForm from '../components/EditChallengeForm.js';

function SolveChallenge() {
    const { id } = useParams();
    const { data: challenge, loading, error } = useGetHandler(`challenges/${id}`, { method: 'GET' });
    const loggedInUser = JSON.parse(localStorage.getItem('user')) || '';
    const isOwner = loggedInUser?._id === challenge?.userId;

    return (
    <>
      <Navigation />
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {isOwner &&(
      <div>
        {challenge && <EditChallengeForm challenge={challenge}/>}
      </div>
      )}
      {!isOwner &&(
      <div>
        {challenge && <SolveChallengeForm challenge={challenge}/>}
      </div>
      )}
    </>
  );
    
}
export default SolveChallenge;