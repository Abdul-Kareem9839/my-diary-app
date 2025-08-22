import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import MicIcon from "@mui/icons-material/Mic";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import SecurityIcon from "@mui/icons-material/Security";
import DashboardIcon from "@mui/icons-material/Dashboard";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import { motion } from "framer-motion";

export default function Features() {
  return (
    <section className="py-20 px-6 bg-white" id="features">
      <h2 className="text-4xl font-bold text-center mb-12">Features</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
        {/* Daily Journaling */}
        <motion.div
          className="bg-gray-100 p-6 rounded-lg shadow-sm hover:shadow-xl hover:bg-indigo-50 transition"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <AutoStoriesIcon className="mb-2 me-2 text-indigo-600" />
          <h3 className="text-xl font-semibold mb-2 inline">
            Daily Journaling
          </h3>
          <p className="text-gray-600">
            Record your thoughts, feelings, and experiences every day with ease.
          </p>
        </motion.div>

        {/* Voice-to-Text */}
        <motion.div
          className="bg-gray-100 p-6 rounded-lg shadow-sm hover:shadow-xl hover:bg-blue-50 transition"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <MicIcon className="mb-2 me-2 text-blue-600" />
          <h3 className="text-xl font-semibold mb-2 inline">Voice-to-Text</h3>
          <p className="text-gray-600">
            Write your diary hands-free using speech recognition.
          </p>
        </motion.div>

        {/* Bookmarks */}
        <motion.div
          className="bg-gray-100 p-6 rounded-lg shadow-sm hover:shadow-xl hover:bg-pink-50 transition"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <BookmarkIcon className="mb-2 me-2 text-pink-500" />
          <h3 className="text-xl font-semibold mb-2 inline">Bookmarks</h3>
          <p className="text-gray-600">
            Save and quickly access your favorite or important entries.
          </p>
        </motion.div>

        {/* Secure & Private */}
        <motion.div
          className="bg-gray-100 p-6 rounded-lg shadow-sm hover:shadow-xl hover:bg-green-50 transition"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <SecurityIcon className="mb-2 me-2 text-green-600" />
          <h3 className="text-xl font-semibold mb-2 inline">
            Secure & Private
          </h3>
          <p className="text-gray-600">
            All entries are protected with authentication and stored securely.
          </p>
        </motion.div>

        {/* Custom Dashboard */}
        <motion.div
          className="bg-gray-100 p-6 rounded-lg shadow-sm hover:shadow-xl hover:bg-amber-50 transition"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <DashboardIcon className="mb-2 me-2 text-amber-500" />
          <h3 className="text-xl font-semibold mb-2 inline">
            Custom Dashboard
          </h3>
          <p className="text-gray-600">
            View your diary entries in multiple styles with interactive cards.
          </p>
        </motion.div>

        {/* Reminders */}
        <motion.div
          className="bg-gray-100 p-6 rounded-lg shadow-sm hover:shadow-xl hover:bg-red-50 transition"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ delay: 0.7, duration: 0.5 }}
        >
          <NotificationsActiveIcon className="mb-2 me-2 text-red-500" />
          <h3 className="text-xl font-semibold mb-2 inline">Reminders</h3>
          <p className="text-gray-600">
            Get daily or weekly notifications to maintain your journaling habit.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
