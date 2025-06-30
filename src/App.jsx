import React, { useState, useEffect, useMemo } from "react";
import SearchBar from "./SearchBar";
import PostList from "./PostList";
import Pagination from "./Pagination";

const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

function App() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 10;
  const debouncedSearch = useDebounce(search, 300);

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((res) => {
        if (!res.ok) throw new Error("Erreur lors du chargement des articles");
        return res.json();
      })
      .then((data) => {
        setPosts(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const filteredPosts = useMemo(() => 
    posts.filter((post) =>
      post.title.toLowerCase().includes(debouncedSearch.toLowerCase())
    ), [posts, debouncedSearch]
  );

  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const startIdx = (currentPage - 1) * postsPerPage;
  const paginatedPosts = filteredPosts.slice(startIdx, startIdx + postsPerPage);

  useEffect(() => {
    setCurrentPage(1); 
  }, [debouncedSearch]);

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Articles</h1>
      <SearchBar value={search} onChange={e => setSearch(e.target.value)} />
      {loading && <p className="text-blue-500">Chargement...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && !error && (
        paginatedPosts.length > 0 ? (
          <>
            <PostList posts={paginatedPosts} />
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </>
        ) : (
          <p className="text-gray-500">Aucun résultat</p>
        )
      )}
    </div>
  );
}

export default App;
