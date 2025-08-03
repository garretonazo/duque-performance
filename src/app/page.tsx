import HeroSection from '@/components/HeroSection'
import StickyNavbar from '@/components/StickyNavbar'
import EntrenaConDuque from '@/components/EntrenaConDuque'

export default async function Home() {
  return (
    <>
      <div className="min-h-screen bg-duque-gray">
        <HeroSection />
        <EntrenaConDuque
          image="/images/deadliftnobg.png"
          alt="Aro Duque"
          title="Entrena con Duque"
          text="Lo mejor que puedes hacer es estar bajo la dirección técnica de especialistas calificados en el Rendimiento Deportivo, de esta manera podrás aprovechar al máximo tu tiempo y conseguir de manera sólida tus objetivos."
        />
        <EntrenaConDuque
          image="/images/balonnobg.png"
          alt="Frank Duque"
          title="Entrena con Frank"
          text="Frank Duque, Profesor de Educación Física egresado de la Universidad Pedagógica Experimental Libertador UPEL, especializado en Rendimiento Deportivo y exjugador profesional de Baloncesto venezolano, lidera DUQUEPERFORMANCE con más de una década de experiencia entrenando atletas de élite y amateur."
        />
      </div>
      <StickyNavbar />
    </>
  )
}
