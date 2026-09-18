"use client";

import { useEffect, useState } from "react";

type TocItem = { id: string; label: string };

export default function ProjectToc({ items }: { items: TocItem[] }) {
  const [activeId, setActiveId] = useState(items[0]?.id ?? "");

  useEffect(() => {
    const elements = items
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => Boolean(el));

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActiveId(visible[0].target.id);
      },
      { rootMargin: "-35% 0px -55% 0px", threshold: 0 }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [items]);

  return (
    <aside className="project-toc">
      <nav>
        {items.map((item) => (
          <a key={item.id} href={`#${item.id}`} className={item.id === activeId ? "active" : ""}>
            <span className="bar" aria-hidden="true" />
            {item.label}
          </a>
        ))}
      </nav>
    </aside>
  );
}
