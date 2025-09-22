import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import sinsData from '../data/sins.json';
import { Skull, Target, Activity, Flame, AlertTriangle, ArrowRight, Eye } from 'lucide-react';
import Navbar2 from '../components/Navbar2';

export default function Sins() {
  const [selectedSin, setSelectedSin] = useState('pride');
  const { sins } = sinsData;
  const sinGroups = Object.keys(sins);
  const navigate = useNavigate();

  const handleLogSin = async (sin) => {
    navigate('/log-sin', {state: { sin }});
  };

  const getSinIcon = (sin) => {
    const icons = {
      pride: Skull,
      wrath: Flame,
      envy: Eye,
      gluttony: Target,
      lust: Activity,
      greed: AlertTriangle,
      sloth: Skull
    };
    return icons[sin.toLowerCase()] || Skull;
  };

  return (
    <div className="bg-gradient-to-t from-red-950/100 to-black absolute inset-0 min-h-screen overflow-auto px-4">
      <Navbar2 />
      <div className="bg-gradient-to-t from-red-950/20 to-black border-b border-red-900/30"></div>
      <div className="max-w-7xl mt-4 mx-auto">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-red-950/30 rounded-full border border-red-800">
              <Skull className="w-12 h-12 text-red-400" />
            </div>
          </div>
          <h1 className="text-5xl font-cinzel text-red-400 tracking-wide mb-4">
            SINS
          </h1>
          <p className="text-gray-400 text-lg flex items-center justify-center">
            <AlertTriangle className="w-5 h-5 mr-2 text-red-500" />
            Face your sins. Confess your failings.
          </p>
        </div>

        <div className="mb-8">
          <div className="flex justify-center gap-3 md:gap-4 flex-wrap">
            {sinGroups.map((sin) => {
              const SinIcon = getSinIcon(sin);
              const isSelected = selectedSin === sin;
              return (
                <button
                  key={sin}
                  onClick={() => setSelectedSin(sin)}
                  className={`py-3 px-6 font-cinzel tracking-wider text-lg uppercase transition-all duration-300 rounded-lg flex items-center gap-2 transform hover:scale-105 ${
                    isSelected
                      ? 'bg-gradient-to-r from-red-600 to-red-700 text-white shadow-lg border-2 border-red-400'
                      : 'bg-red-950/40 border-2 border-red-800/50 hover:border-red-600/70 text-red-300 hover:bg-red-900/60'
                  }`}
                >
                  <SinIcon className="w-5 h-5" />
                  {sin}
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sins[selectedSin]?.map((sin) => (
            <div 
              key={sin.id} 
              className="bg-black border border-red-800/50 rounded-xl overflow-hidden shadow-2xl shadow-red-900/20 hover:shadow-red-800/30 transition-all duration-300 hover:transform hover:scale-105 group"
            >
              <div className="relative">
                <div className="p-4 bg-gradient-to-r from-red-950/50 to-red-900/50 border-b border-red-800/30">
                  <h3 className="text-xl font-cinzel text-red-400 tracking-wider mb-1">
                    {sin.name}
                  </h3>
                </div>
              </div>

              <div className="relative overflow-hidden">
                <img 
                  src={sin.gif_url} 
                  alt={`${sin.name} demonstration`} 
                  className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
              </div>

              <div className="p-4 flex-grow">
                <div className="text-gray-300 space-y-2 text-sm leading-relaxed min-h-20">
                  {sin.description1 && (
                    <p className="text-gray-200">{sin.description1}</p>
                  )}
                  {sin.description2 && (
                    <p className="text-gray-300">{sin.description2}</p>
                  )}
                </div>

                <button
                  onClick={() => handleLogSin(sin)}
                  className="w-full mt-4 py-3 bg-gradient-to-r from-red-900 to-red-700 hover:from-red-800 hover:to-red-600 border-2 border-red-500 hover:border-red-400 text-white font-cinzel tracking-wider transition-all duration-300 rounded-lg transform hover:scale-105 flex items-center justify-center gap-2 group"
                >
                  <Skull className="w-5 h-5" />
                  <span>CONFESS THIS SIN</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {sins[selectedSin]?.length === 0 && (
          <div className="bg-gradient-to-br from-gray-900 to-black border border-red-800/50 rounded-xl p-12 text-center shadow-2xl shadow-red-900/20">
            <div className="text-red-400 opacity-50 mb-4">
              <Skull className="w-16 h-16 mx-auto" />
            </div>
            <p className="text-gray-400 text-lg font-cinzel">No sins found for {selectedSin}</p>
            <p className="text-red-500 text-sm mt-2">Perhaps you are pure... for now</p>
          </div>
        )}
      </div>
    </div>
  );
}