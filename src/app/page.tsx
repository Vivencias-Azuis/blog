import Hero from '@/components/Hero'
import FeaturedPosts from '@/components/FeaturedPosts'
import AboutSection from '@/components/AboutSection'
import AdPosition from '@/components/AdPosition'

export default function Home() {
  return (
    <div className="overflow-x-hidden">
      <Hero />
      
      {/* Anúncio Content-Top na Home */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <AdPosition
          position="content-top"
          currentPage="home"
          className="mb-8"
        />
      </div>
      
      <FeaturedPosts />
      <AboutSection />
    </div>
  )
}