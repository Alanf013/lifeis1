import { motion, useReducedMotion } from "framer-motion";

const ease = [0.23, 1, 0.32, 1] as const;

/**
 * Revela um título palavra por palavra (fade + translateY com stagger).
 * Use uma instância por linha para preservar a hierarquia tipográfica existente.
 */
export function WordReveal({
  text,
  className,
  style,
  delay = 0,
  as = "span",
}: {
  text: string;
  className?: string;
  style?: React.CSSProperties;
  delay?: number;
  as?: "span" | "div";
}) {
  const reduce = useReducedMotion();
  const words = text.split(" ").filter(Boolean);
  const Tag = as === "div" ? motion.div : motion.span;

  if (reduce) {
    return (
      <span className={className} style={style}>
        {text}
      </span>
    );
  }

  return (
    <Tag
      className={className}
      style={style}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-12% 0px -12% 0px" }}
      variants={{
        hidden: {},
        show: { transition: { delayChildren: delay, staggerChildren: 0.075 } },
      }}
    >
      {words.map((w, i) => (
        <span
          key={`${w}-${i}`}
          className="inline-block overflow-hidden align-bottom"
          style={{ paddingBottom: "0.08em" }}
        >
          <motion.span
            className="inline-block will-change-transform"
            variants={{
              hidden: { opacity: 0, y: "0.7em" },
              show: { opacity: 1, y: 0, transition: { duration: 0.65, ease } },
            }}
          >
            {w}
            {i < words.length - 1 ? "\u00A0" : ""}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}
