import VoiceCause from "@/app/components/VoiceCause";
import type { Locale } from "@/app/lib/i18n";

// The two interview quotes shown as bubbles over the photo (first quote of the first two list items).
export default function CauseSection({
  body,
  list,
  image,
  locale = "ko",
}: {
  body: string;
  list: string[];
  image: string;
  locale?: Locale;
}) {
  const quotes = list
    .slice(0, 2)
    .map((item) => item.match(/"([^"]+)"/)?.[1])
    .filter((q): q is string => Boolean(q));
  return <VoiceCause body={body} quotes={quotes} photo={image} locale={locale} />;
}
