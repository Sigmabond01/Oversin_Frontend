import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";

export default function LogSin() {
    const [formData, setFormData] = useState({ reason: '', severity: 1 });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData({ ...formData, [name]: name === 'severity' ? parseInt(value): value});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        try {
            await api.post("/sins", formData);
            setSuccess("Weakness confessed. Your streak is dust.");
            setTimeout(() => navigate('/dashboard'), 1500);
        } catch (err) {
            setError(err.response?.data?.errors[0]?.message ||  'Confession failed.');
        }
    };

    return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-gray-400 border-2 border-red-600">
      <h2 className="text-3xl font-display text-center text-red-600 tracking-wide">CONFESS YOUR WEAKNESS</h2>
      <form onSubmit={handleSubmit} className="space-y-6 mt-4">
        <div>
          <label className="block text-gray-400 font-bold mb-1">Your Transgression</label>
          <textarea name="reason" placeholder="e.g., 'Skipped leg day for pizza.'" onChange={handleChange} className="w-full p-3 bg-black border border-red-600 focus:outline-none focus:ring-2 focus:ring-red-800" required />
        </div>
        <div>
          <label className="block text-gray-500 font-bold mb-1">Severity of Failure (1-5)</label>
          <input type="range" name="severity" min="1" max="5" onChange={handleChange} value={formData.severity} className="w-full h-3 bg-black accent-red-600" required />
          <p className="text-center text-2xl font-bold">{formData.severity}</p>
        </div>
        {error && <p className="text-sin-blood text-center font-bold">{error}</p>}
        {success && <p className="text-sin-blood text-center font-bold">{success}</p>}
        <button type="submit" className="w-full py-3 bg-black border-2 border-red-600 hover:bg-red-800 text-white font-display tracking-wider text-xl transition-colors">Accept Punishment</button>
      </form>
    </div>
    );
}