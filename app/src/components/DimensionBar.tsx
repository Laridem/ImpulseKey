interface DimensionBarProps {
  labelA: string;
  labelB: string;
  scoreA: number;
  scoreB: number;
  colorA: string;
  colorB: string;
}

export const DimensionBar = ({ labelA, labelB, scoreA, scoreB, colorA, colorB }: DimensionBarProps) => {
  const total = scoreA + scoreB;
  const percentA = total > 0 ? Math.round((scoreA / total) * 100) : 50;
  const percentB = 100 - percentA;

  return (
    <div className="space-y-2">
      {/* Labels */}
      <div className="flex justify-between text-sm font-medium text-gray-700">
        <span>{labelA}</span>
        <span>{labelB}</span>
      </div>

      {/* Bar */}
      <div className="flex h-8 rounded-full overflow-hidden shadow-inner">
        <div
          className="flex items-center justify-start px-3 text-xs font-bold text-white transition-all duration-500"
          style={{
            width: `${percentA}%`,
            backgroundColor: colorA,
            minWidth: percentA > 10 ? 'auto' : '0'
          }}
        >
          {percentA > 15 && `${percentA}%`}
        </div>
        <div
          className="flex items-center justify-end px-3 text-xs font-bold text-white transition-all duration-500"
          style={{
            width: `${percentB}%`,
            backgroundColor: colorB,
            minWidth: percentB > 10 ? 'auto' : '0'
          }}
        >
          {percentB > 15 && `${percentB}%`}
        </div>
      </div>

      {/* Scores */}
      <div className="flex justify-between text-xs text-gray-500">
        <span>Score: {scoreA}</span>
        <span>Score: {scoreB}</span>
      </div>
    </div>
  );
};
