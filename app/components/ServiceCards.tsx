const CARDS = [
  { src: "/projects/detail/clas-conversion-intro-1.svg", alt: "APAS (Application All Services)" },
  { src: "/projects/detail/clas-conversion-intro-2.svg", alt: "DBAS (DataBase All Services)" },
  { src: "/projects/detail/clas-conversion-intro-3.svg", alt: "PLAS (Platform All Services)" },
  { src: "/projects/detail/clas-conversion-intro-4.svg", alt: "INFAS (Infra All Services)" },
];

export default function ServiceCards() {
  return (
    <div className="svc-grid">
      {CARDS.map((c) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img key={c.src} className="svc-card" src={c.src} alt={c.alt} loading="lazy" decoding="async" />
      ))}
    </div>
  );
}
