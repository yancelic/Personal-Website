import { useState } from "react";
import Dock from "./components/ReactBits/Dock";
import Footer from "./components/layout/Footer";
import Navbar from "./components/layout/Navbar";
import HeroSection from "./components/sections/HeroSection";
import AboutSection from "./components/sections/AboutSection";
import ExpertiseSection from "./components/sections/ExpertiseSection";
import ZorusSection from "./components/sections/ZorusSection";
import BeyondSection from "./components/sections/BeyondSection";
import ContactSection from "./components/sections/ContactSection";
import Companion from "./components/character/Companion";
import { SparkIcon, UserIcon, ToolsIcon, RocketIcon, MusicIcon, MailIcon } from "./components/common/Icons";

const marqueeItems = {
  en: ["MACHINE LEARNING", "APP DEVELOPMENT", "GAME DEVELOPMENT", "PSYCHOLOGY", "SOLOIST & MUSIC", "ZORUS & HOPPOZORUS", "15-MINUTE THEORY", "UNREAL ENGINE", "REACT", "PYTHON"],
  tr: ["MAKİNE ÖĞRENMESİ", "UYGULAMA GELİŞTİRME", "OYUN GELİŞTİRME", "PSİKOLOJİ", "SOLİST & MÜZİK", "ZORUS & HOPPOZORUS", "15 DAKİKA TEORİSİ", "UNREAL ENGINE", "REACT", "PYTHON"],
};

const dockItems = (lang) => [
  { label: lang === "en" ? "Hero"      : "Giriş",    icon: <SparkIcon size={20} />,   onClick: () => window.scrollTo({ top: 0, behavior: "smooth" }) },
  { label: lang === "en" ? "About"     : "Hakkımda", icon: <UserIcon size={20} />,    onClick: () => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" }) },
  { label: lang === "en" ? "Expertise" : "Uzmanlık", icon: <ToolsIcon size={20} />,   onClick: () => document.getElementById("expertise")?.scrollIntoView({ behavior: "smooth" }) },
  { label: "Zorus",                                   icon: <RocketIcon size={20} />,  onClick: () => document.getElementById("zorus")?.scrollIntoView({ behavior: "smooth" }) },
  { label: lang === "en" ? "Beyond"    : "Ötesi",    icon: <MusicIcon size={20} />,   onClick: () => document.getElementById("beyond")?.scrollIntoView({ behavior: "smooth" }) },
  { label: lang === "en" ? "Contact"   : "İletişim", icon: <MailIcon size={20} />,    onClick: () => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }) },
];

function XPTicker({ lang }) {
  const items = marqueeItems[lang];
  const doubled = [...items, ...items, ...items];
  return (
    <div className="xp-ticker-wrap">
      <div className="xp-ticker-track">
        {doubled.map((item, i) => (
          <span key={i} className="xp-ticker-item">
            <span className="xp-ticker-sep">◆</span>
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
      <Navbar lang={lang} setLang={setLang} />

      <main>
        <HeroSection lang={lang} />
        <XPTicker lang={lang} />
        <AboutSection lang={lang} />
        <XPTicker lang={lang} />
        <ExpertiseSection lang={lang} />
        <ZorusSection lang={lang} />
        <BeyondSection lang={lang} />
        <ContactSection lang={lang} />
      </main>

      <Footer lang={lang} />
      <Companion lang={lang} />
      {/* Dock is hidden visually but kept for scroll functionality */}
      <div style={{ display: "none" }}>
        <Dock items={dockItems(lang)} lang={lang} setLang={setLang} />
      </div>
    </>
  );
}
