import ChallengeRow from '../components/ChallengeRow';
import { useState, useEffect } from 'react';
import useGetHandler from '../useGetHandler';
import Loading from '../components/Loading';
import Error from '../components/Error';

function ChallengeTable({
  url = 'challenges',
  showUser = true,
  showTitle = true,
  showDate = true,
  showSolved = true,
  showTimesSolved = true,
  showSearch = true,
}) {
  const { data: challenges, loading, error } = useGetHandler(url, { method: 'GET' });
  const [filteredChallenges, setFilteredChallenges] = useState(null);
  const [filter, setFilter] = useState('');
  const [solved, setSolved] = useState('');

    useEffect(() => {
    if (!challenges) return;

    const search = filter.toLowerCase();

    const filtered = challenges.filter((challenge) => {
        const matchesText =
        challenge.title?.toLowerCase().includes(search) ||
        challenge.username?.toLowerCase().includes(search);

        const matchesSolved =
        !solved ||
        (solved === 'solved' && challenge.solved === true) ||
        (solved === 'unsolved' && challenge.solved === false);

        return matchesText && matchesSolved;
    });

    setFilteredChallenges(filtered);
    }, [filter, solved, challenges]);

    const toggleSolved = () => {
        setSolved((prev) =>
            prev === '' ? 'solved' : prev === 'solved' ? 'unsolved' : ''
        );
    };

  if (challenges == null || challenges.length === 0) {
    return (
      <div className="p-0">
        {loading && <Loading />}
        {error && <Error message={error} />}
        {!loading && !error && <p className="text-gray-500">No challenges found.</p>}
      </div>
    );
  }

  return (
    <div className="p-0">
      {showSearch && (
        <form className="mb-4">
            <div className="w-4/12 mr-2 mb-4">
                <input
                type="text"
                placeholder="Search"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="w-full border rounded px-2 py-1 text-sm"
                />
            </div>
          <div className="flex flex-wrap gap-y-4 border-b pb-2 font-semibold text-sm md:text-base">
            {showUser && (
                <div className="w-2/12">User</div>
            )}

            {showTitle && (
                <div className="w-6/12">Title</div>
            )}

            {showSolved && (
                <div className="w-1/12 cursor-pointer"

                    onClick={toggleSolved}
                    style={{
                    color:
                        solved === 'solved' ? '#16a34a' : solved === 'unsolved' ? '#dc2626' : 'white'
                    }}>
                {solved === 'solved'
                    ? 'Solved'
                    : solved === 'unsolved'
                    ? 'Unsolved'
                    : 'Solved'}
                </div>

            )}
                        
            {showTimesSolved && (
                <div className="w-1/12">Times Solved</div>
            )}
            
            {showDate && (
              <>
                <div className="w-1/12">Date</div>
              </>
            )}

          </div>
        </form>
      )}

      {filteredChallenges?.map(({ _id, title, date, username, solved, timesSolved}) => (
        <ChallengeRow
            key={_id}
            id={_id}
            title={showTitle ? title : undefined}
            date={showDate ? date : undefined}
            username={showUser ? username : undefined}
            solved={showSolved ? solved : undefined}
            timesSolved={showTimesSolved ? timesSolved : undefined}
            showSearch={showSearch}
        />
      ))}
    </div>
  );
}

export default ChallengeTable;
