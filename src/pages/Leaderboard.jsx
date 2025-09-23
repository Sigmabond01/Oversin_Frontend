import { useEffect, useState } from "react";
import api from "../api/api";
import { AwardIcon, Crown, Flame, TargetIcon, Trophy, TrophyIcon } from "lucide-react";

export default function Leaderboard() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchLeaderboard = async () => {
            try {
                const res = await api.get('/leaderboard');
                setUsers(res.data);
            } catch (error) {
                console.error("The leaderboard is for warriors. You are not worthy.", error);
            } finally {
                setLoading(false);
            }
        };
        fetchLeaderboard();
    }, []);

    const getRankicon = (rank) => {
        if(rank === 1) return <Crown className="w-6 h-6 text-yellow-500" />;
        if(rank === 2) return <TrophyIcon className="w-6 h-6 text-gray-400" />;
        if(rank === 3) return <AwardIcon className="w-6 h-6 text-amber-900" />;
        return null;
    };

    const getRankBadge = (rank) => {
        if (rank === 1) return "bg-gradient-to-r from-yellow-600 to-yellow-400 text-black";
        if (rank === 2) return "bg-gradient-to-r from-gray-400 to-gray-200 text-black";
        if (rank === 3) return "bg-gradient-to-r from-yellow-700 to-yellow-500 text-black";
    }

    if(loading) return <div className="text-center bg-gradient-to-t from-red-950/100 to-black min-h-screen overflow-auto absolute inset-0 text-7xl font-cinzel text-red-500">Showing Ranks...</div>

    return (
        <div className="bg-gradient-to-t from-red-950/100 to-black min-h-screen overflow-auto absolute inset-0 py-12 px-4">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-12">
                    <div className="flex justify-center mb-6">
                        <div className="p-4 bg-red-950/30 rounded-full border border-red-800">
                            <Trophy className="w-12 h-12 text-red-400" />
                        </div>
                    </div>
                    <h1 className="text-5xl text-red-600 font-cinzel mb-4 tracking-wide">Leaderboard</h1>
                    <p className="text-gray-400 text-lg flex items-center justify-center">
                        <TargetIcon className="w-5 h-5 mr-2 text-red-500" />
                        See where you rank
                    </p>
                    <div className="w-84 h-1 bg-gradient-to-r from-transparent via-red-600 to-transparent mx-auto mt-4"></div>
                </div>

                <div className="bg-gradient-to-br from-gray-900 to-black border border-red-800/50 rounded-xl shadow-2xl shadow-red-900/20 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="bg-gradient-to-r from-red-950/50 to-red-900/50 border-b-2 border-red-800/50">
                                    <th className="p-6 text-left font-cinzel text-xl text-red-400 tracking-wide">Rank</th>
                                    <th className="p-6 text-center font-cinzel text-xl text-red-400 tracking-wide">Username</th>
                                    <th className="p-6 text-center font-cinzel text-xl text-red-400 tracking-wide">Streak</th>
                                    <th className="p-6 text-center font-cinzel text-xl text-red-400 tracking-wide">Sins</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((user, index) => (
                                    <tr key={user._id} className="border-b border-red-900/30 last:border-b-0 hover:bg-red-950/20 transition-all duration-300 group">
                                        <td className="p-6">
                                            <div className="flex items-center space-x-3">
                                                <div className={`w-12 h-12 rounded-full ${getRankBadge(index + 1)} flex items-center justify-center font-bold text-lg font-cinzel shadow-lg`}>
                                                    {index + 1}
                                                </div>
                                                {getRankicon(index + 1)}
                                            </div>
                                        </td>

                                        <td className="p-6">
                                            <div className="flex flex-col">
                                                <span className="text-xl font-cinzel text-white font-bold">
                                                    {user.username}
                                                </span>
                                                {index === 0 && (
                                                    <span className="text-yellow-500 text-sm font-cinzel tracking-wider">Champion</span>
                                                )}
                                                {index === 1 && (
                                                    <span className="text-gray-400 text-sm font-cinzel tracking-wider">Runner-up</span>
                                                )}
                                                {index === 2 && (
                                                    <span className="text-amber-900 text-sm font-cinzel tracking-wider">Bronze</span>
                                                )}
                                            </div>
                                        </td>

                                        <td className="p-6 text-center">
                                            <div className="flex flex-col items-center">
                                                <span className="text-2xl text-white font-cinzel font-bold">
                                                    {user.streak}
                                                </span>
                                                <span className="text-gray-400 text-sm">days</span>
                                            </div>
                                        </td>

                                        <td className="p-6 text-center">
                                            <div className="flex flex-col items-center">
                                                <span className="text-2xl text-white font-cinzel font-bold">
                                                    {user.sinCount}
                                                </span>
                                                <span className="text-gray-400 text-sm">falls</span>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {users.length === 0 && (
                        <div className="p-12 text-center">
                            <div className="text-red-400 opacity-50 mb-4">
                                <Trophy className="w-16 h-16 mx-auto" />
                            </div>
                            <p className="text-gray-400 font-cinzel text-lg">No users have entered the leaderboards</p>
                            <p className="text-red-500 text-sm mt-2">Be the first to claim glory</p>
                        </div>
                    )}
                </div>

                <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">

                    <div className="bg-gradient-to-br from-gray-900/50 to-black border border-red-900/30 rounded-lg p-4 text-center">
                        <Crown className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
                        <div className="text-red-400 text-sm font-cinzel">Top Performer</div>
                        <div className="text-white text-lg font-bold">
                            {users.length > 0 ? users[0]?.username || "none" : "none"}
                        </div>
                    </div>

                    <div className="bg-gradient-to-br from-gray-900/50 to-black border border-red-900/30 rounded-lg p-4 text-center">
                        <Flame className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
                        <div className="text-red-400 text-sm font-cinzel">Longest Streak</div>
                        <div className="text-white text-lg font-bold">
                            {users.length > 0 ? Math.max(...users.map(u => u.streak)) : 0} days
                        </div>
                    </div>

                    <div className="bg-gradient-to-br from-gray-900/50 to-black border border-red-900/30 rounded-lg p-4 text-center">
                        <Crown className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
                        <div className="text-red-400 text-sm font-cinzel">Total Users</div>
                        <div className="text-white text-lg font-bold">
                            {users.length}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}