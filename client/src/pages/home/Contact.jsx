import FeedbackIcon from "@mui/icons-material/Feedback";

export default function Contact() {
  return (
    <section
      className="flex justify-center items-center min-h-screen bg-white px-4 mb-12"
      id="feedback"
    >
      <div className="flex flex-col md:flex-row gap-10 bg-white p-6 max-w-5xl w-full">
        {/* Form Section */}
        <div className="w-full md:w-1/2">
          <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
            Share Your Feedback & Suggestions
          </h1>
          <p className="text-center text-gray-500 mb-6">
            Help us improve ZenScribe by telling us what you think 💡
          </p>
          <form className="space-y-4">
            <div>
              <label className="text-gray-700 font-medium mb-1">
                Your Name
              </label>
              <input
                type="text"
                placeholder="Enter your name"
                className="w-full px-4 py-2 border border-gray-400 bg-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Your Email
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 border border-gray-400 bg-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Message / Suggestion
              </label>
              <textarea
                rows="4"
                placeholder="Write your feedback or feature request..."
                className="w-full px-4 py-2 border border-gray-400 bg-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full py-2 px-4 bg-teal-600 text-white rounded-lg font-semibold hover:bg-teal-700 transition duration-300"
            >
              <FeedbackIcon className="inline mr-2" />
              Submit Feedback
            </button>
          </form>
        </div>

        <div className="w-full md:w-1/2 flex justify-center items-center ms-10">
          <img
            src="/assets/feedback.png"
            alt="Feedback illustration"
            className="max-w-full h-auto rounded-lg"
          />
        </div>
      </div>
    </section>
  );
}
