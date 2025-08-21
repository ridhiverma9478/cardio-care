import { motion } from "framer-motion";
import { ChatBubbleLeftIcon, HeartIcon, ArrowUturnLeftIcon, UserCircleIcon } from "@heroicons/react/24/outline";

const Feature_3 = () => {
  const posts = [
    {
      user: "Sarah Johnson",
      role: "Cardiac Patient",
      content: "This community helped me understand my risk factors better than any doctor's visit!",
      likes: 142,
      comments: [
        {
          user: "Mike Chen",
          content: "Same here! The personalized tips made a real difference 🌟",
          replies: [
            {
              user: "HealthCoachAmy",
              content: "Thrilled to hear this! Keep tracking your progress 💪"
            }
          ]
        }
      ]
    },
    {
      user: "Dr. Raj Patel",
      role: "Cardiologist",
      content: "Great platform for patient education and peer support. Valuable insights for clinicians too!",
      likes: 89,
      comments: [
        {
          user: "NurseEmily",
          content: "Absolutely! Using it to reinforce post-op care instructions"
        }
      ]
    }
  ];

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-blue-900 to-purple-900 py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-20">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-0.5 h-0.5 bg-purple-400 rounded-full"
            animate={{
              x: [0, 100, 0],
              y: [0, 50, 0],
              opacity: [0, 0.5, 0]
            }}
            transition={{
              duration: Math.random() * 10 + 5,
              repeat: Infinity,
              ease: "linear"
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-6">
            Community of Care
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Connect, share, and learn with patients and professionals in our supportive health community
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {posts.map((post, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300"
            >
              {/* Post Header */}
              <div className="flex items-center gap-4 mb-6">
                <div className="bg-blue-400/10 p-2 rounded-full">
                  <UserCircleIcon className="h-8 w-8 text-blue-400" />
                </div>
                <div>
                  <h3 className="text-white font-semibold">{post.user}</h3>
                  <p className="text-sm text-blue-300">{post.role}</p>
                </div>
              </div>

              {/* Post Content */}
              <p className="text-gray-200 mb-6">{post.content}</p>

              {/* Interactions */}
              <div className="flex items-center gap-6 text-gray-400">
                <button className="flex items-center gap-2 hover:text-red-400 transition-colors">
                  <HeartIcon className="h-5 w-5" />
                  <span>{post.likes}</span>
                </button>
                <button className="flex items-center gap-2 hover:text-blue-400 transition-colors">
                  <ChatBubbleLeftIcon className="h-5 w-5" />
                  <span>{post.comments.length}</span>
                </button>
              </div>

              {/* Comments Section */}
              <div className="mt-6 space-y-6">
                {post.comments.map((comment, cIndex) => (
                  <div key={cIndex} className="ml-4 pl-4 border-l-2 border-blue-400/20">
                    <div className="flex items-center gap-3 mb-3">
                      <UserCircleIcon className="h-6 w-6 text-purple-400" />
                      <span className="text-sm text-purple-300">{comment.user}</span>
                    </div>
                    <p className="text-gray-300 text-sm">{comment.content}</p>

                    {/* Replies */}
                    {comment.replies?.map((reply, rIndex) => (
                      <div key={rIndex} className="ml-6 mt-4 pl-4 border-l-2 border-purple-400/20">
                        <div className="flex items-center gap-3 mb-2">
                          <ArrowUturnLeftIcon className="h-5 w-5 text-blue-400" />
                          <span className="text-sm text-blue-300">{reply.user}</span>
                        </div>
                        <p className="text-gray-300 text-sm">{reply.content}</p>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mt-16 text-center"
        >
          <h3 className="text-2xl text-white mb-6">Join the Conversation</h3>
          <motion.button
            whileHover={{ scale: 1.05 }}
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg transition-all"
          >
            Start Your First Post
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default Feature_3;