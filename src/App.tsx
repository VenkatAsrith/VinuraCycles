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
import { ChromaGrid } from './components/ChromaGrid';
import { Stack } from './components/Stack';

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

        {/* Creative Assembly Studio / Team Showcase */}
        {isFolderUnlocked && (
          <div className="w-full max-w-7xl mx-auto px-6 md:px-12 py-20 border-t border-white/5 relative z-10 text-left">
            <span className="text-[10px] tracking-[0.2em] text-slate-500 uppercase font-semibold mb-8 block">
              Assembly Studio
            </span>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-12">
              <div className="max-w-xl">
                <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white uppercase leading-none font-display mb-4">
                  CREATIVE CREW
                </h2>
                <p className="text-slate-400 text-sm font-light leading-relaxed">
                  The designers, engineers, and software architects behind the Vinura Cycles cybernetic ecosystem.
                </p>
              </div>

              {/* Interactive Photos Stack (from user prompt) */}
              <div className="w-52 h-52 relative flex-shrink-0 mr-4">
                <Stack
                  randomRotation={true}
                  sensitivity={180}
                  sendToBackOnClick={true}
                  cards={[
                    "https://images.unsplash.com/photo-1480074568708-e7b720bb3f09?q=80&w=500&auto=format",
                    "https://images.unsplash.com/photo-1449844908441-8829872d2607?q=80&w=500&auto=format",
                    "https://images.unsplash.com/photo-1452626212852-811d58933cae?q=80&w=500&auto=format",
                    "https://images.unsplash.com/photo-1572120360610-d971b9d7767c?q=80&w=500&auto=format"
                  ].map((src, i) => (
                    <img 
                      key={i} 
                      src={src} 
                      alt={`card-${i + 1}`} 
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                      className="rounded-xl pointer-events-none select-none"
                    />
                  ))}
                />
              </div>
            </div>
            <ChromaGrid 
              items={[
                {
                  image: "https://github.com/VenkatAsrith.png",
                  title: "Venkat Asrith",
                  subtitle: "Lead Developer & Designer",
                  handle: "@venkatasrith",
                  borderColor: "#D47844",
                  gradient: "linear-gradient(135deg, #D47844, #000)",
                  url: "https://github.com/VenkatAsrith"
                },
                {
                  image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
                  title: "Sarah Johnson",
                  subtitle: "Creative Director",
                  handle: "@sarahjohnson",
                  borderColor: "#06B6D4",
                  gradient: "linear-gradient(135deg, #06B6D4, #000)",
                  url: "https://github.com/sarahjohnson"
                },
                {
                  image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
                  title: "Mike Chen",
                  subtitle: "Powertrain Engineer",
                  handle: "@mikechen",
                  borderColor: "#EF4444",
                  gradient: "linear-gradient(135deg, #EF4444, #000)",
                  url: "https://linkedin.com/in/mikechen"
                },
                {
                  image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80",
                  title: "Alex Rivera",
                  subtitle: "Software Architect",
                  handle: "@alexrivera",
                  borderColor: "#EAB308",
                  gradient: "linear-gradient(135deg, #EAB308, #000)",
                  url: "#"
                }
              ]}
              radius={280}
            />
          </div>
        )}

        {/* Brand Footer */}
        <Footer onScrollToTop={() => handleNavigate('hero')} />

        {/* Floating social/navigation Dock */}
        {isFolderUnlocked && <GionatanDock onNavigate={handleNavigate} />}
      </div>
    </>
  );
}

export default App;
