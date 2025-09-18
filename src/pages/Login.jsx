import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore.js";
import api from "../api/api.js";

export default function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
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
      const res = await api.post("/auth/login", formData);
      setToken(res.data.token);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Initiation failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-black flex font-cinzel absolute inset-0">

      <div className="w-1/2">
        <img 
          src="https://res.cloudinary.com/dcdqkzmfi/image/upload/v1758026940/esc_ugahao.jpg" 
          alt="Registration Visual" 
          className="w-full h-full object-cover shadow-[0_0_30px_rgba(220,38,38,0.5)]"
        />
        
      </div>

      <div className="w-1/2 bg-red-950/100 flex items-center justify-center p-8 animate-fade-in">
        <div className="max-w-md w-full p-6 bg-black/80 border-2 border-red-800 shadow-[0_0_30px_rgba(220,38,38,0.8)] rounded-xl animate-glow">
          <img src="https://res.cloudinary.com/dcdqkzmfi/image/upload/v1758026741/oversin2_epheps.png" alt="Oversin Logo" className="w-40 h-40 mx-auto mb-" />
          <h1 className="text-6xl text-center text-red-600 font-semibold tracking- mb-4">
            LOGIN
          </h1>
          <p className="text-center text-gray-300 animate-fade-in-up">
            Welcome Back.
          </p>
          <form onSubmit={handleSubmit} className="space-y-6 mt-8">
            <div>
              <input type="email" name="email" placeholder="Enter your email" onChange={handleChange} className="w-full p-3 bg-white/10 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-red-600 text-white placeholder-gray-300 rounded-md transition-all duration-200 hover:shadow-[0_0_15px_rgba(220,38,38,0.6)]" />
            </div>
            <div>
              <input type="password" name="password" placeholder="Enter your password" onChange={handleChange} className="w-full p-3 bg-white/10 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-red-600 text-white placeholder-gray-300 rounded-md transition-all duration-200 hover:shadow-[0_0_15px_rgba(220,38,38,0.6)]" />
            </div>
            {error && <p className="text-red-600 text-center text-sm animate-shake">{error}</p>}
            <button type="submit" disabled={loading} className="w-full py-3 bg-red-800 hover:bg-red-950 disabled:opacity-50 disabled:cursor-not-allowed text-white font-display tracking-wide text-xl transition-all duration-200 rounded-lg">
              {loading ? "Forging Oath..." : "SIGN IN"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}