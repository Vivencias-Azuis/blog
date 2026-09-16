import { privacySections } from './privacy-sections'

type PrivacyTableOfContentsProps = {
  activeSection: string
  onNavigate: (sectionId: string) => void
}

export function PrivacyTableOfContents({
  activeSection,
  onNavigate,
}: PrivacyTableOfContentsProps) {
  return (
    <section className="py-12 bg-surface/80 backdrop-blur-sm border-b border-sand-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold gradient-text mb-4">Índice de Conteúdo</h2>
          <div className="w-16 h-1 bg-gradient-to-r from-brand to-brand-soft mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {privacySections.map((section) => (
            <button
              key={section.id}
              onClick={() => onNavigate(section.id)}
              className={`group p-4 rounded-2xl transition-all duration-300 text-left ${
                activeSection === section.id
                  ? 'bg-gradient-to-br from-brand to-blue-900 text-white shadow-lg scale-105'
                  : 'bg-surface/60 hover:bg-surface/80 hover:shadow-md border border-sand-200'
              }`}
            >
              <div className="flex items-center space-x-3">
                <span className="text-2xl group-hover:scale-110 transition-transform duration-300">
                  {section.icon}
                </span>
                <div>
                  <p className="font-semibold text-sm leading-tight">{section.title}</p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
