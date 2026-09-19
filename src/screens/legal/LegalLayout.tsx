import { ChevronLeft } from 'lucide-react'
import type { ReactNode } from 'react'

interface Props {
  title: string
  updated?: string
  onBack: () => void
  children: ReactNode
}

export default function LegalLayout({ title, updated, onBack, children }: Props) {
  return (
    <div className="flex flex-col" style={{ background: '#0D1222', minHeight: '100%' }}>
      <div className="flex items-center justify-between px-4 sticky top-0 z-40"
        style={{ background: '#141A2E', borderBottom: '1px solid rgba(255,255,255,0.06)', height: 56 }}>
        <button onClick={onBack} style={{ width: 44, height: 44, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'none', border: 'none', cursor: 'pointer' }}>
          <ChevronLeft size={24} color="#FFFFFF" />
        </button>
        <span style={{ fontFamily: 'Lilita One, cursive', fontSize: 16, color: '#FFFFFF', maxWidth: 220, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {title}
        </span>
        <div style={{ width: 44 }} />
      </div>
      <div className="px-5 py-4 pb-10" style={{ color: '#A9B0C6', fontFamily: 'Inter, sans-serif', fontSize: 14, lineHeight: '22px' }}>
        {updated && (
          <p style={{ fontSize: 12, color: '#6E7691', marginBottom: 16 }}>Última atualização: {updated}</p>
        )}
        <style>{`
          .legal-body h3 { color: #FFFFFF; font-family: 'Lilita One', cursive; font-size: 16px; margin-top: 20px; margin-bottom: 6px; }
          .legal-body p { margin-bottom: 12px; }
          .legal-body ul { padding-left: 20px; margin-bottom: 12px; }
          .legal-body li { margin-bottom: 6px; }
          .legal-body a { color: #3B7BFF; text-decoration: none; }
        `}</style>
        <div className="legal-body">{children}</div>
      </div>
    </div>
  )
}
