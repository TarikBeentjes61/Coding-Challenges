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
  const [sortDirection, setSortDirection] = useState(null); 
  const [sortDateDirection, setSortDateDirection] = useState(null);


    useEffect(() => {
    if (!challenges) return;

    const search = filter.toLowerCase();

    let filtered = challenges.filter((challenge) => {
        const matchesText =
        challenge.title?.toLowerCase().includes(search) ||
        challenge.username?.toLowerCase().includes(search);

        const matchesSolved =
        !solved ||
        (solved === 'solved' && challenge.solved === true) ||
        (solved === 'unsolved' && challenge.solved === false);

        return matchesText && matchesSolved;
    });

    if (sortDirection) {
        filtered = filtered.sort((a, b) =>
        sortDirection === 'asc'
            ? a.timesSolved - b.timesSolved
            : b.timesSolved - a.timesSolved
        );
    }

    if (sortDateDirection) {
        filtered = filtered.sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return sortDateDirection === 'asc' ? dateA - dateB : dateB - dateA;
        });
    }

    setFilteredChallenges(filtered);
    }, [filter, solved, sortDirection, sortDateDirection, challenges]);



    const toggleSolved = () => {
        setSolved((prev) =>
            prev === '' ? 'solved' : prev === 'solved' ? 'unsolved' : ''
        );
    };
    const toggleSort = () => {
        setSortDirection((prev) =>
            prev === null ? 'asc' : prev === 'asc' ? 'desc' : null
        );
    };
    const toggleDateSort = () => {
        setSortDateDirection((prev) =>
            prev === null ? 'asc' : prev === 'asc' ? 'desc' : null
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
        <form className="mb-4">
            {showSearch && (
                <div className="lg:w-2/12 w-4/12 mr-2 mb-4 dark:text-black">
                    <input
                    type="text"
                    placeholder="Search"
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    className="w-full border rounded px-2 py-1 text-sm"
                    />
                </div>
            )}
          <div className="flex flex-wrap gap-y-4 border-b border-black dark:border-white pb-2 font-semibold text-sm md:text-base">
            {showUser && (
                <div className="w-2/12">User</div>
            )}

            {showTitle && (
                <div className="w-5/12">Title</div>
            )}
            
            {showDate && (
                <div className="w-2/12 cursor-pointer" onClick={toggleDateSort}>
                    Date {sortDateDirection === 'asc' ? '↑' : sortDateDirection === 'desc' ? '↓' : ''}
                </div>
            )}

            {showSolved && (
                <div className="w-2/12 cursor-pointer"
                    onClick={toggleSolved}>
                Solved
                <span className={`text-xs px-1 ml-1 py-1 rounded ${solved === 'solved' ? 'bg-green-600' : solved === 'unsolved' ? 'bg-red-600' : ''}`}></span>
                </div>
            )}
                        
            {showTimesSolved && (
                <div className="w-1/12 cursor-pointer" onClick={toggleSort}>
                    Times {sortDirection === 'asc' ? '↑' : sortDirection === 'desc' ? '↓' : ''}
                </div>            
            )}

          </div>
        </form>

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
