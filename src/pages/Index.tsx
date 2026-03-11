import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import StackSection from '@/components/StackSection';
import ExperienceSection from '@/components/ExperienceSection';
import WorkStyleSection from '@/components/WorkStyleSection';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <StackSection />
      <ExperienceSection />
      <WorkStyleSection />
      <Footer />
    </div>
  );
};

export default Index;
