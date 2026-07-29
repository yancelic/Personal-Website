import { useState } from "react";
import LineWaves from "./components/ReactBits/LineWaves";
import ParticleCursor from "./components/ReactBits/ParticleCursor";
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
  en: ["Machine Learning", "App Development", "Game Development", "Psychology", "Music", "Zorus", "15 Minutes", "Body Language", "Guitar", "React", "Python", "Unreal Engine"],
  tr: ["Makine Öğrenmesi", "Uygulama Geliştirme", "Oyun Geliştirme", "Psikoloji", "Müzik", "Zorus", "15 Dakika", "Beden Dili", "Gitar", "React", "Python", "Unreal Engine"],
};

const dockItems = (lang) => [
  { label: lang === "en" ? "About"     : "Hakkımda", icon: "◉", onClick: () => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" }) },
  { label: lang === "en" ? "Expertise" : "Uzmanlık", icon: "◈", onClick: () => document.getElementById("expertise")?.scrollIntoView({ behavior: "smooth" }) },
  { label: "Zorus",                                   icon: "Z", onClick: () => document.getElementById("zorus")?.scrollIntoView({ behavior: "smooth" }) },
  { label: lang === "en" ? "Beyond"    : "Ötesi",    icon: "♪", onClick: () => document.getElementById("beyond")?.scrollIntoView({ behavior: "smooth" }) },
  { label: lang === "en" ? "Contact"   : "İletişim", icon: "✉", onClick: () => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }) },
];

function MarqueeStrip({ lang }) {
  const items = marqueeItems[lang];
  const doubled = [...items, ...items];
  return (
    <div className="marquee-strip">
      <div className="marquee-inner">
        {doubled.map((item, i) => (
          <span key={i} className="marquee-item">
            <span className="marquee-dot glowing-led" />
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function App() {
  const [lang, setLang] = useState("en");

  return (
    <>
      <LineWaves lineColor="rgba(225,29,72,0.05)" waveCount={5} amplitude={45} speed={0.28} />
      <ParticleCursor />
      <Navbar lang={lang} setLang={setLang} />

      <main>
        <HeroSection lang={lang} />
        <MarqueeStrip lang={lang} />
        <AboutSection lang={lang} />
        <ExpertiseSection lang={lang} />
        <ZorusSection lang={lang} />
        <BeyondSection lang={lang} />
        <ContactSection lang={lang} />
      </main>

      <Footer lang={lang} />
      <Dock items={dockItems(lang)} />
    </>
  );
}
