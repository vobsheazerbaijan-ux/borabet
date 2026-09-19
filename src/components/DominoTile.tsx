interface Props {
  top: number
  bottom: number
  size?: 'sm' | 'md' | 'lg'
  faceDown?: boolean
}

const PIP_POSITIONS: Record<number, [number, number][]> = {
  0: [],
  1: [[50, 50]],
  2: [[25, 25], [75, 75]],
  3: [[25, 25], [50, 50], [75, 75]],
  4: [[25, 25], [75, 25], [25, 75], [75, 75]],
  5: [[25, 25], [75, 25], [50, 50], [25, 75], [75, 75]],
  6: [[25, 20], [75, 20], [25, 50], [75, 50], [25, 80], [75, 80]],
}

const SIZES = {
  sm: { w: 28, h: 56, pip: 4, r: 4 },
  md: { w: 36, h: 72, pip: 5, r: 5 },
  lg: { w: 48, h: 96, pip: 6, r: 7 },
}

export default function DominoTile({ top, bottom, size = 'md', faceDown = false }: Props) {
  const { w, h, pip, r } = SIZES[size]

  if (faceDown) {
    return (
      <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`}>
        <rect x={0.5} y={0.5} width={w - 1} height={h - 1} rx={r} fill="#2A1F14" stroke="#D4A017" strokeWidth={1} />
        <text x={w / 2} y={h / 2 + 5} textAnchor="middle" fontFamily="Lilita One" fontSize={14} fill="#D4A017" opacity={0.7}>B</text>
      </svg>
    )
  }

  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.4))' }}>
      <rect x={0.5} y={0.5} width={w - 1} height={h - 1} rx={r} fill="#F5EFE0" stroke="#D8CFB8" strokeWidth={1} />
      {/* Half areas */}
      {PIP_POSITIONS[top].map(([cx, cy], i) => (
        <circle key={`t${i}`}
          cx={w * cx / 100}
          cy={(h / 2 - 2) * cy / 100}
          r={pip / 2}
          fill="#1A1A1A"
        />
      ))}
      <line x1={4} y1={h / 2} x2={w - 4} y2={h / 2} stroke="#A89E86" strokeWidth={1} />
      <line x1={4} y1={h / 2 - 0.5} x2={w - 4} y2={h / 2 - 0.5} stroke="rgba(255,255,255,0.3)" strokeWidth={0.5} />
      {PIP_POSITIONS[bottom].map(([cx, cy], i) => (
        <circle key={`b${i}`}
          cx={w * cx / 100}
          cy={h / 2 + 2 + (h / 2 - 2) * cy / 100}
          r={pip / 2}
          fill="#1A1A1A"
        />
      ))}
    </svg>
  )
}
