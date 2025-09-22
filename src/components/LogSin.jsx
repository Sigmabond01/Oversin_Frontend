import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import api from '../api/api';
import { Skull, Flame, AlertTriangle, CheckCircle2Icon, ArrowLeft, PenSquare, BarChartBig, ArrowRight } from 'lucide-react';

export default function LogSin() {
  const navigate = useNavigate();
  const location = useLocation();
  const prefilledSin = location.state?.sin;

  const [formData, setFormData] = useState({
    reason: prefilledSin?.name || '',
    severity: 3,
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    if (prefilledSin) {
      setFormData({
        reason: prefilledSin.name,
        severity: 3,
      });
    }
  }, [prefilledSin]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: name === 'severity' ? parseInt(value, 10) : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      await api.post('/sins', formData);
      setSuccess('Your transgression has been recorded. The path to redemption is long.');
      setTimeout(() => navigate('/dashboard'), 1500);
    } catch (err) {
      setError(err.response?.data?.errors[0]?.message || 'Failed to record sin. Try harder.');
    }
  };
  const getSeverityInfo = (severity) => {
    switch (severity) {
      case 1: return { label: "Venial Sin", color: "text-gray-400" };
      case 2: return { label: "Moderate Transgression", color: "text-yellow-400" };
      case 3: return { label: "Serious Offense", color: "text-orange-400" };
      case 4: return { label: "Grave Sin", color: "text-red-400" };
      case 5: return { label: "Mortal Sin", color: "text-red-500" };
      default: return { label: "Unknown", color: "text-gray-500" };
    }
  };

  const severityInfo = getSeverityInfo(formData.severity);

  return (
    <div className="bg-gradient-to-t from-red-950/100 to-black min-h-screen absolute inset-0 overflow-auto py-12 px-4">
      <div className="max-w-2xl mx-auto mb-8">
        <div className="text-center mb-6">
          <div className="flex justify-center mb-4">
            <div className="p-4 bg-red-950/30 rounded-full border border-red-800">
              <Skull className="w-12 h-12 text-red-400" />
            </div>
          </div>
          <h1 className="text-5xl font-cinzel text-red-400 tracking-wide mb-2">Confess Your Sin</h1>
          <p className="text-gray-400 text-lg flex items-center justify-center">
             <Flame className="w-5 h-5 mr-2 text-red-500" />
             Unburden your soul. Record your failing.
          </p>
        </div>

        <div className="flex justify-between items-center mb-8">
          <button onClick={() => navigate('/dashboard')} 
            className="flex items-center text-gray-400 hover:text-red-400 transition-colors">
              <ArrowLeft className="w-5 h-5 mr-2" />
              Return to Dashboard
            </button>

          <button onClick={() => navigate('/sins')} 
            className="flex items-center text-gray-400 hover:text-red-400 transition-colors">
              <ArrowRight className="w-5 h-5 mr-2" />
              Browse Sins
            </button>
        </div>
      </div>

      <div className="max-w-2xl mx-auto">
        <div className="bg-gradient-to-br from-gray-900 to-black border border-red-800/50 rounded-xl p-8 shadow-2xl shadow-red-900/20">
          <form onSubmit={handleSubmit} className="space-y-8">

            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <PenSquare className="w-6 h-6 text-red-400" />
                <label className="text-red-400 font-cinzel text-xl">
                  Reason for Sin
                </label>
              </div>
              <textarea
                rows="3"
                name="reason"
                onChange={handleChange}
                value={formData.reason}
                placeholder="e.g., 'Gave in to temptation and ate an entire cake.'"
                className="w-full p-4 bg-black border border-red-600/50 focus:border-red-500 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-800/30 transition-all"
                required
              />
               <p className="text-gray-500 text-sm">
                Detail your moment of weakness. Honesty is the first step.
              </p>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                  <BarChartBig className="text-red-500 w-6 h-6" />
                  <label className="text-red-400 font-cinzel text-xl">Severity</label>
              </div>
            </div>

            <div className="bg-black/50 p-6 rounded-lg border border-red-900/30">
              <div className="flex items-center space-x-4 mb-4">
                 <span className="text-gray-400 text-sm w-8">1</span>
                 <input
                    type="range"
                    name="severity"
                    min="1"
                    max="5"
                    step="1"
                    onChange={handleChange}
                    value={formData.severity}
                    className="flex-1 h-3 bg-gray-800 rounded-lg appearance-none cursor-pointer"
                    style={{
                      background: `linear-gradient(to right, #dc2626 0%, #dc2626 ${((formData.severity - 1) / 4) * 100}%, #374151 ${((formData.severity - 1) / 4) * 100}%, #374151 100%)`
                    }}
                 />
                 <span className="text-gray-400 text-sm w-8 text-right">5</span>
              </div>
              <div className="text-center p-4 bg-gradient-to-r from-red-950/20 to-black border border-red-800/30 rounded-lg mb-4">
                <div className="flex items-center justify-center space-x-3 mb-2">
                  <Flame className="w-5 h-5 text-red-400" />
                  <p className="text-3xl font-bold text-white font-cinzel">
                    Level {formData.severity}
                  </p>
                </div>
                <p className={`text-lg font-cinzel ${severityInfo.color}`}>
                  {severityInfo.label}
                </p>
              </div>
               <input type="number" name="severity" min="1" max="5" onChange={handleChange} value={formData.severity} className="w-full p-3 bg-black border border-red-600/50 focus:border-red-500 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-800/30 transition-all" required/>
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
              className="w-full font-cinzel py-4 bg-gradient-to-r from-red-900 to-red-700 hover:from-red-800 hover:to-red-600 border-2 border-red-500 hover:border-red-400 text-white font-serif tracking-wider text-xl transition-all duration-300 rounded-lg transform hover:scale-105 flex items-center justify-center space-x-3"
            >
              <Flame className="w-6 h-6" />
              <span>RECORD THIS SIN</span>
            </button>

          </form>
        </div>
      </div>
    </div>
  );
}