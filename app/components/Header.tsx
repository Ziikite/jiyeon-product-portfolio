import Link from "next/link";
import { profile } from "@/app/lib/data";

export default function Header() {
  return (
    <header className="site-header">
      <div className="wrap">
        <Link className="wordmark" href="/" aria-label="홈으로">
          {profile.name}
          <span>{profile.nameKo}</span>
        </Link>
        <nav className="nav-links" aria-label="주요 메뉴">
          <Link href="/#work">Work</Link>
          <Link href="/#career">Career</Link>
          <a className="nav-contact" href={`mailto:${profile.email}`}>
            Let&apos;s talk ↗
          </a>
        </nav>
      </div>
    </header>
  );
}
