interface AccountStatusBadgeProps {
  isMember: boolean
}

export default function AccountStatusBadge({ isMember }: AccountStatusBadgeProps) {
  return (
    <div
      className={`inline-flex items-center gap-2 rounded-pill px-4 py-2 text-sm font-semibold ${
        isMember ? 'bg-brand text-white' : 'bg-sand-200 text-sand-700'
      }`}
    >
      <span
        className={`h-2.5 w-2.5 rounded-full ${
          isMember ? 'bg-white' : 'bg-sand-500'
        }`}
        aria-hidden="true"
      />
      {isMember ? 'Acesso de membro ativo' : 'Conta gratuita'}
    </div>
  )
}
