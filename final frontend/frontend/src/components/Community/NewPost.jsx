import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../HomePage/Navbar";
import Footer from "../HomePage/Footer";
import { ToastContainer, toast } from "react-toastify";
import { BASE_URL } from "../../config";
import { HeartIcon, PhotoIcon } from "@heroicons/react/24/outline";

const API_URL = `${BASE_URL}/community/create_post/`;

export default function NewPost() {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [image, setImage] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/login-register", { replace: true });
        }
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        const token = localStorage.getItem("token");
        if (!token) {
            setError("Authentication required. Please log in.");
            return;
        }

        const formData = new FormData();
        formData.append("title", title);
        formData.append("content", content);
        if (image) formData.append("image", image);

        try {
            const response = await axios.post(API_URL, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data",
                },
            });

            if (response.data.success) {
                toast.success("Post created successfully!", {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                });
                setTimeout(() => navigate("/community"), 2000);
            } else {
                setError(response.data.message || "Failed to create post.");
            }
        } catch (err) {
            setError("Error submitting post. Please try again.");
        }
    };

    return (
        <>
            <Navbar />
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="min-h-screen bg-gradient-to-br from-blue-900 to-purple-900 flex flex-col justify-center items-center py-12"
            >
                <div className="mt-18"/>
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="w-full max-w-2xl bg-white/5 backdrop-blur-lg p-8 rounded-xl border border-white/10 shadow-lg"
                >
                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        className="flex flex-col items-center mb-8"
                    >
                        <HeartIcon className="h-10 w-10 text-red-500 mb-4" />
                        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-red-400 bg-clip-text text-transparent">
                            Create a New Post
                        </h1>
                        <p className="text-gray-300 mt-2">Share your thoughts with the CardioCareAI community</p>
                    </motion.div>

                    {/* Form */}
                    <motion.form
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        onSubmit={handleSubmit}
                        className="space-y-6"
                    >
                        {error && (
                            <motion.p
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-red-400 text-sm text-center"
                            >
                                {error}
                            </motion.p>
                        )}

                        {/* Title Input */}
                        <div>
                            <label className="block text-gray-300 text-sm font-medium mb-2">Title</label>
                            <input
                                type="text"
                                placeholder="Enter post title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400/30 text-white placeholder-gray-400"
                            />
                        </div>

                        {/* Content Input */}
                        <div>
                            <label className="block text-gray-300 text-sm font-medium mb-2">Content</label>
                            <textarea
                                placeholder="Write your post content..."
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                required
                                rows="6"
                                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400/30 text-white placeholder-gray-400"
                            />
                        </div>

                        {/* Image Upload */}
                        <div>
                            <label className="block text-gray-300 text-sm font-medium mb-2">Upload Image</label>
                            <div className="flex items-center justify-center w-full bg-white/10 border border-white/20 rounded-lg p-4 hover:border-blue-400/30 transition-all">
                                <PhotoIcon className="h-6 w-6 text-gray-400 mr-2" />
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => setImage(e.target.files[0])}
                                    className="w-full text-gray-300 focus:outline-none file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700"
                                />
                            </div>
                        </div>

                        {/* Submit Button */}
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            type="submit"
                            className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg text-white font-semibold hover:from-blue-700 hover:to-purple-700 transition-all"
                        >
                            Create Post
                        </motion.button>
                    </motion.form>
                </motion.div>
            </motion.div>
            <Footer />
            <ToastContainer
                position="top-right"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                toastStyle={{ backgroundColor: "#3B82F6", color: "white" }}
            />
        </>
    );
}