import { useEffect, useState } from "react";

export function Typewriter({ lines, className }: { lines: string[]; className?: string }) {
  const [text, setText] = useState<string[]>(lines.map(() => ""));
  const [done, setDone] = useState(false);
  useEffect(() => {
    let li = 0, ci = 0;
    const id = setInterval(() => {
      if (!lines || li >= lines.length) {
        clearInterval(id);
        setDone(true);
        return;
      }
      const current = lines[li] ?? "";
      setText((prev) => {
        const next = [...prev];
        next[li] = current.slice(0, ci + 1);
        return next;
      });
      ci++;
      if (ci >= current.length) {
        li++;
        ci = 0;
      }
    }, 42);
    return () => clearInterval(id);
  }, [lines.join("|")]);
  return (
    <div className={className}>
      {text.map((l, i) => (
        <span key={i} className="block">
          {l}
          {i === text.length - 1 && !done && (
            <span className="inline-block w-[3px] h-[0.9em] align-middle ml-1 animate-pulse" style={{ background: "#00D4FF" }} />
          )}
        </span>
      ))}
    </div>
  );
}