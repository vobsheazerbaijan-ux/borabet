import LegalLayout from './LegalLayout'
export default function PrivacyScreen({ onBack }: { onBack: () => void }) {
  return (
    <LegalLayout title="Política de privacidade" updated="15/03/2025" onBack={onBack}>
      <p>Esta política descreve como tratamos seus dados pessoais, em conformidade com a LGPD (Lei 13.709/2018).</p>
      <h3>Dados que coletamos</h3>
      <ul>
        <li>Identificação: nome, CPF, data de nascimento</li>
        <li>Contato: Telegram ID, nome de usuário</li>
        <li>Transações: depósitos, saques, apostas</li>
        <li>Técnicos: IP, dispositivo, logs de acesso</li>
      </ul>
      <h3>Finalidade</h3>
      <p>Usamos os dados para operar sua conta, cumprir obrigações legais, prevenir fraudes e melhorar o serviço.</p>
      <h3>Compartilhamento</h3>
      <p>Compartilhamos apenas com prestadores de KYC, provedores de pagamento e autoridades quando legalmente exigido.</p>
      <h3>Seus direitos</h3>
      <p>Você pode solicitar acesso, correção, portabilidade ou exclusão dos seus dados pelo suporte.</p>
      <h3>Segurança</h3>
      <p>Dados sensíveis são criptografados em repouso e em trânsito. Acesso restrito por função.</p>
    </LegalLayout>
  )
}
