import { useState } from 'react';
import usePostHandler from '../usePostHandler';

function CreateChallengeForm() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [difficulty, setDifficulty] = useState('easy');
  const [solution, setSolution] = useState('');
  const [message, setMessage] = useState('');

  const { post } = usePostHandler('challenges');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await post({ title, description, difficulty, solution });
      setMessage('Challenge created successfully');
      setTitle('');
      setDescription('');
      setSolution('');
      setDifficulty('easy');
    } catch (err) {
      setMessage(err.message || 'Something went wrong');
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-semibold text-center mb-6">Create Challenge</h2>
      <form onSubmit={handleSubmit} className="space-y-6 p-6">
        <div>
          <label htmlFor="title" className="block font-medium mb-1">
            Title
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter title"
            className="w-full border border-gray-300 dark:border-gray-700 rounded px-3 py-2 bg-white dark:bg-gray-900 dark:text-white"
          />
        </div>

        <div>
          <label htmlFor="description" className="block font-medium mb-1">
            Description
          </label>
          <textarea
            id="description"
            rows={6}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter description"
            className="w-full border border-gray-300 dark:border-gray-700 rounded px-3 py-2 bg-white dark:bg-gray-900 dark:text-white"
          ></textarea>
        </div>

        <div>
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
        </div>

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

export default CreateChallengeForm;
