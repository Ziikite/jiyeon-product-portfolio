import ProblemEV from "@/app/components/ProblemEV";
import { findImage } from "@/app/lib/findImage";

// Drop a photo named "gm-ev-charging-problem-<1|2|3>.<ext>" into public/projects/detail/ and it replaces its placeholder.
export default function ProblemEVBlock({ body, list }: { body: string; list: string[] }) {
  const images: Record<string, string | null> = {};
  for (let i = 1; i <= 3; i++) images[`${i}`] = findImage(`gm-ev-charging-problem-${i}`);
  return <ProblemEV body={body} list={list} images={images} />;
}
