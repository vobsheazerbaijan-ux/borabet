import LegalLayout from './LegalLayout'
export default function GameRulesScreen({ onBack }: { onBack: () => void }) {
  return (
    <LegalLayout title="Regras dos jogos e RTP" onBack={onBack}>
      <h3>Dominó 1v1</h3>
      <p>Dominó double-six, 28 peças. Cada jogador recebe 7 peças; 14 ficam no monte. A rodada termina quando um jogador esvazia a mão ou o jogo trava. Em caso de travamento, vence quem tiver menos pontos; empate devolve o pote.</p>
      <ul>
        <li>Comissão da plataforma: 10% do pote</li>
        <li>Tempo por jogada: 20s (+ 2 extensões de 10s)</li>
        <li>3 timeouts consecutivos = desistência automática</li>
        <li>Desconexão: 30s para reconectar, depois desistência</li>
        <li>RTP alvo: 97%</li>
      </ul>
      <h3>Plinko</h3>
      <p>Uma bola é solta do topo de uma pirâmide de pinos e cai em uma caixa multiplicadora. Cada combinação de linhas × risco tem sua própria tabela de multiplicadores.</p>
      <ul>
        <li>Multiplicador máximo: 1000×</li>
        <li>RTP alvo: 99% (Baixo), 98% (Médio), 97% (Alto)</li>
      </ul>
      <h3>Fairness</h3>
      <p>Todos os resultados são gerados no servidor por um RNG certificado. O cliente apenas anima o resultado.</p>
    </LegalLayout>
  )
}
