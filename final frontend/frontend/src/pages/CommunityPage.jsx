import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/HomePage/Navbar';
import CommunityHero from '../components/Community/CommunityHero';
import RecentPosts from '../components/Community/RecentPosts';
import Footer from '../components/HomePage/Footer';

const CommunityPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login-register');
    }
  }, [navigate]);

  return (
    <>
      <Navbar />
      <CommunityHero />
      <RecentPosts />
      <Footer />
    </>
  );
};

export default CommunityPage;

