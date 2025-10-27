import { useMemo, useState } from "react";
import { Dumbbell, Search, Filter, PlayCircle, Plus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const exercisesSeed = [
  { id: 1, name: "Push-Up", muscle: "Chest", level: "Beginner", video: "https://videos.pexels.com/video-files/5385571/5385571-hd_1920_1080_24fps.mp4" },
  { id: 2, name: "Squat", muscle: "Legs", level: "Beginner", video: "https://videos.pexels.com/video-files/3850038/3850038-hd_1920_1080_25fps.mp4" },
  { id: 3, name: "Deadlift", muscle: "Back", level: "Intermediate", video: "https://videos.pexels.com/video-files/3095826/3095826-uhd_3840_2160_24fps.mp4" },
  { id: 4, name: "Plank", muscle: "Core", level: "Beginner", video: "https://videos.pexels.com/video-files/3095825/3095825-uhd_3840_2160_24fps.mp4" },
  { id: 5, name: "Overhead Press", muscle: "Shoulders", level: "Intermediate", video: "https://videos.pexels.com/video-files/3196337/3196337-uhd_2560_1440_25fps.mp4" },
];

const levels = ["Any", "Beginner", "Intermediate", "Advanced"];
const groups = ["All", "Chest", "Back", "Legs", "Shoulders", "Arms", "Core"];

export default function ExercisesModule() {
  const [query, setQuery] = useState("");
  const [group, setGroup] = useState("All");
  const [level, setLevel] = useState("Any");
  const [log, setLog] = useState([]);

  const filtered = useMemo(() => {
    return exercisesSeed.filter((e) => {
      const matchQuery = e.name.toLowerCase().includes(query.toLowerCase());
      const matchGroup = group === "All" || e.muscle === group;
      const matchLevel = level === "Any" || e.level === level;
      return matchQuery && matchGroup && matchLevel;
    });
  }, [query, group, level]);

  const addToLog = (ex) => {
    const entry = {
      time: new Date().toLocaleTimeString(),
      name: ex.name,
      sets: 3,
      reps: 10,
    };
    setLog((l) => [entry, ...l]);
  };

  return (
    <div className="p-4 space-y-4">
      <div className="flex items-center gap-2">
        <div className="h-10 w-10 rounded-full bg-teal-100 grid place-items-center" aria-hidden>
          <Dumbbell className="text-teal-700" size={20} />
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-900">Exercises</h2>
          <p className="text-sm text-gray-500">Search, filter, and watch demos</p>
        </div>
      </div>

      <div className="flex gap-2">
        <div className="flex-1 relative">
          <Search size={16} className="absolute left-3 top-3 text-gray-400" aria-hidden />
          <input
            aria-label="Search exercises"
            className="w-full pl-9 pr-3 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-500"
            placeholder="Search exercises..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <button aria-label="Filter" className="px-3 py-2 rounded-xl bg-teal-600 text-white flex items-center gap-2">
          <Filter size={16} />
          <span className="text-sm">Filters</span>
        </button>
      </div>

      <div className="flex gap-2 overflow-x-auto no-scrollbar" aria-label="Muscle group filters">
        {groups.map((g) => (
          <button
            key={g}
            onClick={() => setGroup(g)}
            className={`px-3 py-1.5 rounded-full text-sm border ${
              group === g ? "bg-teal-600 text-white border-teal-600" : "bg-white text-gray-700 border-gray-200"
            }`}
          >
            {g}
          </button>
        ))}
      </div>

      <div className="flex gap-2 overflow-x-auto no-scrollbar" aria-label="Difficulty filters">
        {levels.map((lvl) => (
          <button
            key={lvl}
            onClick={() => setLevel(lvl)}
            className={`px-3 py-1.5 rounded-full text-sm border ${
              level === lvl ? "bg-orange-400 text-white border-orange-400" : "bg-white text-gray-700 border-gray-200"
            }`}
          >
            {lvl}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-3">
        {filtered.map((ex) => (
          <motion.div
            key={ex.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden"
          >
            <div className="aspect-video bg-black/5">
              <video className="w-full h-full object-cover" controls playsInline>
                <source src={ex.video} type="video/mp4" />
              </video>
            </div>
            <div className="p-3 flex items-center justify-between">
              <div>
                <div className="font-semibold text-gray-900">{ex.name}</div>
                <div className="text-xs text-gray-500">{ex.muscle} • {ex.level}</div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => addToLog(ex)}
                  className="px-3 py-1.5 rounded-lg bg-teal-600 text-white text-sm flex items-center gap-1"
                >
                  <Plus size={16} /> Log
                </button>
                <a
                  href={ex.video}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-1.5 rounded-lg bg-orange-400 text-white text-sm flex items-center gap-1"
                >
                  <PlayCircle size={16} /> Demo
                </a>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-4">
        <h3 className="text-sm font-semibold text-gray-700 mb-2">Workout Log</h3>
        <AnimatePresence>
          {log.length === 0 ? (
            <div className="text-sm text-gray-500">No entries yet. Add your first set!</div>
          ) : (
            <ul className="space-y-2">
              {log.map((entry, idx) => (
                <motion.li
                  key={idx}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="bg-white border border-gray-100 rounded-lg p-3 text-sm flex items-center justify-between"
                >
                  <div>
                    <div className="font-medium text-gray-900">{entry.name}</div>
                    <div className="text-gray-500 text-xs">{entry.sets} x {entry.reps} • {entry.time}</div>
                  </div>
                </motion.li>
              ))}
            </ul>
          )}
        </AnimatePresence>
      </div>

      <div className="mt-6 p-3 rounded-xl bg-gradient-to-r from-teal-600 to-orange-400 text-white">
        <div className="text-sm opacity-90">AI suggestion (GPT-5-NANO)</div>
        <div className="font-semibold">Full-body 25 min: Squats 3x12, Push-ups 3x10, Planks 3x30s, Walk 10 min.</div>
        <div className="text-xs opacity-90 mt-1">Personalized based on your level and goals.</div>
      </div>
    </div>
  );
}
