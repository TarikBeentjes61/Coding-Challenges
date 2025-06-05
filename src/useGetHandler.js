import { useState, useEffect } from 'react';

const API_URL = 'http://localhost:3001/api';

function useApiHandler(url, runOnMount = true) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem('token');

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_URL}/${url}`, {
        headers: {
          ...(token && { Authorization: `Bearer ${token}` }),
          'Content-Type': 'application/json',
        },
      });
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message);
      }
      const data = await res.json();
      setData(data);
    } catch (err) {
      console.log(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (runOnMount) {
      fetchData();
    }
  }, [url]);

  return { data, error, loading, refetch: fetchData };
}

export default useApiHandler;
