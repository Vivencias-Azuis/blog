import Image from 'next/image'

function formatDateTime(isoDate: string) {
  return new Date(isoDate).toLocaleString('pt-BR')
}

export default function PixDonationStatus({
  brCode,
  brCodeBase64,
  expiresAt,
  status,
  ticketUrl,
}: {
  brCode: string
  brCodeBase64: string
  expiresAt: string
  status: 'PENDING' | 'PAID' | 'EXPIRED'
  ticketUrl?: string
}) {
  const statusMessage =
    status === 'PAID'
      ? 'Pagamento confirmado. Obrigado por apoiar o projeto.'
      : status === 'EXPIRED'
        ? 'Este Pix expirou. Gere um novo pagamento para continuar.'
        : 'Use o QR Code ou o código copia e cola para concluir sua doação.'

  return (
    <section className="rounded-block border border-sand-200 bg-white p-6 shadow-card">
      <h3 className="text-xl font-semibold text-sand-900">Pagamento por Pix</h3>
      <p className="mt-2 text-sm text-sand-700">{statusMessage}</p>
      <Image
        src={brCodeBase64}
        alt="QR Code Pix para doação ao Vivências Azuis"
        width={224}
        height={224}
        unoptimized
        className="mx-auto mt-6 rounded-card border border-sand-200 bg-white object-contain p-3"
      />
      <label className="mt-5 block text-sm font-semibold text-sand-800">
        Código copia e cola
        <textarea
          readOnly
          value={brCode}
          className="mt-2 min-h-28 w-full rounded-card border border-sand-200 p-3 text-sm text-sand-700"
        />
      </label>
      {ticketUrl ? (
        <a
          href={ticketUrl}
          target="_blank"
          rel="noreferrer"
          className="btn-secondary mt-5 inline-flex"
        >
          Abrir no Mercado Pago
        </a>
      ) : null}
      <p className="mt-3 text-xs text-sand-500">
        Expira em: {formatDateTime(expiresAt)}
      </p>
    </section>
  )
}
