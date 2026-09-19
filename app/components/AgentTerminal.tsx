"use client";

import { useEffect, useRef, useState } from "react";

// A console that never stops: agent-install log lines are typed one after another (server after server)
// to show how much manual, code-driven work the competitors' environment analysis takes.
type Kind = "banner" | "hash" | "rule" | "bar" | "log" | "blank";
type Line = { text: string; kind: Kind };

const MAX_LINES = 40;

function block(n: number): Line[] {
  const server = `Server-T${n}.mydomain.local`;
  const serverId = `s-${(0x3fe3e5 + n * 4099).toString(16)}342c624e6a0`;
  return [
    { kind: "banner", text: "****************************" },
    { kind: "banner", text: "**** Installing Agents *****" },
    { kind: "banner", text: "****************************" },
    { kind: "blank", text: "" },
    { kind: "hash", text: "###################################################" },
    { kind: "hash", text: "#### In Account: 5158XXXXXXXX, region: us-east-1 ####" },
    { kind: "hash", text: "###################################################" },
    { kind: "rule", text: "-------------------------------------------------------------------------" },
    { kind: "bar", text: `- Installing Application Migration Service Agent for:   ${server} -` },
    { kind: "rule", text: "-------------------------------------------------------------------------" },
    { kind: "log", text: `** Successfully downloaded Agent installer for: ${server} **` },
    { kind: "log", text: "Verifying that the source server has enough free disk space to install the AWS Replication Agent." },
    { kind: "log", text: "(a minimum of 2 GB of free disk space is required)" },
    { kind: "log", text: "Identifying volumes for replication." },
    { kind: "log", text: "Disk to replicate identified: c:0 of size 30 GiB" },
    { kind: "log", text: "All volumes for replication were successfully identified." },
    { kind: "log", text: "Downloading the AWS Replication Agent onto the source server... Finished." },
    { kind: "log", text: "Installing the AWS Replication Agent onto the source server... Finished." },
    { kind: "log", text: "Syncing the source server with the Application Migration Service Console... Finished." },
    { kind: "log", text: `The following is the source server ID: ${serverId}.` },
    { kind: "log", text: "The AWS Replication Agent was successfully installed." },
    { kind: "log", text: "The installation of the AWS Replication Agent has started." },
    { kind: "blank", text: "" },
    { kind: "log", text: `** Installation finished for : ${server} **` },
    { kind: "blank", text: "" },
  ];
}

// characters typed per tick, and the pause after the line
const SPEED: Record<Kind, [number, number]> = {
  banner: [14, 40],
  hash: [16, 40],
  rule: [18, 40],
  bar: [3, 260],
  log: [3, 150],
  blank: [1, 90],
};

export default function AgentTerminal() {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);
  const [lines, setLines] = useState<Line[]>([]);
  const [typing, setTyping] = useState<Line | null>(null);
  const [typed, setTyped] = useState("");
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => setActive(entry.isIntersecting), { threshold: 0.2 });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!active || reduced) return;
    let timer = 0;
    let cancelled = false;
    let n = 1;
    let queue: Line[] = block(n);
    let pos = 0;

    const tick = () => {
      if (cancelled) return;
      if (queue.length === 0) {
        n += 1;
        queue = block(n);
      }
      const line = queue[0];
      const [speed, pause] = SPEED[line.kind];
      pos += speed;
      if (pos >= line.text.length) {
        queue.shift();
        pos = 0;
        setLines((prev) => [...prev.slice(-(MAX_LINES - 1)), line]);
        setTyping(null);
        setTyped("");
        timer = window.setTimeout(tick, pause);
      } else {
        setTyping(line);
        setTyped(line.text.slice(0, pos));
        timer = window.setTimeout(tick, 32);
      }
    };
    tick();
    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, [active, reduced]);

  const shown = reduced ? block(1) : lines;

  return (
    <div ref={ref} className="at" role="img" aria-label="에이전트 설치 로그가 끊임없이 입력되는 콘솔 화면">
      <div className="at-screen" aria-hidden="true">
        {shown.map((l, i) => (
          <div key={i} className={`at-line at-${l.kind}`}>
            {l.text || " "}
          </div>
        ))}
        {typing && (
          <div className={`at-line at-${typing.kind}`}>
            {typed}
            <i className="at-cursor" />
          </div>
        )}
        {!typing && !reduced && (
          <div className="at-line">
            <i className="at-cursor" />
          </div>
        )}
      </div>
    </div>
  );
}
