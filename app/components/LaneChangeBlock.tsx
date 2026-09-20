import LaneChange from "@/app/components/LaneChange";
import { findImage } from "@/app/lib/findImage";

export default function LaneChangeBlock({ body, list }: { body: string; list: string[] }) {
  return <LaneChange body={body} quotes={list} uiImage={findImage("gm-voice-ux-solution2-1")} />;
}
