import LegalLayout from './LegalLayout'
export default function LicenseScreen({ onBack }: { onBack: () => void }) {
  return (
    <LegalLayout title="Licença e regulador" onBack={onBack}>
      <p>A BoraBet opera no Brasil em conformidade com a regulamentação vigente.</p>
      <h3>Regulador</h3>
      <p>Secretaria de Prêmios e Apostas (SPA) — Ministério da Fazenda.</p>
      <h3>Licença</h3>
      <p>Número da licença: a ser publicado após emissão.</p>
      <h3>Contato regulatório</h3>
      <p>Para questões regulatórias, entre em contato pelo suporte com o assunto "Regulatório".</p>
      <h3>Idade mínima</h3>
      <p>Proibido para menores de 18 anos.</p>
    </LegalLayout>
  )
}
