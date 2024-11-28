// app/page.tsx
import HeroSection from '@/components/home/HeroSection'
import MissionSection from '@/components/home/MissionSection'
import CardSection from '@/components/home/CardSection'

export default function Home() {
  return (
    <main className="relative">
      <HeroSection />
      <MissionSection />
      <CardSection />
    </main>
  )
}