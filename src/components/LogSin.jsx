import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";
import { GiDeathSkull } from "react-icons/gi";
import { AlertCircle, ArrowLeft, CheckCircle2, EyeIcon, FlameIcon, SkullIcon, TargetIcon } from "lucide-react";

export default function LogSin() {
    const [formData, setFormData] = useState({ reason: '', severity: 1 });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
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
        } finally {
          setIsSubmitting(false);
        }
    };

    const getSeverityLabel = (severity) => {
      const labels = {
        1: "Minor weakness",
        2: "Notable features",
        3: "Serious lapse",
        4: "Major disgrace",
        5: "Absolute disgrace"
      };
      return labels[severity];
    };

    const getSeverityColor = (severity) => {
      const colors = {
        1: "text-gray-400",
        2: "text-yellow-400",
        3: "text-orange-400",
        4: "text-red-400",
        5: "text-purple-800",
      };
      return colors[severity];
    }

    return (
    <div className="bg-gradient-to-t from-red-950/100 to-black min-h-screen w-full absolute inset-0 overflow-auto px-4 py-12">
      <div className="max-w-2xl mx-auto mb-8">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="p-4 bg-red-950/30 rounded-full border border-red-800">
              <GiDeathSkull className="w-12 h-12 text-red-500" />
            </div>
          </div>
          <h1 className="text-5xl text-red-400 font-cinzel tracking-wide mb-2">Confess your Sin</h1>
          <p className="text-gray-400 text-lg flex items-center justify-center">
            <EyeIcon className="w-5 h-5 mr-2 text-red-500" />
            Your failures are being documented
          </p>
        </div>

        <button onClick={() => navigate('/dashboard')} className="flex items-center text-gray-400 hover:text-red-400 transition-colors mb-8">
          <ArrowLeft className="w-5 h-5 mr-2" />
          Return to Dashboard
        </button>
      </div>

      <div className="max-w-2xl mx-auto">
        <div className="bg-gradient-to-br from-gray-900 to-black border border-red-800/50 rounded-xl p-8 shadow-2xl shadow-red-900/20">
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <TargetIcon className="w-6 h-6 text-red-500" />
                <label className="block text-red-400 font-cinzel text-xl">
                  Your Sin
                </label>
              </div>
              <textarea 
              name="reason" 
              placeholder="Describe your moment of weakness..."
              onChange={handleChange}
              value={formData.reason}
              rows="1"
              className="w-full p-4 bg-black border border-red-600/50 focus:border-red-500 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-800/30 transition-all resize-none"
              required 
              ></textarea>
              <p className="text-gray-500 text-sm">
                Be honest. Your shame fuels your growth
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-center space-x-3">
                <FlameIcon className="w-6 h-6 text-red-500" />
                <label className="block text-red-400 font-cinzel text-xl">Severity of Sin</label>
              </div>

              <div className="bg-black/50 p-6 rounded-lg border border-red-900/30">
                <input 
                 type="range" 
                 name="severity" 
                 min="1" 
                 max="5" 
                 onChange={handleChange} 
                 value={formData.severity}
                 className="w-full h-3 bg-gray-800 rounded-lg appearance-none cursor-pointer slider"
                style={{
                 background: `linear-gradient(to right, #dc2626 0%, #dc2626 ${(formData.severity-1)*25}%, #374151 ${(formData.severity-1)*25}%, #374151 100%)`
                   }}
                 />

                 <div className="flex justify-between text-xs text-gray-500 mt-2">
                  <span>Minor</span>
                  <span>Notable</span>
                  <span>Serious</span>
                  <span>Major</span>
                  <span>Complete</span>
                 </div>

                 <div className="text-center mt-6 p-4 bg-gradient-to-r from-red-950/20 to-black border border-red-800/30 rounded-lg">
                   <p className="text-gray-400 text-sm mb-2">Current Level:</p>
                   <p className={`text-3xl font-bold font-cinzel ${getSeverityColor(formData.severity)}`}>
                    {formData.severity}
                   </p>
                   <p className={`text-lg font-cinzel ${getSeverityColor(formData.severity)} mt-1`}>
                    {getSeverityLabel(formData.severity)}
                   </p>
                 </div>
              </div>
            </div>

            {error && (
              <div className="flex items-center space-x-3 p-4 bg-red-950/30 border border-red-800 rounded-lg">
                <AlertCircle className="w-6 h-6 text-red-400 flex-shrink-0" />
                <p className="text-red-400 font-bold"> {error} </p>
              </div>
            )}

            {success && (
              <div className="flex items-center space-x-3 p-4 bg-green-950/50 border border-green-800 rounded-lg">
                <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0" />
                <p className="text-green-600 font-bold"> {success} </p>
              </div>
            )}

            <button type="submit" disabled={isSubmitting || !formData.reason.trim()}
            className="w-full py-4 bg-gradient-to-r from-black to-red-950 hover:from-red-950 hover:to-red-800 border-2 border-red-600 hover:border-red-500 text-white font-cinzel tracking-wider text-xl transition-all duration-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 flex items-center justify-center space-x-3">
              {isSubmitting ? (
                <>
                <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full"></div>
                <span>Processing Confession.....</span>
                </>
              ) : (
                <>
                <SkullIcon className="w-6 h-6" />
                <span>Accept Your Sin</span>
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
    );
}