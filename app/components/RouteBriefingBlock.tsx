import RouteBriefing from "@/app/components/RouteBriefing";
import { findImage } from "@/app/lib/findImage";

// Popup badges that "뿅뿅뿅" appear over the in-car screen once it scrolls into view, in this order.
const BADGE_NAMES = ["gm-voice-ux-solution1-2", "gm-voice-ux-solution1-3", "gm-voice-ux-solution1-4", "gm-voice-ux-solution1-5"];

export default function RouteBriefingBlock({ body, list }: { body: string; list: string[] }) {
  const uiImage = findImage("gm-voice-ux-solution1-1") ?? findImage("gm-voice-ux-route-ui");
  const badges = BADGE_NAMES.map(findImage).filter((src): src is string => !!src);
  return <RouteBriefing body={body} quotes={list} uiImage={uiImage} badges={badges} />;
}
