import { SignIn } from '@clerk/nextjs'

export default function SignInPage() {
  return (
    <section className="container-custom py-16">
      <div className="mx-auto max-w-md rounded-card bg-surface p-6 shadow-card">
        <SignIn path="/sign-in" />
      </div>
    </section>
  )
}
