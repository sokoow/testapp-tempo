import React from "react";
import { Card } from "./ui/card";
import { ScrollArea } from "./ui/scroll-area";
import { History } from "lucide-react";

interface CheckIn {
  id: string;
  created_at: string;
  mood: string;
  journal_entry: string | null;
}

interface CheckInHistoryProps {
  checkIns?: CheckIn[];
}

const getMoodEmoji = (mood: string) => {
  const moods: Record<string, string> = {
    great: "😊",
    good: "🙂",
    okay: "😐",
    challenging: "😟",
  };
  return moods[mood] || "";
};

const CheckInHistory = ({
  checkIns = [
    {
      id: "1",
      created_at: new Date().toISOString(),
      mood: "great",
      journal_entry: "Feeling strong and motivated!",
    },
  ],
}: CheckInHistoryProps) => {
  return (
    <Card className="w-full bg-white shadow-sm hover:shadow-md transition-shadow">
      <div className="p-6">
        <div className="flex items-center gap-2 mb-6">
          <History className="h-6 w-6 text-purple-500" />
          <h2 className="text-2xl font-bold">Check-in History</h2>
        </div>

        <ScrollArea className="h-[300px] pr-4">
          <div className="space-y-4">
            {checkIns.map((checkIn) => (
              <div
                key={checkIn.id}
                className="border-l-4 border-purple-500 pl-4 py-2"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">
                      {getMoodEmoji(checkIn.mood)}
                    </span>
                    <span className="font-medium capitalize">
                      {checkIn.mood}
                    </span>
                  </div>
                  <time className="text-sm text-gray-500">
                    {new Date(checkIn.created_at).toLocaleDateString()}
                  </time>
                </div>
                {checkIn.journal_entry && (
                  <p className="text-gray-600 text-sm">
                    {checkIn.journal_entry}
                  </p>
                )}
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>
    </Card>
  );
};

export default CheckInHistory;
