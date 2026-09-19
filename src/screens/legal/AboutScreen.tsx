import LegalLayout from './LegalLayout'
export default function AboutScreen({ onBack }: { onBack: () => void }) {
  return (
    <LegalLayout title="Sobre a BoraBet" onBack={onBack}>
      <p>A BoraBet é uma plataforma de cassino com jogos próprios, focada em oferecer poucos jogos, todos excelentes.</p>
      <h3>Nossa promessa</h3>
      <p>"Bora!" significa velocidade. Do toque no bot ao jogo rodando, são segundos.</p>
      <h3>Nossos jogos</h3>
      <p>Lançamos com dois jogos: Dominó 1v1 e Plinko. Cada um feito com cuidado, sem sensação de template.</p>
      <h3>Fairness</h3>
      <p>RNG certificado, sem jogadores falsos, sem vitórias falsas. Bots são sempre rotulados como "Bot".</p>
      <h3>Jogo responsável</h3>
      <p>18+. Ferramentas de limite, pausa e autoexclusão estão sempre disponíveis.</p>
      <h3>Contato</h3>
      <p>Suporte pelo app em Menu → Suporte.</p>
    </LegalLayout>
  )
}
