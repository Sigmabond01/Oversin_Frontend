import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import sinsData from '../data/sins.json';
import api from '../api/api';


export default function Sins() {
  const [selectedSin, setSelectedSin] = useState('pride');
  const [loggingStatus, setLoggingStatus] = useState({ id: null, message: '', type: '' });
  const { sins } = sinsData;
  const sinGroups = Object.keys(sins);
  const navigate = useNavigate();

  const handleLogSin = async (sin) => {
    setLoggingStatus({ id: sin.id, message: 'Logging...', type: 'info' });
    
    try {
      const sinsData = {
        type: sin.muscle,
        description: sin.name,
      };
      
      await api.post('/sins', sinsData);
      
      setLoggingStatus({ 
        id: sin.id, 
        message: 'Discipline logged. Strength grows!', 
        type: 'success' 
      });
      
      setTimeout(() => {
        setLoggingStatus({ id: null, message: '', type: '' });
        navigate('/dashboard');
      }, 500);
    } catch (err) {
      setLoggingStatus({ 
        id: sin.id, 
        message: "Login to log this workout", 
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
    <div className="bg-red-950 absolute inset-0 min-h-screen font-cinzel overflow-auto">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-8 font-cinzel">
          <h1 className="text-4xl text-red-600 mb-2">Sins</h1>
          <p className="text-gray-400 text-lg">Pick your sin and log it.</p>
        </header>

        <nav className="flex font-cinzel justify-center gap-2 md:gap-4 mb-8 flex-wrap" role="tablist">
          {sinGroups.map((sin) => (
            <button
              key={sin}
              onClick={() => setSelectedSin(sin)}
              role="tab"
              aria-selected={selectedSin === sin}
              aria-controls={`${sin}-exercises`}
              className={`py-2 px-4 font-display tracking-wider text-lg uppercase transition-all duration-200 rounded-sm
                ${selectedSin === sin
                  ? 'bg-red-600 text-white shadow-lg transform scale-105'
                  : 'bg-white/10 border-2 border-red-600 hover:bg-red-900/100 hover:scale-102 text-gray-300'
                }`}
            >
              {sin}
            </button>
          ))}
        </nav>

        <main 
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6"
          id={`${selectedSin}-exercises`}
          role="tabpanel"
        >
          {sins[selectedSin]?.map((sin) => (
            <article 
              key={sin.id} 
              className="bg-white/10 backdrop-blur-sm border-2 border-red-600/50 rounded-lg overflow-hidden flex flex-col shadow-xl hover:shadow-2xl transition-all duration-300 hover:transform hover:scale-105"
            >
              <header className="p-4 bg-gradient-to-r from-red-900/50 to-red-800/50">
                <h3 className="text-2xl font-display text-red-400 tracking-wider mb-1">
                  {sin.name}
                </h3>
                <p className="text-sin-steel italic text-sm uppercase tracking-wide">
                  {sin.muscle}
                </p>
              </header>

              <div className="relative overflow-hidden">
                <img 
                  src={sin.gif_url} 
                  alt={`${sin.name} demonstration`} 
                  className="w-full h-48 object-cover border-y-2 border-sin-steel/30 transition-transform duration-300 hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>

              <div className="p-4 flex-grow">
                <div className="text-gray-300 space-y-2 text-sm leading-relaxed">
                  {sin.description1 && (
                    <p className="text-gray-200">{sin.description1}</p>
                  )}
                  {sin.description2 && (
                    <p className="text-gray-300">{sin.description2}</p>
                  )}
                </div>
              </div>

              {getStatusMessage(sin.id) && (
                <div className={`text-center font-bold py-2 px-4 mx-4 mb-2 rounded transition-all duration-300
                  ${getStatusType(sin.id) === 'success' 
                    ? 'text-green-400 bg-green-900/30 border border-green-600/50' 
                    : getStatusType(sin.id) === 'error'
                    ? 'text-red-400 bg-red-900/30 border border-red-600/50'
                    : 'text-blue-400 bg-blue-900/30 border border-blue-600/50'
                  }`}
                >
                  {getStatusMessage(sin.id)}
                </div>
              )}

              <button
                onClick={() => handleLogSin(sin)}
                disabled={isLogging(sin.id)}
                className={`w-full mt-auto py-3 font-display tracking-wider text-xl transition-all duration-300 relative overflow-hidden
                  ${isLogging(sin.id)
                    ? 'bg-sin-gray text-gray-400 cursor-not-allowed'
                    : 'bg-sin-black border-t-2 border-sin-red hover:bg-sin-red text-white hover:shadow-lg active:transform active:scale-95'
                  }`}
                aria-label={`Log ${sin.name} workout`}
              >
                <span className={`transition-opacity duration-200 ${isLogging(sin.id) ? 'opacity-70' : 'opacity-100'}`}>
                  {isLogging(sin.id) ? 'Logging...' : 'Log This Sin'}
                </span>
                {isLogging(sin.id) && (
                  <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-gray-400 border-t-transparent"></div>
                  </div>
                )}
              </button>
            </article>
          ))}
        </main>

        {sins[selectedSin]?.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">No exercises found for {selectedSin}.</p>
          </div>
        )}
      </div>
    </div>
  );
}