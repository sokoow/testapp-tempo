import React from "react";
import { Calendar } from "@/components/ui/calendar";
import { Progress } from "@/components/ui/progress";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface ProgressVisualizationProps {
  streakDays?: number;
  streakHistory?: Date[];
  currentProgress?: number;
}

const ProgressVisualization = ({
  streakDays = 7,
  streakHistory = [
    new Date(2024, 0, 1),
    new Date(2024, 0, 2),
    new Date(2024, 0, 3),
    new Date(2024, 0, 4),
    new Date(2024, 0, 5),
    new Date(2024, 0, 6),
    new Date(2024, 0, 7),
  ],
  currentProgress = 70,
}: ProgressVisualizationProps) => {
  return (
    <Card className="w-full max-w-[800px] p-6 bg-white">
      <Tabs defaultValue="calendar" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-4">
          <TabsTrigger value="calendar">Calendar View</TabsTrigger>
          <TabsTrigger value="progress">Progress Bar</TabsTrigger>
        </TabsList>

        <TabsContent value="calendar" className="mt-4">
          <div className="flex flex-col items-center">
            <h3 className="text-lg font-semibold mb-4">Streak Calendar</h3>
            <Calendar
              mode="multiple"
              selected={streakHistory}
              className="rounded-md border"
            />
          </div>
        </TabsContent>

        <TabsContent value="progress" className="mt-4">
          <div className="flex flex-col items-center space-y-4">
            <h3 className="text-lg font-semibold">Current Progress</h3>
            <div className="w-full max-w-md">
              <Progress value={currentProgress} className="h-4" />
            </div>
            <p className="text-sm text-gray-600">
              {streakDays} days of success - Keep going!
            </p>
          </div>
        </TabsContent>
      </Tabs>
    </Card>
  );
};

export default ProgressVisualization;
