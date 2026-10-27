import ToolsProblem from "@/app/components/ToolsProblem";
import DelayCharts from "@/app/components/DelayCharts";
import { findImage } from "@/app/lib/findImage";
import type { Locale } from "@/app/lib/i18n";

// ToolsProblem and DelayCharts are client components and read the locale from context.
export default function ToolsProblemBlock({ body }: { body: string; locale?: Locale }) {
  return (
    <>
      <p>{body}</p>
      <ToolsProblem image={findImage("cloud-migration-problem-2") ?? undefined} />
      <DelayCharts />
    </>
  );
}
