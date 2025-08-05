import { useEffect, useState } from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import axios from 'axios';

const REDIRECT_API = 'https://gomowebb.com/headless-poc/wp-json/myroutes/redirects';

export default function RedirectManager() {
  const location = useLocation();
  const [redirects, setRedirects] = useState([]);
  const [matchedRedirect, setMatchedRedirect] = useState(null);

  useEffect(() => {
    const fetchRedirects = async () => {
      try {
        const res = await axios.get(REDIRECT_API);
        setRedirects(res.data);
      } catch (err) {
        console.error('Redirect API error:', err);
      }
    };

    fetchRedirects();
  }, []);

  useEffect(() => {
    const path = location.pathname.replace(/\/$/, ''); // Remove trailing slash
    const match = redirects.find(r => r.from === path);
    if (match) setMatchedRedirect(match.to);
  }, [location.pathname, redirects]);

  if (matchedRedirect) {
    return <Navigate to={matchedRedirect} replace />;
  }

  return null;
}
