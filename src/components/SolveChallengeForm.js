import usePostHandler from "../usePostHandler";
import { useState } from 'react';

function SolveChallengeForm({ challenge }) {
  const { post } = usePostHandler('challenges/solve');
  const [solution, setSolution] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await post({ challengeId: challenge._id, solution });
      setMessage('Challenge solved successfully');
    } catch (err) {
      setMessage(err.message);
    }
  };
  if (challenge) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-8 dark:text-white">
        <h2 className="text-2xl font-semibold text-center mb-6">{challenge.title}</h2>
        <form onSubmit={handleSubmit} className="space-y-6 p-6">
          <div className="mb-4 pb-4 border-b-2 border-dashed">
            <p>{challenge.description}</p>
          </div>
          <label htmlFor="solution" className="block font-medium mb-1">
            Solution
          </label>
          <input
            id="solution"
            type="text"
            value={solution}
            onChange={(e) => setSolution(e.target.value)}
            placeholder="Enter solution"
            className="w-full border border-gray-300 dark:border-gray-700 rounded px-3 py-2 bg-white dark:bg-gray-900 dark:text-white"
          />
          <button
            type="submit"
            className="w-full bg-orange-500 text-white py-2 px-4 rounded hover:bg-orange-600 transition"
            >
            Submit
          </button>
        {message && (
          <div className="mt-4 text-center text-sm text-blue-700 bg-blue-100 dark:bg-gray-800 dark:text-blue-300 px-4 py-2 rounded">
            {message}
          </div>
        )}
        </form>
      </div>
    );
  }
}

export default SolveChallengeForm;
