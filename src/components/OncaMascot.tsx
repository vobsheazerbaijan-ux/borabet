type Pose = 'idle' | 'celebrate' | 'sad' | 'point'

interface Props {
  pose?: Pose
  size?: number
}

export default function OncaMascot({ pose = 'idle', size = 96 }: Props) {
  const expressions: Record<Pose, string> = {
    idle: '🐆',
    celebrate: '🎉',
    sad: '😔',
    point: '👇',
  }

  return (
    <div style={{ fontSize: size * 0.7, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
      <span style={{ fontSize: size * 0.7 }}>{expressions[pose]}</span>
    </div>
  )
}
