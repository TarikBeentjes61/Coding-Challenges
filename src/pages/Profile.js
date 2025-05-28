import { useParams } from 'react-router-dom';
import Navigation from '../components/navigation/Navigation';
import ChallengeTable from '../components/ChallengeTable';
import useGetHandler from '../useGetHandler';
import { Container, Row, Image} from 'react-bootstrap';
import banner from '../assets/banner1.png';

function Profile() {
    const { username } = useParams();
    const { data: user, loading, error } = useGetHandler(`users/profile/${username}`, { method: 'GET' });

    if (loading) return <p>Loading...</p>;
    if (error) return <p style={{ color: 'red' }}>{error}</p>;
    if (!user) return <p>User not found</p>;

    return (
      <div class="main-container">
        <Navigation />
        <div class="banner-container">
          <Row>
            <Image src={banner} className="banner" alt="Profile Banner" fluid/>
            <div class="banner-layer"></div>
            <div>            
              <h1 class="banner-text">{username}</h1>
            </div>
            <div>
              <p class="banner-status">Online</p> 
            </div>
          </Row>
        </div>
        <div class="content-navigation">
          
        </div>
        <div class="content-container">
        <Row className="py-2 border-bottom">
          <h2>Created Challenges</h2>
        </Row>
        <ChallengeTable url={`challenges/created/${username}`} showUser={false}/>
        <Row className="py-2 border-bottom">
          <h2>Solved Challenges</h2>
        </Row>
        <ChallengeTable url={`challenges/solved/${username}`}/>
      </div>
    </div>
  );
}

export default Profile;
