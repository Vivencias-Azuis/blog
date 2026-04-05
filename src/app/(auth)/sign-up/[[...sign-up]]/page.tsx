import { SignUp } from '@clerk/nextjs'

export default function SignUpPage() {
  return (
    <section className="container-custom py-16">
      <div className="mx-auto max-w-md rounded-card bg-surface p-6 shadow-card">
        <SignUp path="/sign-up" />
      </div>
    </section>
  )
}
