import React from "react";
import { Card } from "./ui/card";
import { Progress } from "./ui/progress";
import { Trophy, Flame } from "lucide-react";

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
  const progress = (currentStreak / bestStreak) * 100;

  return (
    <Card className="w-[400px] h-[300px] p-6 bg-white flex flex-col justify-between">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Flame className="h-6 w-6 text-orange-500" />
            <h2 className="text-2xl font-bold">Current Streak</h2>
          </div>
          <div className="flex items-center gap-2">
            <Trophy className="h-5 w-5 text-yellow-500" />
            <span className="text-sm text-gray-600">
              Best: {bestStreak} days
            </span>
          </div>
        </div>

        <div className="text-center">
          <div className="text-6xl font-bold text-primary mb-2">
            {currentStreak}
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

      <div className="text-center text-sm text-gray-500">
        Last check-in: {lastCheckIn}
      </div>
    </Card>
  );
};

export default StreakCounter;
