import { useEffect } from "react";
import { useAuthStore } from "../store/authStore";
import api from "../api/api";
import { Link } from "react-router-dom";


export default function Dashboard() {
  const {user, setUser} = useAuthStore();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get('/users/me');
        setUser(res.data);
      } catch (error) {
        console.error("Failed to fetch user Data!", error);
      }
    };
    fetchUser();
  }, [setUser]);

  if(!user) {
    return <div className="text-center mt-10 text-6xl text-red-600">Loading your records...</div>
  }

  return (
    <div className="bg-black min-h-screen w-full absolute inset-0">
      <div className="mt-8">
        <h1 className="text-4xl text-white tracking-wide"> Welcome, {user.username} </h1>
        <p className="text-gray-300 mt-1">Your performance is being judged</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          <div className="p-6 bg-gray-300 border-2 border-red-700">
            <h3 className="font-display text-2xl text-red-600">Current Streak</h3>
            <p className="text-6xl font-bold mt-2"> {user.streak} </p>
            <p className="text-red-600"> {user.streak > 0 ? "Impressive. Don't break it." : "You have no streak. Pathetic."} </p>
          </div>
          <div className="p-6 bg-gray-400 border-2 border-red-600">
            <h3 className="font-display text-2xl text-red-600">Total Sins</h3>
            <p className="text-6xl font-bold mt-2">{user.sinCount}</p>
            <p className="text-red-600"> {user.sinCount > 10 ?  "A true degenerate." : "Keep your weakness in check."} </p>
          </div>
        </div>
        {/* Links to log workouts and stuff  */}
        <div className="flex justify-center gap-6 mt-10">
          <Link to="/log-workout" className="w-1/2 py-4 text-center bg-red-950/100 hover:bg-red-800 text-white font-display tracking-wide text-2xl transition-transform hover:scale-105">
            Log Workout
          </Link>
          <Link to="/log-sin" className="w-1/2 py-4 text-center bg-black border-2 border-red-600 hover:bg-red-950/100 text-white font-display tracking-wider text-2xl shadow-brutal transition-transform hover:scale-105">
          CONFESS SIN
          </Link>
        </div>
      </div>
    </div>
  );
}