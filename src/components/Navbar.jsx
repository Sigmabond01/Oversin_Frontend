import { ChevronRight, Play, Star, Users, Download, LogIn, LogsIcon } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between font-sin tracking-[0.15em] text-xl p-6 md:p-0 mr-6">
      <div className="flex items-center">
        <div className="w-30 h-30 relative ml-6 mt-4">
          <img
            src="oversin2.png"
            alt="Oversin Logo"
            fill
            className="object-contain"
            priority
          />
        </div>
      </div>

      <div className="hidden md:flex items-center space-x-8 text-white/90">
        <a href="#" className="hover:text-red-400 transition-colors">Features</a>
        <a href="#" className="hover:text-red-400 transition-colors">Workouts</a>
        <a href="#" className="hover:text-red-400 transition-colors">Nutrition</a>
        <a href="#" className="hover:text-red-400 transition-colors">Sins</a>
      </div>

      <button className="bg-red-700 text-white px-6 py-3 mb-2 rounded-xl transition-all hover:scale-105 shadow-lg">
        <LogsIcon className="inline w-4 h-4 mr-2" />
        Register
      </button>
    </nav>
  );
}
