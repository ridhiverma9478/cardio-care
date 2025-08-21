import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginRegister from './pages/LoginRegister';
import DashboardPage from './pages/DashboardPage';

import FeedbackPage from './pages/FeedbackPage';
import ContactusPage from './pages/ContactusPage';
import AboutUs from './pages/AboutUsPage';

import CommunityPage from './pages/CommunityPage';
import NewPost from './components/Community/NewPost';
import PostDetail from './components/Community/PostDetail';

import PredictionPage from './pages/PredictionPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login-register" element={<LoginRegister />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/feedback" element={<FeedbackPage />} />
        <Route path="/contact-us" element={<ContactusPage />} />
        <Route path="/about-us" element={<AboutUs />} />

        <Route path="/community" element={<CommunityPage />} />
        <Route path="/community/new-post" element={<NewPost />} />
        <Route path="/community/posts/:id" element={<PostDetail />} />

        <Route path="/predict" element={<PredictionPage />} />

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;

