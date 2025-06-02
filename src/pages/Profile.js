import { useParams } from 'react-router-dom';
import Navigation from '../components/Navigation';
import ChallengeTable from '../components/ChallengeTable';
import useGetHandler from '../useGetHandler';
import banner from '../assets/banner1.png';

function Profile() {
    const { username } = useParams();
    const { data: user, loading, error } = useGetHandler(`users/profile/${username}`, { method: 'GET' });

    if (loading) return <p>Loading...</p>;
    if (error) return <p style={{ color: 'red' }}>{error}</p>;
    if (!user) return <p>User not found</p>;

    return (
      <div>
        <Navigation />
        <div class="relative w-full h-80">
          <img src={banner} alt="Banner" className="w-full h-80 object-cover"/>
          <div className="absolute w-full left-0 bottom-0 h-2/5 bg-black opacity-50"></div>
          <div className="absolute w-full left-0 bottom-0 h-1/5 bg-black opacity-75"></div>
          <div className="mb-2 absolute bottom-0 lg:left-48 left-8">
            <p className="text-shadow-lg lg:text-6xl text-5xl text-white font-bold">{user.username}</p>
            <p className={`text-shadow-lg lg:text-2xl text-1xl text-green-500 font-bold`}>Online</p>
          </div>
          <div className="mb-2 absolute bottom-0 lg:right-48 right-8">
            <p className="text-shadow-lg text-1xl text-white font-bold">33+</p>
            <p className="text-shadow-lg text-1xl text-white font-bold">/Reputation</p>
          </div>
        </div>
        <div className="border-b h-12 border-orange-400 bg-gray-600 dark:bg-gray-800 text-white"> 
          <div className="flex pt-2 pb-2 ml-8 mr-8 lg:ml-48 lg:mr-48">
            <h1 className="text-lg mr-8 h-1/1 font-bold border-b-2 border-orange-400">Profile</h1>
            <h1 className="text-lg mr-8 h-1/1 font-bold border-b-2 border-orange-400">Created Challenges</h1>
            <h1 className="text-lg mr-8 h-1/1 font-bold border-b-2 border-orange-400">Solved Challenges</h1>
            <div className="justify-self-auto text-lg h-1/1 font-bold border-b-2 border-orange-400">Edit</div>
          </div>
        </div>
        <div className="ml-48 mr-48 dark:bg-gray-900 dark:text-white"> 
          <div className="bg-white dark:bg-gray-800 p-6 mt-4 shadow-md">
            <h2 className="text-xl font-semibold mb-4">Challenges Created</h2>
            <ChallengeTable challenges={user.challenges} showSearch={true}/>
          </div>
        </div>
      </div>
    );
}

export default Profile;
