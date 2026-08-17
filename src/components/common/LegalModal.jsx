import { motion, AnimatePresence } from "framer-motion";

export default function LegalModal({ isOpen, onClose, type = "terms", lang = "en" }) {
  if (!isOpen) return null;

  const content = {
    en: {
      terms: {
        title: "Terms of Service",
        body: [
          {
            h: "Scope & Ownership",
            p: "This personal portfolio is operated by Yankı Muhsin Kılıç. All project prototypes, architectures, and written content are the intellectual property of the author unless open-sourced."
          },
          {
            h: "Permitted Use",
            p: "Visitors are free to inspect public code samples and initiate contact. Automated scraping or redistribution without attribution is prohibited."
          }
        ]
      },
      privacy: {
        title: "Privacy Policy",
        body: [
          {
            h: "Data Collection",
            p: "Messages sent via the contact form are used solely for direct communication. No third-party tracking pixels or marketing cookies are used."
          },
          {
            h: "Retention",
            p: "Inquiries are stored securely and never sold or shared. You may request data deletion at any time by contacting myanki.work@gmail.com."
          }
        ]
      },
      close: "Close"
    },
    tr: {
      terms: {
        title: "Kullanım Şartları",
        body: [
          {
            h: "Kapsam ve Mülkiyet",
            p: "Bu portföy sitesi Yankı Muhsin Kılıç tarafından yönetilmektedir. Proje prototipleri, mimariler ve yazılı içerikler yazarın fikri mülkiyetidir."
          },
          {
            h: "İzin Verilen Kullanım",
            p: "Ziyaretçiler kod örneklerini inceleme ve iletişime geçme hakkına sahiptir. Atıfsız otomatik veri kazıma yapılması yasaktır."
          }
        ]
      },
      privacy: {
        title: "Gizlilik Politikası",
        body: [
          {
            h: "Veri Toplama",
            p: "İletişim formu üzerinden gönderilen bilgiler yalnızca doğrudan iletişim amacıyla işlenir. Takip çerezleri veya pazarlama araçları kullanılmaz."
          },
          {
            h: "Saklama",
            p: "Mesajlar güvenli şekilde saklanır, üçüncü taraflarla paylaşılmaz. myanki.work@gmail.com üzerinden dilediğiniz zaman silinmesini talep edebilirsiniz."
          }
        ]
      },
      close: "Kapat"
    }
  };

  const current = content[lang][type] || content[lang].terms;

  return (
    <AnimatePresence>
      <motion.div
        className="modal-backdrop-clean"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="modal-card-clean"
          initial={{ scale: 0.96, y: 15 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.96, y: 15 }}
          transition={{ duration: 0.2 }}
          onClick={(e) => e.stopPropagation()}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px", paddingBottom: "12px", borderBottom: "1px solid var(--border)" }}>
            <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.4rem", fontWeight: 700 }}>
              {current.title}
            </h3>
            <button onClick={onClose} style={{ fontSize: "1.2rem", color: "var(--text-muted)", cursor: "pointer" }}>
              ✕
            </button>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "18px", color: "var(--text-muted)", fontSize: "0.98rem", lineHeight: 1.65 }}>
            {current.body.map((item, idx) => (
              <div key={idx}>
                <h4 style={{ color: "var(--text-main)", fontSize: "1.05rem", fontWeight: 600, marginBottom: "4px" }}>
                  {item.h}
                </h4>
                <p>{item.p}</p>
              </div>
            ))}
          </div>

          <div style={{ marginTop: "28px", display: "flex", justifyContent: "flex-end" }}>
            <button className="btn-secondary" onClick={onClose}>
              {content[lang].close}
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
