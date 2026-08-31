import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PlayIcon, PauseIcon, NextIcon, PrevIcon } from "../common/Icons";

const dumanTracks = [
  { id: 1, title: "Kırmış Kalbini", album: "Darmaduman", year: "2013", duration: "4:32", coverImg: "/albums/darmaduman.jpg" },
  { id: 2, title: "Aman Aman", album: "Seni Kendime Sakladım", year: "2005", duration: "4:05", coverImg: "/albums/seni-kendime-sakladim.jpg" },
  { id: 3, title: "Her Şeyi Yak", album: "Belki Alışman Lazım", year: "2002", duration: "4:28", coverImg: "/albums/belki-alisman-lazim.jpg" },
  { id: 4, title: "Senden Daha Güzel", album: "Duman II", year: "2009", duration: "3:56", coverImg: "/albums/duman-2.jpg" },
  { id: 5, title: "Öyle Dertli", album: "Duman I", year: "2009", duration: "5:12", coverImg: "/albums/duman-1.jpg" },
  { id: 6, title: "Köprüaltı", album: "Eski Köprünün Altında", year: "1999", duration: "4:54", coverImg: "/albums/eski-koprunun-altinda.jpg" },
  { id: 7, title: "Bal", album: "Duman I", year: "2009", duration: "4:48", coverImg: "/albums/duman-1.jpg" }
];

const EQ_HEIGHTS = [14, 8, 11, 6, 13, 9];

function XPMediaPlayer() {
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
    <div className="xp-media-player">
      {/* Player title bar */}
      <div className="xp-player-header">
        <span>♫ Windows Media Player — DUMAN</span>
        <span style={{ opacity: 0.8, fontSize: "10px" }}>
          {isPlaying ? "▶ Playing" : "⏸ Paused"}
        </span>
      </div>

      {/* Screen area */}
      <div className="xp-player-screen">
        {/* Album art */}
        <div
          className="xp-player-art"
          onClick={handleTogglePlay}
          style={{ cursor: "pointer" }}
          title={isPlaying ? "Pause" : "Play"}
        >
          <AnimatePresence mode="wait">
            <motion.img
              key={track.coverImg}
              src={track.coverImg}
              alt={track.album}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
            />
          </AnimatePresence>
        </div>

        {/* Track info */}
        <div className="xp-player-info">
          <AnimatePresence mode="wait">
            <motion.div
              key={track.id}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.12 }}
            >
              <div className="xp-player-track">{track.title}</div>
              <div className="xp-player-album">{track.album}</div>
              <div className="xp-player-year">{track.year} • {track.duration}</div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* EQ bars */}
        <div className="xp-player-eq">
          {EQ_HEIGHTS.map((h, i) => (
            <div
              key={i}
              className={`xp-eq-bar${isPlaying ? "" : " paused"}`}
              style={{ height: isPlaying ? `${h}px` : "2px" }}
            />
          ))}
        </div>
      </div>

      {/* Controls strip */}
      <div className="xp-player-controls">
        <span className="xp-player-counter">
          {currentTrackIndex + 1} / {dumanTracks.length}
        </span>
        <div className="xp-player-btns">
          <button className="xp-player-btn" onClick={handlePrev} title="Previous">
            <PrevIcon size={11} color="#000" strokeWidth={2.5} />
          </button>
          <button
            className="xp-player-btn xp-player-btn-play"
            onClick={handleTogglePlay}
            title={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying
              ? <PauseIcon size={10} color="#fff" strokeWidth={2.5} />
              : <PlayIcon size={10} color="#fff" strokeWidth={2.5} />
            }
          </button>
          <button className="xp-player-btn" onClick={handleNext} title="Next">
            <NextIcon size={11} color="#000" strokeWidth={2.5} />
          </button>
        </div>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: "10px", color: "var(--xp-text-muted)" }}>
          {isPlaying ? "ON AIR" : "—"}
        </span>
      </div>
    </div>
  );
}

function ClockWidget() {
  return (
    <div className="xp-clock-widget">
      <span className="xp-clock-num">15</span>
      <div className="xp-clock-label">
        MIN<br />CONVERSATION
      </div>
    </div>
  );
}

function RadarWidget() {
  return (
    <div className="xp-radar-widget">
      <span className="xp-pulse-dot" />
      GÖZLEM MODU // AKTİF
    </div>
  );
}

const cards = {
  en: {
    sectionNum: "04 // OUTSIDE THE CODE",
    title: "Beyond Code",
    items: [
      {
        tag: "MUSIC & STAGE",
        title: "Soloist & Guitarist",
        text: "3 stage performances. I play guitar and sing, listen to a lot of Duman. Music is where I step away from the screen and recharge.",
        visual: "duman"
      },
      {
        tag: "BODY LANGUAGE",
        title: "Body Language & Signals",
        text: "I've always found it fascinating how much people reveal through posture, subtle shifts, and facial expressions without saying a word. It's not about analyzing people, just paying genuine attention.",
        visual: "radar"
      },
      {
        tag: "PHILOSOPHY",
        title: "The 15-Minute Theory",
        text: "I believe a genuine 15-minute conversation reveals far more than months of distant observation. Listening with real curiosity rather than judgment is a mindset I bring to every problem I solve.",
        visual: "clock"
      }
    ]
  },
  tr: {
    sectionNum: "04 // KODUN DIŞINDA",
    title: "Kodun Ötesi",
    items: [
      {
        tag: "MÜZİK & SAHNE",
        title: "Solist & Gitarist",
        text: "3 sahne performansı verdim. Gitar çalıyorum ve şarkı söylüyorum, bol Duman dinliyorum. Müziğin sakin tarafları bana her zaman iyi gelmiştir.",
        visual: "duman"
      },
      {
        tag: "BEDEN DİLİ",
        title: "Beden Dili & İletişim",
        text: "İnsanların konuşurken söylemedikleri şeyleri vücut dili ve mimikleriyle nasıl dışa vurduğunu izlemek bana hep ilginç gelmiştir. Özel bir analiz çabası gibi değil; sadece insanları gözlemlemeyi seviyorum.",
        visual: "radar"
      },
      {
        tag: "FELSEFE",
        title: "15 Dakika Teorisi",
        text: "15 dakikalık samimi bir konuşmanın, aylarca uzaktan gözlem yapmaktan çok daha fazlasını ortaya çıkardığına inanıyorum. Yargılamadan, sadece merak ederek dinlemek en etkili yol.",
        visual: "clock"
      }
    ]
  }
};

export default function BeyondSection({ lang }) {
  const t = cards[lang];

  return (
    <section id="beyond" className="xp-section">
      <div className="xp-section-header">
        <span className="xp-section-num">{t.sectionNum}</span>
        <h2 className="xp-section-title">{t.title}</h2>
      </div>

      <div className="xp-beyond-grid">
        {t.items.map((item, idx) => (
          <motion.div
            key={idx}
            className="xp-panel xp-beyond-panel"
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.28, delay: idx * 0.08 }}
          >
            <div className="xp-panel-tag">{item.tag}</div>
            <h3 className="xp-beyond-title">{item.title}</h3>
            <p className="xp-beyond-text">{item.text}</p>

            {item.visual === "duman" && <XPMediaPlayer />}
            {item.visual === "radar" && <RadarWidget />}
            {item.visual === "clock" && <ClockWidget />}
          </motion.div>
        ))}
      </div>
    </section>
  );
}
