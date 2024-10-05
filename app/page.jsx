import Header from '@/components/Header'
import Hero from '@/components/Hero'
import Features from '@/components/Features'
import { FooterComponent } from '@/components/Footer'

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-yellow-50 via-white to-red-50">
      <Header />
      <main className="flex-1">
        <Hero />
        <Features />
      </main>
      <FooterComponent />
    </div>
  )
}