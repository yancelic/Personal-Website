export default function Footer({ lang }) {
  return (
    <footer>
      <span>© {new Date().getFullYear()} Yankı Muhsin Kılıç</span>
      <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
        <span style={{ width: "20px", height: "1px", background: "var(--red)", display: "inline-block", opacity: 0.5 }} />
        <span>{lang === "en" ? "Built with intention." : "Niyetle inşa edildi."}</span>
      </div>
    </footer>
  );
}
