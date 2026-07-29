import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const navItems = {
  en: [
    { label: "About",     href: "#about" },
    { label: "Expertise", href: "#expertise" },
    { label: "Zorus",     href: "#zorus" },
    { label: "Beyond",    href: "#beyond" },
    { label: "Contact",   href: "#contact" },
  ],
  tr: [
    { label: "Hakkımda",  href: "#about" },
    { label: "Uzmanlık",  href: "#expertise" },
    { label: "Zorus",     href: "#zorus" },
    { label: "Ötesi",     href: "#beyond" },
    { label: "İletişim",  href: "#contact" },
  ],
};

export default function Navbar({ lang, setLang }) {
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const sections = ["hero", "about", "expertise", "zorus", "beyond", "contact"];
    const observers = sections.map((id) => {
      const el = document.getElementById(id);
      if (!el) return null;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(id);
          }
        },
        { threshold: 0.15, rootMargin: "-25% 0px -55% 0px" }
      );
      observer.observe(el);
      return { el, observer };
    });

    return () => {
      observers.forEach((obs) => {
        if (obs) obs.observer.unobserve(obs.el);
      });
    };
  }, []);

  return (
    <motion.nav
      id="navbar"
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <div className="hardware-screw" style={{ opacity: 0.5 }} />
        <a href="#" className="nav-logo" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}>
          Y<span>.</span>M<span>.</span>K
        </a>
      </div>

      <div className="nav-links">
        {navItems[lang].map((item) => {
          const isActive = activeSection === item.href.slice(1);
          return (
            <a
              key={item.href}
              href={item.href}
              className={isActive ? "active" : ""}
              onClick={(e) => {
                e.preventDefault();
                document.querySelector(item.href)?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              <span className={`led-light ${isActive ? "red-on" : ""}`} />
              {item.label}
            </a>
          );
        })}
        
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div className="lang-toggle">
            <button className={`lang-btn ${lang === "en" ? "active" : ""}`} onClick={() => setLang("en")}>EN</button>
            <button className={`lang-btn ${lang === "tr" ? "active" : ""}`} onClick={() => setLang("tr")}>TR</button>
          </div>
          <div className="hardware-screw" style={{ opacity: 0.5 }} />
        </div>
      </div>
    </motion.nav>
  );
}
