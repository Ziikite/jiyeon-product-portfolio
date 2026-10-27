import * as ko from "@/app/lib/data";
import * as en from "@/app/lib/data.en";
import type { Locale } from "@/app/lib/i18n";

// Both modules export the same shape; pick one per locale.
export function getContent(locale: Locale) {
  return locale === "en" ? en : ko;
}
