import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../api/api";
import { ActivitySquare, ArrowLeft, ArrowLeftCircle, ArrowRight, BicepsFlexedIcon, CheckCircle2Icon, Clock, Clock10Icon, ClockIcon, Dumbbell, DumbbellIcon, TargetIcon, TimerIcon, Trophy, TrophyIcon, WatchIcon } from "lucide-react";

export default function LogWorkout() {
  const navigate = useNavigate();
  const location = useLocation();
  const prefilled = location.state?.exercise;

  const [formData, setFormData] = useState({
    type: prefilled?.muscle || 'Strength',
    description: prefilled?.name || '',
    duration: 30,
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    if(prefilled) {
      setFormData({
        type: prefilled.muscle,
        description: prefilled.name,
        duration: 30,
      });
    }
  }, [prefilled]);

  const handleChange = (e) => {
    const {name, value} = e.target;
    setFormData({ ...formData, [name]: name === 'duration' ? parseInt(value) : value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      await api.post("/workouts", formData);
      setSuccess("Workout logged. Your strength grows!");
      setTimeout(() => navigate('/dashboard'), 1000);
    } catch (err) {
      setError(err.response?.data?.errors[0]?.message || "Failed. Please try again!");
    }
  };

  const getWorkoutIcon = (type) => {
    const icons = {
      Strength: DumbbellIcon,
      Cardio: ActivitySquare,
      Flexibility: BicepsFlexedIcon,
      Endurance: WatchIcon
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
            <TrophyIcon className="w-12 h-12 text-red-400" />
            </div>
          </div>
          <h1 className="text-5xl font-cinzel text-red-400 tracking-wide mb-2">Log Your Effort</h1>
          <p className="text-gray-400 text-lg flex items-center justify-center">
            <TargetIcon className="w-5 h-5 mr-2 text-red-500" />
             Every rep. Every step. Log it.
          </p>
        </div>

        <div className="flex justify-between items-center mb-8">
          <button onClick={() => navigate('/dashboard')} 
            className="flex items-center text-gray-400 hover:text-red-400 transition-colors">
              <ArrowLeft className="w-5 h-5 mr-2" />
              Return to Dashboard
            </button>

          <button onClick={() => navigate('/workouts')} 
            className="flex items-center text-gray-400 hover:text-red-400 transition-colors">
              <ArrowRight className="w-5 h-5 mr-2" />
              Browse Workouts
            </button>
        </div>
      </div>
      

      <div className="max-w-2xl mx-auto">
        <div className="bg-gradient-to-br from-gray-900 to-black border border-red-800/50 rounded-xl p-8 shadow-2xl shadow-red-900/20">
        <form onSubmit={handleSubmit} className="space-y-8">

          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <WorkoutIcon className={`w-6 h-6 ${getWorkoutColor(formData.type).split(' ')[0]}`} />
              <label className="text-red-400 font-cinzel text-xl">
                Type Of Workout
              </label>
            </div>
            <input type="text" name="type" onChange={handleChange} value={formData.type}
            className="w-full p-4 bg-black border border-red-600/50 focus:border-red-500 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-800/30 transition-all"
            required />
          </div>

          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <WorkoutIcon className={`w-6 h-6 ${getWorkoutColor(formData.type).split(' ')[0]}`} />
              <label className="text-red-400 font-cinzel text-xl">
                Workout Performed
              </label>
            </div>
            <textarea rows="2" name="description" onChange={handleChange} value={formData.description}
            className="w-full p-4 bg-black border border-red-600/50 focus:border-red-500 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-800/30 transition-all"
            required />
              <p className="text-gray-500 text-sm">
                Detail your triumph over mediocrity.
              </p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <ClockIcon className="text-red-500 w-6 h-6" />
              <label className="text-red-400 font-cinzel text-xl">Duration (minutes)</label>
            </div>
          </div>

          <div className="bg-black/50 p-6 rounded-lg border border-red-900/30">
                <div className="flex items-center space-x-4 mb-4">
                  <TimerIcon className="w-5 h-5 text-gray-400" />
                  <input
                    type="range"
                    name="duration"
                    min="1"
                    max="180"
                    step="5"
                    onChange={handleChange}
                    value={formData.duration}
                    className="flex-1 h-3 bg-gray-800 rounded-lg appearance-none cursor-pointer"
                    style={{
                      background: `linear-gradient(to right, #dc2626 0%, #dc2626 ${((formData.duration-1)/179)*100}%, #374151 ${((formData.duration-1)/179)*100}%, #374151 100%)`
                    }}
                  />
                  <span className="text-gray-400 text-sm w-16">3 hrs</span>
                </div>

                <div className="text-center p-4 bg-gradient-to-r from-red-950/20 to-black border border-red-800/30 rounded-lg mb-4">
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

                <input type="number" name="duration" min="1" onChange={handleChange} value={formData.duration}
                className="w-full p-3 bg-black border border-red-600/50 focus:border-red-500 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-800/30 transition-all" 
                placeholder="Or other duration" required/>
          </div>

    {error && (
              <div className="flex items-center space-x-3 p-4 bg-red-950/30 border border-red-800 rounded-lg">
                <AlertTriangle className="w-6 h-6 text-red-400 flex-shrink-0" />
                <p className="text-red-400 font-bold">{error}</p>
              </div>
            )}

            {success && (
              <div className="flex items-center space-x-3 p-4 bg-green-950/30 border border-green-800 rounded-lg">
                <CheckCircle2Icon className="w-6 h-6 text-green-400 flex-shrink-0" />
                <p className="text-green-400 font-bold">{success}</p>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-4 bg-gradient-to-r from-red-900 to-red-700 hover:from-red-800 hover:to-red-600 border-2 border-red-500 hover:border-red-400 text-white font-cinzel tracking-wider text-xl transition-all duration-300 rounded-lg transform hover:scale-105 flex items-center justify-center space-x-3"
            >
              <Trophy className="w-6 h-6" />
              <span>LOG IT. EARN IT.</span>
            </button>
        </form>
        </div>
      </div>
    </div>
  );
}