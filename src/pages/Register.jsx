import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore.js";
import api from "../api/api.js";

export default function Register() {
  const [formData, setFormData] = useState({ username: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const setToken = useAuthStore((state) => state.setToken);
  
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters!");
      return;
    }
    try {
      setLoading(true);
      const res = await api.post("/auth/register", formData);
      setToken(res.data.token);
      navigate("/workouts");
    } catch (err) {
      setError(err.response?.data?.message || "Initiation failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col md:flex-row font-cinzel absolute inset-0">

      <div className="w-full md:w-1/2 h-48 md:h-full">
        <img 
          src="https://res.cloudinary.com/dcdqkzmfi/image/upload/v1758026940/esc_ugahao.jpg" 
          alt="Registration Visual" 
          className="w-full h-full object-cover shadow-[0_0_30px_rgba(220,38,38,0.5)]"
        />
        
      </div>

      <div className="w-full md:w-1/2 bg-red-950/100 flex items-center justify-center p-4 md:p-8 animate-fade-in">
        <div className="max-w-md w-full p-4 md:p-6 bg-black/80 border-2 border-red-800 shadow-[0_0_30px_rgba(220,38,38,0.8)] rounded-xl animate-glow">
          <img src="https://res.cloudinary.com/dcdqkzmfi/image/upload/v1758026741/oversin2_epheps.png" alt="Oversin Logo" className="w-32 h-32 md:w-40 md:h-40 mx-auto mb-" />
          <h2 className="text-4xl md:text-6xl text-center text-red-600 font-semibold tracking-wide mb-4">
            REGISTER
          </h2>
          <p className="text-center text-gray-300 animate-fade-in-up">
            join the ranks.
          </p>
          <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6 mt-6 md:mt-8">
            <div>
              <input type="text" name="username" placeholder="Enter your username" onChange={handleChange} className="w-full p-3 bg-white/10 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-red-600 text-white placeholder-gray-300 rounded-md transition-all duration-200 hover:shadow-[0_0_15px_rgba(220,38,38,0.6)]" />
            </div>
            <div>
              <input type="email" name="email" placeholder="Enter your email" onChange={handleChange} className="w-full p-3 bg-white/10 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-red-600 text-white placeholder-gray-300 rounded-md transition-all duration-200 hover:shadow-[0_0_15px_rgba(220,38,38,0.6)]" />
            </div>
            <div>
              <input type="password" name="password" placeholder="Enter your password" onChange={handleChange} className="w-full p-3 bg-white/10 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-red-600 text-white placeholder-gray-300 rounded-md transition-all duration-200 hover:shadow-[0_0_15px_rgba(220,38,38,0.6)]" />
            </div>
            {error && <p className="text-red-600 text-center text-sm animate-shake">{error}</p>}
            <button type="submit" disabled={loading} className="w-full py-3 bg-red-800 hover:bg-red-950 disabled:opacity-50 disabled:cursor-not-allowed text-white font-display tracking-wide text-lg md:text-xl transition-all duration-200 rounded-lg">
              {loading ? "Forging Oath..." : "CREATE ACCOUNT"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}