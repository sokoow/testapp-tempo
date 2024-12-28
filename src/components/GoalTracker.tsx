import React, { useState } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Progress } from "./ui/progress";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Label } from "./ui/label";
import { Target, Plus } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useToast } from "./ui/use-toast";

interface Goal {
  id: string;
  title: string;
  target_days: number;
  created_at: string;
  completed_at: string | null;
  is_active: boolean;
}

interface GoalTrackerProps {
  currentStreak?: number;
  goals?: Goal[];
  onGoalAdded?: () => void;
}

const GoalTracker = ({
  currentStreak = 0,
  goals: initialGoals = [],
  onGoalAdded = () => {},
}: GoalTrackerProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [targetDays, setTargetDays] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase
        .from("goals")
        .insert([{ title, target_days: parseInt(targetDays) }]);

      if (error) throw error;

      setIsOpen(false);
      setTitle("");
      setTargetDays("");
      onGoalAdded(); // Notify parent to refresh goals

      toast({
        title: "Goal created!",
        description: "Your new goal has been set.",
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

  return (
    <Card className="w-full bg-white shadow-sm hover:shadow-md transition-shadow">
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2">
            <Target className="h-6 w-6 text-blue-500" />
            <h2 className="text-2xl font-bold">Goals</h2>
          </div>
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button size="sm" className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Add Goal
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Set a New Goal</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Goal Title</Label>
                  <Input
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g., First 30 Days"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="targetDays">Target Days</Label>
                  <Input
                    id="targetDays"
                    type="number"
                    min="1"
                    value={targetDays}
                    onChange={(e) => setTargetDays(e.target.value)}
                    placeholder="e.g., 30"
                    required
                  />
                </div>
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? "Creating..." : "Create Goal"}
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <div className="space-y-4">
          {initialGoals.length === 0 ? (
            <p className="text-center text-gray-500 py-4">
              No goals set yet. Create your first goal!
            </p>
          ) : (
            initialGoals.map((goal) => {
              const progress = Math.min(
                (currentStreak / goal.target_days) * 100,
                100,
              );
              return (
                <div key={goal.id} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{goal.title}</span>
                    <span className="text-sm text-gray-600">
                      {currentStreak}/{goal.target_days} days
                    </span>
                  </div>
                  <Progress value={progress} className="h-2" />
                </div>
              );
            })
          )}
        </div>
      </div>
    </Card>
  );
};

export default GoalTracker;
