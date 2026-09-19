import { ChevronLeft } from 'lucide-react'
import DominoTile from '../components/DominoTile'

interface Props { onBack: () => void; onDomino: () => void; onPlinko: () => void }

export default function GamesHubScreen({ onBack, onDomino, onPlinko }: Props) {
  return (
    <div className="flex flex-col" style={{ background: '#0D1222', minHeight: '100%' }}>
      <div className="flex items-center justify-between px-4 sticky top-0 z-40"
        style={{ background: '#141A2E', borderBottom: '1px solid rgba(255,255,255,0.06)', height: 56 }}>
        <button onClick={onBack} style={{ width: 44, height: 44, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'none', border: 'none', cursor: 'pointer' }} aria-label="Voltar">
          <ChevronLeft size={24} color="#FFFFFF" />
        </button>
        <span style={{ fontFamily: 'Lilita One, cursive', fontSize: 18, color: '#FFFFFF' }}>Jogos</span>
        <div style={{ width: 44 }} />
      </div>

      <div className="flex flex-col gap-4 px-4 py-4 pb-6">
        <h2 style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: '#6E7691', fontWeight: 600 }}>
          POUCOS JOGOS, TODOS BONS
        </h2>

        {/* Domino */}
        <button onClick={onDomino} className="relative overflow-hidden text-left"
          style={{
            height: 200, borderRadius: 24,
            background: 'radial-gradient(ellipse at 55% 40%, #0E7A4B 0%, #063D28 100%)',
            border: '1px solid rgba(255,255,255,0.06)', cursor: 'pointer', padding: 20,
          }}>
          <div className="absolute" style={{ top: 16, right: 16, transform: 'rotate(12deg)' }}>
            <DominoTile top={6} bottom={6} size="lg" />
          </div>
          <div className="absolute" style={{ bottom: 24, right: 100, transform: 'rotate(-6deg)', opacity: 0.7 }}>
            <DominoTile top={5} bottom={3} size="md" />
          </div>
          <div className="flex items-center gap-2 mb-2">
            <span className="live-dot" style={{ width: 8, height: 8, borderRadius: '50%', background: '#3DDB5F', display: 'inline-block' }} />
            <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: '#FFFFFF', fontWeight: 500 }}>284 jogando</span>
          </div>
          <h3 style={{ fontFamily: 'Lilita One, cursive', fontSize: 28, color: '#FFFFFF', marginTop: 44 }}>Dominó 1v1</h3>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: '#A9B0C6', marginTop: 4 }}>Vencedor leva o pote · 10% comissão</p>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, color: '#6E7691', marginTop: 8 }}>RTP 97% · Regras ⓘ</p>
        </button>

        {/* Plinko */}
        <button onClick={onPlinko} className="relative overflow-hidden text-left"
          style={{
            height: 200, borderRadius: 24,
            background: 'radial-gradient(ellipse at 55% 40%, #5B3DF5 0%, #1C1466 100%)',
            border: '1px solid rgba(255,255,255,0.06)', cursor: 'pointer', padding: 20,
          }}>
          <div className="absolute" style={{ top: 20, right: 30, opacity: 0.9 }}>
            <svg width="120" height="120" viewBox="0 0 120 120">
              {[0, 1, 2, 3, 4, 5, 6].map(row =>
                Array.from({ length: row + 2 }, (_, col) => (
                  <circle key={`${row}-${col}`} cx={20 + col * 15} cy={15 + row * 15} r="3" fill="#FFD93D" opacity="0.7" />
                ))
              )}
              <circle cx="60" cy="90" r="7" fill="#FFD93D" style={{ filter: 'drop-shadow(0 0 8px #FFD93D)' }} />
            </svg>
          </div>
          <div className="flex items-center gap-2 mb-2">
            <span className="live-dot" style={{ width: 8, height: 8, borderRadius: '50%', background: '#FFD93D', display: 'inline-block' }} />
            <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: '#FFFFFF', fontWeight: 500 }}>189 jogando</span>
          </div>
          <h3 style={{ fontFamily: 'Lilita One, cursive', fontSize: 28, color: '#FFFFFF', marginTop: 44 }}>Plinko</h3>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: '#A9B0C6', marginTop: 4 }}>Solte a bola e multiplique</p>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, color: '#6E7691', marginTop: 8 }}>RTP 99% · Até 1000×</p>
        </button>

        {/* Coming soon */}
        <div className="card-sm flex items-center gap-3"
          style={{ padding: 16, opacity: 0.75, borderStyle: 'dashed' }}>
          <span style={{ fontSize: 36, filter: 'grayscale(1)' }}>🎰</span>
          <div className="flex-1">
            <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 14, color: '#FFFFFF' }}>
              Novo jogo em breve
            </p>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: '#6E7691', marginTop: 2 }}>
              Estamos preparando algo especial
            </p>
          </div>
          <button className="btn-secondary" style={{ height: 36, paddingLeft: 14, paddingRight: 14, fontSize: 12 }}>
            Avise-me
          </button>
        </div>
      </div>
    </div>
  )
}
