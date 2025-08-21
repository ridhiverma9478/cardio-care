import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { MapPinIcon, ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";
import { BASE_URL } from "../../config";

const HospitalRecommendations = ({ hasRisk }) => {
  const [location, setLocation] = useState(null);
  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      (error) => console.error("Error getting location:", error)
    );
  }, []);

  useEffect(() => {
    if (location) {
      fetchNearbyHospitals();
    }
  }, [location]);

  const handleGetDirections = (hospitalLat, hospitalLng) => {
    const mapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${hospitalLat},${hospitalLng}`;
    window.open(mapsUrl, '_blank');
  };

  const fetchNearbyHospitals = async () => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Authentication required");

      const response = await fetch(`${BASE_URL}cardio/find_nearby_hospitals/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          latitude: location.lat,
          longitude: location.lng,
        }),
      });

      if (!response.ok) throw new Error("Failed to fetch hospitals");
      
      const data = await response.json();
      data.success ? setHospitals(data.hospitals) : setHospitals([]);
      
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10 mt-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="flex items-center gap-4 mb-6">
        <MapPinIcon className="h-8 w-8 text-red-500" />
        <h2 className="text-2xl font-bold text-white">
          {hasRisk ? "Recommended Cardiac Centers" : "Cardiac Health Resources"}
        </h2>
      </div>

      <p className="text-gray-300 mb-6">
        {hasRisk
          ? "Based on your results, we recommend consulting these specialized cardiac centers:"
          : "Maintain your heart health with these recommended resources:"}
      </p>

      {loading && (
        <div className="h-64 bg-blue-900/20 rounded-lg flex items-center justify-center">
          <p className="text-gray-400">Loading hospitals...</p>
        </div>
      )}

      {error && (
        <div className="h-64 bg-blue-900/20 rounded-lg flex items-center justify-center">
          <p className="text-red-400">{error}</p>
        </div>
      )}

      {!loading && !error && (
        <div className="space-y-4">
          {hospitals.map((hospital) => (
            <div key={hospital.place_id} className="p-4 bg-white/10 rounded-lg">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold text-white">
                    {hospital.name}
                  </h3>
                  <p className="text-gray-300 text-sm">{hospital.vicinity}</p>
                </div>
                <button
                  onClick={() => handleGetDirections(
                    hospital.geometry.location.lat,
                    hospital.geometry.location.lng
                  )}
                  className="flex items-center gap-1 px-3 py-1.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-colors"
                >
                  <ArrowTopRightOnSquareIcon className="h-4 w-4" />
                  <span className="text-sm">Directions</span>
                </button>
              </div>

              <div className="flex items-center mt-2">
                <span className="text-yellow-400 text-sm">
                  {hospital.rating} ★
                </span>
                <span className="text-gray-400 text-sm ml-2">
                  ({hospital.user_ratings_total} reviews)
                </span>
              </div>
              
              {hospital.opening_hours?.open_now && (
                <p className="text-green-400 text-sm mt-1">Open Now</p>
              )}
            </div>
          ))}
        </div>
      )}

      <div className="mt-6 space-y-4">
        <p className="text-gray-300 text-sm">
          {hasRisk
            ? "⚠️ Please consult a cardiologist within the next 48 hours"
            : "✅ Regular checkups help maintain heart health"}
        </p>
      </div>
    </motion.div>
  );
};

export default HospitalRecommendations;