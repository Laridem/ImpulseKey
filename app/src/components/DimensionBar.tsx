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
    <div className="space-y-3">
      {/* Labels */}
      <div className="flex justify-between text-label-caps font-bold text-text uppercase tracking-wider">
        <span>{labelA}</span>
        <span>{labelB}</span>
      </div>

      {/* Bar - Sharp geometric design */}
      <div className="flex h-10 overflow-hidden border-2 border-text">
        <div
          className="flex items-center justify-start px-3 text-label-caps font-bold text-white transition-all duration-300 border-r-2 border-text uppercase tracking-wider"
          style={{
            width: `${percentA}%`,
            backgroundColor: colorA,
            minWidth: percentA > 10 ? 'auto' : '0'
          }}
        >
          {percentA > 15 && `${percentA}%`}
        </div>
        <div
          className="flex items-center justify-end px-3 text-label-caps font-bold text-white transition-all duration-300 uppercase tracking-wider"
          style={{
            width: `${percentB}%`,
            backgroundColor: colorB,
            minWidth: percentB > 10 ? 'auto' : '0'
          }}
        >
          {percentB > 15 && `${percentB}%`}
        </div>
      </div>

      {/* Scores - Technical readout */}
      <div className="flex justify-between text-label-caps text-text-variant uppercase tracking-wider border-t border-outline pt-2">
        <span className="font-bold">SCORE: {scoreA}</span>
        <span className="font-bold">SCORE: {scoreB}</span>
      </div>
    </div>
  );
};
