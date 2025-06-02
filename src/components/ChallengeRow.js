import { Link } from 'react-router-dom';

const ChallengeRow = ({ id, title, username, solved, timesSolved, date, showSearch }) => {
  const colSize = showSearch ? 'w-1/12' : 'w-2/12';

  return (
    <div className="flex flex-wrap py-2 border-b border-black dark:border-white items-center text-sm md:text-base">
      {username && (
        <div className={`w-2/12 pr-2`}>
          <Link
            to={`/profile/${username}`}
            className="text-yellow-500 font-semibold no-underline hover:underline"
          >
            {username}
          </Link>
        </div>
      )}

      {title && (
        <div className="w-5/12">
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
            2024-10-01
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

      {timesSolved && (
        <div className="w-1/12">
          <span className="bg-gray-600 text-white text-xs px-2 py-1 rounded">
            {timesSolved}
          </span>
        </div>
      )}
    </div>
  );
};

export default ChallengeRow;
