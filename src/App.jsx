import { useState } from "react";
import NeoCursor from "./components/ReactBits/NeoCursor";
import Dock from "./components/ReactBits/Dock";
import Footer from "./components/layout/Footer";
import HeroSection from "./components/sections/HeroSection";
import AboutSection from "./components/sections/AboutSection";
import ExpertiseSection from "./components/sections/ExpertiseSection";
import ZorusSection from "./components/sections/ZorusSection";
import BeyondSection from "./components/sections/BeyondSection";
import ContactSection from "./components/sections/ContactSection";
import { SparkIcon, UserIcon, ToolsIcon, RocketIcon, MusicIcon, MailIcon } from "./components/common/Icons";

const marqueeItems = {
  en: ["MACHINE LEARNING", "APP DEVELOPMENT", "GAME DEVELOPMENT", "PSYCHOLOGY", "MUSIC & GUITAR", "ZORUS VENTURE", "15-MINUTE METHOD", "UNREAL ENGINE", "REACT 19", "PYTHON"],
  tr: ["MAKİNE ÖĞRENMESİ", "UYGULAMA GELİŞTİRME", "OYUN GELİŞTİRME", "PSİKOLOJİ", "MÜZİK & GİTAR", "ZORUS GİRİŞİMİ", "15 DAKİKA METODU", "UNREAL ENGINE", "REACT 19", "PYTHON"],
};

const dockItems = (lang) => [
  { label: lang === "en" ? "Hero"      : "Giriş",    icon: <SparkIcon size={20} />,   onClick: () => window.scrollTo({ top: 0, behavior: "smooth" }) },
  { label: lang === "en" ? "About"     : "Hakkımda", icon: <UserIcon size={20} />,    onClick: () => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" }) },
  { label: lang === "en" ? "Expertise" : "Uzmanlık", icon: <ToolsIcon size={20} />,   onClick: () => document.getElementById("expertise")?.scrollIntoView({ behavior: "smooth" }) },
  { label: "Zorus",                                   icon: <RocketIcon size={20} />,  onClick: () => document.getElementById("zorus")?.scrollIntoView({ behavior: "smooth" }) },
  { label: lang === "en" ? "Beyond"    : "Ötesi",    icon: <MusicIcon size={20} />,   onClick: () => document.getElementById("beyond")?.scrollIntoView({ behavior: "smooth" }) },
  { label: lang === "en" ? "Contact"   : "İletişim", icon: <MailIcon size={20} />,    onClick: () => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }) },
];

function NeoMarquee({ lang, pinkMode = false }) {
  const items = marqueeItems[lang];
  const doubled = [...items, ...items, ...items];
  return (
    <div className={`neo-marquee-wrap ${pinkMode ? "pink-mode" : ""}`}>
      <div className="neo-marquee-track">
        {doubled.map((item, i) => (
          <span key={i} className="neo-marquee-item">
            <span className="neo-marquee-star">✦</span>
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
      <NeoCursor />

      <main style={{ paddingTop: "20px" }}>
        <HeroSection lang={lang} />
        <NeoMarquee lang={lang} />
        <AboutSection lang={lang} />
        <NeoMarquee lang={lang} pinkMode={true} />
        <ExpertiseSection lang={lang} />
        <ZorusSection lang={lang} />
        <BeyondSection lang={lang} />
        <ContactSection lang={lang} />
      </main>

      <Footer lang={lang} />
      <Dock items={dockItems(lang)} lang={lang} setLang={setLang} />
    </>
  );
}
