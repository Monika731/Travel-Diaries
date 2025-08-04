// src/App.jsx
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import CreatePost from './pages/CreatePost';
import PostDetail from './pages/PostDetail';
import EditPost from './pages/EditPost';
import { getOrCreateUserId } from './utils/generateUserId';
import './App.css';

function App() {
  const [userId, setUserId] = useState('');

  useEffect(() => {
    setUserId(getOrCreateUserId());
  }, []);

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home userId={userId} />} />
        <Route path="/create" element={<CreatePost userId={userId} />} />
        <Route path="/post/:id" element={<PostDetail userId={userId} />} />
        <Route path="/edit/:id" element={<EditPost userId={userId} />} />
      </Routes>
    </Router>
  );
}

export default App;