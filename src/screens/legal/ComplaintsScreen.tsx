import LegalLayout from './LegalLayout'
export default function ComplaintsScreen({ onBack }: { onBack: () => void }) {
  return (
    <LegalLayout title="Reclamações" onBack={onBack}>
      <p>Se você tem uma reclamação, queremos resolver.</p>
      <h3>Como reclamar</h3>
      <ul>
        <li>Abra um ticket em Suporte com o assunto da sua reclamação</li>
        <li>Inclua IDs de transação e capturas de tela quando possível</li>
        <li>Prazo de resposta inicial: até 24 horas</li>
      </ul>
      <h3>Escalonamento</h3>
      <p>Se não ficar satisfeito com a resposta, você pode solicitar revisão pela nossa equipe de compliance.</p>
      <h3>Regulador</h3>
      <p>Em última instância, você pode contatar a SPA / Ministério da Fazenda.</p>
    </LegalLayout>
  )
}
