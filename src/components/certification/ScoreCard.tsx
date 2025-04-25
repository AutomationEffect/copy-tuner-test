
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from '@/components/ui/progress';

interface ScoreCardProps {
  copyScore: number;
  isAnalyzing: boolean;
}

export const ScoreCard = ({ copyScore, isAnalyzing }: ScoreCardProps) => {
  const getScoreColor = () => {
    if (copyScore >= 85) return "text-green-600";
    if (copyScore >= 70) return "text-amber-600";
    return "text-red-600";
  };

  const getProgressColor = () => {
    if (copyScore >= 85) return "bg-green-600";
    if (copyScore >= 70) return "bg-amber-500";
    return "bg-red-500";
  };

  return (
    <Card className="border shadow-apple">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Copy Score</span>
          <span className={`text-xl font-bold ${getScoreColor()}`}>
            {copyScore}%
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Progress value={copyScore} className={getProgressColor()} />
        <p className="text-sm mt-2 text-gray-500">
          {isAnalyzing ? "Analyzing your copy..." : 
            copyScore < 70 ? "Your copy needs significant improvement." :
            copyScore < 85 ? "Your copy is improving but not yet ready for submission." :
            "Your copy meets the minimum threshold for submission!"}
        </p>
      </CardContent>
    </Card>
  );
};
