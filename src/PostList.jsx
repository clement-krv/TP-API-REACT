import React, { useState } from "react";
import CommentModal from "./CommentModal";

const CommentIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-5 h-5 inline-block mr-1"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M2.25 12c0 4.556 4.694 8.25 10.125 8.25.982 0 1.94-.09 2.857-.26a.75.75 0 01.607.13l3.347 2.51a.75.75 0 001.19-.62v-2.14c0-.32.19-.61.49-.74C21.81 17.61 21.75 14.88 21.75 12c0-4.556-4.694-8.25-10.125-8.25S2.25 7.444 2.25 12z"
    />
  </svg>
);

const PostList = ({ posts }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [comments, setComments] = useState([]);
  const [loadingComments, setLoadingComments] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [selectedPostId, setSelectedPostId] = useState(null);
  const [commentCount, setCommentCount] = useState({});
  const [commentsByPost, setCommentsByPost] = useState({});

  const handleOpenModal = async (post) => {
    setSelectedPost(post);
    setSelectedPostId(post.id);
    setModalOpen(true);
    setLoadingComments(true);

    if (commentsByPost[post.id]) {
      setComments(commentsByPost[post.id]);
      setLoadingComments(false);
      return;
    }
    const res = await fetch(
      `https://jsonplaceholder.typicode.com/posts/${post.id}/comments`
    );
    const data = await res.json();
    setComments(data);
    setCommentsByPost((prev) => ({ ...prev, [post.id]: data }));
    setLoadingComments(false);
    setCommentCount((prev) => ({ ...prev, [post.id]: data.length }));
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setComments([]);
    setSelectedPost(null);
    setSelectedPostId(null);
  };

  return (
    <>
      <ul>
        {posts.map((post) => (
          <li
            key={post.id}
            className="mb-4 border border-gray-200 rounded-lg p-4 shadow-sm bg-white relative"
          >
            <h3 className="text-lg font-semibold mb-1">{post.title}</h3>
            <p className="text-gray-700 mb-2">{post.body}</p>
            <button
              className="flex items-center text-blue-600 hover:text-blue-800 text-sm px-2 py-1 rounded transition-colors duration-150"
              onClick={() => handleOpenModal(post)}
              aria-label="Voir les commentaires"
            >
              <CommentIcon />
              {commentCount[post.id] !== undefined ? commentCount[post.id] : 0}
            </button>
          </li>
        ))}
      </ul>
      <CommentModal
        isOpen={modalOpen}
        onClose={handleCloseModal}
        comments={comments}
        post={selectedPost}
        loadingComments={loadingComments}
      />
      {loadingComments && modalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
          <div className="bg-white p-4 rounded shadow text-blue-600 animate-pulse">
            Chargement des commentaires...
          </div>
        </div>
      )}
    </>
  );
};

export default PostList;
