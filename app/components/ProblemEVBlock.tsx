import ProblemEV from "@/app/components/ProblemEV";
import { findImage } from "@/app/lib/findImage";
import type { Locale } from "@/app/lib/i18n";

// Drop a photo named "gm-ev-charging-problem-<1|2|3>.<ext>" into public/projects/detail/ and it replaces its placeholder.
export default function ProblemEVBlock({ body, list, locale = "ko" }: { body: string; list: string[]; locale?: Locale }) {
  const images: Record<string, string | null> = {};
  for (let i = 1; i <= 3; i++) images[`${i}`] = findImage(`gm-ev-charging-problem-${i}`);
  return <ProblemEV body={body} list={list} images={images} locale={locale} />;
}
