import LegalLayout from './LegalLayout'
export default function TermsScreen({ onBack }: { onBack: () => void }) {
  return (
    <LegalLayout title="Termos de uso" updated="15/03/2025" onBack={onBack}>
      <p>Ao usar a BoraBet você concorda com estes termos. A BoraBet é uma plataforma de entretenimento com jogos originais.</p>
      <h3>1. Elegibilidade</h3>
      <p>É necessário ter 18 anos ou mais e residir em uma região onde o uso seja permitido. Contas duplicadas são proibidas.</p>
      <h3>2. Conta e verificação</h3>
      <p>Você é responsável pela veracidade das informações fornecidas. Podemos solicitar documentos para verificação.</p>
      <h3>3. Bora Coins</h3>
      <p>Bora Coins (BC) são créditos internos com paridade fixa publicada. Não constituem moeda eletrônica.</p>
      <h3>4. Jogos</h3>
      <p>Os resultados são determinados por um gerador de números aleatórios certificado. As regras de cada jogo estão descritas na seção Jogos.</p>
      <h3>5. Saques</h3>
      <p>Saques estão sujeitos à verificação de identidade e podem ser recusados em caso de suspeita de fraude.</p>
      <h3>6. Conduta</h3>
      <p>É proibido usar bots, explorar falhas, ou qualquer forma de conluio. Contas envolvidas podem ser suspensas.</p>
      <h3>7. Jogo responsável</h3>
      <p>Ferramentas de limite, pausa e autoexclusão estão disponíveis em Jogo responsável.</p>
    </LegalLayout>
  )
}
