import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import { BASE_URL } from "../../config";
import { HeartIcon, PlusIcon } from "@heroicons/react/24/solid";

const API_URL = `${BASE_URL}/community/posts/`;

export default function RecentPosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const tokenFromStorage = localStorage.getItem("token");
    if (tokenFromStorage) {
      setToken(tokenFromStorage);
    }
  }, []);

  useEffect(() => {
    if (token) {
      axios
        .get(API_URL, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          if (response.data.success) {
            setPosts(response.data.posts);
          }
        })
        .catch((error) => console.error("Error fetching posts:", error))
        .finally(() => setLoading(false));
    }
  }, [token]);

  return (
    <motion.section
      className="bg-gradient-to-br from-blue-900 to-purple-900 min-h-screen px-6 py-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-4">
            <HeartIcon className="h-8 w-8 text-red-500" />
            <h2 className="text-3xl font-bold text-white">
              Community Discussions
            </h2>
          </div>
          <Link to="/community/new-post">
            <motion.button
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full text-white hover:from-blue-700 hover:to-purple-700 flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
            >
              <PlusIcon className="h-5 w-5" />
              New Post
            </motion.button>
          </Link>
        </div>

        {/* Search Input */}
        <div className="relative mb-8">
          <input
            type="text"
            placeholder="Search discussions..."
            className="w-full px-4 py-3 border border-white/20 rounded-lg focus:outline-none text-white bg-white/10 backdrop-blur-sm placeholder-gray-400"
          />
          <span className="absolute right-4 top-3 text-gray-400">🔍</span>
        </div>

        {/* Posts List */}
        {loading ? (
          <p className="text-gray-400 text-center">Loading discussions...</p>
        ) : posts.length === 0 ? (
          <p className="text-gray-400 text-center">No discussions found.</p>
        ) : (
          posts.map((post) => (
            <Link key={post.id} to={`/community/posts/${post.id}`}>
              <motion.div
                className="bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-white/10 mb-6 hover:border-blue-400/30 transition-all"
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex flex-col md:flex-row gap-6">
                  {/* Content */}
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-2 text-white">
                      {post.title}
                    </h3>
                    <p className="text-gray-300">
                      {post.content.length > 200 ? (
                        <span>
                          {post.content.slice(0, 200)}...
                          <span className="text-blue-400 hover:underline">
                            Read more
                          </span>
                        </span>
                      ) : (
                        post.content
                      )}
                    </p>

                    {/* Author & Date */}
                    <div className="mt-4 text-sm text-gray-400">
                      <p>
                        <span className="font-medium">Posted by:</span>{" "}
                        {post.user}
                      </p>
                      <p>
                        {new Date(post.created_at).toLocaleString("en-US", {
                          dateStyle: "medium",
                          timeStyle: "short",
                        })}
                      </p>
                    </div>
                  </div>

                  {/* Image */}
                  {post.image && (
                    <img
                      src={`${BASE_URL}${post.image}`}
                      alt="Post"
                      className="w-48 h-48 object-cover rounded-lg"
                    />
                  )}
                </div>
              </motion.div>
            </Link>
          ))
        )}
      </div>
    </motion.section>
  );
}