import { profile } from "@/app/lib/data";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap">
        <h2>{"좋은 질문에서\n좋은 서비스가 시작됩니다."}</h2>
        <div className="footer-row">
          <a href={`mailto:${profile.email}`}>{profile.email} ↗</a>
          <span>
            {profile.nameKo} · {profile.role}
          </span>
          <span>© 2026</span>
        </div>
      </div>
    </footer>
  );
}
