import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import StackSection from '@/components/StackSection';
import ExperienceSection from '@/components/ExperienceSection';
import ProjectsSection from '@/components/ProjectsSection';
import WorkStyleSection from '@/components/WorkStyleSection';
import Footer from '@/components/Footer';
import AmbientCursorGlow from '@/components/ui/AmbientCursorGlow';

const Index = () => {
  return (
    <div className="site-shell min-h-screen bg-background">
      <AmbientCursorGlow />
      <Navbar />
      <main>
        <Hero />
        <StackSection />
        <ExperienceSection />
        <ProjectsSection />
        <WorkStyleSection />
        <Footer />
      </main>
    </div>
  );
};

export default Index;
