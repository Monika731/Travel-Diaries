import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import './EditPost.css'

const EditPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPost();
  }, []);

  const fetchPost = async () => {
    const { data, error } = await supabase.from('posts').select('*').eq('id', id).single();
    if (!error) {
      setPost(data);
      setLoading(false);
    }
  };

  const handleUpdate = async () => {
    const { error } = await supabase
      .from('posts')
      .update({
        title: post.title,
        content: post.content,
        image_url: post.image_url
      })
      .eq('id', id);

    if (!error) {
      navigate(`/post/${id}`);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (!post) return <p>Post not found</p>;

  return (
    <div className="edit-container">
      <h2>Edit Post</h2>
      <input
        value={post.title}
        onChange={(e) => setPost({ ...post, title: e.target.value })}
        placeholder="Title"
      />
      <textarea
        value={post.content}
        onChange={(e) => setPost({ ...post, content: e.target.value })}
        placeholder="Content"
      />
      <input
        value={post.image_url}
        onChange={(e) => setPost({ ...post, image_url: e.target.value })}
        placeholder="Image URL"
      />
      <br/><br/>
      <button onClick={handleUpdate}>Save Changes</button>
      <br/><br/>
    </div>
  );
};

export default EditPost;
