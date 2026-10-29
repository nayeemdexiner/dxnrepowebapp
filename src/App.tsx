import { useState, useEffect } from 'react';
import { motion, useScroll, useSpring } from 'motion/react';
import ParticleBackground from './components/ParticleBackground';
import ParallaxSection from './components/ParallaxSection';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import EducationSection from './components/EducationSection';
import SkillsSection from './components/SkillsSection';
import SkillsPage from './components/SkillsPage';
import ProjectsSection from './components/ProjectsSection';
import ServicesSection from './components/ServicesSection';
import ContactSection from './components/ContactSection';
import SocialLinks from './components/SocialLinks';
import AppleGlassCurvedSides from './components/AppleGlassCurvedSides';
import ResumeModal from './components/ResumeModal';
import PendingSecretModal from './components/PendingSecretModal';
import { sendVisitorAlert } from './utils/telegram';

export default function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'skills'>('home');
  const [resumeOpen, setResumeOpen] = useState(false);
  const [secretOpen, setSecretOpen] = useState(false);

  // Framer Motion Scroll Progress tracking
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    sendVisitorAlert().catch(() => {});
  }, []);

  const navigateTo = (page: string) => {
    if (page === 'skills') {
      setCurrentPage('skills');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setCurrentPage('home');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-black text-slate-100 relative overflow-x-hidden selection:bg-white selection:text-black">
      {/* Thin, Elegant Horizontal Scroll Progress Bar */}
      <motion.div
        style={{ scaleX }}
        className="fixed top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-neutral-400 via-white to-neutral-400 origin-left z-[100] pointer-events-none shadow-[0_0_10px_rgba(255,255,255,0.7),0_0_18px_rgba(255,255,255,0.3)]"
      />

      {/* Deep Black Ambient Cyber Background */}
      <ParticleBackground />

      {/* Apple-Style Curved Translucent Glass Screen Edges */}
      <AppleGlassCurvedSides />

      {/* Sticky Glassmorphic Navbar */}
      <Navbar
        currentPage={currentPage}
        onNavigate={navigateTo}
        onOpenResume={() => setResumeOpen(true)}
        onOpenSecret={() => setSecretOpen(true)}
      />

      {/* Main Content Flow */}
      {currentPage === 'skills' ? (
        <SkillsPage onBack={() => navigateTo('home')} />
      ) : (
        <main className="relative z-10 space-y-4">
          {/* 1. Hero Section */}
          <HeroSection
            onOpenResume={() => setResumeOpen(true)}
            onOpenSecret={() => setSecretOpen(true)}
          />

          {/* 2. About Me Section */}
          <ParallaxSection offset={22}>
            <AboutSection />
          </ParallaxSection>

          {/* 3. Education */}
          <ParallaxSection offset={28}>
            <EducationSection />
          </ParallaxSection>

          {/* 4. Skills Section (With Capsule Accordion + Dedicated Page Navigation Link) */}
          <ParallaxSection offset={24}>
            <SkillsSection onOpenSkillsPage={() => navigateTo('skills')} />
          </ParallaxSection>

          {/* 5. Projects Section */}
          <ParallaxSection offset={30}>
            <ProjectsSection />
          </ParallaxSection>

          {/* 6. Services Section */}
          <ParallaxSection offset={25}>
            <ServicesSection />
          </ParallaxSection>

          {/* 7. Contact Section */}
          <ParallaxSection offset={28}>
            <ContactSection />
          </ParallaxSection>

          {/* 8. Social Links */}
          <ParallaxSection offset={20}>
            <SocialLinks />
          </ParallaxSection>
        </main>
      )}

      {/* Curriculum Vitae Modal */}
      <ResumeModal
        isOpen={resumeOpen}
        onClose={() => setResumeOpen(false)}
      />

      {/* Secret VIP Modal */}
      <PendingSecretModal
        isOpen={secretOpen}
        onClose={() => setSecretOpen(false)}
      />
    </div>
  );
}
