import { useRef } from "react";
import { motion } from "framer-motion";
import { useInView } from "../hooks/useInView";
import Carousel from "../ReactBits/Carousel";
import ScrollFloat from "../ReactBits/ScrollFloat";

const cardsEn = [
  {
    eyebrow: "Music",
    title: "Soloist & guitarist",
    body: "Three solo performances. Each one a lesson in vulnerability and presence. Music isn't separate from my work in tech — it taught me that the best systems, like the best songs, have rhythm, tension, and release.",
    visual: "music",
  },
  {
    eyebrow: "Psychology",
    title: "Reading the unspoken",
    body: "Passionate about the science of human behavior — body language, cognitive biases, social dynamics. This lens makes me a better engineer and a better founder.",
    visual: "psy",
  },
  {
    eyebrow: "Philosophy",
    title: "The 15-minute theory",
    body: "I believe that 15 genuine minutes of conversation reveals more about a person than months of observation. Curiosity, not judgment, is the key — and I bring that same curiosity to every problem I tackle.",
    visual: "clock",
  },
];

const cardsTr = [
  {
    eyebrow: "Müzik",
    title: "Solist & gitarist",
    body: "Üç solo performans. Her biri kırılganlık ve varoluş üzerine bir ders. Müzik, teknik çalışmamdan ayrı değil — en iyi sistemlerin, en iyi şarkılar gibi ritim, gerilim ve çözüme sahip olduğunu bana öğretti.",
    visual: "music",
  },
  {
    eyebrow: "Psikoloji",
    title: "Söylenmeyeni okumak",
    body: "İnsan davranışı bilimine — beden dili, bilişsel önyargılar, sosyal dinamikler — tutkuluyum. Bu perspektif beni hem daha iyi bir mühendis hem de daha iyi bir kurucu yapıyor.",
    visual: "psy",
  },
  {
    eyebrow: "Felsefe",
    title: "15 dakika teorisi",
    body: "15 dakikalık samimi bir konuşmanın, aylarca gözlemden daha fazlasını ortaya çıkardığına inanıyorum. Merak, yargı değil, anahtar — ve aynı merakı ele aldığım her soruna getiriyorum.",
    visual: "clock",
  },
];

const visuals = {
  music: (
    <div style={{ display: "flex", alignItems: "flex-end", gap: "5px", height: "60px" }}>
      {[60, 80, 45, 90, 55, 70, 40].map((h, i) => (
        <div key={i} style={{
          flex: 1, background: "var(--amber)", borderRadius: "2px 2px 0 0",
          height: `${h}%`, opacity: 0.7,
          animation: `musicBar 1.4s ${i * 0.1}s ease-in-out infinite alternate`,
        }} />
      ))}
    </div>
  ),
  psy: <div style={{ fontSize: "3rem", opacity: 0.5 }}>🧠</div>,
  clock: <div style={{ fontSize: "3rem", opacity: 0.5 }}>⏱</div>,
  guitar: <div style={{ fontSize: "3rem", opacity: 0.5 }}>🎸</div>,
};

function BeyondCard({ card }) {
  return (
    <div style={{ padding: "2.5rem", background: "var(--bg2)", border: "0.5px solid var(--border-dim)", borderRadius: "2px" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem", alignItems: "center" }}>
        <div>
          <div className="beyond-eyebrow">{card.eyebrow}</div>
          <div className="beyond-title">{card.title}</div>
          <div className="beyond-body">{card.body}</div>
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
          {visuals[card.visual]}
        </div>
      </div>
    </div>
  );
}

export default function BeyondSection({ lang }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const cards = lang === "en" ? cardsEn : cardsTr;

  return (
    <section id="beyond" style={{ background: "var(--bg)", padding: "7rem 3rem" }}>
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7 }}
      >
        <div className="section-label">{lang === "en" ? "Beyond Code" : "Kodun Ötesi"}</div>
      </motion.div>

      <ScrollFloat offset={40}>
        <h2 className="section-title">
          {lang === "en" ? <>The <em>human</em> side</> : <><em>İnsan</em> tarafı</>}
        </h2>
      </ScrollFloat>

      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.3 }}
        style={{ marginTop: "3rem" }}
      >
        <Carousel items={cards.map((c, i) => <BeyondCard key={i} card={c} />)} />
      </motion.div>
    </section>
  );
}
