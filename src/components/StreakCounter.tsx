import React, { useEffect, useState } from "react";
import { Card } from "./ui/card";
import { Progress } from "./ui/progress";
import { Trophy, Flame } from "lucide-react";
import { getCurrentStreak } from "@/lib/api";

interface StreakCounterProps {
  currentStreak?: number;
  bestStreak?: number;
  lastCheckIn?: string;
}

const StreakCounter = ({
  currentStreak = 7,
  bestStreak = 14,
  lastCheckIn = "2024-01-20",
}: StreakCounterProps) => {
  const [streak, setStreak] = useState({
    currentStreak,
    bestStreak,
    lastCheckIn,
  });

  useEffect(() => {
    async function fetchStreak() {
      try {
        const { data } = await getCurrentStreak();
        if (data) {
          const days = Math.floor(
            (new Date().getTime() - new Date(data.start_date).getTime()) /
              (1000 * 60 * 60 * 24),
          );
          setStreak((prev) => ({
            ...prev,
            currentStreak: days,
            lastCheckIn: new Date(data.created_at).toLocaleDateString(),
          }));
        }
      } catch (error) {
        console.error("Error fetching streak:", error);
      }
    }
    fetchStreak();
  }, []);

  const progress = (streak.currentStreak / streak.bestStreak) * 100;

  return (
    <Card className="w-full bg-white shadow-sm hover:shadow-md transition-shadow">
      <div className="p-6 flex flex-col justify-between h-full">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Flame className="h-6 w-6 text-orange-500" />
              <h2 className="text-2xl font-bold">Current Streak</h2>
            </div>
            <div className="flex items-center gap-2">
              <Trophy className="h-5 w-5 text-yellow-500" />
              <span className="text-sm text-gray-600">
                Best: {streak.bestStreak} days
              </span>
            </div>
          </div>

          <div className="text-center py-4">
            <div className="text-6xl font-bold text-primary mb-2">
              {streak.currentStreak}
            </div>
            <div className="text-xl text-gray-600">Days Strong</div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm text-gray-600">
              <span>Progress to best streak</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </div>

        <div className="text-center text-sm text-gray-500 mt-4">
          Last check-in: {streak.lastCheckIn}
        </div>
      </div>
    </Card>
  );
};

export default StreakCounter;
