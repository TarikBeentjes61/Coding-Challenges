import { useState, useEffect, useCallback } from 'react';

const API_URL = 'http://localhost:3001/api';

function useApiHandler(url, method = 'GET') {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem('token');

  const request = useCallback(async (body = {}, contentType_ = '') => {
    const shouldIncludeBody = ['POST', 'PUT', 'PATCH'].includes(method.toUpperCase());
    const isImageUpload = contentType_.startsWith('image/');

    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`${API_URL}/${url}`, {
        method,
        headers: {
          'Content-Type': contentType_ || 'application/json',
          ...(token && { Authorization: `Bearer ${token}` }),
        },
        ...(shouldIncludeBody && {
          body: isImageUpload ? body : JSON.stringify(body),
        }),
      });

      const contentType = res.headers.get('content-type');

      if (!res.ok) {
        const errorData = contentType?.includes('application/json')
          ? await res.json()
          : { message: 'An error occurred' };
        throw new Error(errorData.message);
      }

      if (res.status === 204) {
        setData(null);
        return null;
      }

      const responseData = contentType?.includes('application/json')
        ? await res.json()
        : null;

      setData(responseData);
      return responseData;
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [method, token, url]);

  useEffect(() => {
    if (method === 'GET') {
      request();
    }
  }, [method, request]);

  return { data, error, loading, request };
}

export default useApiHandler;
