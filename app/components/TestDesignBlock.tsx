import TestDesign from "@/app/components/TestDesign";
import { findImage } from "@/app/lib/findImage";

const KEYS = ["dest", "route", "lane", "air", "overlap", "parking"];

// Drop a screenshot named "gm-voice-ux-test-<scenario>-<a|b|c>.<ext>" into public/projects/detail/ and it replaces its placeholder.
export default function TestDesignBlock({ body }: { body: string }) {
  const images: Record<string, string | null> = {};
  for (const k of KEYS) for (const v of ["a", "b", "c"]) images[`${k}-${v}`] = findImage(`gm-voice-ux-test-${k}-${v}`);
  return (
    <>
      {body && <p>{body}</p>}
      <TestDesign images={images} />
    </>
  );
}
