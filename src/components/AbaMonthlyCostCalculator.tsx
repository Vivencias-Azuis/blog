'use client'

import { useId, useState } from 'react'
import Link from 'next/link'

import { estimateAbaMonthlyCost, formatAbaMonthlyCost } from '@/lib/aba-monthly-cost'
import { FOOTER_GUIDE_LINKS } from '@/lib/search-hubs'

const PLANOS_HREF = FOOTER_GUIDE_LINKS[1].href

function parsePositiveNumber(raw: string): number | null {
  const normalized = raw.trim().replace(',', '.')
  if (normalized === '') return null
  const value = Number(normalized)
  if (!Number.isFinite(value) || value <= 0) return null
  return value
}

function Field({
  id,
  label,
  value,
  onChange,
}: {
  id: string
  label: string
  value: string
  onChange: (value: string) => void
}) {
  return (
    <div>
      <label htmlFor={id} className="font-sans text-sm font-semibold text-ink">
        {label}
      </label>
      <input
        id={id}
        type="number"
        inputMode="decimal"
        min={0}
        step="0.01"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="mt-2 w-full border border-rule bg-paper px-3 py-2 font-sans text-ink focus:border-azul focus:outline-none focus:ring-2 focus:ring-azul/20"
      />
    </div>
  )
}

export default function AbaMonthlyCostCalculator() {
  const sessionId = useId()
  const weeklyId = useId()
  const [sessionRaw, setSessionRaw] = useState('')
  const [weeklyRaw, setWeeklyRaw] = useState('')
  const session = parsePositiveNumber(sessionRaw)
  const weekly = parsePositiveNumber(weeklyRaw)
  const monthly =
    session === null || weekly === null ? null : estimateAbaMonthlyCost(session, weekly)

  return (
    <aside className="not-prose my-8 border border-rule bg-paper-deep p-5 sm:p-6">
      <p className="eyebrow text-clay">Conta do mês</p>
      <p className="mt-2 max-w-[42ch] font-serif text-base text-ink-soft">
        Valor da sessão vezes sessões na semana vezes 4,3 semanas.
      </p>
      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <Field id={sessionId} label="Valor da sessão (R$)" value={sessionRaw} onChange={setSessionRaw} />
        <Field
          id={weeklyId}
          label="Sessões por semana"
          value={weeklyRaw}
          onChange={setWeeklyRaw}
        />
      </div>
      {monthly !== null ? (
        <p role="status" aria-live="polite" className="display mt-6 text-3xl text-ink">
          {formatAbaMonthlyCost(monthly)}{' '}
          <span className="mt-1 block font-sans text-xs font-semibold uppercase tracking-[0.2em] text-ink-mute">
            por mês, estimativa
          </span>
        </p>
      ) : null}
      <p className="mt-4 font-sans text-sm text-ink-mute">
        Não é orçamento de clínica. Cidade, equipe e formato mudam o valor.
      </p>
      <Link
        href={PLANOS_HREF}
        data-cta="aba_calculator_plano_cobre"
        data-cta-location="aba_monthly_cost"
        className="mt-5 inline-flex font-sans text-sm font-semibold text-azul underline decoration-rule-strong underline-offset-4 hover:decoration-azul"
      >
        Meu plano cobre?
      </Link>
    </aside>
  )
}
