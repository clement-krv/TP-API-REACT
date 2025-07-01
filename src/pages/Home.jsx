import React, { useState, useEffect, useMemo } from "react";
import { Link } from "react-router";
import SearchBar from "../components/SearchBar";
import Pagination from "../components/Pagination";

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

const Home = () => {
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
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Articles</h1>
        <p className="text-gray-600">Découvrez notre collection d'articles</p>
      </div>
      
      <SearchBar value={search} onChange={e => setSearch(e.target.value)} />
      
      {loading && (
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          <span className="ml-3 text-blue-600">Chargement des articles...</span>
        </div>
      )}
      
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center mb-6">
          <p className="text-red-600">❌ {error}</p>
        </div>
      )}
      
      {!loading && !error && (
        paginatedPosts.length > 0 ? (
          <>
            <ul className="space-y-6">
              {paginatedPosts.map((post) => (
                <li
                  key={post.id}
                  className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-200"
                >
                  <h3 className="text-xl font-semibold text-gray-900 mb-3 leading-tight">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 mb-4 leading-relaxed line-clamp-3">
                    {post.body}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">Article #{post.id}</span>
                    <Link
                      to={`/post/${post.id}`}
                      className="inline-flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200 text-sm font-medium"
                    >
                      En savoir plus
                      <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            </div>
          </>
        ) : (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">🔍</div>
            <p className="text-gray-500 text-lg">Aucun résultat trouvé</p>
            <p className="text-gray-400 text-sm mt-2">
              Essayez de modifier votre recherche
            </p>
          </div>
        )
      )}
    </div>
  );
};

export default Home;
