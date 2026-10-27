import Link from "next/link";
import { getContent } from "@/app/lib/content";
import { localePath, ui, type Locale } from "@/app/lib/i18n";

export default function Header({ locale }: { locale: Locale }) {
  const { profile } = getContent(locale);
  const t = ui[locale];
  return (
    <header className="site-header">
      <div className="wrap">
        <Link className="wordmark" href={localePath(locale, "/")} aria-label={t.home}>
          {profile.name}
          <span>{profile.nameKo}</span>
        </Link>
        <nav className="nav-links" aria-label={t.mainNav}>
          <Link href={localePath(locale, "/#work")}>Work</Link>
          <Link href={localePath(locale, "/about")}>About</Link>
          <a href={profile.resumeUrl} target="_blank" rel="noopener noreferrer">
            Resume
          </a>
          <a className="nav-contact" href={`mailto:${profile.email}`}>
            Let&apos;s talk ↗
          </a>
        </nav>
      </div>
    </header>
  );
}
