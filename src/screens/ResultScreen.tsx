import type { MatchResult } from '../App'
import DominoTile from '../components/DominoTile'

interface Props {
  result: MatchResult
  pot: number
  onRematch: () => void
  onExit: () => void
}

export default function ResultScreen({ result, pot, onRematch, onExit }: Props) {
  const win = result === 'win'
  const draw = result === 'draw'
  const commission = Math.floor(pot * 0.1)
  const net = pot - commission
  const fmt = (n: number) => n.toLocaleString('pt-BR')

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center"
      style={{ background: 'rgba(7,10,20,0.96)', backdropFilter: 'blur(8px)', zIndex: 50 }}>

      {/* Confetti for win */}
      {win && (
        <>
          {Array.from({ length: 20 }).map((_, i) => (
            <div key={i} style={{
              position: 'absolute',
              top: -20,
              left: `${(i * 37) % 100}%`,
              width: 8, height: 8,
              borderRadius: '50%',
              background: ['#FFD93D', '#3DDB5F', '#3B7BFF', '#F0424B', '#8B4DFF'][i % 5],
              animation: `coin-fall ${1.5 + (i % 5) * 0.3}s ${(i % 6) * 0.2}s linear infinite`,
            }} />
          ))}
        </>
      )}

      {/* Tile */}
      <div style={{
        width: 120, height: 120, display: 'flex', alignItems: 'center', justifyContent: 'center',
        animation: 'pulse-dot 3s ease-in-out infinite',
        filter: win ? 'drop-shadow(0 0 30px rgba(61,219,95,0.5))' : draw ? 'drop-shadow(0 0 20px rgba(255,217,61,0.3))' : 'none',
      }}>
        <DominoTile top={6} bottom={win ? 6 : draw ? 3 : 0} size="lg" />
      </div>

      {/* Mascot */}
      <div style={{ fontSize: 64, marginBottom: 8, animation: win ? 'fade-up 300ms ease-out' : 'none' }}>
        {win ? '🎉' : draw ? '😮' : '😔'}
      </div>

      {/* Headline */}
      <h1 style={{
        fontFamily: 'Lilita One, cursive',
        fontSize: 36,
        color: win ? '#3DDB5F' : draw ? '#FFFFFF' : '#A9B0C6',
        textShadow: win ? '0 0 40px rgba(61,219,95,0.4)' : 'none',
        marginBottom: 8,
        animation: 'fade-up 400ms ease-out both',
      }}>
        {win ? 'Você venceu!' : draw ? 'Empate' : 'Você perdeu'}
      </h1>

      {/* Amount */}
      <p style={{
        fontFamily: 'Lilita One, cursive',
        fontSize: 28,
        color: win ? '#FFFFFF' : draw ? '#FFD93D' : '#A9B0C6',
        marginBottom: 4,
        animation: 'fade-up 400ms 80ms ease-out both',
      }}>
        {win ? `+${fmt(net)} BC` : draw ? 'Pote devolvido' : `−${fmt(pot)} BC`}
      </p>

      {win && (
        <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: '#6E7691', marginBottom: 4 }}>
          Pote {fmt(pot)} BC · Comissão {fmt(commission)} BC
        </p>
      )}

      {/* Stats row */}
      <div className="flex gap-4 my-4" style={{ animation: 'fade-up 400ms 160ms ease-out both' }}>
        <div style={{ textAlign: 'center' }}>
          <p style={{ fontFamily: 'Lilita One, cursive', fontSize: 16, color: '#FFD93D' }}>+25 XP</p>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, color: '#6E7691' }}>Experiência</p>
        </div>
        <div style={{ width: 1, background: 'rgba(255,255,255,0.08)' }} />
        <div style={{ textAlign: 'center' }}>
          <p style={{ fontFamily: 'Lilita One, cursive', fontSize: 16, color: '#3DDB5F' }}>4/5</p>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, color: '#6E7691' }}>Missão: 5 partidas</p>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex gap-3 mt-4" style={{ animation: 'fade-up 400ms 240ms ease-out both' }}>
        <button className="btn-yellow" style={{ height: 52, paddingLeft: 32, paddingRight: 32, fontSize: 18 }} onClick={onRematch}>
          Revanche
        </button>
        <button className="btn-secondary" style={{ height: 52, paddingLeft: 24, paddingRight: 24, fontSize: 16 }} onClick={onExit}>
          Sair
        </button>
      </div>

      {win && (
        <button style={{ marginTop: 16, background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'Inter, sans-serif', fontSize: 13, color: '#3B7BFF' }}>
          Compartilhar vitória →
        </button>
      )}
    </div>
  )
}
