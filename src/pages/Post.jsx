import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router";
import { useUser } from "../contexts/UserContext";

const Post = () => {
  const { id } = useParams();
  const { user } = useUser();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingComments, setLoadingComments] = useState(true);
  const [error, setError] = useState(null);
  const [newComment, setNewComment] = useState('');
  const [isSubmittingComment, setIsSubmittingComment] = useState(false);

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
        <div className="animate-pulse space-y-6">
          <div className="h-6 bg-gray-200 rounded w-32"></div>
          <div className="h-12 bg-gray-200 rounded"></div>
          <div className="h-32 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-8 text-center">
          <div className="text-red-400 text-6xl mb-4">❌</div>
          <h2 className="text-xl font-semibold text-red-700 mb-2">Oops !</h2>
          <p className="text-red-600 mb-6">{error}</p>
          <Link 
            to="/" 
            className="inline-flex items-center px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
            Retour aux articles
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      {post && (
        <>
          {/* Article */}
          <article className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-3xl p-8 mb-8 border border-gray-100 shadow-sm">
            <div className="mb-4">
              <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 text-sm font-medium rounded-full">
                Article #{post.id}
              </span>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-6 leading-tight">
              {post.title}
            </h1>
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-700 text-xl leading-relaxed">
                {post.body}
              </p>
            </div>
          </article>

          {/* Section commentaires */}
          <section className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-gray-900 flex items-center">
                <svg className="w-8 h-8 mr-3 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                Commentaires
              </h2>
              <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full font-semibold">
                {comments.length} commentaire{comments.length !== 1 ? 's' : ''}
              </span>
            </div>

            {loadingComments ? (
              <div className="flex items-center justify-center py-16">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500"></div>
                <span className="ml-4 text-gray-600 text-lg">Chargement des commentaires...</span>
              </div>
            ) : comments.length === 0 ? (
              <div className="text-center py-16">
                <div className="text-gray-300 text-8xl mb-6">💬</div>
                <h3 className="text-xl font-semibold text-gray-600 mb-2">Aucun commentaire</h3>
                <p className="text-gray-500">Soyez le premier à commenter cet article !</p>
              </div>
            ) : (
              <div className="space-y-6">
                {comments.map((comment, index) => (
                  <div key={comment.id} className="bg-gray-50 rounded-2xl p-6 border border-gray-100 hover:shadow-md transition-all duration-200">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-md">
                          {comment.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-900 text-lg">{comment.name}</h4>
                          <p className="text-sm text-gray-500">{comment.email}</p>
                        </div>
                      </div>
                      <span className="text-xs text-gray-400 bg-white px-3 py-1 rounded-full border font-medium">
                        #{index + 1}
                      </span>
                    </div>
                    <p className="text-gray-700 leading-relaxed text-base pl-16">
                      {comment.body}
                    </p>
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

export default Post;
