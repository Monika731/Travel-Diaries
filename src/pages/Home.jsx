import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('created_at');
  const [loading, setLoading] = useState(true);

  const fetchPosts = async () => {
    setLoading(true);
  
    let query = supabase.from('posts').select('*');
  
    if (sortBy === 'upvotes') {
      query = query.order('upvotes', { ascending: false, nullsFirst: false });
    } else {
      query = query.order('created_at', { ascending: false });
    }
  
    const { data, error } = await query;
  
    if (error) {
      console.error('Error fetching posts:', error);
    } else {
      setPosts(data);
    }
  
    setLoading(false);
  };
  
  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().startsWith(searchQuery.toLowerCase())
  );

  useEffect(() => {
    fetchPosts();
  }, [sortBy]);

  return (
    <div className="home-container">
      <h2 className="home-title">🧳 Travel Diaries</h2>
      <p className="home-description">Explore stories from around the world or share your own journey!</p>
  
      {/* Search and Sort Controls */}
      <div className="controls">
        <input
          type="text"
          placeholder="Search by title..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="created_at">Sort by: Newest</option>
          <option value="upvotes">Sort by: Upvotes</option>
        </select>
      </div>
  
      {/* Posts Section */}
      {loading ? (
        <p className="loading">Loading posts...</p>
      ) : posts.length === 0 ? (
        <p className="no-posts">No posts yet. Be the first to share your journey!</p>
      ) : (
        <div className="posts-grid">
            {filteredPosts
                .sort((a, b) => {
                if (sortBy === 'upvotes') {
                    return (b.upvotes || 0) - (a.upvotes || 0); // Descending by upvotes
                } else {
                    return new Date(b.created_at) - new Date(a.created_at); // Descending by creation date
                }
                })
                .map((post) => (
                <Link to={`/post/${post.id}`} key={post.id} className="post-card">
                    <h3>{post.title}</h3>
                    <p className="timestamp">
                    {new Date(post.created_at).toLocaleString()}
                    </p>
                    <p className="upvotes">👍 {post.upvotes || 0} upvotes</p>
                </Link>
                ))}
          </div>
      )}
    </div>
  );
};

export default Home;