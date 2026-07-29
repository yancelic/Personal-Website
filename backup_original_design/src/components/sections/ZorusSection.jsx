import { useRef } from "react";
import { motion } from "framer-motion";
import { useInView } from "../hooks/useInView";

const pillars = {
  en: [
    { num: "01", title: "Intelligence", desc: "ML-powered solutions for complex problems" },
    { num: "02", title: "Experience",   desc: "Interfaces that feel natural and effortless" },
    { num: "03", title: "Impact",       desc: "Products built around measurable real-world value" },
  ],
  tr: [
    { num: "01", title: "Zeka",    desc: "Karmaşık sorunlara yapay zeka destekli çözümler" },
    { num: "02", title: "Deneyim", desc: "Doğal ve zahmetsiz hissettiren arayüzler" },
    { num: "03", title: "Etki",    desc: "Ölçülebilir gerçek dünya değeri etrafında inşa edilen ürünler" },
  ],
};

export default function ZorusSection({ lang }) {
  const leftRef = useRef(null);
  const rightRef = useRef(null);
  const leftInView = useInView(leftRef, { once: true });
  const rightInView = useInView(rightRef, { once: true });
  const items = pillars[lang];

  return (
    <section id="zorus" style={{ padding: 0 }}>
      {/* LEFT — Dark panel */}
      <div className="zorus-left" style={{ position: "relative" }}>
        {/* Hardware mounting screws */}
        <div className="hardware-screw" style={{ position: "absolute", top: "20px", left: "20px", opacity: 0.5 }} />
        <div className="hardware-screw" style={{ position: "absolute", top: "20px", right: "20px", opacity: 0.5 }} />
        <div className="hardware-screw" style={{ position: "absolute", bottom: "20px", left: "20px", opacity: 0.5 }} />
        <div className="hardware-screw" style={{ position: "absolute", bottom: "20px", right: "20px", opacity: 0.5 }} />

        <div className="zorus-left-top" ref={leftRef}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "2.5rem" }}>
            <span className="led-light red-on" />
            <div className="section-label" style={{ marginBottom: 0 }}>
              {lang === "en" ? "The Venture" : "Girişim"}
            </div>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={leftInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
          >
            <h2 className="zorus-venture-title">
              Co-founding<br /><em>Zorus</em>
            </h2>
          </motion.div>
        </div>
        <div className="zorus-left-bottom">
          <motion.div
            initial={{ opacity: 0 }}
            animate={leftInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <p className="zorus-tagline">
              {lang === "en"
                ? "Technology that serves people without getting in the way."
                : "İnsanlara göze batmadan hizmet eden teknoloji."}
            </p>
            <a
              href="#contact"
              className="btn-primary"
              onClick={(e) => { e.preventDefault(); document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }); }}
            >
              {lang === "en" ? "Work with us" : "Birlikte çalışalım"}
            </a>
          </motion.div>
        </div>
        {/* Giant Z */}
        <div className="zorus-giant-z">Z</div>
      </div>

      {/* RIGHT — Content panel */}
      <div className="zorus-right" ref={rightRef} style={{ position: "relative" }}>
        {/* Hardware mounting screws */}
        <div className="hardware-screw" style={{ position: "absolute", top: "20px", left: "20px", opacity: 0.5 }} />
        <div className="hardware-screw" style={{ position: "absolute", top: "20px", right: "20px", opacity: 0.5 }} />
        <div className="hardware-screw" style={{ position: "absolute", bottom: "20px", left: "20px", opacity: 0.5 }} />
        <div className="hardware-screw" style={{ position: "absolute", bottom: "20px", right: "20px", opacity: 0.5 }} />

        <motion.div
          className="zorus-body"
          initial={{ opacity: 0, x: 30 }}
          animate={rightInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
        >
          {lang === "en" ? (
            <>
              <p>Zorus is the startup I co-founded, built at the crossroads of technology and human ambition. We're working to create tools and systems that don't just automate — they augment.</p>
              <p>Every decision at Zorus is grounded in the belief that the best technology is invisible — it serves people without getting in the way.</p>
            </>
          ) : (
            <>
              <p>Zorus, teknoloji ve insan hırsının kesişiminde kurduğumuz girişim. Sadece otomasyon sağlamayan — gerçek anlamda güçlendiren araçlar ve sistemler yaratmak için çalışıyoruz.</p>
              <p>Zorus'taki her karar, en iyi teknolojinin görünmez olduğuna duyduğumuz inanca dayanıyor.</p>
            </>
          )}
        </motion.div>

        <div className="zorus-pillars">
          {items.map((p, i) => (
            <motion.div
              key={i}
              className="zorus-pillar"
              initial={{ opacity: 0, x: 20 }}
              animate={rightInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + i * 0.12 }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <span className="led-light red-on" />
                <span className="pillar-num">{p.num}</span>
              </div>
              <div className="pillar-content" style={{ flex: 1 }}>
                <div className="pillar-title">{p.title}</div>
                <div className="pillar-desc">{p.desc}</div>
              </div>
              <div className="hardware-screw" style={{ opacity: 0.25 }} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
