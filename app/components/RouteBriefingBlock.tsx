import RouteBriefing from "@/app/components/RouteBriefing";
import { findImage } from "@/app/lib/findImage";

// Drop the in-car screenshot in as public/projects/detail/gm-voice-ux-route-ui.<ext> and it replaces the placeholder.
export default function RouteBriefingBlock({ body, list }: { body: string; list: string[] }) {
  return <RouteBriefing body={body} quotes={list} uiImage={findImage("gm-voice-ux-route-ui")} />;
}
