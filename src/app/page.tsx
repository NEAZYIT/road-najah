// app/page.tsx
import HeroSection from '@/components/home/HeroSection'
import MissionSection from '@/components/home/MissionSection'
import CardSection from '@/components/home/CardSection'
import EventSoon from '@/components/home/EventSoon'
import ContactSection from '@/components/home/ContactSection'

export default function Home() {
  return (
    <main className="relative">
      <HeroSection />
      <MissionSection />
      <CardSection />
      <EventSoon />
      <ContactSection />
    </main>
  )
}