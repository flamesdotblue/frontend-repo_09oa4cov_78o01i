import { Activity, Flame, Footprints, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

const StatCard = ({ icon: Icon, label, value, sub, color }) => (
  <motion.div
    initial={{ opacity: 0, y: 12 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3 }}
    className="bg-white rounded-xl p-4 shadow-sm border border-teal-50 flex items-center gap-4"
    aria-label={label}
    role="group"
  >
    <div className={`p-3 rounded-lg ${color} text-white`}>
      <Icon size={22} aria-hidden="true" />
    </div>
    <div className="flex-1">
      <div className="text-sm text-gray-500">{label}</div>
      <div className="text-xl font-semibold text-gray-900">{value}</div>
      {sub && <div className="text-xs text-gray-400 mt-0.5">{sub}</div>}
    </div>
  </motion.div>
);

const ProgressRing = ({ percent, color = "#008080", size = 72, stroke = 8, label }) => {
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percent / 100) * circumference;
  return (
    <svg width={size} height={size} role="img" aria-label={`${label} ${percent}%`}>
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        stroke="#e5e7eb"
        strokeWidth={stroke}
        fill="none"
      />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        stroke={color}
        strokeWidth={stroke}
        fill="none"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        strokeLinecap="round"
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
      />
    </svg>
  );
};

export default function HomeOverview() {
  return (
    <div className="p-4 space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Your Day</h1>
          <p className="text-sm text-gray-500">Stay consistent — you got this!</p>
        </div>
        <div className="h-10 w-10 rounded-full bg-teal-100 grid place-items-center" aria-hidden>
          <Activity className="text-teal-700" size={20} />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <div className="bg-white rounded-xl p-3 shadow-sm border border-teal-50 flex flex-col items-center">
          <ProgressRing percent={68} label="Calories" color="#FFB347" />
          <div className="mt-2 text-xs text-gray-500">Calories</div>
          <div className="text-sm font-semibold text-gray-900">1,360 / 2,000</div>
        </div>
        <div className="bg-white rounded-xl p-3 shadow-sm border border-teal-50 flex flex-col items-center">
          <ProgressRing percent={54} label="Steps" color="#008080" />
          <div className="mt-2 text-xs text-gray-500">Steps</div>
          <div className="text-sm font-semibold text-gray-900">5,420 / 10,000</div>
        </div>
        <div className="bg-white rounded-xl p-3 shadow-sm border border-teal-50 flex flex-col items-center">
          <ProgressRing percent={80} label="Workout" color="#16a34a" />
          <div className="mt-2 text-xs text-gray-500">Workout</div>
          <div className="text-sm font-semibold text-gray-900">Completed</div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3" role="list" aria-label="Daily stats">
        <StatCard
          icon={Flame}
          label="Active calories"
          value="540 kcal"
          sub="+8% vs yesterday"
          color="bg-orange-400"
        />
        <StatCard
          icon={Footprints}
          label="Steps"
          value="5,420"
          sub="3.9 km walked"
          color="bg-teal-600"
        />
        <StatCard
          icon={CheckCircle2}
          label="Streak"
          value="5 days"
          sub="Keep it going!"
          color="bg-green-600"
        />
      </div>
    </div>
  );
}
