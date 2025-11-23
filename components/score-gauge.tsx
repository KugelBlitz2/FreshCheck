"use client"

interface ScoreGaugeProps {
  score: number
  color: string
}

export function ScoreGauge({ score, color }: ScoreGaugeProps) {
  const radius = 36
  const stroke = 6
  const normalizedRadius = radius - stroke * 2
  const circumference = normalizedRadius * 2 * Math.PI
  const strokeDashoffset = circumference - (score / 100) * circumference

  return (
    <div className="relative flex items-center justify-center w-20 h-20">
      <svg height={radius * 2} width={radius * 2} className="rotate-[-90deg]">
        {/* Background Circle */}
        <circle stroke="#f1f5f9" strokeWidth={stroke} fill="transparent" r={normalizedRadius} cx={radius} cy={radius} />
        {/* Progress Circle */}
        <circle
          stroke={color}
          strokeWidth={stroke}
          strokeDasharray={circumference + " " + circumference}
          style={{ strokeDashoffset, transition: "stroke-dashoffset 1s ease-out" }}
          strokeLinecap="round"
          fill="transparent"
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
      </svg>
      <span className="absolute text-xl font-bold" style={{ color }}>
        {score}
      </span>
    </div>
  )
}
