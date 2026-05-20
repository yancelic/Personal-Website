import { useState, useEffect } from "react";

const navItems = {
  en: [
    { label: "About", href: "#about" },
    { label: "Expertise", href: "#expertise" },
    { label: "Zorus", href: "#zorus" },
    { label: "Beyond", href: "#beyond" },
    { label: "Contact", href: "#contact" },
  ],
  tr: [
    { label: "Hakkımda", href: "#about" },
    { label: "Uzmanlık", href: "#expertise" },
    { label: "Zorus", href: "#zorus" },
    { label: "Ötesi", href: "#beyond" },
    { label: "İletişim", href: "#contact" },
  ],
};

export default function Navbar({ lang, setLang }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className={scrolled ? "scrolled" : ""} id="navbar">
      <a href="#" className="nav-logo">
        Y<span>.</span>M<span>.</span>K
      </a>
      <div className="nav-links">
        {navItems[lang].map((item) => (
          <a key={item.href} href={item.href}>{item.label}</a>
        ))}
        <div className="lang-toggle">
          <button className={`lang-btn ${lang === "en" ? "active" : ""}`} onClick={() => setLang("en")}>EN</button>
          <button className={`lang-btn ${lang === "tr" ? "active" : ""}`} onClick={() => setLang("tr")}>TR</button>
        </div>
      </div>
    </nav>
  );
}
