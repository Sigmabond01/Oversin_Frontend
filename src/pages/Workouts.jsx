import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import exerciseData from '../data/exercises.json';
import api from '../api/api';
import Loader from '../components/Loader';

export default function Workouts() {
  const [selectedMuscle, setSelectedMuscle] = useState('chest');
  const [loggingStatus, setLoggingStatus] = useState({ id: null, message: '', type: '' });
  const { exercises } = exerciseData;
  const muscleGroups = Object.keys(exercises);
  const navigate = useNavigate();

  const handleLogWorkout = async (exercise) => {
    setLoggingStatus({ id: exercise.id, message: 'Logging...', type: 'info' });
    
    try {
      const workoutData = {
        type: exercise.muscle,
        description: exercise.name,
        duration: 30,
      };
      
      await api.post('/workouts', workoutData);
      
      setLoggingStatus({ 
        id: exercise.id, 
        message: 'Discipline logged. Strength grows!', 
        type: 'success' 
      });
      
      setTimeout(() => {
        setLoggingStatus({ id: null, message: '', type: '' });
        navigate('/dashboard');
      }, 500);
    } catch (err) {
      setLoggingStatus({ 
        id: exercise.id, 
        message: "Failed to log. Try again.", 
        type: 'error' 
      });
      
      console.error("Workout log failed: ", err.response?.data?.errors?.[0]?.message || err.message);
      
      setTimeout(() => {
        setLoggingStatus({ id: null, message: '', type: '' });
      }, 3000);
    }
  };

  const isLogging = (exerciseId) => loggingStatus.id === exerciseId && loggingStatus.type === 'info';
  const getStatusMessage = (exerciseId) => loggingStatus.id === exerciseId ? loggingStatus.message : '';
  const getStatusType = (exerciseId) => loggingStatus.id === exerciseId ? loggingStatus.type : '';

  return (
    <div className="bg-red-950 absolute inset-0 min-h-screen overflow-auto">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-8 font-cinzel">
          <h1 className="text-4xl text-red-600 mb-2">Workouts</h1>
          <p className="text-gray-400 text-lg">Pick your workout and log them.</p>
        </header>

        <nav className="flex font-cinzel justify-center gap-2 md:gap-4 mb-8 flex-wrap" role="tablist">
          {muscleGroups.map((muscle) => (
            <button
              key={muscle}
              onClick={() => setSelectedMuscle(muscle)}
              role="tab"
              aria-selected={selectedMuscle === muscle}
              aria-controls={`${muscle}-exercises`}
              className={`py-2 px-4 font-display tracking-wider text-lg uppercase transition-all duration-200 rounded-sm
                ${selectedMuscle === muscle
                  ? 'bg-red-600 text-white shadow-lg transform scale-105'
                  : 'bg-white/10 border-2 border-red-600 hover:bg-red-900/100 hover:scale-102 text-gray-300'
                }`}
            >
              {muscle}
            </button>
          ))}
        </nav>

        <main 
          className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6"
          id={`${selectedMuscle}-exercises`}
          role="tabpanel"
        >
          {exercises[selectedMuscle]?.map((exercise) => (
            <article 
              key={exercise.id} 
              className="bg-white/10 backdrop-blur-sm border-2 border-red-600/50 rounded-lg overflow-hidden flex flex-col shadow-xl hover:shadow-2xl transition-all duration-300 hover:transform hover:scale-105"
            >
              <header className="p-4 bg-gradient-to-r from-red-900/50 to-red-800/50">
                <h3 className="text-2xl font-display text-red-400 tracking-wider mb-1">
                  {exercise.name}
                </h3>
                <p className="text-sin-steel italic text-sm uppercase tracking-wide">
                  {exercise.muscle}
                </p>
              </header>

              <div className="relative overflow-hidden">
                <img 
                  src={exercise.gif_url} 
                  alt={`${exercise.name} demonstration`} 
                  className="w-full h-48 object-cover border-y-2 border-sin-steel/30 transition-transform duration-300 hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>

              <div className="p-4 flex-grow">
                <div className="text-gray-300 space-y-2 text-sm leading-relaxed">
                  {exercise.description1 && (
                    <p className="text-gray-200">{exercise.description1}</p>
                  )}
                  {exercise.description2 && (
                    <p className="text-gray-300">{exercise.description2}</p>
                  )}
                </div>
              </div>

              {getStatusMessage(exercise.id) && (
                <div className={`text-center font-bold py-2 px-4 mx-4 mb-2 rounded transition-all duration-300
                  ${getStatusType(exercise.id) === 'success' 
                    ? 'text-green-400 bg-green-900/30 border border-green-600/50' 
                    : getStatusType(exercise.id) === 'error'
                    ? 'text-red-400 bg-red-900/30 border border-red-600/50'
                    : 'text-blue-400 bg-blue-900/30 border border-blue-600/50'
                  }`}
                >
                  {getStatusMessage(exercise.id)}
                </div>
              )}

              <button
                onClick={() => handleLogWorkout(exercise)}
                disabled={isLogging(exercise.id)}
                className={`w-full mt-auto py-3 font-display tracking-wider text-xl transition-all duration-300 relative overflow-hidden
                  ${isLogging(exercise.id)
                    ? 'bg-sin-gray text-gray-400 cursor-not-allowed'
                    : 'bg-sin-black border-t-2 border-sin-red hover:bg-sin-red text-white hover:shadow-lg active:transform active:scale-95'
                  }`}
                aria-label={`Log ${exercise.name} workout`}
              >
                <span className={`transition-opacity duration-200 ${isLogging(exercise.id) ? 'opacity-70' : 'opacity-100'}`}>
                  {isLogging(exercise.id) ? 'Logging...' : 'Log This Workout'}
                </span>
                {isLogging(exercise.id) && (
                  <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-gray-400 border-t-transparent"></div>
                  </div>
                )}
              </button>
            </article>
          ))}
        </main>

        {exercises[selectedMuscle]?.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">No exercises found for {selectedMuscle}.</p>
          </div>
        )}
      </div>
    </div>
  );
}