import LaneChange from "@/app/components/LaneChange";
import { findImage } from "@/app/lib/findImage";
import type { Locale } from "@/app/lib/i18n";

export default function LaneChangeBlock({ body, list }: { body: string; list: string[]; locale?: Locale }) {
  return <LaneChange body={body} quotes={list} uiImage={findImage("gm-voice-ux-solution2-1")} />;
}
