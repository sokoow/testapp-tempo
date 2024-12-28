import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import StreakCounter from "./StreakCounter";
import DailyCheckIn from "./DailyCheckIn";
import ProgressVisualization from "./ProgressVisualization";
import QuoteWidget from "./QuoteWidget";
import EmergencySupport from "./EmergencySupport";
import GoalTracker from "./GoalTracker";
import CheckInHistory from "./CheckInHistory";
import { Button } from "./ui/button";
import { LogOut } from "lucide-react";
import { signOut } from "@/lib/auth";
import { getCheckIns, getGoals, getCurrentStreak } from "@/lib/api";

interface HomeProps {
  currentStreak?: number;
  bestStreak?: number;
  lastCheckIn?: string;
  isCheckInCompleted?: boolean;
  streakHistory?: Date[];
  quote?: string;
  quoteAuthor?: string;
}

const Home = ({
  currentStreak: initialStreak = 7,
  bestStreak = 14,
  lastCheckIn = "2024-01-20",
  isCheckInCompleted = false,
  streakHistory = [
    new Date(2024, 0, 1),
    new Date(2024, 0, 2),
    new Date(2024, 0, 3),
    new Date(2024, 0, 4),
    new Date(2024, 0, 5),
    new Date(2024, 0, 6),
    new Date(2024, 0, 7),
  ],
  quote = "Success is not final, failure is not fatal: it is the courage to continue that counts.",
  quoteAuthor = "Winston Churchill",
}: HomeProps) => {
  const navigate = useNavigate();
  const [checkIns, setCheckIns] = useState([]);
  const [goals, setGoals] = useState([]);
  const [currentStreak, setCurrentStreak] = useState(initialStreak);

  const fetchData = async () => {
    try {
      const { data: streak } = await getCurrentStreak();
      if (streak) {
        const { data: checkInsData } = await getCheckIns(streak.id);
        const { data: goalsData } = await getGoals();
        setCheckIns(checkInsData || []);
        setGoals(goalsData || []);

        // Calculate current streak
        const days = Math.floor(
          (new Date().getTime() - new Date(streak.start_date).getTime()) /
            (1000 * 60 * 60 * 24),
        );
        setCurrentStreak(days);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleLogout = async () => {
    await signOut();
    navigate("/auth");
  };

  const handleGoalAdded = () => {
    fetchData(); // Refresh data when a new goal is added
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <header className="bg-white border-b border-gray-200 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">NoFap Dashboard</h1>
          <Button
            variant="ghost"
            onClick={handleLogout}
            className="flex items-center gap-2"
          >
            <LogOut className="h-5 w-5" />
            Logout
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column - Primary Stats */}
          <div className="lg:col-span-4 space-y-8">
            <StreakCounter
              currentStreak={currentStreak}
              bestStreak={bestStreak}
              lastCheckIn={lastCheckIn}
            />
            <GoalTracker
              currentStreak={currentStreak}
              goals={goals}
              onGoalAdded={handleGoalAdded}
            />
            <QuoteWidget quote={quote} author={quoteAuthor} />
            <div className="flex justify-center">
              <EmergencySupport />
            </div>
          </div>

          {/* Right Column - Interactive Content */}
          <div className="lg:col-span-8 space-y-8">
            <DailyCheckIn isCompleted={isCheckInCompleted} />
            <ProgressVisualization
              streakDays={currentStreak}
              streakHistory={streakHistory}
              currentProgress={(currentStreak / bestStreak) * 100}
            />
            <CheckInHistory checkIns={checkIns} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
