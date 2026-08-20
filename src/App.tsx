import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useSpring, AnimatePresence } from 'framer-motion';
import { BIKES, type BikeData } from './data/bikes';
import Navbar from './components/Navbar';
import ProductSelector from './components/ProductSelector';
import HeroContent from './components/HeroContent';
import HeroBike from './components/HeroBike';
import SocialRail from './components/SocialRail';
import TechSection from './components/TechSection';
import ExperienceSection from './components/ExperienceSection';
import Footer from './components/Footer';
import Loader from './components/Loader';
import AboutSection from './components/AboutSection';
import { MarqueeText } from './components/MarqueeText';
import { GionatanDock } from './components/GionatanDock';
import { GravityStarsBackground } from './components/GravityStarsBackground';

function App() {
  const [selectedBike, setSelectedBike] = useState<BikeData>(BIKES[0]);
  const [currentSection, setCurrentSection] = useState<string>('hero');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isFolderUnlocked, setIsFolderUnlocked] = useState<boolean>(false);

  // Ref tags for scrolling
  const heroRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const techRef = useRef<HTMLDivElement>(null);
  const experienceRef = useRef<HTMLDivElement>(null);

  // Scroll progress bar configuration
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Track active section via IntersectionObserver
  useEffect(() => {
    if (isLoading) return;

    const options = {
      root: null,
      rootMargin: '-30% 0px -50% 0px',
      threshold: 0.1,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setCurrentSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, options);

    if (heroRef.current) observer.observe(heroRef.current);
    if (aboutRef.current) observer.observe(aboutRef.current);
    if (techRef.current) observer.observe(techRef.current);
    if (experienceRef.current) observer.observe(experienceRef.current);

    return () => {
      observer.disconnect();
    };
  }, [isLoading]);

  // Preload crucial image assets
  useEffect(() => {
    BIKES.forEach((bike) => {
      const img = new Image();
      img.src = bike.image;
      
      bike.details.forEach((det) => {
        const detImg = new Image();
        detImg.src = det.image;
      });
    });

    const listImg = new Image();
    listImg.src = '/assets/lifestyle_hero.jpg';

    // Reset scroll viewport to top on load
    window.scrollTo({ top: 0, left: 0 });
  }, []);

  const handleBikeSelect = (bike: BikeData) => {
    setSelectedBike(bike);
  };

  const handleNavigate = (sectionId: string) => {
    let targetElement: HTMLElement | null = null;
    
    if (sectionId === 'about') {
      targetElement = aboutRef.current;
    } else if (sectionId === 'product' || sectionId === 'hero') {
      targetElement = heroRef.current;
    } else if (sectionId === 'technology') {
      targetElement = techRef.current;
    } else if (sectionId === 'reviews') {
      targetElement = experienceRef.current;
    }

    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Intro Loader Animation */}
      <AnimatePresence>
        {isLoading && (
          <Loader 
            onComplete={() => { 
              setIsLoading(false); 
              setIsFolderUnlocked(true); 
            }} 
          />
        )}
      </AnimatePresence>

      <div className="relative min-h-screen bg-[#05070C] overflow-x-hidden bg-grid-pattern selection:bg-[#D47844]/30 selection:text-white scroll-smooth">
        {/* Top scroll progress indicator */}
        <motion.div 
          className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#D47844] to-[#06B6D4] z-50 origin-left"
          style={{ scaleX }}
        />

        {/* Dynamic Background Aura */}
        <div 
          className="fixed top-0 right-0 w-[50vw] h-[50vh] blur-[150px] opacity-10 rounded-full transition-all duration-1000 ease-out pointer-events-none z-0"
          style={{ backgroundColor: selectedBike.accentColor }}
        />
        
        {/* Fixed interactive gravity stars backdrop (binds to selected bike's accent color!) */}
        {isFolderUnlocked && (
          <div className="fixed inset-0 w-full h-full pointer-events-none z-0">
            <GravityStarsBackground color={selectedBike.accentColor} />
          </div>
        )}

        {/* Top Navbar */}
        <Navbar currentSection={currentSection} onNavigate={handleNavigate} />

        {/* Screen 01 - Hero Section */}
        <div id="hero" ref={heroRef}>
          <section className="relative w-full min-h-screen pt-24 pb-12 px-6 md:px-12 flex items-center justify-center overflow-hidden">
            {/* Interactive Background Marquee Text */}
            {isFolderUnlocked && (
              <div className="absolute top-[40%] left-0 right-0 w-full overflow-hidden pointer-events-auto z-0 select-none">
                <MarqueeText text={`${selectedBike.brand} ${selectedBike.name} • `} />
              </div>
            )}
            <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-8 items-center relative z-10">
              
              {/* Left Column: Product Selector */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={isFolderUnlocked ? { opacity: 1, x: 0 } : { opacity: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="order-3 lg:order-1 z-20 flex justify-center lg:justify-start"
              >
                <ProductSelector
                  bikes={BIKES}
                  selectedBike={selectedBike}
                  onSelect={handleBikeSelect}
                />
              </motion.div>

              {/* Center/Right Combined area */}
              <div className="order-1 lg:order-2 grid grid-cols-1 lg:grid-cols-[1.1fr_1.2fr] gap-4 items-center w-full z-10">
                {/* Left Content */}
                <motion.div
                  initial={{ opacity: 0, y: 35 }}
                  animate={isFolderUnlocked ? { opacity: 1, y: 0 } : { opacity: 0 }}
                  transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="flex justify-center lg:justify-start"
                >
                  <HeroContent 
                    bike={selectedBike} 
                    onExploreTech={() => handleNavigate('technology')} 
                  />
                </motion.div>

                {/* Right Bike Presentation */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={isFolderUnlocked ? { opacity: 1, scale: 1 } : { opacity: 0 }}
                  transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className="w-full flex justify-center"
                >
                  <HeroBike bike={selectedBike} />
                </motion.div>
              </div>
            </div>

            {/* Right Corner Social Rail */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isFolderUnlocked ? { opacity: 1, y: 0 } : { opacity: 0 }}
              transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="absolute right-6 bottom-12 hidden lg:flex z-20"
            >
              <SocialRail />
            </motion.div>
          </section>
        </div>

        {/* Screen About - Brand Overview */}
        <div id="about" ref={aboutRef}>
          <AboutSection />
        </div>

        {/* Screen 02 - Technology Section */}
        <div id="technology" ref={techRef}>
          <TechSection bike={selectedBike} />
        </div>

        {/* Screen 03 - Experience & Purchase Section */}
        <div id="reviews" ref={experienceRef}>
          <ExperienceSection 
            bike={selectedBike} 
            bikes={BIKES}
            onSelectBike={handleBikeSelect}
            onBuyNow={() => console.log('Initiated checkout flow')}
          />
        </div>



        {/* Brand Footer */}
        <Footer onScrollToTop={() => handleNavigate('hero')} />

        {/* Floating social/navigation Dock */}
        {isFolderUnlocked && <GionatanDock onNavigate={handleNavigate} />}
      </div>
    </>
  );
}

export default App;
