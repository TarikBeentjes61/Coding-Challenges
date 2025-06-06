import { Link } from 'react-router-dom';

const ChallengeRow = ({ id, title, username, solved, timesSolved, date }) => {
  return (
    <>
    <div className="border-b border-black dark:border-white flex-wrap py-2 items-center text-sm md:text-base hidden sm:flex">
      {username && (
        <div className="w-2/12 pr-2">
          <Link
            to={`/profile/${username}`}
            className="text-yellow-500 font-semibold no-underline hover:underline"
          >
            {username}
          </Link>
        </div>
      )}

      {title && (
        <div className="w-4/12">
          <Link
            to={`/challenges/${id}`}
            className="text-cyan-500 font-semibold block break-words"
          >
            {title}
          </Link>
        </div>
      )}

      {date && (
        <div className="w-2/12">
          <span className="bg-gray-600 text-white text-xs px-2 py-1 rounded">
            {new Date(date).toLocaleDateString()}
          </span>
        </div>
      )}

      {typeof solved === 'boolean' && (
        <div className="w-2/12">
          <span className={`text-white text-xs px-2 py-1 rounded ${solved ? 'bg-green-600' : 'bg-red-600'}`}>
            {solved ? 'Solved' : 'Unsolved'}
          </span>
        </div>
      )}

      {typeof timesSolved === 'number' && (
        <div className="w-1/12">
          <span className="bg-gray-600 text-white text-xs px-2 py-1 rounded">
            {timesSolved}
          </span>
        </div>
      )}
    </div>

    <div className="sm:hidden bg-white dark:bg-gray-800 border border-gray-300 dark:border-white rounded-sm p-3 mb-3 shadow-sm">
      <Link to={`/challenges/${id}`} className="text-cyan-500 text-base font-semibold hover:underline break-words">
        {title}
      </Link>
      <div className="text-yellow-500 text-sm mt-1">
        <Link to={`/profile/${username}`} className="hover:underline">{username}</Link>
      </div>
      <div className="flex flex-wrap gap-2 mt-2 text-xs">
        {date && (
          <span className="bg-gray-600 text-white px-2 py-1 rounded">
            {new Date(date).toLocaleDateString()}
          </span>
        )}
        {typeof solved === 'boolean' && (
          <span className={`text-white px-2 py-1 rounded ${solved ? 'bg-green-600' : 'bg-red-600'}`}>
            {solved ? 'Solved' : 'Unsolved'}
          </span>
        )}
        {typeof timesSolved === 'number' && (
          <span className="bg-blue-600 text-white px-2 py-1 rounded">
            Solved {timesSolved} times
          </span>
        )}
      </div>
    </div>
    </>
  );
};

export default ChallengeRow;


