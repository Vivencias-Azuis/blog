import { PrivacyBulletList, PrivacyCallout, PrivacyCard, PrivacySection } from '../privacy-layout'

const ICON_PERSON = 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z'
const ICON_ANALYTICS =
  'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z'
const ICON_CHECK = 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
const ICON_MAIL =
  'M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'
const ICON_INFO = 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'

export function IntroducaoSection() {
  return (
    <PrivacySection
      id="introducao"
      title="1. Introdução"
      icon="🔍"
      iconTint="from-brand to-blue-900"
      decorationTint="from-brand/10 to-blue-900/10"
      decorationCorner="top-left"
    >
      <p className="text-sand-700 leading-relaxed text-lg">
        O <strong className="text-link">Vivências Azuis</strong> está comprometido em
        proteger sua privacidade e dados pessoais. Esta Política de Privacidade explica
        como coletamos, utilizamos, armazenamos e protegemos suas informações quando você
        visita nosso site ou interage conosco.
      </p>
    </PrivacySection>
  )
}

export function ColetaSection() {
  return (
    <PrivacySection
      id="coletamos"
      title="2. Informações que Coletamos"
      icon="📊"
      iconTint="from-brand-soft to-blue-300"
      decorationTint="from-brand-soft/10 to-blue-300/10"
      decorationCorner="bottom-right"
      headerGap="mb-8"
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <PrivacyCard
          title="Informações Voluntárias"
          iconPath={ICON_PERSON}
          tint="from-brand/5 to-blue-900/5"
          borderTint="border-brand/10"
          iconTint="from-brand to-blue-900"
          titleTone="text-sand-900"
        >
          <PrivacyBulletList
            items={[
              'Nome e endereço de e-mail',
              'Mensagens e comunicações',
              'Formulários de contato',
              'Comentários e interações',
            ]}
            textTone="text-sand-700"
          />
        </PrivacyCard>

        <PrivacyCard
          title="Coleta Automática"
          iconPath={ICON_ANALYTICS}
          tint="from-brand-soft/5 to-blue-300/5"
          borderTint="border-brand-soft/10"
          iconTint="from-brand-soft to-blue-300"
          titleTone="text-sand-900"
        >
          <PrivacyBulletList
            items={[
              'Endereço IP e localização',
              'Navegador e sistema operacional',
              'Páginas visitadas e tempo',
              'Data e hora de acesso',
            ]}
            dotTone="bg-brand-soft"
            textTone="text-sand-700"
          />
        </PrivacyCard>

        <PrivacyCard
          title="Cookies"
          iconPath={ICON_CHECK}
          tint="from-sand-300/5 to-orange-400/5"
          borderTint="border-sand-300/10"
          iconTint="from-sand-300 to-orange-400"
          titleTone="text-sand-900"
        >
          <p className="text-sand-700 leading-relaxed">
            Utilizamos cookies e tecnologias similares para melhorar sua experiência,
            analisar o uso do site e personalizar conteúdo. Você pode gerenciar suas
            preferências através das configurações do seu navegador.
          </p>
        </PrivacyCard>
      </div>
    </PrivacySection>
  )
}

export function UtilizacaoSection() {
  return (
    <PrivacySection
      id="utilizamos"
      title="3. Como Utilizamos suas Informações"
      icon="⚙️"
      iconTint="from-sand-300 to-orange-400"
      decorationTint="from-sand-300/10 to-orange-400/10"
      decorationCorner="top-right"
      headerGap="mb-8"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <PrivacyCard
          title="Finalidades Principais"
          iconPath={ICON_CHECK}
          tint="from-brand/5 to-blue-900/5"
          borderTint="border-brand/10"
          iconTint="from-brand to-blue-900"
          titleTone="text-sand-900"
          titleSize="text-xl"
          headerGap="mb-6"
        >
          <PrivacyBulletList
            items={[
              'Responder às suas mensagens e solicitações de contato',
              'Melhorar o conteúdo e funcionalidades do site',
              'Analisar o uso do site para otimizar a experiência',
              'Garantir a segurança e prevenir atividades fraudulentas',
              'Cumprir obrigações legais e regulamentares',
            ]}
            textTone="text-sand-700"
            spacing="space-y-3"
          />
        </PrivacyCard>

        <PrivacyCard
          title="Comunicações"
          iconPath={ICON_MAIL}
          tint="from-brand-soft/5 to-blue-300/5"
          borderTint="border-brand-soft/10"
          iconTint="from-brand-soft to-blue-300"
          titleTone="text-sand-900"
          titleSize="text-xl"
          headerGap="mb-6"
        >
          <p className="text-sand-700 leading-relaxed">
            Utilizamos seu e-mail apenas para responder às suas mensagens e, se você optar
            por receber, para enviar atualizações sobre nosso conteúdo. Você pode cancelar
            essas comunicações a qualquer momento.
          </p>
          <PrivacyCallout
            surface="bg-surface/50"
            iconPath={ICON_INFO}
            iconTone="text-brand-soft"
            textTone="text-sand-900"
          >
            Você tem controle total sobre suas comunicações
          </PrivacyCallout>
        </PrivacyCard>
      </div>
    </PrivacySection>
  )
}
