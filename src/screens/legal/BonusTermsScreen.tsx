import LegalLayout from './LegalLayout'
export default function BonusTermsScreen({ onBack }: { onBack: () => void }) {
  return (
    <LegalLayout title="Termos de bônus" updated="15/03/2025" onBack={onBack}>
      <p>Todos os bônus creditados na BoraBet estão sujeitos a estas regras.</p>
      <h3>Bônus de boas-vindas</h3>
      <p>+10% no primeiro depósito, limitado a 500 BC. Requer aposta de 3× o valor do bônus antes do saque.</p>
      <h3>Roda diária</h3>
      <p>1 giro grátis a cada 24h. Prêmios vão para o saldo de bônus com aposta de 2×.</p>
      <h3>Cashback semanal</h3>
      <p>2% das perdas líquidas da semana anterior, creditado toda segunda às 12:00 (horário de Brasília). Aposta de 1×.</p>
      <h3>Restrições</h3>
      <ul>
        <li>Aposta máxima com bônus ativo: 100 BC</li>
        <li>Bônus não são transferíveis entre contas</li>
        <li>Contas duplicadas perdem todos os bônus</li>
        <li>Bônus expiram em 30 dias</li>
      </ul>
      <h3>Contribuição para apostas</h3>
      <p>Domino: 100% · Plinko: 100%</p>
    </LegalLayout>
  )
}
