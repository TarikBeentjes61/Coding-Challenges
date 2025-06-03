import { useParams } from 'react-router-dom';
import { useState, useRef } from 'react';
import Navigation from '../components/Navigation';
import ChallengeTable from '../components/ChallengeTable';
import useGetHandler from '../useGetHandler';
import usePostHandler from '../usePostHandler';
import '../config.js';
function Profile() {
    const { username } = useParams();
    const { data: user, loading, error } = useGetHandler(`users/profile/${username}`, { method: 'GET' });
    const { post } = usePostHandler(`users/profile/${username}/banner`);

    const loggedInUser = JSON.parse(localStorage.getItem('user')) || '';
    const isOwner = loggedInUser?._id === user?._id;

    const [selectedTab, setSelectedTab] = useState('created'); 
    const tabs = [
      { label: 'Created Challenges', value: 'created' },
      { label: 'Solved Challenges', value: 'solved' },
    ];

    const [preview, setPreview] = useState(null);
    const fileInputRef = useRef();

    const handleIconClick = () => {
      fileInputRef.current.click();
    };

    const handleFileChange = (e) => {
      const selected = e.target.files[0];
      if (!selected) return;
      if (!selected.type.startsWith('image/')) {
        alert('Please select an image file.');
        return;
      }
      setPreview(URL.createObjectURL(selected));
      handleUpload(selected);
    };

    const handleUpload = async (file) => {
      const formData = new FormData();
      formData.append('file', file);
      try {
        await post(formData);
      } catch (error) {
        console.error(error);
      }
    }
    
    if (loading) return <p>Loading...</p>;
    if (error) return <p style={{ color: 'red' }}>{error}</p>;
    if (!user) return <p>User not found</p>;

    return (
      <div className="bg-white dark:bg-gray-800 text-black dark:text-white">
        <Navigation />
        <div className="relative w-full h-80">
          {preview && (
            <img src={preview} alt="Preview" className="w-full h-80 object-cover" />
          )}
          {!preview && user.banner && (
            <img src={`${global.config.server.baseUrl}${user.banner}`} alt="Banner" className="w-full h-80 object-cover"/>
          )}
          {!preview && !user.banner && (
            <img src={`${global.config.server.baseUrl}uploads/banners/default.jpg`} alt="Default Banner" className="w-full h-80 object-cover"/>
          )}
          <div className="absolute w-full left-0 bottom-0 h-2/5 bg-black opacity-50"></div>
          <div className="absolute w-full left-0 bottom-0 h-1/5 bg-black opacity-75"></div>
          <div className="mb-2 absolute bottom-0 lg:left-48 left-8">
            <p className="text-shadow-lg lg:text-6xl md:text-5xl text-4xl text-white font-bold">{user.username}</p>
            <p className={`text-shadow-lg lg:text-2xl text-1xl text-green-500 font-bold`}>Online</p>
          </div>
          {isOwner && (
          <div className="absolute top-4 right-4">
            <input className="hidden" type="file" accept="image/*" onChange={handleFileChange} ref={fileInputRef}/>
            <div className="text-shadow-lg text-gray-200 font-bold cursor-pointer" onClick={handleIconClick}>Change Banner</div>
          </div>
          )}
          <div className="mb-2 absolute bottom-0 lg:right-48 right-8">

            <p className="text-shadow-lg text-white font-bold">{user.reputation}+</p>
            <p className="text-shadow-lg text-white font-bold">/Reputation</p>
          </div>
        </div>
        <div className="border-b sm:h-12 border-orange-400 bg-gray-100 dark:bg-black"> 
      <div className="hidden sm:flex pt-2 pb-2 ml-8 mr-8 lg:ml-48 lg:mr-48">
        {tabs.map((tab) => (
          <button
            key={tab.value}
            onClick={() => setSelectedTab(tab.value)}
            className={`text-lg mr-8 h-full pb-1 border-b-2 transition-colors ${
              selectedTab === tab.value
                ? 'border-orange-400 font-bold'
                : 'border-transparent hover:border-orange-300'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-2 ml-2 mr-2 text-lg sm:hidden text-center pt-2 pb-2">
        {tabs.map((tab) => (
          <button
            key={tab.value}
            onClick={() => setSelectedTab(tab.value)}
            className={`pb-1 border-b-2 transition-colors ${
              selectedTab === tab.value
                ? 'border-orange-400 font-semibold'
                : 'border-transparent hover:border-orange-300'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
        </div>
        <div className="ml-0 mr-0 lg:ml-48 lg:mr-48 h-full dark:bg-gray-900">
          {selectedTab === 'solved' && (
            <div className="bg-white dark:bg-gray-800 p-6">
              <ChallengeTable url={`challenges/solved/${username}`}/>
            </div>
          )}
          {selectedTab === 'created' && (
            <div className="bg-white dark:bg-gray-800 p-6">
              <ChallengeTable url={`challenges/created/${username}`}/>
            </div>
          )}
        </div>
      </div>
    );
}

export default Profile;
