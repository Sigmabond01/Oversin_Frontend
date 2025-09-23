import { Link } from 'react-router-dom';
import { LogsIcon, LogInIcon } from "lucide-react";

export default function Navbar() {

  return (
    <nav className="flex flex-col md:flex-row items-center justify-between font-cinzel text-xl p-6 md:p-0 mr-6 space-y-4 md:space-y-0">
      <div className="flex items-center">
        <div className="w-30 h-30 relative mt-4">
          <Link>
            <img
              src="https://res.cloudinary.com/dcdqkzmfi/image/upload/v1758026741/oversin2_epheps.png"
              alt="Oversin Logo"
              className="object-contain ml-6 md:ml-24"
            />
          </Link>
        </div>
      </div>

      <div className="flex flex-col md:flex-row md:ml-64 space-y-2 md:space-y-0 md:space-x-8 text-white/90 text-center md:text-left">
            <Link to="/workouts" className="hover:text-red-400 transition-colors">Workouts</Link>
            <Link to="/sins" className="hover:text-red-400 transition-colors">Sins</Link>
            <Link to="/leaderboard" className="hover:text-red-400 transition-colors">Leaderboard</Link>
            <Link to="/calories" className="hover:text-red-400 transition-colors">Calories</Link>
      </div>

      <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
          <>
            <Link to='/register'>
              <button className="bg-red-700 text-white px-6 py-3 mb-2 rounded-xl transition-all hover:scale-105 shadow-lg w-full sm:w-auto">
                <LogsIcon className="inline w-4 h-4 mr-2" />
                Register
              </button>
            </Link>
            <Link to='/login'>
              <button className="bg-red-700 text-white px-6 py-3 mb-2 rounded-xl transition-all hover:scale-105 shadow-lg w-full sm:w-auto">
                <LogInIcon className="inline w-4 h-4 mr-2" />
                Login
              </button>
            </Link>
          </>
      </div>
      </nav>
  );
}