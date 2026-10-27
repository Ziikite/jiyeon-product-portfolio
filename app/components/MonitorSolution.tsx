import MonitorDashboard from "@/app/components/MonitorDashboard";
import type { Locale } from "@/app/lib/i18n";

// MonitorDashboard is a client component and reads the locale from context.
export default function MonitorSolution({ body, image }: { body: string; image?: string; locale?: Locale }) {
  return (
    <>
      <p>{body}</p>
      <MonitorDashboard image={image} />
    </>
  );
}
