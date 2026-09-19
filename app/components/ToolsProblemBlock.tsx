import ToolsProblem from "@/app/components/ToolsProblem";
import DelayCharts from "@/app/components/DelayCharts";
import { findImage } from "@/app/lib/findImage";

export default function ToolsProblemBlock({ body }: { body: string }) {
  return (
    <>
      <p>{body}</p>
      <ToolsProblem image={findImage("cloud-migration-problem-2") ?? undefined} />
      <DelayCharts />
    </>
  );
}
