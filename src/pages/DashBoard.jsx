import { useEffect, useState } from "react";
import { useAuthStore } from "../store/authStore";
import api from "../api/api";
import { Link } from "react-router-dom";
import { ActivityIcon, ActivitySquare, AwardIcon, Clock11, EyeIcon, FlameIcon, FlameKindling, Icon, TargetIcon } from "lucide-react";
import { BiFoodMenu } from "react-icons/bi";


export default function Dashboard() {
  const {user, setUser} = useAuthStore();
  const [workouts, setWorkouts] = useState([]);
  const [sins, setSins] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [userRes, workoutRes, sinRes] = await Promise.all([
          api.get('/users/me'),
          api.get('/workouts'),
          api.get('/sins')
        ]);
        setUser(userRes.data);
        setWorkouts(workoutRes.data.slice(0, 5));
        setSins(sinRes.data.slice(0, 5));
      } catch (error) {
        console.error("Failed to fetch data", error);
      }
    };
    fetchData();
  }, [setUser]);

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

  //add loader comp later
  if(!user) {
    return <div className="text-center mt-10 text-6xl text-red-600">Loading your records...</div>
  };

  const getStreakMessage = (streak) => {
    if (streak === 0) return "You have no streak. Pathetic.";
    if (streak < 5) return "A decent start. Don't disappoint.";
    if (streak < 15) return "Impressive dedication. Keep going.";
    if (streak < 30) return "Exceptional discipline. You're becoming unstoppable.";
    return "Legendary status achieved. Bow to no temptation.";
  };

  const getSinMessage = (sinCount) => {
    if (sinCount === 0) return "Pure. For now.";
    if (sinCount < 5) return "Minor transgressions. Repent.";
    if (sinCount < 15) return "Your weakness shows. Do better.";
    if (sinCount < 50) return "A true degenerate emerges.";
    return "Beyond redemption. Embrace the darkness.";
  };

  return (
    <div className="bg-gradient-to-t from-red-950/100 to-black min-h-screen w-full absolute inset-0 overflow-auto">
      <div className="bg-gradient-to-t from-red-950/20 to-black border-b border-red-900/30 p-8">
        <div className="max-w-7xl mx-auto ml-auto">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-5xl text-white font-cinzel tracking-wide mb-2">
               <img src="./oversin.png" className="inline w-20 h-20" />
               Welcome, <span className="text-red-500">{user.username}</span>
              </h1>
              <p className="text-gray-400 text-lg flex items-center">
                <EyeIcon className="w-5 h-5 mr-2 text-red-500" />
                Your performance is being judged
              </p>
            </div>
            <div className="text-right">
              <div className="text-gray-400 text-sm">Last seen</div>
              <div className="text-white flex items-center">
                <Clock11 className="w-4 h-4 mr-2" />
                {new Date().toLocaleDateString()}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto font-cinzel p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">

          <div className="bg-gradient-to-t from-red-950/50 to-black border border-red-800/50 rounded-lg p-6 hover:border-red-600/70 transition-all duration-300 group">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-red-400 text-xl">Current Streak</h3>
              <FlameIcon className="w-6 h-6 text-red-500 group-hover:text-red-400 transition-colors" />
            </div>
            <p className="text-4xl font-bold text-white mb-2"> {user.streak} </p>
            <p className="text-red-300 text-sm leading-relaxed"> {getStreakMessage(user.streak)} </p>
          </div>

          <div className="bg-gradient-to-t from-red-950/50 to-black border border-red-800/50 rounded-lg p-6 hover:border-red-600/70 transition-all duration-300 group">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl text-red-400">Total Sins</h3>
              <TargetIcon className="w-6 h-6 text-red-500 group-hover:text-red-400 transition-colors" />
            </div>
            <p className="text-4xl font-bold text-white mb-2"> {user.sinCount} </p>
            <p className="text-red-300 text-sm leading-relaxed"> {getSinMessage(user.sinCount)} </p>
          </div>

          <div className="bg-gradient-to-t from-red-950/50 to-black border border-red-800/50 rounded-lg p-6 hover:border-red-600/70 transition-all duration-300 group">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl text-red-400">Net calories</h3>
              <ActivitySquare className="w-6 h-6 text-red-500 group-hover:text-red-400 transition-colors" />
            </div>
            <p className={`text-6xl font-bold mt-2 mb-2 ${user.netCalories >= 0 ? 'text-red-600' : 'text-red-600'}`}>{user.netCalories} </p>
            <p className="text-red-300 text-sm">Intake: {user.dailyIntake} | Burned: {user.dailyExpenditure}</p>
          </div>

          <div className="bg-gradient-to-t from-red-950/50 to-black border border-red-800/50 rounded-lg p-6 hover:border-red-600/70 transition-all duration-300 group">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl text-red-400">Discipline</h3>
              <AwardIcon className="w-6 h-6 text-red-500 grop-hover:text-red-400 transition-colors " />
            </div>
            <p className="text-4xl font-bold text-white mb-2">
              {user.streak > 0 ? Math.max(10 - user.sinCount, 1) * 10 : 0}%
            </p>
            <p className="text-red-300 text-sm">Your moral standing</p>
          </div>
        </div>

        <div className="grid grid-cols-1 font-cinzel md:grid-cols-3 gap-6 mb-8">
          <Link to="/log-workout" className="group bg-black/80 border-2 border-red-600 hover:border-red-500 rounded-lg p-8 text-center transition-all duration-300 transform hover:scale-105">
            <ActivityIcon className="w-12 h-12 text-red-500 mx-auto mb-4 group-hover:scale-110 transition-transform" />
            <h3 className="text-2xl text-white mb-2 tracking-wide">Log Workout</h3>
            <p className="text-red-200">Forge your body through suffering</p>
          </Link>

          <Link to="/calories" className="group bg-black/80 border-2 border-red-600 hover:border-red-500 rounded-lg p-8 text-center transition-all duration-300 transform hover:scale-105">
            <BiFoodMenu className="w-12 h-12 text-red-500 mx-auto mb-4 group-hover:scale-110 transition-transform" />
            <h3 className="text-2xl text-white mb-2 tracking-wide">Track Calories</h3>
            <p className="text-red-300">Know what you eat</p>
          </Link>

          <Link to="/log-sin" className="group bg-black/80 border-2 border-red-600 hover:border-red-500 rounded-lg p-8 text-center transition-all duration-300 transform hover:scale-105">
            <FlameKindling className="w-12 h-12 text-red-500 mx-auto mb-4 group-hover:scale-110 transition-transform" />
            <h3 className="text-2xl text-white mb-2 tracking-wide">Confess Sin</h3>
            <p className="text-red-300">Admit your weakness</p>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
          <div>
            <h2 className="font-display text-2xl text-white tracking-wide">Recent Workouts</h2>
            <ul className="mt-4 spcae-y-2">
              {workouts.length > 0 ? workouts.map(w => (
                <li key={w._id} className="p-3 bg-white/30 border border-red-600">
                  <span className="font-bold">{w.type}: </span> {w.description} ({w.duration} mins)
                </li>
              )): <p>No workouts logged. Get to it.</p>}
            </ul>
          </div>
          
          <div>
            <h2 className="font-display text-2xl text-white tracking-wide">Recent Sins</h2>
            <ul className="mt-4 spcae-y-2">
              {sins.length > 0 ? sins.map(s => (
                <li key={s._id} className="p-3 bg-white/30 border border-red-600">
                  <span className="font-bold">Severity {s.severity}: </span> {s.reason}
                </li>
              )): <p>No sins confessed. Are you a saint or a liar?</p>}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}