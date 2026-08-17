import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PlayIcon, PauseIcon, NextIcon, PrevIcon } from "../common/Icons";

const dumanTracks = [
  {
    id: 1,
    title: "Kırmış Kalbini",
    album: "Darmaduman",
    year: "2013",
    duration: "4:32",
    themeColor: "#FF2E93",
    coverImg: "/albums/darmaduman.jpg"
  },
  {
    id: 2,
    title: "Aman Aman",
    album: "Seni Kendime Sakladım",
    year: "2005",
    duration: "4:05",
    themeColor: "#FFE600",
    coverImg: "/albums/seni-kendime-sakladim.jpg"
  },
  {
    id: 3,
    title: "Her Şeyi Yak",
    album: "Belki Alışman Lazım",
    year: "2002",
    duration: "4:28",
    themeColor: "#00E5FF",
    coverImg: "/albums/belki-alisman-lazim.jpg"
  },
  {
    id: 4,
    title: "Senden Daha Güzel",
    album: "Duman II",
    year: "2009",
    duration: "3:56",
    themeColor: "#FF5722",
    coverImg: "/albums/duman-2.jpg"
  },
  {
    id: 5,
    title: "Öyle Dertli",
    album: "Duman I",
    year: "2009",
    duration: "5:12",
    themeColor: "#A3E635",
    coverImg: "/albums/duman-1.jpg"
  },
  {
    id: 6,
    title: "Köprüaltı",
    album: "Eski Köprünün Altında",
    year: "1999",
    duration: "4:54",
    themeColor: "#A855F7",
    coverImg: "/albums/eski-koprunun-altinda.jpg"
  },
  {
    id: 7,
    title: "Bal",
    album: "Duman I",
    year: "2009",
    duration: "4:48",
    themeColor: "#FFE600",
    coverImg: "/albums/duman-1.jpg"
  }
];

function DumanCassettePlayer() {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  const track = dumanTracks[currentTrackIndex];

  const handleNext = (e) => {
    e?.stopPropagation();
    setCurrentTrackIndex((prev) => (prev + 1) % dumanTracks.length);
    setIsPlaying(true);
  };

  const handlePrev = (e) => {
    e?.stopPropagation();
    setCurrentTrackIndex((prev) => (prev - 1 + dumanTracks.length) % dumanTracks.length);
    setIsPlaying(true);
  };

  const handleTogglePlay = (e) => {
    e?.stopPropagation();
    setIsPlaying(!isPlaying);
  };

  return (
    <div 
      className="neo-box"
      style={{
        padding: "16px",
        background: "var(--neo-black)",
        color: "#FFFFFF",
        borderRadius: "10px",
        display: "flex",
        flexDirection: "column",
        gap: "14px",
        marginTop: "12px",
        boxShadow: "4px 4px 0px #0D0D11"
      }}
    >
      {/* Top Header: Live Frequency & Status */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <span className="neo-badge neo-pink" style={{ fontSize: "0.7rem", padding: "2px 8px", fontWeight: 900 }}>
            DUMAN
          </span>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.72rem", color: "var(--neo-yellow)", fontWeight: 800 }}>
            {isPlaying ? "ON AIR // 44.1kHz" : "PAUSED"}
          </span>
        </div>

        {/* Mini Sound Equalizer */}
        <div style={{ display: "flex", alignItems: "flex-end", gap: "3px", height: "14px" }}>
          {[14, 8, 12, 6, 14, 10].map((h, i) => (
            <div
              key={i}
              style={{
                width: "3px",
                height: isPlaying ? `${h}px` : "3px",
                background: "var(--neo-cyan)",
                borderRadius: "1px",
                transition: "height 0.2s ease"
              }}
            />
          ))}
        </div>
      </div>

      {/* Center Layout: Sleeve + Spinning Vinyl Sliding Out */}
      <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
        {/* Vinyl + Sleeve Combo Container */}
        <div 
          onClick={handleTogglePlay}
          style={{ 
            position: "relative", 
            width: "96px", 
            height: "72px", 
            minWidth: "96px",
            cursor: "pointer" 
          }}
          title={isPlaying ? "Tıkla: Duraklat" : "Tıkla: Çal"}
        >
          {/* Spinning Vinyl Record (Sliding out from right) */}
          <motion.div
            animate={{ 
              rotate: isPlaying ? 360 : 0,
              x: isPlaying ? [16, 22, 16] : 16
            }}
            transition={{ 
              rotate: isPlaying ? { repeat: Infinity, duration: 3, ease: "linear" } : { duration: 0.3 },
              x: { repeat: Infinity, duration: 2, ease: "easeInOut" }
            }}
            style={{
              position: "absolute",
              left: "14px",
              top: "3px",
              width: "66px",
              height: "66px",
              borderRadius: "50%",
              background: "radial-gradient(circle at center, #0D0D11 15%, #222 16%, #111 35%, #262630 36%, #111 58%, #262630 59%, #0D0D11 100%)",
              border: "2px solid #FFFFFF",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "2px 2px 4px rgba(0,0,0,0.6)",
              zIndex: 1
            }}
          >
            {/* Center Vinyl Label with Album Art Thumbnail */}
            <div style={{ width: "24px", height: "24px", borderRadius: "50%", overflow: "hidden", border: "1.5px solid #FFF" }}>
              <img src={track.coverImg} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
            {/* Center Spindle Hole */}
            <div style={{ position: "absolute", width: "5px", height: "5px", borderRadius: "50%", background: "#0D0D11", border: "1px solid #FFF" }} />
          </motion.div>

          {/* Square Official Album Cover Sleeve */}
          <motion.div
            key={track.coverImg}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              width: "72px",
              height: "72px",
              borderRadius: "6px",
              overflow: "hidden",
              border: "2px solid #FFFFFF",
              boxShadow: "3px 3px 0px #000",
              zIndex: 2,
              background: "#111"
            }}
          >
            <img 
              src={track.coverImg} 
              alt={track.album}
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
            />
          </motion.div>
        </div>

        {/* Track & Album Title */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={track.id}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.15 }}
            >
              <div 
                style={{ 
                  fontFamily: "var(--font-syne)", 
                  fontWeight: 900, 
                  fontSize: "1.15rem", 
                  color: "var(--neo-yellow)", 
                  lineHeight: 1.2,
                  marginBottom: "4px"
                }}
              >
                {track.title}
              </div>
              <div 
                style={{ 
                  fontFamily: "var(--font-mono)", 
                  fontSize: "0.78rem", 
                  color: "#FFFFFF", 
                  fontWeight: 700
                }}
              >
                {track.album}
              </div>
              <div 
                style={{ 
                  fontFamily: "var(--font-mono)", 
                  fontSize: "0.72rem", 
                  color: "var(--neo-cyan)", 
                  marginTop: "2px",
                  fontWeight: 600
                }}
              >
                {track.year} • {track.duration}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Control Actions Strip */}
      <div 
        style={{ 
          display: "flex", 
          justifyContent: "space-between", 
          alignItems: "center", 
          paddingTop: "10px", 
          borderTop: "1.5px solid #282834" 
        }}
      >
        <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.72rem", color: "#A0A0B0", fontWeight: 800 }}>
          {currentTrackIndex + 1} / {dumanTracks.length}
        </span>

        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          {/* Previous Track */}
          <motion.button
            onClick={handlePrev}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            style={{
              background: "#FFFFFF",
              border: "2px solid #0D0D11",
              boxShadow: "2px 2px 0px #0D0D11",
              borderRadius: "6px",
              padding: "6px 10px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer"
            }}
            title="Önceki Şarkı"
          >
            <PrevIcon size={14} color="#0D0D11" strokeWidth={3} />
          </motion.button>

          {/* Play / Pause Toggle */}
          <motion.button
            onClick={handleTogglePlay}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="neo-btn"
            style={{
              padding: "6px 14px",
              fontSize: "0.76rem",
              background: "var(--neo-yellow)",
              color: "var(--neo-black)",
              boxShadow: "2px 2px 0px #0D0D11",
              border: "2px solid #0D0D11",
              display: "flex",
              alignItems: "center",
              gap: "6px",
              fontWeight: 900
            }}
          >
            {isPlaying ? <PauseIcon size={12} color="#0D0D11" strokeWidth={3} /> : <PlayIcon size={12} color="#0D0D11" strokeWidth={3} />}
            <span>{isPlaying ? "PAUSE" : "PLAY"}</span>
          </motion.button>

          {/* Next Track */}
          <motion.button
            onClick={handleNext}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            style={{
              background: "#FFFFFF",
              border: "2px solid #0D0D11",
              boxShadow: "2px 2px 0px #0D0D11",
              borderRadius: "6px",
              padding: "6px 10px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer"
            }}
            title="Sonraki Şarkı"
          >
            <NextIcon size={14} color="#0D0D11" strokeWidth={3} />
          </motion.button>
        </div>
      </div>
    </div>
  );
}

const cards = {
  en: {
    sectionNum: "04 // HUMAN DIMENSION",
    title: "BEYOND CODE",
    subtitle: "Music, human psychology, and the 15-minute connection philosophy.",
    items: [
      {
        bg: "var(--neo-yellow)",
        tag: "MUSIC & GUITAR",
        title: "Soloist & Guitarist",
        text: "3 solo performances on stage. Music taught me that great code, like great songs, requires rhythm, tension, and resolution.",
        visual: "duman"
      },
      {
        bg: "var(--neo-pink)",
        textColor: "#fff",
        tag: "HUMAN PSYCHOLOGY",
        title: "Reading the Unspoken",
        text: "Passionate about body language, cognitive dynamics, and social signals. Understanding people makes better engineers.",
        visual: "radar"
      },
      {
        bg: "var(--neo-cyan)",
        tag: "PHILOSOPHY",
        title: "The 15-Minute Rule",
        text: "15 genuine minutes of listening and observation can reveal more than months of surface-level small talk.",
        visual: "clock"
      }
    ]
  },
  tr: {
    sectionNum: "04 // İNSAN BOYUTU",
    title: "KODUN ÖTESİ",
    subtitle: "Müzik, insan psikolojisi ve 15 dakikalık bağ kurma felsefesi.",
    items: [
      {
        bg: "var(--neo-yellow)",
        tag: "MÜZİK & GİTAR",
        title: "Solist & Gitarist",
        text: "Sahnede 3 solo performans. Müzik bana en iyi yazılımların tıpkı şarkılar gibi ritim ve çözüme ihtiyaç duyduğunu öğretti.",
        visual: "duman"
      },
      {
        bg: "var(--neo-pink)",
        textColor: "#fff",
        tag: "İNSAN PSİKOLOJİSİ",
        title: "Söylenmeyeni Okumak",
        text: "Beden dili, bilişsel önyargılar ve sosyal sinyallere tutkuluyum. İnsanları anlamak daha iyi mühendisler yetiştirir.",
        visual: "radar"
      },
      {
        bg: "var(--neo-cyan)",
        tag: "FELSEFE",
        title: "15 Dakika Kuralı",
        text: "15 dakikalık samimi bir dinleme ve gözlem, aylarca süren yüzeysel sohbetten daha derin bir bağ kurabilir.",
        visual: "clock"
      }
    ]
  }
};

function RadarVisual() {
  return (
    <div 
      className="neo-box"
      style={{
        padding: "12px 18px",
        background: "var(--neo-white)",
        color: "var(--neo-black)",
        display: "flex",
        alignItems: "center",
        gap: "10px",
        borderRadius: "10px"
      }}
    >
      <div 
        style={{
          width: "24px",
          height: "24px",
          borderRadius: "50%",
          border: "3px solid var(--neo-pink)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          animation: "pulseBlink 1.2s infinite ease-in-out"
        }}
      >
        <div style={{ width: "8px", height: "8px", background: "var(--neo-pink)", borderRadius: "50%" }} />
      </div>
      <span style={{ fontFamily: "var(--font-mono)", fontWeight: 800, fontSize: "0.85rem" }}>
        SIGNAL DETECTED // 100%
      </span>
    </div>
  );
}

function ClockVisual() {
  return (
    <div 
      className="neo-box"
      style={{
        padding: "10px 16px",
        background: "var(--neo-black)",
        color: "var(--neo-lime)",
        display: "flex",
        alignItems: "center",
        gap: "8px",
        borderRadius: "10px"
      }}
    >
      <span style={{ fontFamily: "var(--font-syne)", fontWeight: 900, fontSize: "1.8rem", lineHeight: 1 }}>
        15
      </span>
      <span style={{ fontFamily: "var(--font-mono)", fontWeight: 800, fontSize: "0.8rem" }}>
        MIN / CONVERSATION
      </span>
    </div>
  );
}

export default function BeyondSection({ lang }) {
  const t = cards[lang];

  return (
    <section id="beyond" className="neo-section">
      {/* Section Header */}
      <div className="neo-section-header">
        <div className="neo-section-num">{t.sectionNum}</div>
        <h2 className="neo-section-title">{t.title}</h2>
      </div>

      {/* Stacked Brutalist Cards */}
      <div className="neo-bento-grid">
        {t.items.map((item, idx) => (
          <motion.div
            key={idx}
            className="neo-box neo-box-interactive neo-col-4"
            style={{
              backgroundColor: item.bg,
              color: item.textColor || "var(--neo-black)",
              padding: "28px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              gap: "20px"
            }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 300, damping: 24, delay: idx * 0.15 }}
          >
            <div>
              <div 
                className="neo-badge" 
                style={{ 
                  background: "var(--neo-white)", 
                  color: "#000",
                  marginBottom: "16px"
                }}
              >
                //{item.tag}
              </div>

              <h3 style={{ fontSize: "1.5rem", fontWeight: 800, marginBottom: "10px" }}>
                {item.title}
              </h3>

              <p style={{ opacity: 0.9, fontSize: "1.05rem", lineHeight: 1.5 }}>
                {item.text}
              </p>
            </div>

            <div>
              {item.visual === "duman" && <DumanCassettePlayer />}
              {item.visual === "radar" && <RadarVisual />}
              {item.visual === "clock" && <ClockVisual />}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
