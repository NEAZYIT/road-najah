// app/page.tsx
import HeroSection from '@/components/home/HeroSection'
import MissionSection from '@/components/home/MissionSection'

export default function Home() {
  return (
    <main className="relative">
      <HeroSection />
      <MissionSection />
    </main>
  )
}