import { useParams } from 'react-router-dom';
import useApiHandler from "../useApiHandler";
import SolveChallengeForm from '../components/SolveChallengeForm.js';
import EditChallengeForm from '../components/EditChallengeForm.js';
import Loading from '../components/Loading.js';
import Error from '../components/Error.js';

function SolveChallenge() {
    const { id } = useParams();
    const { data: challenge, loading, error } = useApiHandler(`challenges/${id}`);
    const loggedInUser = JSON.parse(localStorage.getItem('user')) || '';
    const isOwner = loggedInUser?._id === challenge?.userId;

    if (loading) return <Loading />;
    if (error) return <Error message={error} />;
    return (
    <>
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