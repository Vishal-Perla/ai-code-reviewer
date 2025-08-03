import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import './index.css';

export default function App() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newCode, setNewCode] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const resp = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/reviews`);
        setReviews(resp.data);
      } catch (err) {
        setError(err.message || 'Error fetching reviews');
      } finally {
        setLoading(false);
      }
    };
    fetchReviews();
  }, []);

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/review`,
        { code: newCode }
      );
      const resp = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/reviews`
      );
      setReviews(resp.data);
      setNewCode('');
    } catch (err) {
      setError(err.message || 'Submission failed');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-3xl mx-auto"
      >
        <header className="mb-8 text-center">
          <h1 className="text-4xl font-extrabold text-gray-800 dark:text-gray-100">
            AI-Powered Code Reviewer
          </h1>
        </header>

        {/* Submission Form */}
        <section className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-6 mb-8">
          <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-200 mb-4">
            Submit a Snippet for Review
          </h2>
          <textarea
            value={newCode}
            onChange={e => setNewCode(e.target.value)}
            rows={6}
            className="w-full p-4 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg font-mono text-sm text-gray-900 dark:text-gray-100 mb-4"
            placeholder="Paste your code here…"
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSubmit}
            disabled={submitting || !newCode.trim()}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg disabled:opacity-50"
          >
            {submitting ? 'Submitting…' : 'Submit for Review'}
          </motion.button>
        </section>

        {/* Review List */}
        {loading ? (
          <p className="text-center text-gray-600 dark:text-gray-400">Loading reviews…</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : (
          reviews.map(r => (
            <motion.div
              key={r.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="bg-white dark:bg-gray-800 shadow-md rounded-2xl p-6 mb-6"
            >
              <pre className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg overflow-auto font-mono text-sm text-gray-900 dark:text-gray-100 mb-4">
                {r.code}
              </pre>
              <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-2">Review:</h3>
              <p className="text-gray-700 dark:text-gray-300 mb-4">{r.review}</p>
              <small className="text-gray-500 dark:text-gray-400 block text-right">
                {new Date(r.created_at).toLocaleString()}
              </small>
            </motion.div>
          ))
        )}
      </motion.div>
    </div>
  );
}
