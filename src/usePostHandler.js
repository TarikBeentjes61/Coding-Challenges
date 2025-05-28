const API_URL = 'http://localhost:3001/api';

function usePostHandler(url) {
  const token = localStorage.getItem('token');

  const post = async (body = {}) => {
    try {
      const res = await fetch(`${API_URL}/${url}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token && { Authorization: `Bearer ${token}` }),
        },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || 'Something went wrong');
      }

      return await res.json();

    } catch (error) {
      throw error;
    }
  };


  return { post };
}

export default usePostHandler;

