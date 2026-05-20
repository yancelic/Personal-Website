import { useState } from "react";
import LineWaves from "./components/ReactBits/LineWaves";
import ParticleCursor from "./components/ReactBits/ParticleCursor";
import TrueFocus from "./components/ReactBits/TrueFocus";
import Dock from "./components/ReactBits/Dock";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import HeroSection from "./components/sections/HeroSection";
import AboutSection from "./components/sections/AboutSection";
import ExpertiseSection from "./components/sections/ExpertiseSection";
import ZorusSection from "./components/sections/ZorusSection";
import BeyondSection from "./components/sections/BeyondSection";
import ContactSection from "./components/sections/ContactSection";

const marqueeItems = {
  en: ["Machine Learning", "App Development", "Game Development", "Psychology", "Music", "Zorus", "15 Minutes", "Body Language", "Guitar", "React", "Python", "Unity"],
  tr: ["Makine Öğrenmesi", "Uygulama Geliştirme", "Oyun Geliştirme", "Psikoloji", "Müzik", "Zorus", "15 Dakika", "Beden Dili", "Gitar", "React", "Python", "Unity"],
};

const dockItems = (lang) => [
  { label: lang === "en" ? "About" : "Hakkımda", icon: "◉", onClick: () => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" }) },
  { label: lang === "en" ? "Expertise" : "Uzmanlık", icon: "◈", onClick: () => document.getElementById("expertise")?.scrollIntoView({ behavior: "smooth" }) },
  { label: "Zorus", icon: "Z", onClick: () => document.getElementById("zorus")?.scrollIntoView({ behavior: "smooth" }) },
  { label: lang === "en" ? "Beyond" : "Ötesi", icon: "♪", onClick: () => document.getElementById("beyond")?.scrollIntoView({ behavior: "smooth" }) },
  { label: lang === "en" ? "Contact" : "İletişim", icon: "✉", onClick: () => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }) },
];

export default function App() {
  const [lang, setLang] = useState("en");

  return (
    <>
      {/* Global background */}
      <LineWaves lineColor="rgba(200,132,58,0.2)" waveCount={7} amplitude={55} speed={0.35} />      {/* Particle Trail Custom Cursor */}
      <ParticleCursor />
      {/* Navigation */}
      <Navbar lang={lang} setLang={setLang} />

      {/* Sections */}
      <main>
        <HeroSection lang={lang} />

        {/* True Focus Band */}
        <div style={{ borderTop: "0.5px solid var(--border-dim)", borderBottom: "0.5px solid var(--border-dim)", background: "var(--bg2)", padding: "2rem 0", overflow: "hidden" }}>
          <TrueFocus 
            sentence={marqueeItems[lang].join(" • ")}
            manualMode={true}
            blurAmount={4}
            borderColor="var(--amber)"
            glowColor="rgba(200, 132, 58, 0.4)"
            animationDuration={0.6}
            pauseBetweenAnimations={1.5}
            separator=" • "
          />
        </div>

        <AboutSection lang={lang} />
        <ExpertiseSection lang={lang} />
        <ZorusSection lang={lang} />
        <BeyondSection lang={lang} />
        <ContactSection lang={lang} />
      </main>

      <Footer lang={lang} />

      {/* Dock */}
      <Dock items={dockItems(lang)} />
    </>
  );
}
