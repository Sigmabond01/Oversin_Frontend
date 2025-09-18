import { useEffect, useState } from "react";
import api from "../api/api";

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

    if(loading) return <div className="text-center mt-10">Showing Ranks...</div>

    return (
        <div className="bg-red-950/100 min-h-screen overflow-auto absolute inset-0">
            <div className="mt-8">
            <h1 className="text-4xl font-display text-red-600 tracking-wide text-center">THE PROVING GROUNDS</h1>
            <p className="text-gray-300 text-center">add osmething here</p>
            <div className="mt-6 overflow-x-auto">
                <table className="w-full max-w-4xl mx-auto border-2 border-red-500 bg-white/20">
                    <thead>
                        <tr className="border-b-2 border-red-900">
                            <th className="p-4 text-left font-display text-xl">Rank</th>
                            <th className="p-4 text-left font-display text-xl">Username</th>
                            <th className="p-4 text-left font-display text-xl">Streak</th>
                            <th className="p-4 text-left font-display text-xl">Sins</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, index) => (
                            <tr key={user._id} className="border-b border-red-900 last:border-b-0 hover:bg-black">
                                <td className="font-bold text-2xl p-4">{index + 1}</td>
                                <td className="p-4 text-xl">{user.username}</td>
                                <td className="p-4 text-center text-2xl text-green-500 font-bold">{user.streak}</td>
                                <td className="p-4 text-center text-2xl text-red-500 font-bold">{user.sinCount}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            </div>
        </div>
    );
}