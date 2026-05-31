"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

type PerformanceStat = {
  label: string;
  value: string;
  accent: string;
  width: string;
};

type DataPerformanceCoreProps = {
  stats: ReadonlyArray<PerformanceStat>;
};

type PanelVariant = "network" | "metrics" | "charts" | "telemetry";

type PanelTextureOptions = {
  accent: string;
  label: string;
  value: string;
  variant: PanelVariant;
};

function createPanelTexture({ accent, label, value, variant }: PanelTextureOptions) {
  const canvas = document.createElement("canvas");
  canvas.width = 1024;
  canvas.height = 720;

  const ctx = canvas.getContext("2d");

  if (!ctx) {
    const fallback = new THREE.CanvasTexture(canvas);
    fallback.colorSpace = THREE.SRGBColorSpace;
    return fallback;
  }

  const cyan = "#9af8ff";
  const violet = "#bc13fe";
  const stroke = accent || cyan;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "rgba(2, 12, 18, 0.12)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.strokeStyle = `${stroke}aa`;
  ctx.lineWidth = 3;
  ctx.strokeRect(36, 36, canvas.width - 72, canvas.height - 72);

  ctx.strokeStyle = `${cyan}55`;
  ctx.lineWidth = 1;
  ctx.strokeRect(56, 56, canvas.width - 112, canvas.height - 112);

  ctx.fillStyle = cyan;
  ctx.font = '600 34px "SFMono-Regular", Consolas, monospace';
  ctx.textAlign = "left";
  ctx.fillText(label, 72, 112);

  ctx.fillStyle = stroke;
  ctx.font = '700 92px "SFMono-Regular", Consolas, monospace';
  ctx.fillText(value, 72, 212);

  ctx.strokeStyle = `${cyan}4d`;
  ctx.lineWidth = 1;

  for (let i = 0; i < 9; i += 1) {
    const y = 280 + i * 32;
    ctx.beginPath();
    ctx.moveTo(72, y);
    ctx.lineTo(canvas.width - 88, y);
    ctx.stroke();
  }

  ctx.fillStyle = "rgba(154, 248, 255, 0.58)";
  ctx.font = '400 18px "SFMono-Regular", Consolas, monospace';

  const codeRows = [
    "node://signal.bridge/telemetry",
    "node://security.layer/diagnostics",
    "stream://analysis.matrix/live",
    "mesh://routing.core/packet.flow",
    "cluster://orchestrator/health.ok",
    "proxy://edge.gateway/runtime",
    "graph://decision.engine/inference"
  ];

  codeRows.forEach((row, index) => {
    ctx.fillText(row, 82, 294 + index * 32);
  });

  if (variant === "network") {
    ctx.strokeStyle = `${cyan}99`;
    ctx.lineWidth = 2;
    const nodes = [
      [420, 276],
      [562, 240],
      [690, 310],
      [618, 424],
      [474, 454],
      [356, 374]
    ] as const;

    const links = [
      [0, 1],
      [1, 2],
      [2, 3],
      [3, 4],
      [4, 5],
      [5, 0],
      [0, 2],
      [1, 3],
      [2, 4],
      [3, 5]
    ] as const;

    links.forEach(([from, to]) => {
      ctx.beginPath();
      ctx.moveTo(nodes[from][0], nodes[from][1]);
      ctx.lineTo(nodes[to][0], nodes[to][1]);
      ctx.stroke();
    });

    nodes.forEach(([x, y], index) => {
      ctx.beginPath();
      ctx.fillStyle = index % 3 === 0 ? violet : cyan;
      ctx.arc(x, y, 9, 0, Math.PI * 2);
      ctx.fill();
    });
  }

  if (variant === "metrics") {
    ctx.fillStyle = `${cyan}cc`;
    ctx.font = '500 18px "SFMono-Regular", Consolas, monospace';
    ["load", "cache", "nodes", "latency", "health"].forEach((item, index) => {
      ctx.fillText(item.toUpperCase(), 686, 322 + index * 54);
      ctx.fillStyle = index % 2 === 0 ? stroke : cyan;
      ctx.fillRect(820, 306 + index * 54, 90 + index * 16, 8);
      ctx.fillStyle = `${cyan}cc`;
    });
  }

  if (variant === "charts" || variant === "telemetry") {
    const baseY = 580;
    ctx.strokeStyle = variant === "charts" ? `${stroke}cc` : `${cyan}cc`;
    ctx.lineWidth = 3;
    ctx.beginPath();

    const points = variant === "charts"
      ? [
          [74, 594],
          [176, 544],
          [258, 560],
          [372, 452],
          [492, 474],
          [616, 378],
          [742, 422],
          [910, 322]
        ]
      : [
          [74, 564],
          [154, 552],
          [246, 514],
          [354, 530],
          [444, 436],
          [568, 482],
          [706, 392],
          [858, 364]
        ];

    points.forEach(([x, y], index) => {
      if (index === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    });
    ctx.stroke();

    points.forEach(([x, y]) => {
      ctx.beginPath();
      ctx.fillStyle = stroke;
      ctx.arc(x, y, 5, 0, Math.PI * 2);
      ctx.fill();
    });

    ctx.strokeStyle = `${cyan}55`;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(72, baseY);
    ctx.lineTo(canvas.width - 80, baseY);
    ctx.stroke();
  }

  for (let i = 0; i < 18; i += 1) {
    const x = 72 + i * 48;
    ctx.fillStyle = i % 4 === 0 ? `${stroke}cc` : `${cyan}66`;
    ctx.fillRect(x, canvas.height - 98, 22, 3);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.needsUpdate = true;
  return texture;
}

function createRingTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 2048;
  canvas.height = 512;

  const ctx = canvas.getContext("2d");

  if (!ctx) {
    const fallback = new THREE.CanvasTexture(canvas);
    fallback.colorSpace = THREE.SRGBColorSpace;
    return fallback;
  }

  const cyan = "#9af8ff";

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.strokeStyle = "rgba(154, 248, 255, 0.45)";
  ctx.lineWidth = 8;
  ctx.beginPath();
  ctx.moveTo(80, 108);
  ctx.lineTo(canvas.width - 80, 108);
  ctx.moveTo(80, canvas.height - 108);
  ctx.lineTo(canvas.width - 80, canvas.height - 108);
  ctx.stroke();

  ctx.strokeStyle = "rgba(154, 248, 255, 0.16)";
  ctx.lineWidth = 2;
  for (let i = 0; i < 72; i += 1) {
    const x = 96 + i * 26;
    ctx.beginPath();
    ctx.moveTo(x, 126);
    ctx.lineTo(x, 148);
    ctx.moveTo(x, canvas.height - 126);
    ctx.lineTo(x, canvas.height - 148);
    ctx.stroke();
  }

  ctx.fillStyle = cyan;
  ctx.textAlign = "center";
  ctx.font = '700 118px "SFMono-Regular", Consolas, monospace';
  ctx.fillText("SYSTEM_TERMINAL", canvas.width / 2, 260);

  ctx.font = '600 44px "SFMono-Regular", Consolas, monospace';
  ctx.fillText("[ SECURE ROOM // DATA ACCESS ]", canvas.width / 2, 344);

  ctx.strokeStyle = "rgba(154, 248, 255, 0.75)";
  ctx.lineWidth = 4;
  ctx.strokeRect(196, 148, 220, 140);
  ctx.strokeRect(canvas.width - 416, 148, 220, 140);

  ctx.font = '600 38px "SFMono-Regular", Consolas, monospace';
  ctx.fillText("SYS", 306, 232);
  ctx.fillText("DTC", canvas.width - 306, 232);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.needsUpdate = true;
  return texture;
}

function createCircuitTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 1200;
  canvas.height = 600;

  const ctx = canvas.getContext("2d");

  if (!ctx) {
    const fallback = new THREE.CanvasTexture(canvas);
    fallback.colorSpace = THREE.SRGBColorSpace;
    return fallback;
  }

  ctx.fillStyle = "#07121a";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.strokeStyle = "rgba(154, 248, 255, 0.86)";
  ctx.lineWidth = 6;

  const traces = [
    [52, 116, 264, 116, 264, 196, 374, 196],
    [128, 474, 328, 474, 328, 366, 488, 366],
    [398, 116, 526, 116, 526, 248, 716, 248],
    [624, 436, 804, 436, 804, 302, 964, 302],
    [862, 116, 1026, 116, 1026, 216, 1120, 216],
    [824, 512, 984, 512, 984, 414, 1138, 414]
  ] as const;

  traces.forEach((trace) => {
    ctx.beginPath();
    ctx.moveTo(trace[0], trace[1]);
    for (let i = 2; i < trace.length; i += 2) {
      ctx.lineTo(trace[i], trace[i + 1]);
    }
    ctx.stroke();
  });

  const nodes = [
    [264, 116],
    [374, 196],
    [328, 366],
    [488, 366],
    [526, 248],
    [804, 302],
    [984, 414]
  ] as const;

  ctx.fillStyle = "rgba(154, 248, 255, 0.92)";
  nodes.forEach(([x, y]) => {
    ctx.beginPath();
    ctx.arc(x, y, 12, 0, Math.PI * 2);
    ctx.fill();
  });

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.wrapS = THREE.RepeatWrapping;
  texture.repeat.set(2.2, 1);
  texture.needsUpdate = true;
  return texture;
}

function createGlowDiscTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 512;

  const ctx = canvas.getContext("2d");

  if (!ctx) {
    const fallback = new THREE.CanvasTexture(canvas);
    fallback.colorSpace = THREE.SRGBColorSpace;
    return fallback;
  }

  const gradient = ctx.createRadialGradient(256, 256, 24, 256, 256, 256);
  gradient.addColorStop(0, "rgba(154, 248, 255, 0.92)");
  gradient.addColorStop(0.26, "rgba(154, 248, 255, 0.24)");
  gradient.addColorStop(0.6, "rgba(154, 248, 255, 0.08)");
  gradient.addColorStop(1, "rgba(154, 248, 255, 0)");

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 512, 512);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.needsUpdate = true;
  return texture;
}

export default function DataPerformanceCore({ stats }: DataPerformanceCoreProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;

    if (!wrap || !canvas) {
      return;
    }

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.6));
    renderer.setSize(wrap.clientWidth, wrap.clientHeight);
    renderer.setClearColor(0x031019, 1);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x041019, 0.048);

    const camera = new THREE.PerspectiveCamera(34, wrap.clientWidth / wrap.clientHeight, 0.1, 80);
    camera.position.set(0, 4.2, 14.8);
    camera.lookAt(0, 3.2, 0);

    const ambientLight = new THREE.AmbientLight(0x75dff7, 0.45);
    scene.add(ambientLight);

    const roomLight = new THREE.PointLight(0x9af8ff, 7.4, 24, 2);
    roomLight.position.set(0, 7.6, 1.8);
    scene.add(roomLight);

    const magentaAccent = new THREE.PointLight(0xbc13fe, 1.6, 14, 2);
    magentaAccent.position.set(0.8, 2.2, 2.8);
    scene.add(magentaAccent);

    const rimLightLeft = new THREE.SpotLight(0x72f4ff, 6, 30, 0.6, 0.75, 1);
    rimLightLeft.position.set(-8, 9, 7);
    rimLightLeft.target.position.set(-1.8, 1.4, 0);
    scene.add(rimLightLeft, rimLightLeft.target);

    const rimLightRight = new THREE.SpotLight(0x72f4ff, 4.4, 30, 0.65, 0.72, 1);
    rimLightRight.position.set(8, 8.6, 7);
    rimLightRight.target.position.set(1.8, 1.4, 0);
    scene.add(rimLightRight, rimLightRight.target);

    const textures: THREE.Texture[] = [];
    const registerTexture = <T extends THREE.Texture>(texture: T) => {
      textures.push(texture);
      return texture;
    };

    const chamber = new THREE.Mesh(
      new THREE.CylinderGeometry(8.4, 8.4, 13.8, 96, 1, true),
      new THREE.MeshPhysicalMaterial({
        color: 0x06131b,
        side: THREE.BackSide,
        roughness: 1,
        metalness: 0.08,
        transparent: true,
        opacity: 0.96
      })
    );
    chamber.position.y = 3.2;
    scene.add(chamber);

    const chamberHaloTop = new THREE.Mesh(
      new THREE.TorusGeometry(7.9, 0.065, 16, 180),
      new THREE.MeshBasicMaterial({
        color: 0x9af8ff,
        transparent: true,
        opacity: 0.7
      })
    );
    chamberHaloTop.rotation.x = Math.PI / 2;
    chamberHaloTop.position.y = 7.4;
    scene.add(chamberHaloTop);

    const chamberHaloBottom = chamberHaloTop.clone();
    chamberHaloBottom.position.y = -1.05;
    scene.add(chamberHaloBottom);

    const floor = new THREE.Mesh(
      new THREE.CircleGeometry(8.6, 96),
      new THREE.MeshStandardMaterial({
        color: 0x02070d,
        roughness: 0.98,
        metalness: 0.08
      })
    );
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -1.2;
    scene.add(floor);

    const floorRingOuter = new THREE.Mesh(
      new THREE.TorusGeometry(6.2, 0.085, 16, 180),
      new THREE.MeshBasicMaterial({
        color: 0x8befff,
        transparent: true,
        opacity: 0.42
      })
    );
    floorRingOuter.rotation.x = Math.PI / 2;
    floorRingOuter.position.y = -1.05;
    scene.add(floorRingOuter);

    const floorRingInner = new THREE.Mesh(
      new THREE.TorusGeometry(3.2, 0.08, 16, 180),
      new THREE.MeshBasicMaterial({
        color: 0x8befff,
        transparent: true,
        opacity: 0.4
      })
    );
    floorRingInner.rotation.x = Math.PI / 2;
    floorRingInner.position.y = -0.8;
    scene.add(floorRingInner);

    const deskBase = new THREE.Mesh(
      new THREE.CylinderGeometry(2.1, 2.48, 1.98, 64),
      new THREE.MeshStandardMaterial({
        color: 0x08131a,
        roughness: 0.78,
        metalness: 0.34
      })
    );
    deskBase.position.y = -0.28;
    scene.add(deskBase);

    const baseCircuitShell = new THREE.Mesh(
      new THREE.CylinderGeometry(2.18, 2.56, 2.02, 64, 1, true),
      new THREE.MeshBasicMaterial({
        map: registerTexture(createCircuitTexture()),
        transparent: true,
        opacity: 0.88,
        side: THREE.DoubleSide,
        blending: THREE.AdditiveBlending,
        depthWrite: false
      })
    );
    baseCircuitShell.position.copy(deskBase.position);
    scene.add(baseCircuitShell);

    const deskTop = new THREE.Mesh(
      new THREE.CylinderGeometry(4.28, 4.7, 0.42, 64),
      new THREE.MeshStandardMaterial({
        color: 0x0a1319,
        roughness: 0.35,
        metalness: 0.7
      })
    );
    deskTop.position.y = 0.66;
    scene.add(deskTop);

    const deskTopGlow = new THREE.Mesh(
      new THREE.TorusGeometry(4.52, 0.08, 16, 180),
      new THREE.MeshBasicMaterial({
        color: 0x8befff,
        transparent: true,
        opacity: 0.72
      })
    );
    deskTopGlow.rotation.x = Math.PI / 2;
    deskTopGlow.position.y = 0.88;
    scene.add(deskTopGlow);

    const terminalRing = new THREE.Mesh(
      new THREE.CylinderGeometry(5.78, 5.78, 1.48, 128, 1, true),
      new THREE.MeshBasicMaterial({
        map: registerTexture(createRingTexture()),
        transparent: true,
        opacity: 0.96,
        side: THREE.DoubleSide,
        blending: THREE.AdditiveBlending,
        depthWrite: false
      })
    );
    terminalRing.position.y = 6.5;
    terminalRing.rotation.y = Math.PI;
    scene.add(terminalRing);

    const terminalRingTop = new THREE.Mesh(
      new THREE.TorusGeometry(5.86, 0.075, 16, 180),
      new THREE.MeshBasicMaterial({
        color: 0xa6fbff,
        transparent: true,
        opacity: 0.72
      })
    );
    terminalRingTop.rotation.x = Math.PI / 2;
    terminalRingTop.position.y = 7.18;
    scene.add(terminalRingTop);

    const terminalRingBottom = terminalRingTop.clone();
    terminalRingBottom.position.y = 5.82;
    scene.add(terminalRingBottom);

    const beamOuter = new THREE.Mesh(
      new THREE.CylinderGeometry(2.5, 1.86, 5.9, 64, 1, true),
      new THREE.MeshBasicMaterial({
        color: 0x9af8ff,
        transparent: true,
        opacity: 0.08,
        side: THREE.DoubleSide,
        blending: THREE.AdditiveBlending,
        depthWrite: false
      })
    );
    beamOuter.position.y = 3.6;
    scene.add(beamOuter);

    const beamInner = new THREE.Mesh(
      new THREE.CylinderGeometry(1.82, 1.32, 5.9, 64, 1, true),
      new THREE.MeshBasicMaterial({
        color: 0x9af8ff,
        transparent: true,
        opacity: 0.12,
        side: THREE.DoubleSide,
        blending: THREE.AdditiveBlending,
        depthWrite: false
      })
    );
    beamInner.position.y = 3.6;
    scene.add(beamInner);

    const beamGlow = new THREE.Mesh(
      new THREE.PlaneGeometry(7.8, 7.8),
      new THREE.MeshBasicMaterial({
        map: registerTexture(createGlowDiscTexture()),
        transparent: true,
        opacity: 0.4,
        blending: THREE.AdditiveBlending,
        depthWrite: false
      })
    );
    beamGlow.rotation.x = -Math.PI / 2;
    beamGlow.position.y = 0.92;
    scene.add(beamGlow);

    const coreGroup = new THREE.Group();
    coreGroup.position.set(0, 3.45, 0);
    scene.add(coreGroup);

    const coreHexFrame = new THREE.Mesh(
      new THREE.CircleGeometry(1.86, 6),
      new THREE.MeshBasicMaterial({
        color: 0x9af8ff,
        transparent: true,
        opacity: 0.22,
        wireframe: true
      })
    );
    coreHexFrame.position.z = -0.26;
    coreGroup.add(coreHexFrame);

    const coreNodeVectors: THREE.Vector3[] = [];
    for (let i = 0; i < 20; i += 1) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const radius = 1.12 + Math.random() * 0.42;
      coreNodeVectors.push(
        new THREE.Vector3(
          radius * Math.sin(phi) * Math.cos(theta),
          radius * Math.cos(phi),
          radius * Math.sin(phi) * Math.sin(theta)
        )
      );
    }

    const nodePositions = new Float32Array(coreNodeVectors.length * 3);
    coreNodeVectors.forEach((node, index) => {
      nodePositions[index * 3] = node.x;
      nodePositions[index * 3 + 1] = node.y;
      nodePositions[index * 3 + 2] = node.z;
    });

    const nodeGeometry = new THREE.BufferGeometry();
    nodeGeometry.setAttribute("position", new THREE.BufferAttribute(nodePositions, 3));

    const nodeMaterial = new THREE.PointsMaterial({
      color: 0xa7fbff,
      size: 0.16,
      transparent: true,
      opacity: 0.95,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });
    const coreNodes = new THREE.Points(nodeGeometry, nodeMaterial);
    coreGroup.add(coreNodes);

    const linkPositions: number[] = [];
    for (let i = 0; i < coreNodeVectors.length; i += 1) {
      for (let j = i + 1; j < coreNodeVectors.length; j += 1) {
        const distance = coreNodeVectors[i].distanceTo(coreNodeVectors[j]);
        if (distance < 1.56 || (distance < 2.1 && Math.random() > 0.8)) {
          linkPositions.push(
            coreNodeVectors[i].x,
            coreNodeVectors[i].y,
            coreNodeVectors[i].z,
            coreNodeVectors[j].x,
            coreNodeVectors[j].y,
            coreNodeVectors[j].z
          );
        }
      }
    }

    const linksGeometry = new THREE.BufferGeometry();
    linksGeometry.setAttribute("position", new THREE.Float32BufferAttribute(linkPositions, 3));
    const links = new THREE.LineSegments(
      linksGeometry,
      new THREE.LineBasicMaterial({
        color: 0x9af8ff,
        transparent: true,
        opacity: 0.28,
        blending: THREE.AdditiveBlending,
        depthWrite: false
      })
    );
    coreGroup.add(links);

    const outerWireframe = new THREE.Mesh(
      new THREE.IcosahedronGeometry(1.74, 1),
      new THREE.MeshBasicMaterial({
        color: 0xa5fbff,
        transparent: true,
        opacity: 0.18,
        wireframe: true
      })
    );
    coreGroup.add(outerWireframe);

    const dataHalo = new THREE.Mesh(
      new THREE.TorusGeometry(1.68, 0.034, 16, 128),
      new THREE.MeshBasicMaterial({
        color: 0xa7fbff,
        transparent: true,
        opacity: 0.5
      })
    );
    dataHalo.rotation.x = Math.PI / 2;
    dataHalo.position.y = -1.92;
    scene.add(dataHalo);

    const panelConfigs = [
      {
        position: new THREE.Vector3(0, 2.35, 1.26),
        rotation: new THREE.Euler(-0.04, 0, 0),
        size: [4.18, 2.32] as const,
        accent: "#9af8ff",
        label: "CORE_NETWORK_MAP",
        value: "LIVE",
        variant: "network" as const,
        opacity: 0.56
      },
      {
        position: new THREE.Vector3(-3.08, 2.88, 0.64),
        rotation: new THREE.Euler(0.02, 0.3, 0.08),
        size: [2.52, 1.78] as const,
        accent: stats[0]?.accent ?? "#00f2ff",
        label: stats[0]?.label ?? "CONVERSION_PATH",
        value: stats[0]?.value ?? "MAPPED",
        variant: "charts" as const,
        opacity: 0.58
      },
      {
        position: new THREE.Vector3(3.28, 3.04, 0.74),
        rotation: new THREE.Euler(0.02, -0.3, -0.08),
        size: [2.52, 1.78] as const,
        accent: stats[1]?.accent ?? "#bc13fe",
        label: stats[1]?.label ?? "REVENUE_FLOW",
        value: stats[1]?.value ?? "STRUCTURED",
        variant: "metrics" as const,
        opacity: 0.58
      },
      {
        position: new THREE.Vector3(-2.02, 1.22, 1.44),
        rotation: new THREE.Euler(0.2, 0.28, 0.16),
        size: [2.34, 1.62] as const,
        accent: "#9af8ff",
        label: "INFRA_GRID_STATUS",
        value: stats[2]?.value ?? "MONITORED",
        variant: "telemetry" as const,
        opacity: 0.52
      },
      {
        position: new THREE.Vector3(2.1, 1.18, 1.32),
        rotation: new THREE.Euler(0.2, -0.24, -0.16),
        size: [2.34, 1.62] as const,
        accent: "#9af8ff",
        label: "ROUTING_NODES",
        value: "216",
        variant: "network" as const,
        opacity: 0.5
      },
      {
        position: new THREE.Vector3(-4.7, 0.74, -0.3),
        rotation: new THREE.Euler(0.03, 0.54, 0.08),
        size: [1.5, 1.06] as const,
        accent: "#9af8ff",
        label: "EDGE_TERM_A",
        value: "SYNC",
        variant: "telemetry" as const,
        opacity: 0.42
      },
      {
        position: new THREE.Vector3(4.74, 0.82, -0.24),
        rotation: new THREE.Euler(0.03, -0.54, -0.08),
        size: [1.5, 1.06] as const,
        accent: "#9af8ff",
        label: "EDGE_TERM_B",
        value: "LIVE",
        variant: "charts" as const,
        opacity: 0.42
      },
      {
        position: new THREE.Vector3(0, 4.86, -0.4),
        rotation: new THREE.Euler(-0.22, 0, 0),
        size: [2.46, 1.1] as const,
        accent: "#9af8ff",
        label: "UPLINK_CLUSTER",
        value: "12 NODES",
        variant: "metrics" as const,
        opacity: 0.36
      }
    ];

    const animatedPanels: Array<{
      mesh: THREE.Mesh<THREE.PlaneGeometry, THREE.MeshBasicMaterial>;
      baseY: number;
      baseOpacity: number;
      phase: number;
    }> = [];

    panelConfigs.forEach((config, index) => {
      const panelTexture = registerTexture(
        createPanelTexture({
          accent: config.accent,
          label: config.label,
          value: config.value,
          variant: config.variant
        })
      );

      const panelMaterial = new THREE.MeshBasicMaterial({
        map: panelTexture,
        transparent: true,
        opacity: config.opacity,
        side: THREE.DoubleSide,
        blending: THREE.AdditiveBlending,
        depthWrite: false
      });

      const panel = new THREE.Mesh(
        new THREE.PlaneGeometry(config.size[0], config.size[1]),
        panelMaterial
      );
      panel.position.copy(config.position);
      panel.rotation.copy(config.rotation);
      scene.add(panel);

      animatedPanels.push({
        mesh: panel,
        baseY: config.position.y,
        baseOpacity: config.opacity,
        phase: index * 0.6 + Math.random() * 0.8
      });
    });

    const sideConsoleTexture = registerTexture(
      createPanelTexture({
        accent: "#9af8ff",
        label: "SIDE_CONSOLE",
        value: "AUTH",
        variant: "metrics"
      })
    );

    const sideConsoleMaterial = new THREE.MeshBasicMaterial({
      map: sideConsoleTexture,
      transparent: true,
      opacity: 0.36,
      side: THREE.DoubleSide,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });

    const sideConsoleLeft = new THREE.Mesh(new THREE.PlaneGeometry(1.34, 0.96), sideConsoleMaterial.clone());
    sideConsoleLeft.position.set(-6.1, 1.26, 0.62);
    sideConsoleLeft.rotation.set(0.02, 0.62, 0.08);
    scene.add(sideConsoleLeft);

    const sideConsoleRight = new THREE.Mesh(new THREE.PlaneGeometry(1.34, 0.96), sideConsoleMaterial.clone());
    sideConsoleRight.position.set(6.08, 1.3, 0.6);
    sideConsoleRight.rotation.set(0.02, -0.62, -0.08);
    scene.add(sideConsoleRight);

    const figureMaterial = new THREE.MeshStandardMaterial({
      color: 0x04070a,
      roughness: 1,
      metalness: 0,
      transparent: true,
      opacity: 0.96
    });

    const createOperator = (x: number, z: number, scale: number) => {
      const group = new THREE.Group();

      const cloak = new THREE.Mesh(
        new THREE.ConeGeometry(0.66 * scale, 2.26 * scale, 16),
        figureMaterial
      );
      cloak.position.y = 0.72 * scale;
      group.add(cloak);

      const torso = new THREE.Mesh(
        new THREE.CylinderGeometry(0.24 * scale, 0.28 * scale, 1.1 * scale, 16),
        figureMaterial
      );
      torso.position.y = 1.18 * scale;
      group.add(torso);

      const head = new THREE.Mesh(
        new THREE.SphereGeometry(0.22 * scale, 16, 16),
        figureMaterial
      );
      head.position.y = 1.92 * scale;
      group.add(head);

      group.position.set(x, -0.26, z);
      scene.add(group);
    };

    createOperator(-5.34, 1.96, 1.04);
    createOperator(5.22, 2.08, 1.02);
    createOperator(-6.86, 0.92, 0.84);

    const cableMaterial = new THREE.MeshBasicMaterial({
      color: 0x081117,
      transparent: true,
      opacity: 0.9
    });

    const cableSeeds = [
      [-7.6, 8.4, -6.4, 0.2],
      [-6.8, 8.8, -5.2, 0.7],
      [7.6, 8.6, 6.4, 0.26],
      [6.8, 8.2, 5.2, 0.74]
    ] as const;

    cableSeeds.forEach(([xTop, yTop, xBottom, curveSeed]) => {
      const curve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(xTop, yTop, -1.8),
        new THREE.Vector3(xTop * 0.76, 4.8, -0.6),
        new THREE.Vector3(xBottom, 1.2, 1.8),
        new THREE.Vector3(xBottom, -1.14, 4.2 * curveSeed)
      ]);
      const cable = new THREE.Mesh(
        new THREE.TubeGeometry(curve, 48, 0.04, 8, false),
        cableMaterial
      );
      scene.add(cable);
    });

    const dustGeometry = new THREE.BufferGeometry();
    const dustCount = 440;
    const dustPositions = new Float32Array(dustCount * 3);
    for (let i = 0; i < dustCount; i += 1) {
      dustPositions[i * 3] = (Math.random() - 0.5) * 15;
      dustPositions[i * 3 + 1] = Math.random() * 11.5 - 1;
      dustPositions[i * 3 + 2] = (Math.random() - 0.5) * 12;
    }
    dustGeometry.setAttribute("position", new THREE.BufferAttribute(dustPositions, 3));

    const dust = new THREE.Points(
      dustGeometry,
      new THREE.PointsMaterial({
        color: 0xb9ffff,
        size: 0.024,
        transparent: true,
        opacity: 0.38,
        depthWrite: false
      })
    );
    scene.add(dust);

    const clock = new THREE.Clock();
    let raf = 0;
    let paused = false;

    const onVisibilityChange = () => {
      paused = document.hidden;
    };

    document.addEventListener("visibilitychange", onVisibilityChange);

    const onResize = () => {
      const width = wrap.clientWidth;
      const height = wrap.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.6));
    };

    window.addEventListener("resize", onResize);

    const render = () => {
      raf = window.requestAnimationFrame(render);

      if (paused) {
        return;
      }

      const elapsed = clock.getElapsedTime();

      if (!reducedMotion) {
        terminalRing.rotation.y = Math.PI + elapsed * 0.06;
        outerWireframe.rotation.y = elapsed * 0.22;
        outerWireframe.rotation.x = Math.sin(elapsed * 0.16) * 0.14;
        coreGroup.rotation.y = elapsed * 0.18;
        coreNodes.rotation.y = -elapsed * 0.26;
        links.rotation.y = elapsed * 0.1;
        beamOuter.material.opacity = 0.075 + Math.sin(elapsed * 1.2) * 0.01;
        beamInner.material.opacity = 0.12 + Math.sin(elapsed * 1.6 + 0.8) * 0.014;
        dataHalo.rotation.z = elapsed * 0.2;
        beamGlow.material.opacity = 0.34 + Math.sin(elapsed * 1.4) * 0.04;
        dust.rotation.y = elapsed * 0.025;

        animatedPanels.forEach((panel, index) => {
          panel.mesh.position.y = panel.baseY + Math.sin(elapsed * 0.72 + panel.phase) * 0.06;
          panel.mesh.rotation.z += Math.sin(elapsed * 0.18 + index) * 0.00045;
          panel.mesh.material.opacity = panel.baseOpacity + Math.sin(elapsed * 1.3 + panel.phase) * 0.03;
        });
      }

      renderer.render(scene, camera);
    };

    render();

    return () => {
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      window.cancelAnimationFrame(raf);
      scene.traverse((object) => {
        const mesh = object as THREE.Mesh;
        if (mesh.geometry) {
          mesh.geometry.dispose();
        }

        const material = mesh.material as THREE.Material | THREE.Material[] | undefined;
        if (Array.isArray(material)) {
          material.forEach((item) => item.dispose());
        } else {
          material?.dispose();
        }
      });
      textures.forEach((texture) => texture.dispose());
      renderer.dispose();
    };
  }, [stats]);

  return (
    <div ref={wrapRef} className="relative h-full w-full overflow-hidden rounded-[1.6rem] bg-[#031019]">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(circle at 50% 18%, rgba(154,248,255,0.14), transparent 34%), radial-gradient(circle at 50% 56%, rgba(154,248,255,0.06), transparent 40%), linear-gradient(180deg, rgba(2,6,10,0.08), rgba(2,6,10,0.48))"
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "linear-gradient(rgba(154,248,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(154,248,255,0.04) 1px, transparent 1px)",
          backgroundSize: "100% 28px, 28px 100%"
        }}
      />
      <canvas ref={canvasRef} className="h-full w-full" />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at center, transparent 38%, rgba(2, 7, 10, 0.42) 74%, rgba(2, 7, 10, 0.84) 100%)"
        }}
      />
    </div>
  );
}
