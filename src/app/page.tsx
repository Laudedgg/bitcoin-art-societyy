"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useInView, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight, ExternalLink } from "lucide-react";

// Navigation Component
function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "About", href: "#about" },
    { name: "BitArt", href: "#bitart" },
    { name: "Events", href: "#events" },
    { name: "Community", href: "#community" },
  ];

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-black/95 backdrop-blur-md border-b border-white/10"
          : "bg-black/40 backdrop-blur-sm border-b border-white/5"
      }`}
      style={{
        boxShadow: isScrolled ? '0 1px 3px rgba(0,0,0,0.1)' : 'none'
      }}
    >
      <nav className="container mx-auto px-6 md:px-8 py-4 md:py-5 flex items-center justify-between">
        {/* Logo */}
        <motion.a
          href="#"
          className="flex items-center gap-2.5"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <img
            src="https://ext.same-assets.com/4158576384/3859852827.svg"
            alt="Bitcoin Art Society"
            className="w-7 h-7 md:w-9 md:h-9"
          />
          <div className="hidden sm:block">
            <div className="text-white font-semibold text-sm md:text-base leading-tight tracking-tight">Bitcoin Art Society</div>
          </div>
        </motion.a>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-6 lg:gap-8">
          {navLinks.map((link) => (
            <motion.a
              key={link.name}
              href={link.href}
              className="text-white/80 text-sm font-medium hover:text-white transition-colors"
              whileHover={{ y: -1 }}
            >
              {link.name}
            </motion.a>
          ))}
        </div>

        {/* CTA Button */}
        <div className="flex items-center gap-4">
          <motion.a
            href="#community"
            className="hidden md:inline-flex items-center gap-2 px-5 py-2 bg-[#ec7f30] text-white text-sm font-medium rounded-full hover:bg-[#f5a55a] transition-all duration-200"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            Join Us
          </motion.a>

          {/* Mobile Menu Button */}
          <motion.button
            className="md:hidden p-2 rounded-full bg-[#ec7f30] text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            whileTap={{ scale: 0.9 }}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-black border-t border-[#ec7f30]/20"
          >
            <div className="container mx-auto px-6 py-6 flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-white font-medium text-lg py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </a>
              ))}
              <a href="#community" className="btn-secondary text-center mt-4">
                JOIN US
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

// Scroll Progress Indicator
const SECTIONS = ["hero", "features", "about", "bitart", "events", "community"];

function ScrollIndicator() {
  const [activeSection, setActiveSection] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 2;

      for (let i = SECTIONS.length - 1; i >= 0; i--) {
        const section = document.getElementById(SECTIONS[i]);
        if (section && scrollPosition >= section.offsetTop) {
          setActiveSection(i);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="scroll-indicator hidden lg:flex flex-col items-center">
      <div className="bg-black/10 rounded-full p-2 backdrop-blur-sm">
        {SECTIONS.map((sectionId, index) => (
          <div
            key={sectionId}
            className={`scroll-dot ${index === activeSection ? "active" : ""}`}
            onClick={() => {
              document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
            }}
          />
        ))}
      </div>
    </div>
  );
}

// Hero Section
function HeroSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);

  const glanceStats = [
    { label: "Focus", value: "Bitcoin‑native art" },
    { label: "Approach", value: "Curated Releases, Artist Support, Global Lens" },
    { label: "Provenance", value: "On‑chain (Ordinals)" },
    { label: "Experience", value: "Culture-First" },
    { label: "Founded", value: "2025" },
    { label: "Community", value: "Artists • Collectors • Curators" },
  ];

  return (
    <section
      id="hero"
      ref={ref}
      className="section min-h-screen flex flex-col items-center justify-center relative pt-32 md:pt-24 z-10"
    >
      <motion.div
        style={{ y, opacity, scale }}
        className="container mx-auto px-6 text-center relative z-10 mt-8 md:mt-0"
      >
        {/* Main Title - Artistic Gradient with Enhanced Animation */}
        <motion.h1
          className="hero-title mb-8 relative"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.span
            className="block bg-gradient-to-r from-white via-[#f5a55a] to-[#ec7f30] bg-clip-text text-transparent relative"
            initial={{ opacity: 0, y: 50, rotateX: 90, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
            transition={{
              duration: 0.8,
              delay: 0.2,
              type: "spring",
              stiffness: 120,
              damping: 15
            }}
          >
            {"ART BELONGS".split("").map((char, index) => (
              <motion.span
                key={`art-${index}`}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: 0.3 + index * 0.05,
                  type: "spring",
                  stiffness: 200
                }}
                style={{ display: 'inline-block', minWidth: char === ' ' ? '0.3em' : 'auto' }}
              >
                {char === ' ' ? '\u00A0' : char}
              </motion.span>
            ))}
          </motion.span>
          <motion.span
            className="block bg-gradient-to-r from-[#ec7f30] via-[#f5a55a] to-white bg-clip-text text-transparent relative"
            initial={{ opacity: 0, y: 50, rotateX: -90, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
            transition={{
              duration: 0.8,
              delay: 0.8,
              type: "spring",
              stiffness: 120,
              damping: 15
            }}
          >
            {"ON BITCOIN".split("").map((char, index) => (
              <motion.span
                key={`bitcoin-${index}`}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: 0.9 + index * 0.05,
                  type: "spring",
                  stiffness: 200
                }}
                style={{ display: 'inline-block', minWidth: char === ' ' ? '0.3em' : 'auto' }}
              >
                {char === ' ' ? '\u00A0' : char}
              </motion.span>
            ))}
          </motion.span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="text-lg md:text-xl text-white/70 mb-12 max-w-2xl mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          Bitcoin Art Society is a curator-led initiative dedicated to elevating Bitcoin‑native art and culture.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-20"
        >
          <motion.a
            href="#bitart"
            className="btn-primary inline-flex items-center gap-2 text-xl"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Explore BitArt
            <ArrowRight size={20} />
          </motion.a>
          <motion.a
            href="#events"
            className="btn-secondary inline-flex items-center gap-2 text-xl"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            View Events
          </motion.a>
        </motion.div>

        {/* At a Glance Section */}
        <motion.div
          className="max-w-5xl mx-auto"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <h2 className="text-[#ec7f30] text-2xl md:text-3xl font-semibold mb-8">At a glance</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {glanceStats.map((stat, index) => (
              <motion.div
                key={stat.label}
                className="rounded-xl border border-[#ec7f30]/40 bg-black/50 backdrop-blur-sm p-6 min-h-[120px] transition-all duration-300 hover:border-[#ec7f30] hover:-translate-y-1 hover:shadow-[0_4px_16px_rgb(236,127,48,0.2)]"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1.2 + index * 0.1 }}
              >
                <dt className="text-white/70 text-sm mb-2">{stat.label}</dt>
                <dd className="text-white font-medium leading-snug">{stat.value}</dd>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Floating Logo */}
        <motion.div
          className="mt-16"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 1.8 }}
        >
          <motion.img
            src="https://ext.same-assets.com/4158576384/3859852827.svg"
            alt="BAS Logo"
            className="w-20 h-20 mx-auto drop-shadow-2xl"
            animate={{
              y: [0, -10, 0],
            }}
            transition={{
              duration: 3,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}

// Features Bento Grid Section
function FeaturesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const features = [
    {
      title: "Curated Releases",
      subtitle: "Artist Support",
      description: "Discover meaningful art with lasting cultural significance",
      color: "card-purple",
      size: "col-span-1",
    },
    {
      title: "THE BITCOIN\nART PLATFORM",
      subtitle: "",
      description: "",
      color: "card-cream",
      size: "col-span-1 row-span-2",
      isCenter: true,
    },
    {
      title: "Global Events",
      subtitle: "Exhibitions Worldwide",
      description: "Join our community at exclusive art gatherings",
      color: "card-green",
      size: "col-span-1",
    },
    {
      title: "On-Chain Provenance",
      subtitle: "Ordinals",
      description: "Permanent artwork ownership secured by Bitcoin",
      color: "card-dark",
      size: "col-span-1",
    },
    {
      title: "Earn Rewards",
      subtitle: "Collector Benefits",
      description: "Participate and earn through curation",
      color: "card-orange",
      size: "col-span-1",
    },
  ];

  return (
    <section id="features" ref={ref} className="section py-32 bg-black relative z-10">
      <div className="container mx-auto px-6">
        <div className="bento-grid">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              className={`feature-card ${feature.color} ${feature.size} ${
                feature.isCenter ? "flex flex-col items-center justify-center text-center" : ""
              }`}
              initial={{ opacity: 0, y: 50, rotateX: 10 }}
              animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              {feature.isCenter ? (
                <>
                  <h2 className="section-title text-white whitespace-pre-line text-4xl md:text-5xl mb-6">
                    {feature.title}
                  </h2>
                  <motion.img
                    src="https://ext.same-assets.com/4158576384/3859852827.svg"
                    alt="BAS Logo"
                    className="w-20 h-20"
                    animate={{
                      y: [0, -10, 0],
                      rotate: [0, 5, 0, -5, 0],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "easeInOut",
                    }}
                  />
                </>
              ) : (
                <>
                  <h3 className="text-2xl font-bold mb-2">{feature.title}</h3>
                  {feature.subtitle && (
                    <p className="text-sm opacity-70 mb-4">{feature.subtitle}</p>
                  )}
                  {feature.description && (
                    <p className="opacity-80">{feature.description}</p>
                  )}
                  <motion.div
                    className="mt-auto pt-6"
                    whileHover={{ x: 5 }}
                  >
                    <ArrowRight className="opacity-60" />
                  </motion.div>
                </>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// About Section with Parallax
function AboutSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" ref={ref} className="section py-32 overflow-hidden bg-black relative z-10">
      <div className="container mx-auto px-6">
        <motion.div
          className="grid md:grid-cols-2 gap-16 items-center"
          style={{ y, opacity }}
        >
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <h2 className="section-title text-white mb-8">
              DISCOVER<br />
              <span className="gradient-text">BITCOIN ART</span>
            </h2>
            <div className="space-y-6 text-lg text-white/80">
              <p>
                Bitcoin Art Society is a curator-led initiative dedicated to elevating
                Bitcoin-native art and culture.
              </p>
              <p>
                We bring together artists, collectors, and institutions to create,
                exhibit, and preserve work whose provenance and story live on Bitcoin.
              </p>
              <p>
                Our mission is to highlight meaningful art, support creators, and make
                collecting on Bitcoin accessible and rewarding for a global audience.
              </p>
            </div>
            <motion.a
              href="#bitart"
              className="btn-secondary inline-flex items-center gap-2 mt-8"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Explore BitArt
              <ArrowRight size={18} />
            </motion.a>
          </motion.div>

          {/* Image/Visual */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 100 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="relative">
              <motion.div
                className="absolute -inset-4 bg-gradient-to-r from-[#ec7f30] to-[#c96820] rounded-3xl opacity-20 blur-2xl"
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.2, 0.3, 0.2],
                }}
                transition={{
                  duration: 4,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              />
              <img
                src="https://ext.same-assets.com/4158576384/4252825699.png"
                alt="Bitcoin Art Society"
                className="relative rounded-3xl shadow-2xl w-full"
              />
            </div>

            {/* Floating Stats */}
            <motion.div
              className="absolute -bottom-8 -left-8 bg-[#ec7f30] rounded-2xl p-6 shadow-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <div className="text-3xl font-bold text-white">2025</div>
              <div className="text-sm text-white/80">Founded</div>
            </motion.div>

            <motion.div
              className="absolute -top-8 -right-8 bg-white rounded-2xl p-6 shadow-xl text-black"
              initial={{ opacity: 0, y: -20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <div className="text-3xl font-bold">Global</div>
              <div className="text-sm opacity-60">Community</div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

// BitArt Section
function BitArtSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const x = useTransform(scrollYProgress, [0, 1], [-100, 100]);

  const mosaicImages = [
    "https://ext.same-assets.com/4158576384/352656661.png",
    "https://ext.same-assets.com/4158576384/2554264262.png",
    "https://ext.same-assets.com/4158576384/3814769048.png",
    "https://ext.same-assets.com/4158576384/808432457.png",
    "https://ext.same-assets.com/4158576384/2812838837.png",
    "https://ext.same-assets.com/4158576384/1818456682.png",
  ];

  return (
    <section id="bitart" ref={ref} className="py-32 bg-black text-white overflow-hidden relative z-10">
      <div className="container mx-auto px-6">
        {/* Title */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="section-title mb-4">
            <span className="text-[#ec7f30]">MOSAIC</span> BY BITART
          </h2>
          <p className="text-xl opacity-80 max-w-2xl mx-auto">
            What if Bitcoin has been generating art all along, and we simply haven't learned how to see it?
          </p>
        </motion.div>

        {/* Scrolling Gallery */}
        <motion.div className="relative overflow-hidden py-8" style={{ x }}>
          <div className="flex gap-6 marquee">
            {[...mosaicImages, ...mosaicImages].map((src, index) => (
              <motion.div
                key={index}
                className="flex-shrink-0 w-64 h-40 rounded-2xl overflow-hidden"
                whileHover={{ scale: 1.05, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <img
                  src={src}
                  alt={`Mosaic ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <motion.a
            href="https://www.ord-x.com/mosaic"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary inline-flex items-center gap-2 text-xl"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Mint Now
            <ExternalLink size={20} />
          </motion.a>
        </motion.div>

        {/* Description Cards */}
        <div className="grid md:grid-cols-2 gap-8 mt-20">
          <motion.div
            className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10"
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-2xl font-bold text-[#ec7f30] mb-4">The Mosaic Reveals</h3>
            <p className="opacity-80 leading-relaxed">
              Bitcoin's blockchain contains an embedded visual language, waiting to be decoded.
              Every transaction, every UTXO, every individual satoshi carries visual information
              encoded within its mathematical properties.
            </p>
          </motion.div>

          <motion.div
            className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10"
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h3 className="text-2xl font-bold text-[#ec7f30] mb-4">Collaborative Creation</h3>
            <p className="opacity-80 leading-relaxed">
              Community members contribute Sats as a collaborative crowd-sourced effort to build
              a generative mosaic. Each satoshi is a tile, building inscriptions that become
              coordinates in a larger digital Mosaic.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// Events Section
function EventsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const events = [
    {
      title: "Digital Art Residency",
      date: "TBD, 2025",
      location: "Los Angeles",
      status: "Upcoming",
      description: "Join BitArt and the BAS Team for a deep dive into the artist practice on Bitcoin.",
    },
    {
      title: "BAS at Bitcoin MENA",
      date: "TBD, 2025",
      location: "Qatar",
      status: "Upcoming",
      description: "The Bitcoin Art Society team will be on the ground in Qatar for Bitcoin MENA.",
    },
    {
      title: "Ordinals Buenos Aires",
      date: "Nov 13, 2025",
      location: "Buenos Aires",
      status: "Past",
      description: "Bitcoin Art Society and OnChainMonkey present Ordinals Buenos Aires.",
      image: "https://ext.same-assets.com/4158576384/2717550421.avif",
    },
  ];

  return (
    <section id="events" ref={ref} className="py-32 bg-black relative z-10">
      <div className="container mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="section-title text-white mb-4">
            GLOBAL <span className="gradient-text">EVENTS</span>
          </h2>
          <p className="text-xl text-white/70">
            Exhibitions, auctions, and community gatherings focused on Bitcoin-native art.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {events.map((event, index) => (
            <motion.div
              key={event.title}
              className="group bg-black border border-[#ec7f30]/40 rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl hover:border-[#ec7f30] transition-all duration-500"
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
            >
              {event.image ? (
                <div className="h-48 overflow-hidden">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
              ) : (
                <div className="h-48 bg-gradient-to-br from-[#ec7f30] to-[#c96820] flex items-center justify-center">
                  <img
                    src="https://ext.same-assets.com/4158576384/3859852827.svg"
                    alt="BAS Logo"
                    className="w-20 h-20 opacity-50"
                  />
                </div>
              )}

              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className={`text-xs font-semibold px-3 py-1 rounded-full ${
                    event.status === "Upcoming"
                      ? "bg-[#ec7f30]/20 text-[#ec7f30]"
                      : "bg-white/10 text-white/60"
                  }`}>
                    {event.status}
                  </span>
                  <span className="text-sm text-white/60">{event.date}</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{event.title}</h3>
                <p className="text-sm text-white/60 mb-3">{event.location}</p>
                <p className="text-white/70">{event.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Community Section with Stats
function CommunitySection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const stats = [
    { label: "Focus", value: "Bitcoin-native art" },
    { label: "Approach", value: "Curated Releases" },
    { label: "Provenance", value: "On-chain (Ordinals)" },
    { label: "Experience", value: "Culture-First" },
  ];

  return (
    <section id="community" ref={ref} className="py-32 bg-black relative z-10">
      <div className="container mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="section-title text-white mb-4">
            JOIN THE <span className="gradient-text">COMMUNITY</span>
          </h2>
          <p className="text-xl text-[#ec7f30] max-w-2xl mx-auto">
            The first billion dollar catalyst for Bitcoin L1 assets
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              className="bg-black border border-[#ec7f30]/40 rounded-2xl p-6 text-center shadow-lg hover:border-[#ec7f30]"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5, boxShadow: "0 20px 40px rgba(236, 127, 48, 0.2)" }}
            >
              <div className="text-sm text-white/60 mb-2">{stat.label}</div>
              <div className="text-lg font-bold text-white">{stat.value}</div>
            </motion.div>
          ))}
        </div>

        {/* CTA Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          <motion.div
            className="feature-card card-purple"
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-2xl font-bold mb-4">Curation</h3>
            <p className="opacity-80">
              We focus on artists who explore the cultural and technical elements of Bitcoin
              to create works with lasting significance.
            </p>
          </motion.div>

          <motion.div
            className="feature-card card-orange"
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h3 className="text-2xl font-bold mb-4">Digital Artist Residency</h3>
            <p className="opacity-80">
              A tailored experience designed to foster collaboration between Bitcoin artists
              and established art institutions worldwide.
            </p>
          </motion.div>

          <motion.div
            className="feature-card card-dark"
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h3 className="text-2xl font-bold mb-4">Real World Assets</h3>
            <p className="opacity-80">
              Onchain provenance and public ledgers provide a durable and permanent solution
              to digital assets and physical RWAs.
            </p>
          </motion.div>
        </div>

        {/* Social Links */}
        <motion.div
          className="flex justify-center gap-6 mt-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <motion.a
            href="https://x.com/BtcArtSociety"
            target="_blank"
            rel="noopener noreferrer"
            className="w-14 h-14 bg-black rounded-full flex items-center justify-center text-white hover:bg-[#ec7f30] transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <img
              src="https://ext.same-assets.com/4158576384/3546197030.svg"
              alt="X/Twitter"
              className="w-6 h-6 invert"
            />
          </motion.a>
          <motion.a
            href="https://www.instagram.com/bitcoinartsociety/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-14 h-14 bg-black rounded-full flex items-center justify-center text-white hover:bg-[#ec7f30] transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <img
              src="https://ext.same-assets.com/4158576384/3938482489.svg"
              alt="Instagram"
              className="w-6 h-6 invert"
            />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}

// Footer
function Footer() {
  return (
    <footer className="bg-black text-white py-16 relative z-10">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-4">
            <img
              src="https://ext.same-assets.com/4158576384/3859852827.svg"
              alt="Bitcoin Art Society"
              className="w-12 h-12"
            />
            <div>
              <div className="font-bold text-lg">Bitcoin Art Society</div>
              <div className="text-white/60 text-sm">Art Belongs on Bitcoin</div>
            </div>
          </div>

          <div className="flex gap-8">
            <a href="#about" className="text-white/60 hover:text-[#ec7f30] transition-colors">About</a>
            <a href="#bitart" className="text-white/60 hover:text-[#ec7f30] transition-colors">BitArt</a>
            <a href="#events" className="text-white/60 hover:text-[#ec7f30] transition-colors">Events</a>
            <a href="#community" className="text-white/60 hover:text-[#ec7f30] transition-colors">Community</a>
          </div>

          <div className="flex gap-4 text-sm text-white/40">
            <a
              href="https://app.termly.io/policy-viewer/policy.html?policyUUID=a5ebb08a-a5a5-47e9-9aca-8f4abc7e12c7"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#ec7f30] transition-colors"
            >
              Privacy Policy
            </a>
            <a
              href="https://app.termly.io/policy-viewer/policy.html?policyUUID=5f454a12-b8d0-4b37-adc9-87588ed820a9"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#ec7f30] transition-colors"
            >
              Terms
            </a>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-8 text-center text-white/40 text-sm">
          © 2025 Bitcoin Art Society. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

// Main Page
export default function Home() {
  return (
    <main className="relative">
      <div className="noise-overlay" />
      <Navigation />
      <ScrollIndicator />
      <HeroSection />
      <FeaturesSection />
      <AboutSection />
      <BitArtSection />
      <EventsSection />
      <CommunitySection />
      <Footer />
    </main>
  );
}
