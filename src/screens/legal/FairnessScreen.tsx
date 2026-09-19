import LegalLayout from './LegalLayout'
export default function FairnessScreen({ onBack }: { onBack: () => void }) {
  return (
    <LegalLayout title="Jogo justo" onBack={onBack}>
      <p>Todos os resultados da BoraBet são gerados por um gerador de números aleatórios (RNG) criptograficamente seguro, auditado por laboratório acreditado.</p>
      <h3>Como funciona</h3>
      <ul>
        <li>O servidor gera a semente e o resultado</li>
        <li>O cliente apenas anima o resultado visualmente</li>
        <li>Nenhuma decisão de resultado ocorre no dispositivo do jogador</li>
        <li>Logs de resultados ficam disponíveis para auditoria</li>
      </ul>
      <h3>Verificação</h3>
      <p>Cada partida tem um identificador único. Você pode solicitar a verificação de qualquer resultado pelo suporte.</p>
      <h3>Certificação</h3>
      <p>Dominó e Plinko são certificados por laboratório independente. Alterações no código exigem recertificação.</p>
    </LegalLayout>
  )
}
