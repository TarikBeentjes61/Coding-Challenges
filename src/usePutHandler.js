const API_URL = 'http://localhost:3001/api';

function usePutHandler(url) {
  const token = localStorage.getItem('token');

  const put = async (body) => {
    try {
      const isFormData = body instanceof FormData;

      const res = await fetch(`${API_URL}/${url}`, {
        method: 'PUT',
        headers: {
          ...(token && { Authorization: `Bearer ${token}` }),
          ...(isFormData ? {} : { 'Content-Type': 'application/json' }),
        },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || 'PUT request failed');
      }

      return await res.json();

    } catch (error) {
      throw error;
    }
  };

  return { put };
}

export default usePutHandler;
