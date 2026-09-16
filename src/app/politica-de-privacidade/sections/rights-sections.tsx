import { PrivacyBulletList, PrivacyCallout, PrivacyCard, PrivacySection } from '../privacy-layout'

const ICON_CHECK = 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
const ICON_LOCK =
  'M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z'
const ICON_SHIELD =
  'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z'
const ICON_INFO = 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
const ICON_WARNING =
  'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z'
const ICON_HELP =
  'M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
const ICON_CLOCK = 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z'

const lgpdRights = [
  { term: 'Acesso', description: 'Informações sobre seus dados' },
  { term: 'Correção', description: 'Corrigir dados incorretos' },
  { term: 'Exclusão', description: 'Remoção de seus dados' },
  { term: 'Portabilidade', description: 'Transferir dados' },
  { term: 'Oposição', description: 'Opor-se ao tratamento' },
  { term: 'Informação', description: 'Detalhes sobre uso' },
]

function LgpdRightItem({ term, description }: { term: string; description: string }) {
  return (
    <div className="flex items-start">
      <span className="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
      <div>
        <strong className="text-purple-700">{term}:</strong>
        <p className="text-sand-700 text-sm">{description}</p>
      </div>
    </div>
  )
}

export function CompartilhamentoSection() {
  return (
    <PrivacySection
      id="compartilhamos"
      title="4. Compartilhamento de Informações"
      icon="🤝"
      iconTint="from-brand to-brand-soft"
      decorationTint="from-brand/10 to-brand-soft/10"
      decorationCorner="bottom-left"
      headerGap="mb-8"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <PrivacyCard
          title="Não Vendemos Dados"
          iconPath={ICON_LOCK}
          tint="from-green-50 to-emerald-50"
          borderTint="border-green-200"
          iconTint="from-green-500 to-emerald-500"
          titleTone="text-green-800"
          titleSize="text-xl"
          headerGap="mb-6"
        >
          <p className="text-sand-700 leading-relaxed">
            Não vendemos, alugamos ou comercializamos suas informações pessoais para
            terceiros. Seus dados são utilizados exclusivamente para os fins descritos
            nesta política.
          </p>
          <PrivacyCallout
            surface="bg-green-100"
            iconPath={ICON_CHECK}
            iconTone="text-green-600"
            textTone="text-green-800"
          >
            Seus dados são 100% seus
          </PrivacyCallout>
        </PrivacyCard>

        <PrivacyCard
          title="Compartilhamento Limitado"
          iconPath={ICON_SHIELD}
          tint="from-brand/5 to-blue-900/5"
          borderTint="border-brand/10"
          iconTint="from-brand to-blue-900"
          titleTone="text-sand-900"
          titleSize="text-xl"
          headerGap="mb-6"
        >
          <p className="text-sand-700 leading-relaxed mb-4">
            Podemos compartilhar informações apenas nas seguintes situações:
          </p>
          <PrivacyBulletList
            items={[
              'Com seu consentimento explícito',
              'Para cumprir obrigações legais ou ordens judiciais',
              'Para proteger nossos direitos, propriedade ou segurança',
              'Com prestadores de serviços (sob acordos de confidencialidade)',
            ]}
            textTone="text-sand-700"
          />
        </PrivacyCard>
      </div>
    </PrivacySection>
  )
}

export function SegurancaSection() {
  return (
    <PrivacySection
      id="seguranca"
      title="5. Segurança dos Dados"
      icon="🔒"
      iconTint="from-red-500 to-orange-500"
      decorationTint="from-red-100 to-orange-100"
      decorationCorner="top-left"
      headerGap="mb-8"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <PrivacyCard
          title="Medidas de Proteção"
          iconPath={ICON_SHIELD}
          tint="from-red-50 to-orange-50"
          borderTint="border-red-200"
          iconTint="from-red-500 to-orange-500"
          titleTone="text-red-800"
          titleSize="text-xl"
          headerGap="mb-6"
        >
          <PrivacyBulletList
            items={[
              'Conexões seguras (HTTPS/SSL)',
              'Armazenamento seguro com criptografia',
              'Acesso restrito às informações pessoais',
              'Monitoramento regular de segurança',
              'Atualizações constantes de sistemas',
            ]}
            dotTone="bg-red-500"
            textTone="text-sand-700"
            spacing="space-y-3"
          />
        </PrivacyCard>

        <PrivacyCard
          title="Limitações"
          iconPath={ICON_INFO}
          tint="from-yellow-50 to-orange-50"
          borderTint="border-yellow-200"
          iconTint="from-yellow-500 to-orange-500"
          titleTone="text-yellow-800"
          titleSize="text-xl"
          headerGap="mb-6"
        >
          <p className="text-sand-700 leading-relaxed">
            Embora implementemos medidas rigorosas de segurança, nenhum método de
            transmissão ou armazenamento é 100% seguro. Não podemos garantir segurança
            absoluta, mas nos comprometemos a proteger suas informações da melhor forma
            possível.
          </p>
          <PrivacyCallout
            surface="bg-yellow-100"
            iconPath={ICON_WARNING}
            iconTone="text-yellow-600"
            textTone="text-yellow-800"
          >
            Compromisso com a proteção máxima
          </PrivacyCallout>
        </PrivacyCard>
      </div>
    </PrivacySection>
  )
}

export function DireitosSection() {
  return (
    <PrivacySection
      id="direitos"
      title="6. Seus Direitos"
      icon="⚖️"
      iconTint="from-purple-500 to-blue-500"
      decorationTint="from-purple-100 to-blue-100"
      decorationCorner="bottom-right"
      headerGap="mb-8"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <PrivacyCard
          title="Direitos Fundamentais (LGPD)"
          iconPath={ICON_CHECK}
          tint="from-purple-50 to-blue-50"
          borderTint="border-purple-200"
          iconTint="from-purple-500 to-blue-500"
          titleTone="text-purple-800"
          titleSize="text-xl"
          headerGap="mb-6"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {lgpdRights.map((right) => (
              <LgpdRightItem
                key={right.term}
                term={right.term}
                description={right.description}
              />
            ))}
          </div>
        </PrivacyCard>

        <PrivacyCard
          title="Como Exercer seus Direitos"
          iconPath={ICON_HELP}
          tint="from-blue-50 to-cyan-50"
          borderTint="border-blue-200"
          iconTint="from-blue-500 to-cyan-500"
          titleTone="text-blue-800"
          titleSize="text-xl"
          headerGap="mb-6"
        >
          <p className="text-sand-700 leading-relaxed mb-4">
            Para exercer qualquer um desses direitos, entre em contato conosco através da
            nossa página de contato. Responderemos em até 15 dias úteis.
          </p>
          <PrivacyCallout
            surface="bg-brand-soft"
            iconPath={ICON_CLOCK}
            iconTone="text-blue-600"
            textTone="text-blue-800"
          >
            Resposta garantida em até 15 dias úteis
          </PrivacyCallout>
        </PrivacyCard>
      </div>
    </PrivacySection>
  )
}
