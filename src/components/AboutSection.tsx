const commitments = [
  {
    title: 'Relatos autênticos',
    description:
      'Experiências reais que ajudam a construir uma comunidade de apoio mútuo entre famílias.',
  },
  {
    title: 'Ferramentas práticas',
    description:
      'Recursos para tornar a rotina mais leve e previsível, aplicáveis no mesmo dia.',
  },
  {
    title: 'Informação atualizada',
    description:
      'Conteúdo sobre direitos, saúde e educação no contexto do autismo, revisado com fontes públicas.',
  },
  {
    title: 'Espaço para dúvidas',
    description:
      'Um lugar para perguntar, sugerir temas e compartilhar vivências sem julgamento.',
  },
]

const publicationRecord = [
  { term: 'Valores', detail: 'Inclusão · Respeito · Empatia · Apoio' },
  { term: 'Foco editorial', detail: 'Direitos, terapias e planos de saúde' },
  { term: 'Linguagem', detail: 'Simples, sem juridiquês' },
  { term: 'Revisão', detail: 'Contínua, com fontes públicas' },
]

export default function AboutSection() {
  return (
    <section className="border-b border-rule bg-paper">
      <div className="container-custom py-16 md:py-20">
        <div className="border-b border-ink/15 pb-6">
          <p className="eyebrow">O que você encontra aqui</p>
          <h2 className="display mt-3 max-w-[26ch] text-3xl sm:text-4xl">
            Quatro compromissos com quem lê
          </h2>
        </div>

        <ol className="grid gap-x-12 md:grid-cols-2">
          {commitments.map((commitment, index) => (
            <li
              key={commitment.title}
              className="grid grid-cols-[2.5rem_1fr] gap-x-4 border-b border-rule py-6"
            >
              <span aria-hidden="true" className="font-display text-lg text-azul-mid">
                {String(index + 1).padStart(2, '0')}
              </span>
              <div>
                <h3 className="display text-xl">{commitment.title}</h3>
                <p className="mt-2 max-w-[46ch] font-serif text-base leading-relaxed text-ink-soft">
                  {commitment.description}
                </p>
              </div>
            </li>
          ))}
        </ol>

        <div className="mt-16 grid gap-10 lg:grid-cols-[1fr_0.85fr] lg:gap-16">
          <div>
            <h3 className="display text-2xl sm:text-3xl">Nossa missão</h3>
            <p className="mt-4 max-w-[58ch] font-serif text-lg leading-relaxed text-ink-soft">
              Promover mais inclusão, respeito e empatia no dia a dia através de conteúdos
              organizados e acessíveis, com apoio tanto para pessoas autistas quanto para
              familiares, educadores e profissionais.
            </p>
          </div>

          <dl className="self-end border-t border-rule">
            {publicationRecord.map((entry) => (
              <div
                key={entry.term}
                className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-b border-rule py-3"
              >
                <dt className="font-sans text-xs uppercase tracking-[0.14em] text-ink-mute">
                  {entry.term}
                </dt>
                <dd className="font-sans text-sm text-ink">{entry.detail}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  )
}
