import AdsenseScript from '@/components/AdsenseScript'

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      {children}
      <AdsenseScript />
    </>
  )
}
