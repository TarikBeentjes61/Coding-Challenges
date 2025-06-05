import { useState, useEffect } from 'react';

const API_URL = 'http://localhost:3001/api';

function useApiHandler(url, method = 'GET') {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const token = localStorage.getItem('token');
    const runOnMount = method === 'GET' ? true : false;

    const request = async (body = {}, contentType_ = '') => {
        const shouldIncludeBody = ['POST', 'PUT', 'PATCH'].includes(method.toUpperCase());
        const makeJson = (contentType_.startsWith('image/'));
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
                body: makeJson ? body : JSON.stringify(body)
            }),
            });

            const contentType = res.headers.get('content-type');

            if (!res.ok) {
                const error = contentType?.includes('application/json')
                ? await res.json()
                : { message: 'An error occurred' };
                throw new Error(error.message);
            }

            if (res.status === 204) {
                setData(null);
                return null;
            }

            const data = contentType?.includes('application/json') ? await res.json() : null;

            setData(data);
            return data;

        } catch (err) {
            console.log(err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };


  useEffect(() => {
    if (runOnMount) {
      request();
    }
  }, [url]);

  return { data, error, loading, request };
}

export default useApiHandler;
