import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router";

const PostDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingComments, setLoadingComments] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPostAndComments = async () => {
      try {
        setLoading(true);
        setLoadingComments(true);
        setError(null);

        // Récupérer l'article
        const postResponse = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
        if (!postResponse.ok) throw new Error("Article non trouvé");
        const postData = await postResponse.json();
        setPost(postData);
        setLoading(false);

        // Récupérer les commentaires
        const commentsResponse = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}/comments`);
        if (!commentsResponse.ok) throw new Error("Erreur lors du chargement des commentaires");
        const commentsData = await commentsResponse.json();
        setComments(commentsData);
        setLoadingComments(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
        setLoadingComments(false);
      }
    };

    fetchPostAndComments();
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded mb-4"></div>
          <div className="h-32 bg-gray-200 rounded mb-6"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
          <p className="text-red-600 mb-4">❌ {error}</p>
          <Link 
            to="/" 
            className="inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
          >
            ← Retour aux articles
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Bouton retour */}
      <Link 
        to="/" 
        className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6 transition-colors"
      >
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
        </svg>
        Retour aux articles
      </Link>

      {post && (
        <>
          {/* Article */}
          <article className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-3xl p-8 mb-8 border border-gray-100 shadow-sm">
            <h1 className="text-3xl font-bold text-gray-800 mb-6 leading-tight">{post.title}</h1>
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-700 text-lg leading-relaxed">{post.body}</p>
            </div>
          </article>

          {/* Section commentaires */}
          <section className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
              <svg className="w-7 h-7 mr-3 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              Commentaires ({comments.length})
            </h2>

            {loadingComments ? (
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                <span className="ml-3 text-gray-600">Chargement des commentaires...</span>
              </div>
            ) : comments.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-gray-400 text-6xl mb-4">💬</div>
                <p className="text-gray-500 text-lg">Aucun commentaire pour cet article.</p>
              </div>
            ) : (
              <div className="space-y-6">
                {comments.map((comment, index) => (
                  <div key={comment.id} className="bg-gray-50 rounded-2xl p-6 border border-gray-100 hover:shadow-md transition-shadow duration-200">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                          {comment.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <p className="font-semibold text-gray-800 text-lg">{comment.name}</p>
                          <p className="text-sm text-gray-500">{comment.email}</p>
                        </div>
                      </div>
                      <span className="text-xs text-gray-400 bg-white px-3 py-1 rounded-full border">#{index + 1}</span>
                    </div>
                    <p className="text-gray-700 leading-relaxed pl-15">{comment.body}</p>
                  </div>
                ))}
              </div>
            )}
          </section>
        </>
      )}
    </div>
  );
};

export default PostDetail;
