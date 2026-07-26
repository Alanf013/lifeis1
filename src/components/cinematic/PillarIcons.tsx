import type { CSSProperties } from "react";

const common = {
  width: 40,
  height: 40,
  viewBox: "0 0 64 64",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function IconSono() {
  return (
    <svg {...common} style={{ color: "var(--sage-deep)" }}>
      <path d="M42 38a14 14 0 1 1-16-20 12 12 0 0 0 16 20z" fill="url(#gSono)" fillOpacity="0.25" />
      <defs>
        <linearGradient id="gSono" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="var(--sage)" />
          <stop offset="100%" stopColor="var(--sage-deep)" />
        </linearGradient>
      </defs>
      {[[14, 16], [50, 20], [46, 46], [16, 44]].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="1.2" fill="var(--sage-deep)">
          <animate attributeName="opacity" values="0.2;1;0.2" dur={`${2 + i * 0.4}s`} repeatCount="indefinite" />
        </circle>
      ))}
    </svg>
  );
}

export function IconAlimentacao() {
  return (
    <svg {...common} style={{ color: "var(--sage-deep)" }}>
      <defs>
        <linearGradient id="gFood" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--sage)">
            <animate attributeName="stop-color" values="var(--sage);var(--sage-deep);var(--sage)" dur="3s" repeatCount="indefinite" />
          </stop>
          <stop offset="100%" stopColor="var(--sage-deep)" />
        </linearGradient>
      </defs>
      <path d="M22 10v18a4 4 0 0 0 4 4v22" stroke="url(#gFood)" />
      <path d="M18 10v10M26 10v10" />
      <path d="M42 10c-4 4-4 16 0 20v24" stroke="url(#gFood)" />
    </svg>
  );
}

export function IconAtividade() {
  return (
    <svg {...common} style={{ color: "var(--sage-deep)" }}>
      <circle cx="40" cy="14" r="3.5" />
      <path d="M20 54l8-14 8 4 6-10" strokeDasharray="6 4">
        <animate attributeName="stroke-dashoffset" from="20" to="0" dur="1.6s" repeatCount="indefinite" />
      </path>
      <path d="M42 24l-4 8-8-4-6 10" />
      <path d="M8 40h6M4 46h8" opacity="0.5" />
    </svg>
  );
}

export function IconEstresse() {
  return (
    <svg {...common} style={{ color: "var(--sage-deep)" }}>
      <path d="M22 20c-6 0-10 4-10 10s4 10 10 10c0 4 4 8 10 8s10-4 10-10c4 0 8-4 8-10s-4-10-8-10c0-4-4-8-10-8s-10 4-10 10z" />
      <path d="M26 34c2-2 4-2 6 0s4 2 6 0" strokeDasharray="10 6">
        <animate attributeName="stroke-dashoffset" from="0" to="-32" dur="2.4s" repeatCount="indefinite" />
      </path>
    </svg>
  );
}

export function IconAnsiedade() {
  return (
    <svg {...common} style={{ color: "var(--sage-deep)" }}>
      <g style={{ transformOrigin: "32px 34px" }}>
        <animateTransform attributeName="transform" type="scale" values="1;1.12;1" dur="1s" repeatCount="indefinite" additive="sum" />
        <path d="M32 50s-14-8-14-20a8 8 0 0 1 14-5 8 8 0 0 1 14 5c0 12-14 20-14 20z" fill="url(#gHeart)" fillOpacity="0.25" />
      </g>
      <defs>
        <linearGradient id="gHeart" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="var(--sage)" />
          <stop offset="100%" stopColor="var(--sage-deep)" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export function IconDor() {
  return (
    <svg {...common} style={{ color: "var(--sage-deep)" }}>
      <path d="M32 8l20 6v14c0 12-8 22-20 28C20 50 12 40 12 28V14l20-6z" fill="url(#gShield)" fillOpacity="0.2" />
      <defs>
        <linearGradient id="gShield" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--sage)" />
          <stop offset="100%" stopColor="var(--sage-deep)" />
        </linearGradient>
      </defs>
      <path d="M30 22l-4 10h6l-2 12 8-14h-6l4-8z" fill="var(--sage-deep)">
        <animateTransform attributeName="transform" type="rotate" from="-6 32 32" to="6 32 32" dur="1.2s" repeatCount="indefinite" values="-6 32 32;6 32 32;-6 32 32" />
        <animate attributeName="opacity" values="0.6;1;0.6" dur="1.2s" repeatCount="indefinite" />
      </path>
    </svg>
  );
}

export const PILLAR_ICONS = {
  sono: IconSono,
  alimentacao: IconAlimentacao,
  atividade: IconAtividade,
  estresse: IconEstresse,
  ansiedade: IconAnsiedade,
  dor: IconDor,
};

export const spinStyle: CSSProperties = {
  animation: "spinY 8s linear infinite",
  transformStyle: "preserve-3d",
};