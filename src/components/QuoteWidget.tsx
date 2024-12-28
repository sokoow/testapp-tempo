import React from "react";
import { Card, CardContent } from "./ui/card";
import { RefreshCw } from "lucide-react";
import { Button } from "./ui/button";

interface QuoteWidgetProps {
  quote?: string;
  author?: string;
  onRefresh?: () => void;
}

const QuoteWidget = ({
  quote = "The journey of a thousand miles begins with one step.",
  author = "Lao Tzu",
  onRefresh = () => {},
}: QuoteWidgetProps) => {
  return (
    <Card className="w-[400px] bg-white shadow-lg">
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1">
            <p className="text-gray-800 text-lg italic">"{quote}"</p>
            <p className="text-gray-600 mt-2">- {author}</p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="ml-2"
            onClick={onRefresh}
          >
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default QuoteWidget;
