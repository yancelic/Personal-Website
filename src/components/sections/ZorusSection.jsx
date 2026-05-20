import { useRef } from "react";
import { motion } from "framer-motion";
import { useInView } from "../hooks/useInView";
import BorderGlow from "../ReactBits/BorderGlow";
import GlareHover from "../ReactBits/GlareHover";
import ScrollFloat from "../ReactBits/ScrollFloat";

const pillars = {
  en: [
    { num: "01", title: "Intelligence", desc: "ML-powered solutions for complex problems" },
    { num: "02", title: "Experience", desc: "Interfaces that feel natural and effortless" },
    { num: "03", title: "Impact", desc: "Products built around measurable real-world value" },
  ],
  tr: [
    { num: "01", title: "Zeka", desc: "Karmaşık sorunlara yapay zeka destekli çözümler" },
    { num: "02", title: "Deneyim", desc: "Doğal ve zahmetsiz hissettiren arayüzler" },
    { num: "03", title: "Etki", desc: "Ölçülebilir gerçek dünya değeri etrafında inşa edilen ürünler" },
  ],
};

export default function ZorusSection({ lang }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const items = pillars[lang];

  return (
    <section id="zorus" style={{ background: "var(--bg2)", padding: "7rem 3rem", position: "relative", overflow: "hidden" }}>
      {/* Ambient */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", background: "radial-gradient(ellipse 50% 60% at 80% 50%, rgba(200,132,58,0.05) 0%, transparent 70%)" }} />
      <div style={{ position: "absolute", right: "-1rem", top: "-2rem", fontFamily: "var(--font-serif)", fontSize: "6rem", fontWeight: 300, color: "var(--amber)", opacity: 0.08, userSelect: "none", pointerEvents: "none", lineHeight: 1 }}>
        Zorus
      </div>

      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7 }}
      >
        <div className="section-label">{lang === "en" ? "The Venture" : "Girişim"}</div>
      </motion.div>

      <ScrollFloat offset={40}>
        <h2 className="section-title">
          Co-founding <em>Zorus</em>
        </h2>
      </ScrollFloat>

      <div className="zorus-grid" style={{ position: "relative" }}>
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="zorus-text"
        >
          {lang === "en" ? (
            <>
              <p>Zorus is the startup I co-founded, built at the crossroads of technology and human ambition. We're working to create tools and systems that don't just automate — they augment.</p>
              <p>Every decision at Zorus is grounded in the belief that the best technology is invisible — it serves people without getting in the way.</p>
              <div style={{ marginTop: "2rem" }}>
                <GlareHover width="auto" height="auto" borderRadius="2px" glareColor="rgba(200, 132, 58, 0.3)" style={{ display: "inline-flex" }}>
                  <a href="#contact" className="btn-outline" style={{ display: "inline-block" }}>Work with us</a>
                </GlareHover>
              </div>
            </>
          ) : (
            <>
              <p>Zorus, teknoloji ve insan hırsının kesişiminde kurduğumuz girişim. Sadece otomasyon sağlamayan — gerçek anlamda güçlendiren araçlar ve sistemler yaratmak için çalışıyoruz.</p>
              <p>Zorus'taki her karar, en iyi teknolojinin görünmez olduğuna duyduğumuz inanca dayanıyor — insanlara göze batmadan hizmet ediyor.</p>
              <div style={{ marginTop: "2rem" }}>
                <GlareHover width="auto" height="auto" borderRadius="2px" glareColor="rgba(200, 132, 58, 0.3)" style={{ display: "inline-flex" }}>
                  <a href="#contact" className="btn-outline" style={{ display: "inline-block" }}>Birlikte çalışalım</a>
                </GlareHover>
              </div>
            </>
          )}
        </motion.div>

        <div className="zorus-pillars">
          {items.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: 24 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 + i * 0.1 }}
            >
              <BorderGlow style={{ marginBottom: "1px" }}>
                <div className="zorus-pillar">
                  <span className="pillar-num">{p.num}</span>
                  <div className="pillar-info">
                    <div className="pillar-title">{p.title}</div>
                    <div className="pillar-desc">{p.desc}</div>
                  </div>
                </div>
              </BorderGlow>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
