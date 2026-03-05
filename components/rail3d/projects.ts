export type MarkerPosition = [number, number, number];

export type RailProject = {
  id: string;
  title: string;
  tag: string;
  href: string;
  markerPosition: MarkerPosition;
  description: string;
};

export const RAIL_LANE_X = [-5.4, -1.8, 1.8, 5.4] as const;

export const RAIL_PROJECTS: RailProject[] = [
  {
    id: "yacht",
    title: "Luxury Yacht Photoshoot",
    tag: "Visual",
    href: "/progetti/luxury-yacht-photoshoot",
    markerPosition: [-5.4, 0.2, -48],
    description: "Pipeline visuale ad alta fedelta per campagne marine premium.",
  },
  {
    id: "architecture",
    title: "Luxury Digital Architecture",
    tag: "Web",
    href: "/progetti/luxury-digital-architecture",
    markerPosition: [-1.8, 0.15, -92],
    description: "Esperienza web immersiva con contenuti cinematici e UX orientata al brand.",
  },
  {
    id: "skyline",
    title: "Luxury Skyline Flight",
    tag: "AI",
    href: "/progetti/luxury-skyline-flight",
    markerPosition: [1.8, 0.1, -136],
    description: "Pre-visualizzazione assistita da AI per riprese drone in ambiente urbano.",
  },
  {
    id: "automation",
    title: "Automation Control Deck",
    tag: "Automation",
    href: "/soluzioni-ai",
    markerPosition: [5.4, 0.05, -180],
    description: "Orchestrazione dei flussi operativi con sistemi AI e monitoraggio centralizzato.",
  },
  {
    id: "retainer",
    title: "AI Performance Retainer",
    tag: "Ops",
    href: "/contatti",
    markerPosition: [1.8, 0.1, -224],
    description: "Ottimizzazione continua tra contenuti, automazioni e presenza digitale.",
  },
];

const clamp01 = (value: number) => Math.max(0, Math.min(1, value));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const smooth = (t: number) => t * t * (3 - 2 * t);

export function getRailPhase(progress: number): "gather" | "twist" | "rail" {
  if (progress < 0.3) return "gather";
  if (progress < 0.65) return "twist";
  return "rail";
}

export function getCameraPosition(progress: number): MarkerPosition {
  const p = clamp01(progress);
  const gatherTwistT = smooth(clamp01(p / 0.65));

  if (p < 0.65) {
    const x = Math.sin(gatherTwistT * Math.PI * 0.95) * 1.2;
    const y = lerp(1.0, 0.72, gatherTwistT);
    const z = lerp(28, 8, gatherTwistT);
    return [x, y, z];
  }

  const railT = smooth(clamp01((p - 0.65) / 0.35));
  const x = Math.sin(railT * Math.PI * 1.1) * 0.9;
  const y = lerp(0.72, 0.34, railT);
  const z = lerp(8, -236, railT);
  return [x, y, z];
}

export function getActiveRailProject(progress: number, threshold = 16): RailProject | null {
  if (progress < 0.64) return null;

  const [cx, cy, cz] = getCameraPosition(progress);
  let nearest: RailProject | null = null;
  let bestDistance = Number.POSITIVE_INFINITY;

  for (const project of RAIL_PROJECTS) {
    const [mx, my, mz] = project.markerPosition;
    const dx = cx - mx;
    const dy = cy - my;
    const dz = cz - mz;
    const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);

    if (distance < bestDistance) {
      bestDistance = distance;
      nearest = project;
    }
  }

  return bestDistance <= threshold ? nearest : null;
}
