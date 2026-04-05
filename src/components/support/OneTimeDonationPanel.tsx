import { useId, useState } from 'react'

function formatCurrency(amountInCents: number) {
  return (amountInCents / 100).toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  })
}

function formatInputValue(rawDigits: string) {
  if (!rawDigits) {
    return ''
  }

  const amountInCents = Number(rawDigits)
  return formatCurrency(amountInCents)
}

export default function OneTimeDonationPanel({
  suggestions,
  selectedAmount,
  onAmountChange,
  paymentMethod,
  onPaymentMethodChange,
  payerEmail,
  onPayerEmailChange,
  onDonate,
  loading,
}: {
  suggestions: readonly number[]
  selectedAmount: number
  onAmountChange: (value: number) => void
  paymentMethod: 'card' | 'pix'
  onPaymentMethodChange: (value: 'card' | 'pix') => void
  payerEmail: string
  onPayerEmailChange: (value: string) => void
  onDonate: () => void
  loading: boolean
}) {
  const [rawDigits, setRawDigits] = useState('')
  const inputId = useId()
  const emailInputId = useId()

  return (
    <section className="mt-16 rounded-block border border-sand-200 bg-surface p-6 shadow-overlay md:p-8">
      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-link">
        Doação avulsa
      </p>
      <h2 className="mt-2 text-3xl font-bold text-sand-900">
        Prefere ajudar uma vez?
      </h2>
      <p className="mt-3 max-w-2xl text-sand-700">
        Faça uma contribuição única por Pix ou cartão.
      </p>

      <div className="mt-6 flex flex-wrap gap-3">
        {suggestions.map((amount) => (
          <button
            key={amount}
            type="button"
            className={`rounded-pill px-4 py-2 text-sm font-semibold transition-colors ${
              selectedAmount === amount
                ? 'bg-brand text-white'
                : 'bg-white text-sand-700 shadow-sm'
            }`}
            onClick={() => onAmountChange(amount)}
          >
            {formatCurrency(amount)}
          </button>
        ))}
      </div>

      <label htmlFor={inputId} className="mt-6 block text-sm font-semibold text-sand-800">
        Outro valor
      </label>
      <input
        id={inputId}
        value={formatInputValue(rawDigits)}
        onChange={(event) => {
          const digits = event.target.value.replace(/\D/g, '')
          setRawDigits(digits)
          const numericValue = Number(digits)
          if (numericValue >= 500) {
            onAmountChange(numericValue)
          }
        }}
        inputMode="numeric"
        className="mt-2 w-full rounded-card border border-sand-200 px-4 py-3 text-sand-800"
        placeholder="Digite um valor livre"
      />

      <div className="mt-6 flex flex-wrap gap-3">
        <button
          type="button"
          className={`rounded-pill px-4 py-2 text-sm font-semibold transition-colors ${
            paymentMethod === 'pix'
              ? 'bg-brand text-white'
              : 'bg-white text-sand-700 shadow-sm'
          }`}
          onClick={() => onPaymentMethodChange('pix')}
        >
          Pix
        </button>
        <button
          type="button"
          className={`rounded-pill px-4 py-2 text-sm font-semibold transition-colors ${
            paymentMethod === 'card'
              ? 'bg-brand text-white'
              : 'bg-white text-sand-700 shadow-sm'
          }`}
          onClick={() => onPaymentMethodChange('card')}
        >
          Cartão
        </button>
      </div>

      <p className="mt-4 text-sm text-sand-600">
        Doação avulsa por Pix ou cartão
      </p>

      {paymentMethod === 'pix' ? (
        <>
          <label
            htmlFor={emailInputId}
            className="mt-6 block text-sm font-semibold text-sand-800"
          >
            Seu e-mail
          </label>
          <input
            id={emailInputId}
            type="email"
            value={payerEmail}
            onChange={(event) => onPayerEmailChange(event.target.value)}
            className="mt-2 w-full rounded-card border border-sand-200 px-4 py-3 text-sand-800"
            placeholder="voce@exemplo.com"
            autoComplete="email"
          />
          <p className="mt-2 text-xs text-sand-500">
            Usado para gerar e identificar seu pagamento via Pix.
          </p>
        </>
      ) : null}

      <button
        type="button"
        className="btn-primary mt-6 disabled:cursor-wait disabled:opacity-80"
        disabled={loading}
        onClick={onDonate}
      >
        {loading ? 'Preparando pagamento...' : 'Quero doar uma vez'}
      </button>
    </section>
  )
}
