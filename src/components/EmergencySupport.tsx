import React from "react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { ScrollArea } from "./ui/scroll-area";
import {
  AlertTriangle,
  Brain,
  HeartHandshake,
  Lightbulb,
  Smile,
} from "lucide-react";

interface EmergencySupportProps {
  isOpen?: boolean;
  onClose?: () => void;
}

const EmergencySupport = ({
  isOpen = true,
  onClose = () => {},
}: EmergencySupportProps) => {
  const emergencyTips = [
    {
      title: "Take Deep Breaths",
      icon: <Smile className="w-6 h-6" />,
      description:
        "Practice 4-7-8 breathing: Inhale for 4 seconds, hold for 7, exhale for 8.",
    },
    {
      title: "Change Your Environment",
      icon: <Brain className="w-6 h-6" />,
      description:
        "Go for a walk, visit a public place, or move to a different room.",
    },
    {
      title: "Remember Your Why",
      icon: <Lightbulb className="w-6 h-6" />,
      description:
        "Focus on your goals and the reasons you started this journey.",
    },
    {
      title: "Call a Friend",
      icon: <HeartHandshake className="w-6 h-6" />,
      description:
        "Reach out to a supportive friend or family member for encouragement.",
    },
  ];

  return (
    <div className="bg-white">
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogTrigger asChild>
          <Button
            variant="destructive"
            className="flex items-center gap-2 px-4 py-2 rounded-lg"
          >
            <AlertTriangle className="w-5 h-5" />
            Emergency Support
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-center text-red-600">
              Emergency Support Center
            </DialogTitle>
          </DialogHeader>
          <ScrollArea className="h-[500px] px-4">
            <div className="space-y-6 py-4">
              <p className="text-center text-gray-600 mb-6">
                Stay strong! Here are some immediate actions you can take:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {emergencyTips.map((tip, index) => (
                  <Card
                    key={index}
                    className="p-4 hover:shadow-lg transition-shadow"
                  >
                    <div className="flex items-start space-x-4">
                      <div className="p-2 bg-blue-100 rounded-full">
                        {tip.icon}
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-2">
                          {tip.title}
                        </h3>
                        <p className="text-gray-600">{tip.description}</p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
              <div className="mt-8">
                <h3 className="font-semibold text-xl mb-4">
                  Additional Resources
                </h3>
                <ul className="list-disc pl-6 space-y-2 text-gray-600">
                  <li>Call emergency hotline: 1-800-XXX-XXXX</li>
                  <li>Visit our community forum for support</li>
                  <li>Try meditation exercises in our app</li>
                  <li>Read success stories from other members</li>
                </ul>
              </div>
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EmergencySupport;
