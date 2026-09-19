import fs from "node:fs";
import path from "node:path";
import ShadowingVisual, { type ShadowArt } from "@/app/components/ShadowingVisual";

const SVG_FILE = "gm-voice-ux-shadowing.svg";
const PHOTO = "/projects/detail/gm-voice-ux-shadowing.png";

// The supplied SVG has one <path> per glyph run / icon part, in a fixed order:
// title, caption, then (body, head) for each of the six people. Read them here so the client can animate them.
function readArt(): ShadowArt | null {
  try {
    const svg = fs.readFileSync(path.join(process.cwd(), "public", "projects", "detail", SVG_FILE), "utf8");
    const paths = [...svg.matchAll(/<path d="([^"]+)" fill="([^"]+)"/g)].map((m) => ({ d: m[1], fill: m[2] }));
    if (paths.length < 14) return null;
    // file order: title, caption, then body/head pairs
    const [title, caption, ...rest] = paths;
    const people = Array.from({ length: 6 }, (_, i) => ({ body: rest[i * 2], head: rest[i * 2 + 1] }));
    return { title, caption, people };
  } catch {
    return null;
  }
}

export default function ShadowingProblem({ body, quotes }: { body: string; quotes: string[] }) {
  const art = readArt();
  const clean = quotes.map((q) => q.replace(/^["“]|["”]$/g, ""));
  if (!art) return <p>{body}</p>;
  return <ShadowingVisual body={body} quotes={clean} photo={PHOTO} art={art} />;
}
