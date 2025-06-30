import React, { useState, useEffect, useMemo } from "react";
import { Link } from "react-router";
import SearchBar from "./SearchBar";
import Pagination from "./Pagination";

// Hook personnalisé pour le debounce
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

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 10;

  // Debounce de la recherche avec un délai de 300ms
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

  // Filtrage par recherche avec debounce
  const filteredPosts = useMemo(() => 
    posts.filter((post) =>
      post.title.toLowerCase().includes(debouncedSearch.toLowerCase())
    ), [posts, debouncedSearch]
  );

  // Pagination
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const startIdx = (currentPage - 1) * postsPerPage;
  const paginatedPosts = filteredPosts.slice(startIdx, startIdx + postsPerPage);

  useEffect(() => {
    setCurrentPage(1); // Reset page si recherche change
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
            <ul>
              {paginatedPosts.map((post) => (
                <li
                  key={post.id}
                  className="mb-4 border border-gray-200 rounded-lg p-4 shadow-sm bg-white"
                >
                  <h3 className="text-lg font-semibold mb-1">{post.title}</h3>
                  <p className="text-gray-700 mb-3">{post.body}</p>
                  <Link
                    to={`/post/${post.id}`}
                    className="inline-flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200 text-sm font-medium"
                  >
                    En savoir plus
                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </li>
              ))}
            </ul>
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
};

export default Posts;
