import { Link, useNavigate } from 'react-router-dom';
import { LogsIcon, LogInIcon } from "lucide-react";
import { useAuthStore } from '../store/authStore';

export default function Navbar() {
  const { isAuthenticated, logout } = useAuthStore();
  const navigate = useNavigate();
  
  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="flex items-center justify-between font-cinzel text-xl p-6 md:p-0 mr-6">
      <div className="flex items-center">
        <div className="w-30 h-30 relative mt-4">
          <Link to={isAuthenticated ? "/dashboard" : "/"}>
            <img
              src="https://res.cloudinary.com/dcdqkzmfi/image/upload/v1758026741/oversin2_epheps.png"
              alt="Oversin Logo"
              className="object-contain ml-24"
            />
          </Link>
        </div>
      </div>

      <div className="hidden md:flex ml-64 space-x-8 text-white/90">
        {isAuthenticated ? (
          <>
            <Link to="/dashboard" className="hover:text-red-400 transition-colors">Dashboard</Link>
            <Link to="/leaderboard" className="hover:text-red-400 transition-colors">Leaderboard</Link>
          </>
        ) : (
          <>
            <a href="#" className="hover:text-red-400 transition-colors">Features</a>
            <a href="#" className="hover:text-red-400 transition-colors">Workouts</a>
            <a href="#" className="hover:text-red-400 transition-colors">Nutrition</a>
            <a href="#" className="hover:text-red-400 transition-colors">Sins</a>
          </>
        )}
      </div>

      <div className="space-x-3">
        {isAuthenticated ? (
          <button 
            onClick={handleLogout} 
            className="bg-sin-steel hover:bg-sin-red px-3 py-1 font-bold"
          >
            Retreat
          </button>
        ) : (
          <>
            <Link to='/register'>
              <button className="bg-red-700 text-white px-6 py-3 mb-2 rounded-xl transition-all hover:scale-105 shadow-lg">
                <LogsIcon className="inline w-4 h-4 mr-2" />
                Register
              </button>
            </Link>
            <Link to='/login'>
              <button className="bg-red-700 text-white px-6 py-3 mb-2 rounded-xl transition-all hover:scale-105 shadow-lg">
                <LogInIcon className="inline w-4 h-4 mr-2" />
                Login
              </button>
            </Link>
          </>
        )}
      </div>
      </nav>
  );
}