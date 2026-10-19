import { SignUp } from '@clerk/nextjs'
import { generatePageMetadata } from '@/lib/metadata'

export const metadata = generatePageMetadata({
  title: 'Criar conta',
  description: 'Crie sua conta no Vivências Azuis.',
  path: '/sign-up',
})

export default function SignUpPage() {
  return (
    <section className="container-custom py-16">
      <div className="mx-auto max-w-md rounded-card bg-surface p-6 shadow-card">
        <SignUp path="/sign-up" />
      </div>
    </section>
  )
}
