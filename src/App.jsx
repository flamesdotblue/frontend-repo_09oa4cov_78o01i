import { useState } from "react";
import HomeOverview from "./components/HomeOverview";
import ExercisesModule from "./components/ExercisesModule";
import NutritionModule from "./components/NutritionModule";
import AICoachAndProfile from "./components/AICoachAndProfile";
import { Home, Dumbbell, Utensils, Bot, User } from "lucide-react";

const TABS = [
  { key: "home", label: "Home", icon: Home, color: "text-teal-700" },
  { key: "exercises", label: "Exercises", icon: Dumbbell, color: "text-teal-700" },
  { key: "nutrition", label: "Nutrition", icon: Utensils, color: "text-orange-500" },
  { key: "coach", label: "AI Coach", icon: Bot, color: "text-teal-700" },
  { key: "profile", label: "Profile", icon: User, color: "text-teal-700" },
];

export default function App() {
  const [tab, setTab] = useState("home");

  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-50 to-orange-50 text-gray-900 font-sans">
      <main className="max-w-md mx-auto pb-20">
        {tab === "home" && <HomeOverview />}
        {tab === "exercises" && <ExercisesModule />}
        {tab === "nutrition" && <NutritionModule />}
        {tab === "coach" && <AICoachAndProfile view="coach" />}
        {tab === "profile" && <AICoachAndProfile view="profile" />}
      </main>

      <nav
        className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white/90 backdrop-blur border-t border-gray-100"
        role="tablist"
        aria-label="Main navigation"
      >
        <div className="grid grid-cols-5">
          {TABS.map((t) => (
            <button
              key={t.key}
              role="tab"
              aria-selected={tab === t.key}
              onClick={() => setTab(t.key)}
              className={`flex flex-col items-center justify-center py-2.5 gap-1 ${
                tab === t.key ? "text-teal-700" : "text-gray-500"
              }`}
            >
              <t.icon className={`${t.color}`} size={20} aria-hidden />
              <span className="text-[11px] font-medium">{t.label}</span>
              {tab === t.key && <span className="h-1 w-6 rounded-full bg-teal-600" aria-hidden />}
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
}
