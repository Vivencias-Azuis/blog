import Hero from '@/components/Hero'
import FeaturedPosts from '@/components/FeaturedPosts'
import AboutSection from '@/components/AboutSection'

export default function Home() {
  return (
    <div className="overflow-x-hidden">
      <Hero />
      <FeaturedPosts />
      <AboutSection />
    </div>
  )
}