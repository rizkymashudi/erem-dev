import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import useTheme from './hooks/useTheme';
import Nav from './components/Nav/Nav';
import Hero from './components/Hero/Hero';
import Marquee from './components/Marquee/Marquee';
import WorkSection from './components/WorkSection/WorkSection';
import SkillsSection from './components/SkillsSection/SkillsSection';
import ExperienceSection from './components/ExperienceSection/ExperienceSection';
import AboutSection from './components/AboutSection/AboutSection';
import Footer from './components/Footer/Footer';

export default function App() {
  const { theme, toggleTheme } = useTheme();
  const lenisRef = useRef(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    lenisRef.current = lenis;

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <>
      <Nav theme={theme} toggleTheme={toggleTheme} />
      <Hero />
      <Marquee
        items={['Swift', 'SwiftUI', 'UIKit', 'Combine', 'Core Data', 'Clean Architecture', 'TDD', 'WatchKit', 'HealthKit', 'CI/CD', 'Domain Driven Design', 'Systems Design']}
        speed="22s"
      />
      <WorkSection />
      <SkillsSection />
      <Marquee
        items={['nbs.co.id', 'Apple Developer Academy', 'Essential Developer Academy', 'MAFINDO', 'Politeknik Negeri Batam', 'PT Asta Satria Investama']}
        separator="·"
        speed="25s"
        reverse
      />
      <ExperienceSection />
      <AboutSection />
      <Footer />
    </>
  );
}
