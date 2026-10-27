"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { useLocale } from "@/app/lib/LocaleContext";
import { switchLocalePath, ui } from "@/app/lib/i18n";

// Anchor of whatever the reader is looking at, so the other language opens at the same spot.
function currentAnchor() {
  const line = window.innerHeight * 0.4;
  const sections = Array.from(document.querySelectorAll<HTMLElement>(".case-section[id], #work"));
  let id = "";
  for (const el of sections) {
    if (el.getBoundingClientRect().top <= line) id = el.id;
  }
  return id ? `#${id}` : "";
}

export default function LangSwitch() {
  const locale = useLocale();
  const pathname = usePathname();
  const target = locale === "ko" ? "en" : "ko";
  const href = switchLocalePath(pathname, target);
  const [hidden, setHidden] = useState(false);
  const lastY = useRef(0);

  // Step aside while the reader scrolls down; come back on scroll up, at the top and at the end of the page.
  useEffect(() => {
    lastY.current = window.scrollY;
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const y = window.scrollY;
        const delta = y - lastY.current;
        const nearTop = y < 120;
        const nearEnd = y + window.innerHeight > document.documentElement.scrollHeight - 160;
        if (nearTop || nearEnd || delta < -6) setHidden(false);
        else if (delta > 6) setHidden(true);
        if (Math.abs(delta) > 6) lastY.current = y;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <a
      className={`lang-switch${hidden ? " is-hidden" : ""}`}
      href={href}
      hrefLang={target}
      lang={target}
      aria-label={ui[locale].switchLabel}
      onFocus={() => setHidden(false)}
      onClick={(e) => {
        e.preventDefault();
        window.location.href = href + currentAnchor();
      }}
    >
      <span className={locale === "ko" ? "is-current" : ""} aria-hidden="true">
        KO
      </span>
      <span className={locale === "en" ? "is-current" : ""} aria-hidden="true">
        EN
      </span>
    </a>
  );
}
