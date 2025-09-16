import React, { useId } from "react";
import { Flame, Dumbbell, Users, Target, Trophy, Zap, Sword, Heart } from "lucide-react";

export default function Features() {
  return (
    <section className="py-0 min-h-screen bg-black text-gray-300 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
    <div className="p-8">
              <div className="text-center mb-6">
                <div className="w-40 h-20 flex items-center justify-center mx-auto mb-6">
                  <img src="https://res.cloudinary.com/dcdqkzmfi/image/upload/v1758026741/oversin2_epheps.png" />
                </div>
                <p className="text-gray-300">
                  Discipline over motivation. Progress over perfection. 
                  Warriors over victims.
                </p>
              </div>
            </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 md:gap-6">
          {oversinFeatures.map((feature) => (
            <div
              key={feature.title}
              className="relative p-6 rounded-3xl border border-white/10 shadow-lg hover:shadow-red-600/20 transition"
            >
              <Grid size={20} pattern={feature.pattern} />
              <div className="relative z-20">
                <feature.icon className="w-8 h-8 text-red-500 mb-4" />
                <h3 className="text-lg text-gray-300">{feature.title}</h3>
                <p className="text-neutral-400 mt-3 text-sm">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const oversinFeatures = [
  {
    title: "Demon Mode Workouts",
    description: "Unlock high-intensity sessions inspired by the Seven Deadly Sins, tailored to push your limits.",
    icon: Flame,
    pattern: [[8, 2], [9, 3], [10, 4]],
  },
  {
    title: "Power Tracking",
    description: "Track strength, endurance, and stamina as your stats level up like an RPG character.",
    icon: Dumbbell,
    pattern: [[6, 3], [7, 2], [8, 5]],
  },
  {
    title: "Guild Training",
    description: "Form squads with friends, train together, and challenge rival guilds for glory.",
    icon: Users,
    pattern: [[5, 4], [7, 1], [9, 3]],
  },
  {
    title: "Quest System",
    description: "Daily missions and long-term quests keep you motivated, rewarding consistency with XP and achievements.",
    icon: Target,
    pattern: [[6, 2], [8, 4], [10, 5]],
  },
  {
    title: "Arena Battles",
    description: "Compete head-to-head in fitness challenges and rise through the ranks of the Oversin leaderboard.",
    icon: Trophy,
    pattern: [[7, 2], [9, 5], [11, 3]],
  },
  {
    title: "Energy Boosts",
    description: "Get anime-inspired motivational boosts when your streak is about to break.",
    icon: Zap,
    pattern: [[5, 3], [8, 2], [10, 4]],
  },
  {
    title: "Weaponized Workouts",
    description: "Every exercise is themed as a weapon skill — master your moves and forge your combat strength.",
    icon: Sword,
    pattern: [[6, 5], [7, 2], [9, 4]],
  },
  {
    title: "Soul Sync",
    description: "Track heart rate and mental focus to sync mind and body like a true warrior monk.",
    icon: Heart,
    pattern: [[5, 2], [8, 3], [10, 5]],
  },
];

export const Grid = ({ pattern, size }) => {
  return (
    <div className="pointer-events-none absolute left-1/2 top-0 -ml-20 -mt-2 h-full w-full">
      <div className="absolute inset-0 bg-red-500/10 [mask-image:radial-gradient(farthest-side_at_top,white,transparent)] opacity-100">
        <GridPattern
          width={size ?? 20}
          height={size ?? 20}
          x="-12"
          y="4"
          squares={pattern}
          className="absolute inset-0 h-full w-full mix-blend-overlay fill-red-500/10 stroke-red-500/20"
        />
      </div>
    </div>
  );
};

export function GridPattern({ width, height, x, y, squares, ...props }) {
  const patternId = useId();

  return (
    <svg aria-hidden="true" {...props}>
      <defs>
        <pattern
          id={patternId}
          width={width}
          height={height}
          patternUnits="userSpaceOnUse"
          x={x}
          y={y}
        >
          <path d={`M.5 ${height}V.5H${width}`} fill="none" />
        </pattern>
      </defs>
      <rect
        width="100%"
        height="100%"
        strokeWidth={0}
        fill={`url(#${patternId})`}
      />
      {squares && (
        <svg x={x} y={y} className="overflow-visible">
          {squares.map(([x, y]) => (
            <rect
              key={`${x}-${y}`}
              width={width + 1}
              height={height + 1}
              x={x * width}
              y={y * height}
              className="fill-red-500/20"
            />
          ))}
        </svg>
      )}
    </svg>
  );
}
