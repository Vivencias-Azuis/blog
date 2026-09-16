import { PrivacySection } from '../privacy-layout'

export function RetencaoSection() {
  return (
    <PrivacySection
      id="retencao"
      title="7. Retenção de Dados"
      icon="📅"
      iconTint="from-indigo-500 to-purple-500"
      decorationTint="from-indigo-100 to-purple-100"
      decorationCorner="top-right"
    >
      <p className="text-sand-700 leading-relaxed text-lg">
        Mantemos suas informações pessoais apenas pelo tempo necessário para cumprir as
        finalidades descritas nesta política ou conforme exigido por lei. Dados de contato
        são mantidos por até 2 anos após a última interação, a menos que você solicite a
        exclusão antecipada.
      </p>
    </PrivacySection>
  )
}

export function MenoresSection() {
  return (
    <PrivacySection
      id="menores"
      title="8. Menores de Idade"
      icon="👶"
      iconTint="from-pink-500 to-rose-500"
      decorationTint="from-pink-100 to-rose-100"
      decorationCorner="bottom-left"
    >
      <p className="text-sand-700 leading-relaxed text-lg">
        Nosso site não é direcionado a menores de 13 anos. Não coletamos intencionalmente
        informações pessoais de crianças. Se você é pai, mãe ou responsável e acredita que
        seu filho nos forneceu informações pessoais, entre em contato conosco para que
        possamos remover essas informações.
      </p>
    </PrivacySection>
  )
}

export function LinksExternosSection() {
  return (
    <PrivacySection
      id="links"
      title="9. Links para Sites Externos"
      icon="🔗"
      iconTint="from-teal-500 to-cyan-500"
      decorationTint="from-teal-100 to-cyan-100"
      decorationCorner="top-left"
    >
      <p className="text-sand-700 leading-relaxed text-lg">
        Nosso site pode conter links para outros sites. Esta política de privacidade se
        aplica apenas ao nosso site. Recomendamos que você leia as políticas de privacidade
        de qualquer site que visite através de nossos links.
      </p>
    </PrivacySection>
  )
}

export function AlteracoesSection() {
  return (
    <PrivacySection
      id="alteracoes"
      title="10. Alterações nesta Política"
      icon="📝"
      iconTint="from-amber-500 to-yellow-500"
      decorationTint="from-amber-100 to-yellow-100"
      decorationCorner="bottom-right"
    >
      <p className="text-sand-700 leading-relaxed text-lg">
        Podemos atualizar esta Política de Privacidade periodicamente. Quando isso
        acontecer, publicaremos a versão atualizada em nosso site com a nova data de
        &quot;última atualização&quot;. Recomendamos que você revise esta política
        regularmente para se manter informado sobre como protegemos suas informações.
      </p>
    </PrivacySection>
  )
}

export function ContatoSection() {
  return (
    <PrivacySection
      id="contato"
      title="11. Contato"
      icon="📞"
      iconTint="from-emerald-500 to-green-500"
      decorationTint="from-emerald-100 to-green-100"
      decorationCorner="top-right"
    >
      <p className="text-sand-700 leading-relaxed text-lg">
        Se você tiver dúvidas sobre esta Política de Privacidade ou sobre como tratamos
        suas informações pessoais, entre em contato conosco através da nossa página de
        contato ou envie um e-mail para nossa equipe.
      </p>
    </PrivacySection>
  )
}
