import React from "react";
import StreakCounter from "./StreakCounter";
import DailyCheckIn from "./DailyCheckIn";
import ProgressVisualization from "./ProgressVisualization";
import QuoteWidget from "./QuoteWidget";
import EmergencySupport from "./EmergencySupport";

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
  currentStreak = 7,
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
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex flex-col md:flex-row justify-between items-start gap-8">
          <div className="w-full md:w-auto">
            <StreakCounter
              currentStreak={currentStreak}
              bestStreak={bestStreak}
              lastCheckIn={lastCheckIn}
            />
          </div>
          <div className="w-full md:w-auto">
            <DailyCheckIn isCompleted={isCheckInCompleted} />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="w-full">
            <ProgressVisualization
              streakDays={currentStreak}
              streakHistory={streakHistory}
              currentProgress={(currentStreak / bestStreak) * 100}
            />
          </div>
          <div className="space-y-8">
            <QuoteWidget quote={quote} author={quoteAuthor} />
            <div className="flex justify-center">
              <EmergencySupport />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
