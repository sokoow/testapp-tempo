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
import { createCheckIn, getCurrentStreak } from "@/lib/api";
import { useToast } from "./ui/use-toast";

interface DailyCheckInProps {
  onCheckIn?: (mood: string, journal: string) => void;
  isCompleted?: boolean;
}

const DailyCheckIn = ({
  onCheckIn = () => {},
  isCompleted: initialIsCompleted = false,
}: DailyCheckInProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [mood, setMood] = useState("great");
  const [journal, setJournal] = useState("");
  const [loading, setLoading] = useState(false);
  const [isCompleted, setIsCompleted] = useState(initialIsCompleted);
  const { toast } = useToast();

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const { data: streak } = await getCurrentStreak();
      if (!streak) {
        throw new Error("No active streak found");
      }

      await createCheckIn(streak.id, mood, journal);
      onCheckIn(mood, journal);
      setIsCompleted(true);
      setIsOpen(false);

      toast({
        title: "Check-in completed!",
        description: "Keep up the great work!",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleOpenChange = (open: boolean) => {
    if (!loading) {
      setIsOpen(open);
    }
  };

  return (
    <Card className="w-full bg-white shadow-sm hover:shadow-md transition-shadow">
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4">Daily Check-in</h2>

        {isCompleted ? (
          <div className="text-center py-8">
            <p className="text-green-600 text-lg">
              ✓ You've completed your check-in for today!
            </p>
          </div>
        ) : (
          <Dialog open={isOpen} onOpenChange={handleOpenChange}>
            <DialogTrigger asChild>
              <Button className="w-full" size="lg">
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
                    className="flex flex-wrap gap-4"
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

                <Button
                  onClick={handleSubmit}
                  className="w-full"
                  size="lg"
                  disabled={loading}
                >
                  {loading ? "Submitting..." : "Submit Check-in"}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </Card>
  );
};

export default DailyCheckIn;
