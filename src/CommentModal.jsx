import React, { useRef, useEffect } from "react";

const CommentModal = ({ isOpen, onClose, comments, post, loadingComments }) => {
  const modalRef = useRef(null);

  // Fermer la modal si clic en dehors
  useEffect(() => {
    if (!isOpen) return;
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div
        ref={modalRef}
        className="bg-white rounded-3xl shadow-2xl p-0 max-w-4xl w-full max-h-[90vh] flex flex-col animate-fade-in border border-gray-200"
        style={{ animation: 'fadeIn 0.3s' }}
      >
        {/* Header sticky */}
        <div className="sticky top-0 z-10 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-4 rounded-t-3xl flex justify-between items-center shadow-lg">
          <h4 className="font-bold text-xl">Article & Commentaires</h4>
          <button 
            onClick={onClose} 
            className="text-white hover:text-gray-200 text-3xl font-bold focus:outline-none transition-all duration-200 hover:rotate-90"
          >
            &times;
          </button>
        </div>

        {/* Contenu scrollable */}
        <div className="overflow-y-auto flex-1 px-6 py-4">
          {/* Article */}
          {post && (
            <div className="mb-8 bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl p-6 border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-800 mb-4 leading-tight">{post.title}</h2>
              <p className="text-gray-700 text-lg leading-relaxed">{post.body}</p>
            </div>
          )}

          {/* Section commentaires */}
          <div className="border-t border-gray-200 pt-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <svg className="w-6 h-6 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              Commentaires ({comments.length})
            </h3>
            
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
              <div className="space-y-4">
                {comments.map((comment, index) => (
                  <div key={comment.id} className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                          {comment.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <p className="font-semibold text-gray-800 text-base">{comment.name}</p>
                          <p className="text-xs text-gray-500">{comment.email}</p>
                        </div>
                      </div>
                      <span className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded-full">#{index + 1}</span>
                    </div>
                    <p className="text-gray-700 leading-relaxed pl-13">{comment.body}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.9) translateY(-20px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default CommentModal;
