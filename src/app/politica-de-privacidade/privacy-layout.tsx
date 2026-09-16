import type { ReactNode } from 'react'

const decorationAnchors = {
  'top-left': 'top-0 left-0',
  'top-right': 'top-0 right-0',
  'bottom-left': 'bottom-0 left-0',
  'bottom-right': 'bottom-0 right-0',
} as const

const decorationOffsets = {
  'top-left': '-translate-y-16 -translate-x-16',
  'top-right': '-translate-y-16 translate-x-16',
  'bottom-left': 'translate-y-16 -translate-x-16',
  'bottom-right': 'translate-y-16 translate-x-16',
} as const

export type DecorationCorner = keyof typeof decorationAnchors

export function PrivacyIcon({
  path,
  className = 'w-5 h-5 text-white',
}: {
  path: string
  className?: string
}) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={path} />
    </svg>
  )
}

// Same dot pattern sits behind the hero and the closing commitment block.
export function DotPatternOverlay() {
  return (
    <div className="absolute inset-0 opacity-10">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      ></div>
    </div>
  )
}

type PrivacySectionProps = {
  id: string
  title: string
  icon: string
  iconTint: string
  decorationTint: string
  decorationCorner?: DecorationCorner
  headerGap?: 'mb-6' | 'mb-8'
  children: ReactNode
}

export function PrivacySection({
  id,
  title,
  icon,
  iconTint,
  decorationTint,
  decorationCorner = 'top-left',
  headerGap = 'mb-6',
  children,
}: PrivacySectionProps) {
  return (
    <section id={id} className="mb-16">
      <div className="card-modern p-8 relative overflow-hidden">
        <div
          className={`absolute ${decorationAnchors[decorationCorner]} w-32 h-32 bg-gradient-to-br ${decorationTint} rounded-full ${decorationOffsets[decorationCorner]}`}
        ></div>
        <div className="relative">
          <div className={`flex items-center ${headerGap}`}>
            <div
              className={`w-12 h-12 bg-gradient-to-br ${iconTint} rounded-xl flex items-center justify-center mr-4`}
            >
              <span className="text-2xl">{icon}</span>
            </div>
            <h2 className="text-3xl font-bold gradient-text">{title}</h2>
          </div>
          {children}
        </div>
      </div>
    </section>
  )
}

type PrivacyBulletListProps = {
  items: readonly string[]
  dotTone?: string
  textTone?: string
  spacing?: 'space-y-2' | 'space-y-3'
}

export function PrivacyBulletList({
  items,
  dotTone = 'bg-brand',
  textTone,
  spacing = 'space-y-2',
}: PrivacyBulletListProps) {
  return (
    <ul className={spacing}>
      {items.map((item) => (
        <li key={item} className="flex items-start">
          <span
            className={`w-2 h-2 ${dotTone} rounded-full mt-2 mr-3 flex-shrink-0`}
          ></span>
          {textTone ? <span className={textTone}>{item}</span> : item}
        </li>
      ))}
    </ul>
  )
}

type PrivacyCardProps = {
  title: string
  iconPath: string
  tint: string
  borderTint: string
  iconTint: string
  titleTone: string
  titleSize?: 'text-lg' | 'text-xl'
  headerGap?: 'mb-4' | 'mb-6'
  children: ReactNode
}

export function PrivacyCard({
  title,
  iconPath,
  tint,
  borderTint,
  iconTint,
  titleTone,
  titleSize = 'text-lg',
  headerGap = 'mb-4',
  children,
}: PrivacyCardProps) {
  return (
    <div className="group">
      <div
        className={`bg-gradient-to-br ${tint} p-6 rounded-2xl border ${borderTint} hover:shadow-lg transition-all duration-300`}
      >
        <div className={`flex items-center ${headerGap}`}>
          <div
            className={`w-10 h-10 bg-gradient-to-br ${iconTint} rounded-lg flex items-center justify-center mr-3`}
          >
            <PrivacyIcon path={iconPath} />
          </div>
          <h3 className={`${titleSize} font-bold ${titleTone}`}>{title}</h3>
        </div>
        {children}
      </div>
    </div>
  )
}

type PrivacyCalloutProps = {
  surface: string
  iconPath: string
  iconTone: string
  textTone: string
  children: ReactNode
}

export function PrivacyCallout({
  surface,
  iconPath,
  iconTone,
  textTone,
  children,
}: PrivacyCalloutProps) {
  return (
    <div className={`mt-4 p-4 ${surface} rounded-xl`}>
      <div className="flex items-center">
        <PrivacyIcon path={iconPath} className={`w-5 h-5 ${iconTone} mr-2`} />
        <span className={`text-sm font-medium ${textTone}`}>{children}</span>
      </div>
    </div>
  )
}
