import React, { useState } from "react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";

interface DailyCheckInProps {
  onCheckIn?: (mood: string, journal: string) => void;
  isCompleted?: boolean;
}

const DailyCheckIn = ({
  onCheckIn = () => {},
  isCompleted = false,
}: DailyCheckInProps) => {
  const [mood, setMood] = useState("great");
  const [journal, setJournal] = useState("");

  const handleSubmit = () => {
    onCheckIn(mood, journal);
  };

  return (
    <Card className="w-[500px] p-6 bg-white">
      <h2 className="text-2xl font-bold mb-4">Daily Check-in</h2>

      {isCompleted ? (
        <div className="text-center py-8">
          <p className="text-green-600 text-lg">
            ✓ You've completed your check-in for today!
          </p>
        </div>
      ) : (
        <Dialog defaultOpen>
          <DialogTrigger asChild>
            <Button className="w-full mb-4" size="lg">
              Complete Daily Check-in
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>How are you feeling today?</DialogTitle>
            </DialogHeader>

            <div className="space-y-6">
              <div className="space-y-4">
                <Label>Your Mood</Label>
                <RadioGroup
                  defaultValue={mood}
                  onValueChange={setMood}
                  className="flex space-x-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="great" id="great" />
                    <Label htmlFor="great">Great 😊</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="good" id="good" />
                    <Label htmlFor="good">Good 🙂</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="okay" id="okay" />
                    <Label htmlFor="okay">Okay 😐</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="challenging" id="challenging" />
                    <Label htmlFor="challenging">Challenging 😟</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-4">
                <Label>Journal Entry (Optional)</Label>
                <Textarea
                  placeholder="Share your thoughts, challenges, or victories today..."
                  value={journal}
                  onChange={(e) => setJournal(e.target.value)}
                  className="min-h-[150px]"
                />
              </div>

              <Button onClick={handleSubmit} className="w-full" size="lg">
                Submit Check-in
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </Card>
  );
};

export default DailyCheckIn;
