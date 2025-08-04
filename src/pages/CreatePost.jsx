import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import './CreatePost.css';

const CreatePost = ({ userId }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) {
      alert('Title is required.');
      return;
    }

    setLoading(true);

    const { error } = await supabase.from('posts').insert([
      { title, content, image_url: imageUrl, user_id: userId }
    ]);

    if (error) {
      alert('Error creating post: ' + error.message);
      setLoading(false);
      return;
    }

    // Mock delay
    setTimeout(() => {
      console.log({ title, content, imageUrl, userId });
      setLoading(false);
      navigate('/');
    }, 1000);
  };

  return (
    <div className="create-post-container">
      <h2>Create New Travel Post</h2>
      <form onSubmit={handleSubmit} className="post-form">
        <label>Post Title *</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <label>Content</label>
        <textarea
          rows="5"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Share your travel experience..."
        />

        <label>Image URL</label>
        <input
          type="text"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          placeholder="https://example.com/image.jpg"
        />

        <br/>
        <button type="submit" disabled={loading}>
          {loading ? 'Posting...' : 'Post'}
        </button>
        <br/>
      </form>
    </div>
  );
};

export default CreatePost;