import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowUturnLeftIcon, ChatBubbleLeftIcon, HeartIcon } from "@heroicons/react/24/outline";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "../HomePage/Navbar";
import Footer from "../HomePage/Footer";
import { BASE_URL } from "../../config";

const PostDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [comment, setComment] = useState("");
    const [reply, setReply] = useState({});
    const [showReplyInput, setShowReplyInput] = useState({});
    const [token, setToken] = useState(null);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    useEffect(() => {
        const tokenFromStorage = localStorage.getItem("token");
        if (tokenFromStorage) {
            setToken(tokenFromStorage);
        }
    }, []);

    useEffect(() => {
        if (token) {
            axios
                .get(`${BASE_URL}community/posts/${id}/`, {
                    headers: { Authorization: `Bearer ${token}` },
                })
                .then((response) => {
                    if (response.data.success) {
                        setPost(response.data.post);
                    }
                })
                .catch((error) => console.error("Error fetching post:", error))
                .finally(() => setLoading(false));
        }
    }, [id, token]);

    const handleCommentSubmit = async () => {
        try {
            const response = await axios.post(
                `${BASE_URL}community/create_comment/${id}/`,
                { content: comment },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            if (response.data.success) {
                setComment("");
                window.location.reload();
            }
        } catch (error) {
            console.error("Error creating comment:", error);
        }
    };

    const handleReplySubmit = async (commentId) => {
        try {
            const response = await axios.post(
                `${BASE_URL}community/create_reply/${commentId}/`,
                { content: reply[commentId] },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            if (response.data.success) {
                window.location.reload();
            }
        } catch (error) {
            console.error("Error creating reply:", error);
        }
    };

    const toggleReplyInput = (commentId) => {
        setShowReplyInput(prev => ({ ...prev, [commentId]: !prev[commentId] }));
        setReply(prev => ({ ...prev, [commentId]: "" }));
    };

    if (loading) return <p className="text-center mt-5 text-gray-400">Loading...</p>;
    if (!post) return <p className="text-center mt-5 text-gray-400">Post not found.</p>;

    return (
        <>
            <Navbar />
            <main className="flex-grow min-h-screen w-full px-4 md:px-10 py-6 bg-gradient-to-br from-blue-900 to-purple-900 overflow-auto">
                <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-blue-400 mb-4 hover:text-blue-300 flex items-center gap-2"
                    onClick={() => navigate("/community")}
                >
                    <ArrowUturnLeftIcon className="w-5 h-5" />
                    Back to discussions
                </motion.button>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-6 mt-10"
                >
                    <div className="flex items-center gap-4">
                        <HeartIcon className="h-8 w-8 text-red-500" />
                        <h1 className="text-3xl font-bold text-white">{post.post.title}</h1>
                    </div>

                    <div className="flex items-center gap-4 text-gray-300">
                        <span className="text-sm">
                            {new Date(post.post.created_at).toLocaleString()}
                        </span>
                        <span className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm">
                            Community Discussion
                        </span>
                    </div>

                    <motion.div
                        className="p-6 bg-white/5 backdrop-blur-lg rounded-xl border border-white/10"
                        initial={{ scale: 0.95 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.3 }}
                    >
                        <p className="text-gray-200 leading-relaxed">{post.post.content}</p>
                        {post.post.image && (
                            <motion.div
                                className="mt-6 overflow-hidden rounded-xl"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                            >
                                <img
                                    src={`${BASE_URL}${post.post.image}`}
                                    alt="Post"
                                    className="w-full max-w-2xl h-96 object-cover rounded-xl"
                                />
                            </motion.div>
                        )}
                    </motion.div>

                    {post.post.user && (
                        <div className="flex items-center gap-3 p-4 bg-white/5 backdrop-blur-lg rounded-lg border border-white/10">
                            <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center">
                                <ChatBubbleLeftIcon className="w-5 h-5 text-blue-400" />
                            </div>
                            <p className="text-gray-300">Posted by {post.post.user}</p>
                        </div>
                    )}
                </motion.div>

                {/* Comments Section */}
                <motion.div
                    className="mt-12"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <h2 className="text-2xl font-semibold text-white mb-6 flex items-center gap-3">
                        <ChatBubbleLeftIcon className="w-6 h-6 text-blue-400" />
                        Community Responses
                    </h2>

                    <motion.div className="space-y-4" variants={containerVariants}>
                        <motion.div
                            className="p-4 bg-white/5 backdrop-blur-lg rounded-xl border border-white/10"
                            variants={itemVariants}
                        >
                            <textarea
                                className="w-full p-3 bg-white/10 text-gray-200 rounded-lg focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400/30 placeholder-gray-400"
                                rows="3"
                                placeholder="Share your thoughts..."
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                            />
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={handleCommentSubmit}
                                className="mt-3 px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all"
                            >
                                Post Response
                            </motion.button>
                        </motion.div>

                        <AnimatePresence>
                            {post.comments.length > 0 ? (
                                post.comments.map((c) => (
                                    <motion.div
                                        key={c.id}
                                        className="bg-white/5 backdrop-blur-lg rounded-xl p-4 border border-white/10"
                                        variants={itemVariants}
                                        exit={{ opacity: 0, height: 0 }}
                                    >
                                        <div className="flex gap-4">
                                            <img
                                                src={`https://api.dicebear.com/9.x/initials/svg?seed=${c.user}&background=%231e40af&color=white`}
                                                alt={c.user}
                                                className="w-12 h-12 rounded-full"
                                            />
                                            <div className="flex-1">
                                                <div className="flex items-center justify-between">
                                                    <p className="font-medium text-blue-400">{c.user}</p>
                                                    <motion.button
                                                        whileHover={{ scale: 1.1 }}
                                                        onClick={() => toggleReplyInput(c.id)}
                                                        className="text-gray-400 hover:text-blue-400 flex items-center gap-1"
                                                    >
                                                        <ArrowUturnLeftIcon className="w-5 h-5" />
                                                        <span className="text-sm">Reply</span>
                                                    </motion.button>
                                                </div>
                                                <p className="mt-1 text-gray-300">{c.content}</p>

                                                {/* Reply Input */}
                                                <AnimatePresence>
                                                    {showReplyInput[c.id] && (
                                                        <motion.div
                                                            initial={{ opacity: 0, height: 0 }}
                                                            animate={{ opacity: 1, height: 'auto' }}
                                                            exit={{ opacity: 0, height: 0 }}
                                                            className="mt-4 pl-8 border-l-2 border-white/10"
                                                        >
                                                            <textarea
                                                                className="w-full p-2 bg-white/10 text-gray-200 rounded-lg focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400/30 placeholder-gray-400"
                                                                rows="2"
                                                                placeholder="Write your reply..."
                                                                value={reply[c.id] || ""}
                                                                onChange={(e) => setReply(prev => ({ ...prev, [c.id]: e.target.value }))}
                                                            />
                                                            <div className="flex gap-2 mt-2">
                                                                <motion.button
                                                                    whileHover={{ scale: 1.05 }}
                                                                    whileTap={{ scale: 0.95 }}
                                                                    onClick={() => handleReplySubmit(c.id)}
                                                                    className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg"
                                                                >
                                                                    Post Reply
                                                                </motion.button>
                                                                <motion.button
                                                                    whileHover={{ scale: 1.05 }}
                                                                    whileTap={{ scale: 0.95 }}
                                                                    onClick={() => toggleReplyInput(c.id)}
                                                                    className="px-4 py-2 border border-white/20 text-gray-300 rounded-lg"
                                                                >
                                                                    Cancel
                                                                </motion.button>
                                                            </div>
                                                        </motion.div>
                                                    )}
                                                </AnimatePresence>

                                                {/* Replies List */}
                                                {c.replies?.length > 0 && (
                                                    <div className="mt-4 pl-8 border-l-2 border-white/10 space-y-4">
                                                        {c.replies.map((reply) => (
                                                            <motion.div
                                                                key={reply.id}
                                                                className="pt-4 flex gap-3"
                                                                initial={{ opacity: 0 }}
                                                                animate={{ opacity: 1 }}
                                                            >
                                                                <img
                                                                    src={`https://api.dicebear.com/9.x/initials/svg?seed=${reply.user}&background=%231e40af&color=white`}
                                                                    alt={reply.user}
                                                                    className="w-10 h-10 rounded-full"
                                                                />
                                                                <div>
                                                                    <p className="text-sm font-medium text-blue-400">
                                                                        {reply.user}
                                                                    </p>
                                                                    <p className="text-gray-300 text-sm">{reply.content}</p>
                                                                </div>
                                                            </motion.div>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </motion.div>
                                ))
                            ) : (
                                <motion.p
                                    className="text-gray-400 text-center py-6"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                >
                                    No responses yet. Start the conversation!
                                </motion.p>
                            )}
                        </AnimatePresence>
                    </motion.div>
                </motion.div>
            </main>
            <Footer />
        </>
    );
};

export default PostDetail;