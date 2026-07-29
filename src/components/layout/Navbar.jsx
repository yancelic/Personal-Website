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
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

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
        { threshold: 0.15, rootMargin: "-20% 0px -50% 0px" }
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
    <motion.header
      className="neo-navbar"
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 24 }}
    >
      <div className="neo-navbar-inner">
        {/* Brand Logo */}
        <a 
          href="#" 
          className="neo-logo" 
          onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}
        >
          <div className="neo-logo-icon">Y</div>
          <span>MUHSIN // 26</span>
        </a>

        {/* Live Status Pill (Desktop) */}
        <div className="neo-status-badge" style={{ display: "flex" }}>
          <span className="neo-pulse-dot" />
          <span>TR // {time || "19:45"}</span>
        </div>

        {/* Nav Links */}
        <nav>
          <ul className="neo-nav-links">
            {navItems[lang].map((item) => {
              const isActive = activeSection === item.href.slice(1);
              return (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className={`neo-nav-link ${isActive ? "active" : ""}`}
                    style={isActive ? { background: "var(--neo-yellow)", border: "2.5px solid #0D0D11", boxShadow: "2px 2px 0px #0D0D11" } : {}}
                    onClick={(e) => {
                      e.preventDefault();
                      document.querySelector(item.href)?.scrollIntoView({ behavior: "smooth" });
                    }}
                  >
                    {item.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Language Switcher */}
        <div className="neo-lang-switch">
          <button 
            className={`neo-lang-btn ${lang === "en" ? "active" : ""}`} 
            onClick={() => setLang("en")}
          >
            EN
          </button>
          <button 
            className={`neo-lang-btn ${lang === "tr" ? "active" : ""}`} 
            onClick={() => setLang("tr")}
          >
            TR
          </button>
        </div>
      </div>
    </motion.header>
  );
}
