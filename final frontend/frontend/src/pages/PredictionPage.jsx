import { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import Navbar from "../components/HomePage/Navbar";
import Footer from "../components/HomePage/Footer";
import PredictionForm from "../components/Prediction/PredictionForm";
import HospitalRecommendations from "../components/Prediction/HospitalRecommendations";
import { BASE_URL } from "../config";

const PredictionPage = () => {
  const [predictionResult, setPredictionResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showHospitals, setShowHospitals] = useState(false);

  const handlePrediction = async (formData) => {
    try {
      setLoading(true);
      setError(null);
      setShowHospitals(false);

      const token = localStorage.getItem("token");
      if (!token) throw new Error("Authentication required");

      const response = await axios.post(
        `${BASE_URL}cardio/predict/`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.success) {
        setPredictionResult(response.data.prediction);
        setShowHospitals(true);
      } else {
        throw new Error(response.data.message || "Prediction failed");
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-purple-900">
      <Navbar />

      <main className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="mt-18" />
        <PredictionForm
          onSubmit={handlePrediction}
          predictionResult={predictionResult}
          loading={loading}
        />

        {showHospitals && (
          <HospitalRecommendations
            hasRisk={predictionResult?.includes("likely")}
          />
        )}

        {error && (
          <motion.div
            className="mt-8 p-4 bg-red-900/30 text-red-400 rounded-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            Error: {error}
          </motion.div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default PredictionPage;