import React from 'react';
import { Sparkles } from 'lucide-react';
interface AIInsightProps {
  title: string;
  description: string;
  confidence: number;
  date: string;
}
const AIInsightCard = ({
  title,
  description,
  confidence,
  date
}: AIInsightProps) => {
  // Function to determine confidence level color
  const getConfidenceColor = (level: number) => {
    if (level >= 90) return 'bg-green-500';
    if (level >= 70) return 'bg-blue-500';
    return 'bg-yellow-500';
  };
  return <div className="bg-card border border-border rounded-lg p-4 hover:shadow-md transition-all hover:scale-[1.01]">
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center">
          <Sparkles size={16} className="text-primary mr-2" />
          <h3 className="font-medium">{title}</h3>
        </div>
        <div className="flex items-center">
          <div className={`${getConfidenceColor(confidence)} text-white text-xs font-medium px-2 py-0.5 rounded-full`}>
            {confidence}% confidence
          </div>
        </div>
      </div>
      <p className="text-sm text-muted-foreground mb-3">{description}</p>
      <div className="text-xs text-muted-foreground">Generated on {date}</div>
    </div>;
};
export default AIInsightCard;