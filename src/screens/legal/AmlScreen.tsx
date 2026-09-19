import LegalLayout from './LegalLayout'
export default function AmlScreen({ onBack }: { onBack: () => void }) {
  return (
    <LegalLayout title="Política AML" onBack={onBack}>
      <p>A BoraBet adota práticas de prevenção à lavagem de dinheiro e ao financiamento do terrorismo.</p>
      <h3>Verificação de identidade</h3>
      <p>Todos os jogadores passam por verificação progressiva antes de jogar com dinheiro real e antes do primeiro saque.</p>
      <h3>Monitoramento</h3>
      <ul>
        <li>Análise de padrões de transação</li>
        <li>Detecção de múltiplas contas e dispositivos</li>
        <li>Sinais de conluio em jogos 1v1</li>
        <li>Verificação de origem dos fundos para valores altos</li>
      </ul>
      <h3>Comunicação</h3>
      <p>Atividades suspeitas são reportadas ao COAF conforme exigido por lei.</p>
      <h3>Sanções</h3>
      <p>Verificamos listas de sanções nacionais e internacionais.</p>
    </LegalLayout>
  )
}
