import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import './PostDetail.css';

const PostDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [newComment, setNewComment] = useState('');
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  const currentUserId = localStorage.getItem('userId');

  useEffect(() => {
    fetchPost();
  }, []);

  const fetchPost = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .eq('id', id)
      .single();

    if (!error && data) {
      setPost(data);
      const parsedComments = data.comments ? JSON.parse(data.comments) : [];
      setComments(parsedComments);
    } else {
      console.error(error);
    }
    setLoading(false);
  };

  const handleUpvote = async () => {
    const { data, error } = await supabase
      .from('posts')
      .update({ upvotes: post.upvotes + 1 })
      .eq('id', id)
      .select()
      .single();

    if (!error) setPost(data);
  };

  const handleAddComment = async () => {
    if (!newComment.trim()) return;

    const newCommentObj = {
      content: newComment,
      author_id: currentUserId,
      created_at: new Date().toISOString(),
    };

    const updatedComments = [...comments, newCommentObj];

    const { error } = await supabase
      .from('posts')
      .update({ comments: JSON.stringify(updatedComments) })
      .eq('id', id);

    if (!error) {
      setComments(updatedComments);
      setNewComment('');
    }
  };

  const handleDelete = async () => {
    const confirm = window.confirm('Are you sure you want to delete this post?');
    if (confirm) {
      await supabase.from('posts').delete().eq('id', id);
      navigate('/');
    }
  };

  if (loading) return <p className="loading">Loading post...</p>;
  if (!post) return <p className="not-found">Post not found.</p>;

  return (
    <div className="detail-container">
      <h2>{post.title}</h2>
      <p className="timestamp">Posted on {new Date(post.created_at).toLocaleString()}</p>
      <p className="author">By User :  #{post.user_id}</p>

      {post.image_url && (
        <img src={post.image_url} alt="post" className="post-image" />
      )}
      <p className="content">{post.content}</p>

      <div className='upvote-container'>
        <button className="upvote-btn" onClick={handleUpvote}>
            👍 Upvote ({post.upvotes})
        </button>
      </div>

      {post.user_id === currentUserId && (
        <div className="owner-actions">
          <button onClick={() => navigate(`/edit/${post.id}`)}>✏️ Edit</button>
          <button onClick={handleDelete}>🗑️ Delete</button>
        </div>
      )}

      <div className="comments-section">
        <h4>Comments</h4>
        {comments.length === 0 && <p>No comments yet.</p>}
        {comments.map((c, idx) => (
          <div key={idx} className="comment-box">
            <p>{c.content}</p>
            <small>User : #{c.author_id}</small>
          </div>
        ))}
        <div className="add-comment">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Leave a comment..."
          />
          <button onClick={handleAddComment}>Post</button>
        </div>
      </div>
    </div>
  );
};

export default PostDetail;
