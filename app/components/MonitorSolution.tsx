import MonitorDashboard from "@/app/components/MonitorDashboard";

export default function MonitorSolution({ body, image }: { body: string; image?: string }) {
  return (
    <>
      <p>{body}</p>
      <MonitorDashboard image={image} />
    </>
  );
}
