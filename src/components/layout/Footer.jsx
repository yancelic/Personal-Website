export default function Footer({ lang }) {
  return (
    <footer>
      <span>© {new Date().getFullYear()} Yankı Muhsin Kılıç</span>
      <span>{lang === "en" ? "Built with intention." : "Niyetle inşa edildi."}</span>
    </footer>
  );
}
