import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";

export default function LogWorkout() {
  const [formData, setFormData] = useState({
    type: "Strength",
    description: "",
    duration: 30,
  });
  const [status, setStatus] = useState({ error: "", success: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "duration" ? parseInt(value) : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ error: "", success: "" });

    try {
      await api.post("/workouts", formData);
      setStatus({ error: "", success: "Workout logged. Strength grows." });
      setTimeout(() => navigate("/dashboard"), 1200);
    } catch (err) {
      setStatus({
        error: err.response?.data?.errors?.[0]?.message || "Failed. Try harder.",
        success: "",
      });
    }
  };

  return (
    <div className="bg-red-950/100 min-h-screen w-screen absolute inset-0">
    <div className="max-w-xl mx-auto mt-14 p-8 bg-gray-100 dark:bg-white/10 border-2 border-gray-300 dark:border-red-700 shadow-lg rounded-2xl">
      <h2 className="text-4xl font-display text-center tracking-[0.2em] text-gray-800 dark:text-gray-100">
        RECORD YOUR EFFORT
      </h2>
      <p className="text-center text-gray-600 dark:text-gray-400 mt-2 tracking-wide">
        Every rep. Every step. Immortalize it.
      </p>

      <form onSubmit={handleSubmit} className="space-y-6 mt-8">
        {/* Workout Type */}
        <div>
          <label className="block font-semibold mb-1 text-gray-700 dark:text-gray-200">
            Type
          </label>
          <select
            name="type"
            onChange={handleChange}
            value={formData.type}
            className="w-full p-3 rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option>Strength</option>
            <option>Cardio</option>
            <option>Flexibility</option>
            <option>Endurance</option>
          </select>
        </div>

        {/* Workout Description */}
        <div>
          <label className="block font-semibold mb-1 text-gray-700 dark:text-gray-200">
            Deeds Performed
          </label>
          <textarea
            name="description"
            placeholder="e.g., 'Hit the gym.'"
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>

        {/* Workout Duration */}
        <div>
          <label className="block font-semibold mb-1 text-gray-700 dark:text-gray-200">
            Duration (Minutes)
          </label>
          <input
            type="number"
            name="duration"
            min="1"
            onChange={handleChange}
            value={formData.duration}
            className="w-full p-3 rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>

        {/* Feedback */}
        {status.error && (
          <p className="text-red-600 text-center font-semibold">{status.error}</p>
        )}
        {status.success && (
          <p className="text-green-600 text-center font-semibold">
            {status.success}
          </p>
        )}

        {/* Submit */}
        <button
          type="submit"
          className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold tracking-wider text-lg rounded-lg transition-colors"
        >
          Log It. Earn It.
        </button>
      </form>
    </div>
    </div>
  );
}
