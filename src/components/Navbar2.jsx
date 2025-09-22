import { Link, useNavigate} from 'react-router-dom';
import { LogsIcon, LogInIcon } from "lucide-react";
import { useAuthStore } from '../store/authStore';

export default function Navbar2() {
    const { logout } = useAuthStore();
    const navigate = useNavigate();

    const handleLogout = () => {
    logout();
    navigate('/login');
  };


  return (
    <nav className="flex items-center justify-between font-cinzel text-xl p-6 md:p-0 mr-6">
      <div className="flex items-center">
        <div className="w-20 h-20 ml-7 relative mt-2">
          <Link>
            <img
              src="https://res.cloudinary.com/dcdqkzmfi/image/upload/v1758026741/oversin2_epheps.png"
              alt="Oversin Logo"
              className="object-contain ml-2"
            />
          </Link>
        </div>
      </div>

      <div className="hidden md:flex ml-28 space-x-8 text-white/90">
            <Link to="/workouts" className="hover:text-red-400 transition-colors">Workouts</Link>
            <Link to="/sins" className="hover:text-red-400 transition-colors">Sins</Link>
            <Link to="/leaderboard" className="hover:text-red-400 transition-colors">Leaderboard</Link>
      </div>

      <div className="space-x-3">
          <>
            <Link to='/login'>
              <button onClick={handleLogout} className="bg-red-700 text-white px-6 py-3 mb-2 rounded-xl transition-all hover:scale-105 shadow-lg">
                <LogInIcon className="inline w-4 h-4 mr-2" />
                Log Out
              </button>
            </Link>
          </>
      </div>
      </nav>
  );
}