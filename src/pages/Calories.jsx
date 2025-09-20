import { useEffect, useState } from "react";
import api from "../api/api";

export default function Calories() {
    const [entries, setEntries] = useState([]);
    const [summary, setSummary] = useState({ intake: 0, expenditure: 0, net: 0});
    const [formData, setFormData] = useState({ type: 'intake', description: '', calories: '' });
    const [error, setError] = useState('');

    const fetchEntries = async () => {
        try {
            const res = await api.get('/calories');
            setEntries(res.data);

            let intake = 0, expenditure = 0;
            res.data.forEach(entry => {
                if(entry.type === 'intake') intake += entry.calories;
                else expenditure += entry.calories;
            });
            setSummary({ intake, expenditure, net: intake - expenditure});
        } catch (err) {
            console.error("Failed to fetch calories data", err);
        }
    };

    useEffect(() => {
        fetchEntries();
    }, []);

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData({ ...formData, [name]: value});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        
        if (!formData.description || !formData.calories || formData.calories <= 0) {
            setError("Fill out the form");
            return;
        }
        try {
            await api.post('/calories', {...formData, calories: Number(formData.calories) });
            setFormData({ type: 'intake', description: '', calories: '' });
            fetchEntries();
        } catch (err) {
            setError(err.response?.data?.message || 'Logging failed');
        }
     };

     const handleDelete = async (id) => {
        try {
            setEntries(prev => prev.filter(entry => entry._id !== id));
            await api.delete(`/calories/${id}`);
            fetchEntries();
        } catch (err) {
            console.error("Failed to delete entry", err);
            fetchEntries();
        }
    };

    return (
<div className="bg-gradient-to-t from-red-950/100 to-black absolute inset-0 min-h-screen overflow-auto py-12 px-4">
    <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
            <h1 className="text-5xl font-cinzel text-red-400 tracking-wide mb-2">
                Count your calories
            </h1>
            <p className="text-gray-400 text-lg">
                Every bite. Every burn. Track it all.
            </p>
        </div>
        
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-gradient-to-br from-gray-900 to-black border border-red-800/50 rounded-xl p-6 shadow-2xl shadow-red-900/20 hover:border-red-700/70 transition-all duration-300">
                <h3 className="text-xl text-red-400 font-cinzel mb-2">Intake</h3>
                <p className="text-4xl font-bold text-white font-cinzel">{summary.intake}</p>
                <p className="text-gray-400 text-sm mt-1">calories consumed</p>
            </div>

            <div className="bg-gradient-to-br from-gray-900 to-black border border-red-800/50 rounded-xl p-6 shadow-2xl shadow-red-900/20 hover:border-red-700/70 transition-all duration-300">
                <h3 className="text-xl text-red-400 font-cinzel mb-2">Expenditure</h3>
                <p className="text-4xl font-bold text-white font-cinzel">{summary.expenditure}</p>
                <p className="text-gray-400 text-sm mt-1">calories burned</p>
            </div>

            <div className="bg-gradient-to-br from-gray-900 to-black border border-red-800/50 rounded-xl p-6 shadow-2xl shadow-red-900/20 hover:border-red-700/70 transition-all duration-300">
                <h3 className="text-xl text-red-400 font-cinzel mb-2">Net</h3>
                <p className={`text-4xl font-bold font-cinzel ${summary.net >= 0 ? 'text-white' : 'text-white'}`}>{summary.net}</p>
                <p className="text-gray-400 text-sm mt-1">net balance</p>
            </div>
        </div>

        {/* Form */}
        <div className="bg-gradient-to-br from-gray-900 to-black border border-red-800/50 rounded-xl p-8 shadow-2xl shadow-red-900/20 mb-8">
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="flex flex-col md:flex-row gap-4 items-end">
                    <div className="flex flex-col w-full md:w-auto">
                        <label className="block text-red-400 font-cinzel text-lg mb-2">Type</label>
                        <select 
                            name="type" 
                            value={formData.type} 
                            onChange={handleChange} 
                            className="p-3 bg-black border border-red-600/50 focus:border-red-500 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-800/30 transition-all"
                        >
                            <option value="intake">Intake</option>
                            <option value="expenditure">Expenditure</option>
                        </select>
                    </div>

                    <div className="flex flex-col flex-grow w-full">
                        <label className="block text-red-400 font-cinzel text-lg mb-2">Description</label>
                        <input 
                            type="text" 
                            name="description" 
                            value={formData.description} 
                            onChange={handleChange} 
                            placeholder="Description (e.g., 'Chicken Breast')" 
                            className="p-3 bg-black border border-red-600/50 focus:border-red-500 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-800/30 transition-all" 
                        />
                    </div>

                    <div className="flex flex-col w-full md:w-32">
                        <label className="block text-red-400 font-cinzel text-lg mb-2">Calories</label>
                        <input 
                            type="number" 
                            name="calories" 
                            value={formData.calories} 
                            onChange={handleChange} 
                            placeholder="Calories" 
                            className="p-3 bg-black border border-red-600/50 focus:border-red-500 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-800/30 transition-all" 
                        />
                    </div>

                    <button 
                        type="submit" 
                        className="w-full md:w-auto py-3 px-6 bg-gradient-to-r from-red-900 to-red-700 hover:from-red-800 hover:to-red-600 border-2 border-red-500 hover:border-red-400 text-white font-cinzel tracking-wider transition-all duration-300 rounded-lg transform hover:scale-105"
                    >
                        Log
                    </button>
                </div>

                {error && (
                    <div className="p-4 bg-red-950/30 border border-red-800 rounded-lg">
                        <p className="text-red-400 text-center font-bold">{error}</p>
                    </div>
                )}
            </form>
        </div>

        {/* Entries List */}
        <div className="bg-gradient-to-br from-gray-900 to-black border border-red-800/50 rounded-xl shadow-2xl shadow-red-900/20 overflow-hidden">
            <div className="p-6 border-b border-red-800/30">
                <h2 className="text-2xl font-cinzel text-red-400">Today's Ledger</h2>
                <p className="text-gray-400 text-sm mt-1">Record of consumption and expenditure</p>
            </div>

            <div className="max-h-96 overflow-y-auto">
                {entries.length > 0 ? (
                    <ul className="space-y-0">
                        {entries.map(entry => (
                            <li key={entry._id} className="flex justify-between items-center p-4 border-b border-red-900/20 hover:bg-red-950/20 transition-all duration-200 group">
                                <div>
                                    <span className={`font-bold font-cinzel ${entry.type === 'intake' ? 'text-green-400' : 'text-red-600'}`}>
                                        {entry.calories} kcal
                                    </span>
                                    <span className="text-gray-300"> - {entry.description}</span>
                                </div>
                                <button 
                                    onClick={() => handleDelete(entry._id)} 
                                    className="opacity-0 group-hover:opacity-100 text-red-400 hover:text-red-300 hover:bg-red-950/30 p-2 rounded-lg transition-all duration-200 font-bold text-xl"
                                >
                                    &times;
                                </button>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <div className="p-8 text-center">
                        <p className="text-gray-400 font-cinzel">The ledger is empty. Stop slacking.</p>
                    </div>
                )}
            </div>
        </div>
    </div>
</div>
    );
}