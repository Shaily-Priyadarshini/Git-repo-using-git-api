import { useState, useEffect } from 'react';
import Body from './Body';
import Header from './Header';

function App() {
  const [totalResult, setTotal] = useState(0);
  const [userInfo, setUserInfo] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [resultStatus, setResultStatus] = useState(true);
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState("");

  useEffect(() => {
    const controller = new AbortController();
    const fetchData = async () => {
      if (!query) return;  // Early return if no query

      try {
        setLoading(true);
        setError(false);
        const response = await fetch(`https://api.github.com/search/users?q=${query}&page=${page}&sort=${sortBy}`, {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const res = await response.json();
        setUserInfo(res.items || []);
        setResultStatus(res.incomplete_results);
        setTotal(res.total_count || 0);
        setLoading(false);
      } catch (error) {
        if (error.name === 'AbortError') {
          console.log('Fetch aborted');
        } else {
          setError(true);
        }
        setLoading(false);
      }
    };

    fetchData();

    return () => controller.abort(); // Cleanup function to abort fetch on unmount
  }, [query, page, sortBy]);

  return (
    <>
      <Header query={query} setQuery={setQuery} sortBy={sortBy} setSortBy={setSortBy} />

      <Body
        totalResult={totalResult}
        userInfo={userInfo}
        error={error}
        loading={loading}
        resultStatus={resultStatus}
        query={query}
        page={page}
        setPage={setPage}
        sortBy={sortBy}
      />
    </>
  );
}

export default App;
