import { useState, useEffect } from "react";

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
          if (entry.isIntersecting) setActiveSection(id);
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
    <header className="xp-navbar">
      <div className="xp-navbar-inner">

        {/* XP Start-button style logo */}
        <a
          href="#"
          className="xp-start-btn"
          onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}
        >
          <div className="xp-start-logo-circle">Z</div>
          <span>Yankı</span>
        </a>

        {/* Taskbar separator */}
        <div className="xp-taskbar-sep" />

        {/* Nav links — styled as taskbar items */}
        <nav>
          <ul className="xp-nav-links">
            {navItems[lang].map((item) => {
              const isActive = activeSection === item.href.slice(1);
              return (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className={`xp-nav-link${isActive ? " active" : ""}`}
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

        {/* Language switcher */}
        <div className="xp-lang-switch">
          <button
            className={`xp-lang-btn${lang === "en" ? " active" : ""}`}
            onClick={() => setLang("en")}
          >
            EN
          </button>
          <button
            className={`xp-lang-btn${lang === "tr" ? " active" : ""}`}
            onClick={() => setLang("tr")}
          >
            TR
          </button>
        </div>

        {/* System tray — time + live status */}
        <div className="xp-taskbar-sep" />
        <div className="xp-system-tray">
          <span className="xp-pulse-dot" />
          <span className="xp-tray-time">{time || "19:45"}</span>
        </div>

      </div>
    </header>
  );
}
