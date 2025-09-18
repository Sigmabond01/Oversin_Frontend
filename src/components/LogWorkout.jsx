import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";
import { Dumbbell, Clock, Activity, CheckCircle, AlertTriangle,ArrowLeft,Zap,Target,Timer,Trophy  } from "lucide-react";

export default function LogWorkout() {
  const [formData, setFormData] = useState({
    type: "Strength",
    description: "",
    duration: 30,
  });
  const [status, setStatus] = useState({ error: "", success: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
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
    setIsSubmitting(true);

    try {
      await api.post("/workouts", formData);
      setStatus({ error: "", success: "Workout logged. Strength grows." });
      setTimeout(() => navigate("/dashboard"), 1200);
    } catch (err) {
      setStatus({
        error: err.response?.data?.errors?.[0]?.message || "Failed. Try harder.",
        success: "",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const getWorkoutIcon = (type) => {
    const icons = {
      Strength: Dumbbell,
      Cardio: Activity,
      Flexibility: Target,
      Endurance: Zap
    };
    return icons[type] || Dumbbell;
  };

  const getWorkoutColor = (type) => {
    const colors = {
      Strength: "text-red-400 border-red-500",
      Cardio: "text-blue-400 border-blue-500", 
      Flexibility: "text-green-400 border-green-500",
      Endurance: "text-yellow-400 border-yellow-500"
    };
    return colors[type] || "text-red-400 border-red-500";
  };

  const getDurationIntensity = (duration) => {
    if (duration < 30) return { label: "Quick Session", color: "text-yellow-400" };
    if (duration < 60) return { label: "Standard Training", color: "text-orange-400" };
    if (duration < 90) return { label: "Intense Session", color: "text-red-400" };
    return { label: "Beast Mode", color: "text-red-500" };
  };

  const WorkoutIcon = getWorkoutIcon(formData.type);
  const intensityInfo = getDurationIntensity(formData.duration);

  return (
    <div className="bg-gradient-to-t from-red-950/100 to-black min-h-screen absolute inset-0 overflow-auto py-12 px-4">
      <div className="max-w-2xl mx-auto mb-8">
        <div className="text-center mb-6">
          <div className="flex justify-center mb-4">
            <div className="p-4 bg-red-950/30 rounded-full border border-red-800">
              <Trophy className="w-12 h-12 text-red-400" />
            </div>
          </div>
          <h1 className="text-5xl font-cinzel text-red-400 tracking-wide mb-2">
            RECORD YOUR EFFORT
          </h1>
          <p className="text-gray-400 text-lg flex items-center justify-center">
            <Target className="w-5 h-5 mr-2 text-red-500" />
            Every rep. Every step. Immortalize it.
          </p>
        </div>

        <button 
          onClick={() => navigate('/dashboard')}
          className="flex items-center text-gray-400 hover:text-red-400 transition-colors mb-8"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Return to Dashboard
        </button>
      </div>

      <div className="max-w-2xl mx-auto">
        <div className="bg-gradient-to-br from-gray-900 to-black border border-red-800/50 rounded-xl p-8 shadow-2xl shadow-red-900/20">
          <form onSubmit={handleSubmit} className="space-y-8">
            
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <WorkoutIcon className={`w-6 h-6 ${getWorkoutColor(formData.type).split(' ')[0]}`} />
                <label className="block text-red-400 font-cinzel text-xl">
                  Training Type
                </label>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {['Strength', 'Cardio', 'Flexibility', 'Endurance'].map((type) => {
                  const TypeIcon = getWorkoutIcon(type);
                  const isSelected = formData.type === type;
                  return (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setFormData({...formData, type})}
                      className={`p-4 rounded-lg border-2 transition-all duration-300 flex flex-col items-center space-y-2 ${
                        isSelected 
                          ? `${getWorkoutColor(type)} bg-gradient-to-r from-red-950/30 to-black` 
                          : 'border-gray-700 text-gray-400 hover:border-gray-600'
                      }`}
                    >
                      <TypeIcon className="w-6 h-6" />
                      <span className="text-sm font-cinzel">{type}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Activity className="w-6 h-6 text-red-500" />
                <label className="block text-red-400 font-cinzel text-xl">
                  Deeds Performed
                </label>
              </div>
              <textarea
                name="description"
                placeholder="Describe your battle against weakness... e.g., 'Conquered 225lb deadlifts, 3x8. Pain is temporary, glory is eternal.'"
                onChange={handleChange}
                value={formData.description}
                rows="4"
                className="w-full p-4 bg-black border border-red-600/50 focus:border-red-500 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-800/30 transition-all resize-none"
                required
              />
              <p className="text-gray-500 text-sm">
                Detail your triumph over mediocrity.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-center space-x-3">
                <Clock className="w-6 h-6 text-red-500" />
                <label className="block text-red-400 font-cinzel text-xl">
                  Duration
                </label>
              </div>
              
              <div className="bg-black/50 p-6 rounded-lg border border-red-900/30">
                <div className="flex items-center space-x-4 mb-4">
                  <Timer className="w-5 h-5 text-gray-400" />
                  <input
                    type="range"
                    name="duration"
                    min="5"
                    max="180"
                    step="5"
                    onChange={handleChange}
                    value={formData.duration}
                    className="flex-1 h-3 bg-gray-800 rounded-lg appearance-none cursor-pointer"
                    style={{
                      background: `linear-gradient(to right, #dc2626 0%, #dc2626 ${((formData.duration-5)/175)*100}%, #374151 ${((formData.duration-5)/175)*100}%, #374151 100%)`
                    }}
                  />
                  <span className="text-gray-400 text-sm w-16">3 hrs</span>
                </div>

                <div className="text-center p-4 bg-gradient-to-r from-red-950/20 to-black border border-red-800/30 rounded-lg">
                  <div className="flex items-center justify-center space-x-3 mb-2">
                    <Clock className="w-5 h-5 text-red-400" />
                    <p className="text-3xl font-bold text-white font-cinzel">
                      {formData.duration} min
                    </p>
                  </div>
                  <p className={`text-lg font-cinzel ${intensityInfo.color}`}>
                    {intensityInfo.label}
                  </p>
                </div>
              </div>
            </div>

            {status.error && (
              <div className="flex items-center space-x-3 p-4 bg-red-950/30 border border-red-800 rounded-lg">
                <AlertTriangle className="w-6 h-6 text-red-400 flex-shrink-0" />
                <p className="text-red-400 font-bold">{status.error}</p>
              </div>
            )}

            {status.success && (
              <div className="flex items-center space-x-3 p-4 bg-green-950/30 border border-green-800 rounded-lg">
                <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0" />
                <p className="text-green-400 font-bold">{status.success}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting || !formData.description.trim()}
              className="w-full py-4 bg-gradient-to-r from-red-900 to-red-700 hover:from-red-800 hover:to-red-600 border-2 border-red-500 hover:border-red-400 text-white font-cinzel tracking-wider text-xl transition-all duration-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 flex items-center justify-center space-x-3"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full"></div>
                  <span>Recording Victory...</span>
                </>
              ) : (
                <>
                  <Trophy className="w-6 h-6" />
                  <span>LOG IT. EARN IT.</span>
                </>
              )}
            </button>
          </form>
        </div>

        <div className="mt-8 grid grid-cols-3 gap-4">
          <div className="bg-gradient-to-br from-gray-900/50 to-black border border-red-900/30 rounded-lg p-4 text-center">
            <div className={`${getWorkoutColor(formData.type).split(' ')[0]} text-2xl font-bold`}>
              {formData.type}
            </div>
            <div className="text-gray-400 text-sm mt-1">Training Focus</div>
          </div>
          <div className="bg-gradient-to-br from-gray-900/50 to-black border border-red-900/30 rounded-lg p-4 text-center">
            <div className="text-red-400 text-2xl font-bold">{formData.duration}</div>
            <div className="text-gray-400 text-sm mt-1">Minutes</div>
          </div>
          <div className="bg-gradient-to-br from-gray-900/50 to-black border border-red-900/30 rounded-lg p-4 text-center">
            <div className={`${intensityInfo.color} text-2xl font-bold`}>
              {formData.duration > 60 ? '🔥' : formData.duration > 30 ? '💪' : '⚡'}
            </div>
            <div className="text-gray-400 text-sm mt-1">Intensity</div>
          </div>
        </div>
      </div>

      <style jsx>{`
        input[type="range"]::-webkit-slider-thumb {
          appearance: none;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #dc2626;
          cursor: pointer;
          border: 2px solid #7f1d1d;
          box-shadow: 0 0 10px rgba(220, 38, 38, 0.5);
        }
        input[type="range"]::-moz-range-thumb {
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #dc2626;
          cursor: pointer;
          border: 2px solid #7f1d1d;
          box-shadow: 0 0 10px rgba(220, 38, 38, 0.5);
        }
      `}</style>
    </div>
  );
}