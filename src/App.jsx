import Header from './components/Header'
import Hero from './components/Hero'
import Challenges from './components/Challenges'
import ConfidentialAI from './components/ConfidentialAI'
import Projects from './components/Projects'
import Team from './components/Team'
import JoinCTA from './components/JoinCTA'
import Footer from './components/Footer'

export default function App() {
  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <Header />
      <Hero />
      <Challenges />
      <ConfidentialAI />
      <Projects />
      <Team />
      <JoinCTA />
      <Footer />
    </div>
  )
}
