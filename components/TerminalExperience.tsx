"use client";

import { useEffect, useRef, useState } from "react";
import { CONTACT_INFO } from "@/lib/content";

type Stage = "identity" | "bottleneck" | "objective" | "constraint";
type Identity = "brand" | "creator" | "studio" | "service" | "ecommerce" | "internal";
type Bottleneck = "leads" | "sales" | "ops" | "content" | "authority";
type Objective = "bookings" | "revenue" | "automation" | "positioning" | "scale";
type Constraint = "time" | "budget" | "team" | "traffic" | "stack";
type ModuleStatus = "active" | "standby" | "offline";
type LineKind = "input" | "system" | "signal" | "output" | "warning" | "route" | "profile";

type SessionState = {
  identity?: Identity;
  bottleneck?: Bottleneck;
  objective?: Objective;
  constraint?: Constraint;
};

type TerminalLine = {
  id: number;
  kind: LineKind;
  text: string;
};

type ChoiceOption<T extends string> = {
  value: T;
  note: string;
};

type TopologyNode = {
  id: string;
  label: string;
  title: string;
  x: number;
  y: number;
};

type Blueprint = {
  name: string;
  primaryGain: string;
  failurePoint: string;
  deployOrder: string[];
  narrative: string;
};

const identityOptions: ChoiceOption<Identity>[] = [
  { value: "brand", note: "commercial architecture" },
  { value: "creator", note: "content operator" },
  { value: "studio", note: "client delivery system" },
  { value: "service", note: "lead-driven business" },
  { value: "ecommerce", note: "sales infrastructure" },
  { value: "internal", note: "ops enablement" }
];

const bottleneckOptions: ChoiceOption<Bottleneck>[] = [
  { value: "leads", note: "traffic dispersion" },
  { value: "sales", note: "revenue leakage" },
  { value: "ops", note: "manual overload" },
  { value: "content", note: "low media throughput" },
  { value: "authority", note: "weak market presence" }
];

const objectiveOptions: ChoiceOption<Objective>[] = [
  { value: "bookings", note: "qualified demand" },
  { value: "revenue", note: "transaction lift" },
  { value: "automation", note: "ops compression" },
  { value: "positioning", note: "category authority" },
  { value: "scale", note: "system expansion" }
];

const constraintOptions: ChoiceOption<Constraint>[] = [
  { value: "time", note: "fast deployment" },
  { value: "budget", note: "capital efficiency" },
  { value: "team", note: "limited internal bandwidth" },
  { value: "traffic", note: "input volume instability" },
  { value: "stack", note: "legacy infrastructure" }
];

const stageOrder: Array<Stage | "blueprint"> = ["identity", "bottleneck", "objective", "constraint", "blueprint"];

const stageCopy: Record<Stage, { title: string; eyebrow: string; description: string }> = {
  identity: {
    title: "Identità",
    eyebrow: "Step 01",
    description: "Seleziona il tipo di assetto da cui parte il sistema digitale."
  },
  bottleneck: {
    title: "Collo di bottiglia",
    eyebrow: "Step 02",
    description: "Indica dove oggi si perde più energia: traffico, vendite, operatività, contenuti o autorevolezza."
  },
  objective: {
    title: "Obiettivo",
    eyebrow: "Step 03",
    description: "Definisci il risultato operativo che il sistema deve supportare per primo."
  },
  constraint: {
    title: "Vincolo",
    eyebrow: "Step 04",
    description: "Scegli il vincolo dominante: tempo, budget, team, traffico o stack esistente."
  }
};

const optionLabels: Record<Stage, Record<string, string>> = {
  identity: {
    brand: "Brand",
    creator: "Creator",
    studio: "Studio",
    service: "Servizio",
    ecommerce: "E-commerce",
    internal: "Team interno"
  },
  bottleneck: {
    leads: "Lead dispersi",
    sales: "Vendite deboli",
    ops: "Operazioni manuali",
    content: "Contenuti lenti",
    authority: "Autorevolezza bassa"
  },
  objective: {
    bookings: "Prenotazioni qualificate",
    revenue: "Più ricavi",
    automation: "Automazione",
    positioning: "Posizionamento",
    scale: "Scalabilità"
  },
  constraint: {
    time: "Tempo",
    budget: "Budget",
    team: "Team limitato",
    traffic: "Traffico instabile",
    stack: "Stack esistente"
  }
};

const optionNotesIt: Record<Stage, Record<string, string>> = {
  identity: {
    brand: "Architettura commerciale e percezione di marca.",
    creator: "Produzione contenuti e presenza editoriale.",
    studio: "Sistema per delivery clienti e portfolio.",
    service: "Business guidato da richieste e appuntamenti.",
    ecommerce: "Infrastruttura di vendita online.",
    internal: "Supporto a processi e operatività interna."
  },
  bottleneck: {
    leads: "Il traffico arriva ma non diventa richiesta utile.",
    sales: "Il valore commerciale si perde nel percorso.",
    ops: "Troppi passaggi manuali rallentano il team.",
    content: "La produzione media non regge il ritmo dei canali.",
    authority: "Il mercato non percepisce abbastanza fiducia."
  },
  objective: {
    bookings: "Ridurre la distanza tra visita e richiesta.",
    revenue: "Aumentare resa commerciale e continuità.",
    automation: "Tagliare attività ripetitive con controllo umano.",
    positioning: "Costruire segnale forte e riconoscibile.",
    scale: "Rendere il sistema pronto a crescere."
  },
  constraint: {
    time: "Serve un primo rilascio rapido.",
    budget: "Serve massimizzare il valore del perimetro iniziale.",
    team: "Le persone disponibili sono poche.",
    traffic: "Gli input non sono ancora costanti.",
    stack: "Esistono strumenti o vincoli tecnici da rispettare."
  }
};

const topologyNodes: TopologyNode[] = [
  { id: "web_ecosystem", label: "WEB", title: "Web Ecosystem", x: 110, y: 82 },
  { id: "landing_funnel", label: "FUNNEL", title: "Landing Funnel", x: 254, y: 52 },
  { id: "commerce_matrix", label: "COMMERCE", title: "Commerce Matrix", x: 390, y: 112 },
  { id: "ai_automation", label: "AI", title: "AI Automation", x: 392, y: 266 },
  { id: "custom_control", label: "CUSTOM", title: "Custom Control", x: 248, y: 314 },
  { id: "content_loop", label: "CONTENT", title: "Content Loop", x: 104, y: 248 }
];

const initialSystemLines = [
  "strategic terminal ready",
  "operator scan offline",
  "run boot --identity to initiate diagnosis"
];

function getCurrentStage(session: SessionState): Stage | null {
  if (!session.identity) return "identity";
  if (!session.bottleneck) return "bottleneck";
  if (!session.objective) return "objective";
  if (!session.constraint) return "constraint";
  return null;
}

function buildBlueprint(session: SessionState): Blueprint | null {
  if (!session.identity || !session.bottleneck || !session.objective || !session.constraint) {
    return null;
  }

  if (session.bottleneck === "ops" && session.objective === "automation") {
    return {
      name: "OPERATOR_CORE",
      primaryGain: "operational speed",
      failurePoint: "manual overload",
      deployOrder: ["AI_AUTOMATION", "CUSTOM_CONTROL", "CONTENT_LOOP"],
      narrative: "Il sistema privilegia compressione operativa, eliminazione dei colli manuali e standardizzazione dei passaggi critici."
    };
  }

  if ((session.bottleneck === "leads" || session.identity === "service") && session.objective === "bookings") {
    return {
      name: "LEAD_ENGINE",
      primaryGain: "qualified demand",
      failurePoint: "traffic dispersion",
      deployOrder: ["LANDING_FUNNEL", "WEB_ECOSYSTEM", "CONTENT_LOOP"],
      narrative: "La priorità è catturare attenzione, qualificare traffico e ridurre la distanza tra visita e prenotazione."
    };
  }

  if ((session.bottleneck === "sales" || session.identity === "ecommerce") && session.objective === "revenue") {
    return {
      name: "REVENUE_MATRIX",
      primaryGain: "transaction lift",
      failurePoint: "revenue leakage",
      deployOrder: ["COMMERCE_MATRIX", "LANDING_FUNNEL", "AI_AUTOMATION"],
      narrative: "L’architettura concentra la pressione su conversione, recupero del valore disperso e automazione del flusso commerciale."
    };
  }

  if (session.bottleneck === "authority" || session.objective === "positioning") {
    return {
      name: "AUTHORITY_STACK",
      primaryGain: "market presence",
      failurePoint: "weak category signal",
      deployOrder: ["WEB_ECOSYSTEM", "CONTENT_LOOP", "CUSTOM_CONTROL"],
      narrative: "Il sistema costruisce presenza, coerenza e riconoscibilità con una base web forte e una produzione editoriale continua."
    };
  }

  if (session.bottleneck === "content") {
    return {
      name: "CONTENT_LOOP",
      primaryGain: "media throughput",
      failurePoint: "slow content production",
      deployOrder: ["CONTENT_LOOP", "AI_AUTOMATION", "WEB_ECOSYSTEM"],
      narrative: "L’output viene accelerato con una pipeline creativa continua, sincronizzata con i canali e con i punti di conversione."
    };
  }

  return {
    name: "CUSTOM_CONTROL",
    primaryGain: "system clarity",
    failurePoint: "architecture mismatch",
    deployOrder: ["CUSTOM_CONTROL", "WEB_ECOSYSTEM", "AI_AUTOMATION"],
    narrative: "Il blueprint privilegia controllo, adattamento allo stack esistente e riduzione dell’attrito strutturale."
  };
}

function resolveTopology(session: SessionState) {
  const state = new Map<string, ModuleStatus>(topologyNodes.map((node) => [node.id, "offline"]));

  const activate = (...ids: string[]) => {
    ids.forEach((id) => state.set(id, "active"));
  };

  const standby = (...ids: string[]) => {
    ids.forEach((id) => {
      if (state.get(id) !== "active") {
        state.set(id, "standby");
      }
    });
  };

  switch (session.bottleneck) {
    case "leads":
      activate("landing_funnel", "web_ecosystem");
      standby("content_loop");
      break;
    case "sales":
      activate("commerce_matrix", "landing_funnel");
      standby("ai_automation");
      break;
    case "ops":
      activate("ai_automation", "custom_control");
      standby("content_loop");
      break;
    case "content":
      activate("content_loop", "web_ecosystem");
      standby("ai_automation");
      break;
    case "authority":
      activate("web_ecosystem", "content_loop");
      standby("landing_funnel");
      break;
    default:
      break;
  }

  switch (session.objective) {
    case "bookings":
      activate("landing_funnel");
      standby("web_ecosystem");
      break;
    case "revenue":
      activate("commerce_matrix");
      standby("landing_funnel");
      break;
    case "automation":
      activate("ai_automation", "custom_control");
      break;
    case "positioning":
      activate("web_ecosystem", "content_loop");
      break;
    case "scale":
      activate("ai_automation", "web_ecosystem");
      standby("commerce_matrix");
      break;
    default:
      break;
  }

  switch (session.constraint) {
    case "time":
      activate("ai_automation");
      standby("landing_funnel");
      break;
    case "budget":
      standby("custom_control");
      break;
    case "team":
      activate("ai_automation");
      standby("custom_control");
      break;
    case "traffic":
      activate("landing_funnel");
      standby("content_loop");
      break;
    case "stack":
      activate("custom_control");
      standby("web_ecosystem");
      break;
    default:
      break;
  }

  return topologyNodes.map((node) => ({
    ...node,
    status: state.get(node.id) ?? "offline"
  }));
}

function buildImpactSummary(session: SessionState) {
  const blueprint = buildBlueprint(session);

  if (!blueprint) {
    return [];
  }

  const impactMap: Record<Blueprint["name"], string[]> = {
    OPERATOR_CORE: [
      "ops_load ............ compressing",
      "response_time ....... stabilizing",
      "manual_steps ........ decaying"
    ],
    LEAD_ENGINE: [
      "lead_velocity ....... rising",
      "signal_quality ...... tightening",
      "booking_pressure .... increasing"
    ],
    REVENUE_MATRIX: [
      "checkout_loss ....... falling",
      "order_density ....... rising",
      "commercial_flow ..... stabilizing"
    ],
    AUTHORITY_STACK: [
      "brand_signal ........ intensifying",
      "trust_latency ....... falling",
      "category_presence ... expanding"
    ],
    CONTENT_LOOP: [
      "media_throughput ..... accelerating",
      "channel_sync ......... tightening",
      "creative_delay ....... falling"
    ],
    CUSTOM_CONTROL: [
      "stack_alignment ...... improving",
      "process_noise ........ falling",
      "system_visibility .... rising"
    ]
  };

  return impactMap[blueprint.name];
}

function buildWhyLines(session: SessionState) {
  const blueprint = buildBlueprint(session);

  if (!blueprint || !session.bottleneck || !session.objective || !session.constraint) {
    return ["insufficient signal // complete intake first"];
  }

  return [
    `bottleneck ${session.bottleneck} triggered the primary architecture`,
    `objective ${session.objective} changed deploy order and active modules`,
    `constraint ${session.constraint} compressed the build strategy into ${blueprint.name}`
  ];
}

function buildDeployHref(blueprint: Blueprint | null, session: SessionState) {
  if (!blueprint || !session.identity || !session.bottleneck || !session.objective || !session.constraint) {
    return CONTACT_INFO.whatsapp;
  }

  const message = [
    "KAPPA404 TERMINAL UPLINK",
    `SYSTEM: ${blueprint.name}`,
    `IDENTITY: ${session.identity}`,
    `BOTTLENECK: ${session.bottleneck}`,
    `OBJECTIVE: ${session.objective}`,
    `CONSTRAINT: ${session.constraint}`,
    `DEPLOY_ORDER: ${blueprint.deployOrder.join(" -> ")}`
  ].join("\n");

  return `${CONTACT_INFO.whatsapp}?text=${encodeURIComponent(message)}`;
}

function getStageSuggestions(session: SessionState, mapped: boolean, simulated: boolean, compiled: boolean, deployed: boolean) {
  const stage = getCurrentStage(session);

  if (stage === "identity") {
    return identityOptions.map((option) => `boot --identity ${option.value}`);
  }

  if (stage === "bottleneck") {
    return bottleneckOptions.map((option) => `scan --bottleneck ${option.value}`);
  }

  if (stage === "objective") {
    return objectiveOptions.map((option) => `set --objective ${option.value}`);
  }

  if (stage === "constraint") {
    return constraintOptions.map((option) => `limit --constraint ${option.value}`);
  }

  const commands = ["map --system", "simulate --impact", "compile --blueprint", "why", "reset"];

  if (mapped) {
    commands.splice(0, 1);
  }

  if (simulated) {
    commands.splice(commands.indexOf("simulate --impact"), 1);
  }

  if (compiled) {
    commands.splice(commands.indexOf("compile --blueprint"), 1);
    commands.unshift("deploy --contact");
  }

  if (deployed) {
    return ["why", "reset"];
  }

  return commands;
}

export default function TerminalExperience() {
  const lineId = useRef(0);
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const [session, setSession] = useState<SessionState>({});
  const [input, setInput] = useState("");
  const [mapped, setMapped] = useState(false);
  const [simulated, setSimulated] = useState(false);
  const [compiled, setCompiled] = useState(false);
  const [deployed, setDeployed] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [lines, setLines] = useState<TerminalLine[]>(() =>
    initialSystemLines.map((text, index) => ({
      id: index,
      kind: index === 2 ? "signal" : "system",
      text
    }))
  );

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ block: "end" });
  }, [lines]);

  const topology = resolveTopology(session);
  const blueprint = buildBlueprint(session);
  const deployHref = buildDeployHref(blueprint, session);
  const suggestions = getStageSuggestions(session, mapped, simulated, compiled, deployed);
  const currentStage = getCurrentStage(session);
  const wizardProgressIndex = currentStage ? stageOrder.indexOf(currentStage) : stageOrder.indexOf("blueprint");
  const wizardProgress = Math.round(((wizardProgressIndex + 1) / stageOrder.length) * 100);
  const wizardOptions =
    currentStage === "identity"
      ? identityOptions
      : currentStage === "bottleneck"
        ? bottleneckOptions
        : currentStage === "objective"
          ? objectiveOptions
          : currentStage === "constraint"
            ? constraintOptions
            : [];

  const pushLines = (kind: LineKind, nextLines: string[]) => {
    setLines((current) => [
      ...current,
      ...nextLines.map((text) => {
        lineId.current += 1;
        return { id: lineId.current, kind, text };
      })
    ]);
  };

  const resetTerminal = () => {
    lineId.current = initialSystemLines.length - 1;
    setSession({});
    setMapped(false);
    setSimulated(false);
    setCompiled(false);
    setDeployed(false);
    setLines(
      initialSystemLines.map((text, index) => ({
        id: index,
        kind: index === 2 ? "signal" : "system",
        text
      }))
    );
  };

  const applySelection = <T extends keyof SessionState>(key: T, value: NonNullable<SessionState[T]>) => {
    const nextSession = { ...session, [key]: value };
    setSession(nextSession);

    if (key === "identity") {
      pushLines("output", [`identity locked ....... ${value}`]);
      pushLines("signal", ["run scan --bottleneck"]);
    }

    if (key === "bottleneck") {
      pushLines("output", [`failure point ........ ${value}`]);
      pushLines("signal", ["run set --objective"]);
    }

    if (key === "objective") {
      pushLines("output", [`target state ......... ${value}`]);
      pushLines("signal", ["run limit --constraint"]);
    }

    if (key === "constraint") {
      pushLines("output", [`constraint locked .... ${value}`]);
      pushLines("system", ["intake complete", "run map --system"]);
    }
  };

  const promptOptions = (command: string, options: Array<ChoiceOption<string>>) => {
    pushLines("signal", [command]);
    pushLines(
      "system",
      options.map((option) => `${option.value.padEnd(12, " ")} // ${option.note}`)
    );
  };

  const parseValue = (raw: string, command: string) => {
    const normalized = raw.trim().toLowerCase();
    if (normalized === command) return "";
    if (normalized.startsWith(`${command} `)) {
      return normalized.slice(command.length + 1).trim();
    }
    return null;
  };

  const processCommand = (rawInput: string) => {
    const normalized = rawInput.trim().toLowerCase();
    const currentStage = getCurrentStage(session);

    if (!normalized) return;

    pushLines("input", [rawInput]);

    if (normalized === "reset") {
      resetTerminal();
      return;
    }

    if (normalized === "why") {
      pushLines("system", buildWhyLines(session));
      return;
    }

    if (normalized === "export") {
      pushLines("warning", ["export layer offline // blueprint compiled for live review only"]);
      return;
    }

    if (normalized === "skip") {
      if (currentStage === "identity") applySelection("identity", identityOptions[0].value);
      else if (currentStage === "bottleneck") applySelection("bottleneck", bottleneckOptions[0].value);
      else if (currentStage === "objective") applySelection("objective", objectiveOptions[0].value);
      else if (currentStage === "constraint") applySelection("constraint", constraintOptions[0].value);
      else pushLines("warning", ["no unresolved intake step detected"]);
      return;
    }

    if (currentStage === "identity") {
      const parsed = parseValue(normalized, "boot --identity");
      const fallback = parsed === null ? normalized : parsed;
      const match = identityOptions.find((option) => option.value === fallback);

      if (parsed === "") {
        promptOptions("select operator profile", identityOptions);
        return;
      }

      if (match) {
        applySelection("identity", match.value);
        return;
      }

      pushLines("warning", ["invalid identity // expected brand | creator | studio | service | ecommerce | internal"]);
      return;
    }

    if (currentStage === "bottleneck") {
      const parsed = parseValue(normalized, "scan --bottleneck");
      const fallback = parsed === null ? normalized : parsed;
      const match = bottleneckOptions.find((option) => option.value === fallback);

      if (parsed === "") {
        promptOptions("select failure point", bottleneckOptions);
        return;
      }

      if (match) {
        applySelection("bottleneck", match.value);
        return;
      }

      pushLines("warning", ["invalid bottleneck // expected leads | sales | ops | content | authority"]);
      return;
    }

    if (currentStage === "objective") {
      const parsed = parseValue(normalized, "set --objective");
      const fallback = parsed === null ? normalized : parsed;
      const match = objectiveOptions.find((option) => option.value === fallback);

      if (parsed === "") {
        promptOptions("select target state", objectiveOptions);
        return;
      }

      if (match) {
        applySelection("objective", match.value);
        return;
      }

      pushLines("warning", ["invalid objective // expected bookings | revenue | automation | positioning | scale"]);
      return;
    }

    if (currentStage === "constraint") {
      const parsed = parseValue(normalized, "limit --constraint");
      const fallback = parsed === null ? normalized : parsed;
      const match = constraintOptions.find((option) => option.value === fallback);

      if (parsed === "") {
        promptOptions("declare dominant constraint", constraintOptions);
        return;
      }

      if (match) {
        applySelection("constraint", match.value);
        return;
      }

      pushLines("warning", ["invalid constraint // expected time | budget | team | traffic | stack"]);
      return;
    }

    if (normalized === "map --system") {
      const active = topology.filter((node) => node.status === "active");
      const standbyNodes = topology.filter((node) => node.status === "standby");
      setMapped(true);
      pushLines("output", ["active modules:"]);
      pushLines(
        "system",
        [...active, ...standbyNodes].map((node, index) => {
          const state = node.status === "active" ? "online" : "standby";
          return `[${String(index + 1).padStart(2, "0")}] ${node.id.toUpperCase().padEnd(20, ".")} ${state}`;
        })
      );
      return;
    }

    if (normalized === "simulate --impact") {
      const impact = buildImpactSummary(session);
      setSimulated(true);
      pushLines("signal", ["impact simulation live"]);
      pushLines("system", impact);
      return;
    }

    if (normalized === "compile --blueprint") {
      if (!blueprint) {
        pushLines("warning", ["blueprint compiler stalled // intake incomplete"]);
        return;
      }

      setCompiled(true);
      pushLines("profile", [
        `SYSTEM_NAME: ${blueprint.name}`,
        `PRIMARY_GAIN: ${blueprint.primaryGain}`,
        `FAILURE_POINT: ${blueprint.failurePoint}`,
        `DEPLOY_ORDER: ${blueprint.deployOrder.join(" -> ")}`
      ]);
      return;
    }

    if (normalized === "deploy --contact") {
      if (!blueprint) {
        pushLines("warning", ["secure uplink denied // compile blueprint first"]);
        return;
      }

      setDeployed(true);
      pushLines("route", ["secure uplink ready", "payload attached to WhatsApp channel"]);
      return;
    }

    pushLines("warning", ["unknown command // use guided command stack"]);
  };

  const handleExecute = (value: string) => {
    if (!value.trim() || processing) {
      return;
    }

    setProcessing(true);
    window.setTimeout(() => {
      processCommand(value);
      setInput("");
      setProcessing(false);
    }, 150);
  };

  const handleWizardSelect = (value: string) => {
    if (currentStage === "identity") applySelection("identity", value as Identity);
    if (currentStage === "bottleneck") applySelection("bottleneck", value as Bottleneck);
    if (currentStage === "objective") applySelection("objective", value as Objective);
    if (currentStage === "constraint") applySelection("constraint", value as Constraint);
  };

  return (
    <section className="relative overflow-hidden bg-[#050505] px-4 py-10 md:px-6 md:py-24">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_15%,rgba(0,242,255,0.08),transparent_22%),radial-gradient(circle_at_82%_14%,rgba(188,19,254,0.1),transparent_24%),linear-gradient(180deg,rgba(255,255,255,0.02),transparent_30%)]" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#00f2ff]/50 to-transparent" />

      <div className="relative mx-auto max-w-[1440px]">
        <div className="max-w-4xl">
          <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-[#00f2ff]">TERMINAL // STRATEGIC OPERATOR CONSOLE</p>
          <h1 className="mt-4 font-headline text-3xl font-bold uppercase tracking-[-0.04em] text-white md:text-6xl">
            Terminal Of Becoming
          </h1>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-white/72 md:mt-6 md:text-lg md:leading-8">
            Questa non è una demo decorativa. Il terminale legge il tuo assetto, individua l’attrito dominante e compila un blueprint operativo unico prima di aprire il canale di contatto.
          </p>
        </div>

        <div className="mt-6 lg:hidden">
          <div className="glass-panel overflow-hidden">
            <div className="border-b border-white/10 px-5 py-4">
              <div className="flex items-center justify-between gap-4">
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#00f2ff]">
                  {currentStage ? stageCopy[currentStage].eyebrow : "Step 05"}
                </p>
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/46">{wizardProgress}%</p>
              </div>
              <div className="mt-3 h-1 overflow-hidden bg-white/10">
                <div className="h-full bg-[#00f2ff]" style={{ width: `${wizardProgress}%` }} />
              </div>
            </div>

            <div className="px-5 py-6">
              {currentStage ? (
                <>
                  <h2 className="font-headline text-3xl font-bold uppercase tracking-[-0.03em] text-white">
                    {stageCopy[currentStage].title}
                  </h2>
                  <p className="mt-3 text-sm leading-7 text-white/70">{stageCopy[currentStage].description}</p>

                  <div className="mt-6 grid gap-3">
                    {wizardOptions.map((option) => (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() => handleWizardSelect(option.value)}
                        className="min-h-12 border border-white/10 bg-white/[0.03] px-4 py-4 text-left transition hover:border-[#00f2ff]/40 hover:bg-[#00f2ff]/[0.04] focus-visible:border-[#00f2ff]"
                      >
                        <span className="block font-mono text-[11px] uppercase tracking-[0.18em] text-white">
                          {optionLabels[currentStage][option.value]}
                        </span>
                        <span className="mt-2 block text-sm leading-6 text-white/62">{optionNotesIt[currentStage][option.value]}</span>
                      </button>
                    ))}
                  </div>
                </>
              ) : blueprint ? (
                <>
                  <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#00f2ff]">Blueprint</p>
                  <h2 className="mt-3 font-headline text-3xl font-bold uppercase tracking-[-0.03em] text-white">{blueprint.name}</h2>
                  <p className="mt-4 text-sm leading-7 text-white/70">{blueprint.narrative}</p>
                  <div className="mt-5 grid gap-3 font-mono text-[10px] uppercase tracking-[0.18em] text-white/66">
                    <p>primary_gain // {blueprint.primaryGain}</p>
                    <p>failure_point // {blueprint.failurePoint}</p>
                    <p>deploy_order // {blueprint.deployOrder.join(" -> ")}</p>
                  </div>
                  <div className="mt-6 flex flex-col gap-3">
                    <a href={deployHref} target="_blank" rel="noreferrer" className="btn-primary">
                      Apri contatto WhatsApp
                    </a>
                    <button type="button" onClick={resetTerminal} className="btn-secondary">
                      Ricomincia
                    </button>
                  </div>
                </>
              ) : null}
            </div>
          </div>
        </div>

        <div className="mt-12 hidden gap-8 lg:grid xl:grid-cols-[1.4fr_0.86fr]">
          <div className="glass-panel overflow-hidden">
            <div className="flex items-center justify-between border-b border-white/10 bg-white/[0.02] px-5 py-4">
              <div className="flex items-center gap-3">
                <span className="h-2.5 w-2.5 rounded-full bg-[#00f2ff]" />
                <span className="font-mono text-[11px] uppercase tracking-[0.24em] text-[#00f2ff]">kappa404_terminal // live</span>
              </div>
              <div className="font-mono text-[10px] uppercase tracking-[0.24em] text-white/42">
                {processing ? "processing" : compiled ? "blueprint compiled" : "awaiting operator"}
              </div>
            </div>

            <div className="grid min-h-[720px] grid-rows-[1fr_auto_auto] bg-[linear-gradient(180deg,rgba(255,255,255,0.02),transparent)]">
              <div aria-live="polite" className="max-h-[520px] overflow-y-auto px-5 py-5">
                <div className="space-y-3 font-mono text-[12px] leading-6 text-white/82">
                  {lines.map((line) => {
                    const prefixMap: Record<LineKind, string> = {
                      input: ">",
                      system: "[system]",
                      signal: "[signal]",
                      output: "[output]",
                      warning: "[warning]",
                      route: "[route]",
                      profile: "[profile]"
                    };

                    const toneMap: Record<LineKind, string> = {
                      input: "text-[#e5e2e1]",
                      system: "text-white/74",
                      signal: "text-[#00f2ff]",
                      output: "text-[#00f2ff]",
                      warning: "text-[#ff9f7a]",
                      route: "text-[#8ff0ff]",
                      profile: "text-[#bc13fe]"
                    };

                    return (
                      <div key={line.id} className="grid grid-cols-[82px_minmax(0,1fr)] gap-3">
                        <span className={`text-[10px] uppercase tracking-[0.24em] ${toneMap[line.kind]}`}>{prefixMap[line.kind]}</span>
                        <span className={`${toneMap[line.kind]} break-words`}>{line.text}</span>
                      </div>
                    );
                  })}
                  <div ref={bottomRef} />
                </div>
              </div>

              <div className="border-y border-white/10 bg-black/20 px-5 py-4">
                <div className="flex flex-wrap gap-3">
                  {suggestions.map((command) => (
                    <button
                      key={command}
                      type="button"
                      onClick={() => handleExecute(command)}
                      className="border border-white/10 bg-white/[0.03] px-3 py-2 font-mono text-[11px] uppercase tracking-[0.18em] text-white/74 transition hover:border-[#00f2ff]/40 hover:text-[#00f2ff]"
                    >
                      {command}
                    </button>
                  ))}
                </div>
              </div>

              <form
                className="grid gap-4 px-5 py-4 md:grid-cols-[1fr_auto]"
                onSubmit={(event) => {
                  event.preventDefault();
                  handleExecute(input);
                }}
              >
                <label className="flex items-center gap-3 border border-white/10 bg-[#050505]/80 px-4 py-3">
                  <span className="font-mono text-[12px] uppercase tracking-[0.24em] text-[#00f2ff]">{">"}</span>
                  <input
                    value={input}
                    onChange={(event) => setInput(event.target.value)}
                    placeholder="boot --identity brand"
                    className="w-full bg-transparent font-mono text-sm text-white outline-none placeholder:text-white/28"
                  />
                  <span className="h-4 w-[2px] animate-pulse bg-[#00f2ff]" />
                </label>

                <button
                  type="submit"
                  disabled={processing}
                  className="border border-[#00f2ff]/30 bg-[#00f2ff]/10 px-5 py-3 font-mono text-[11px] uppercase tracking-[0.24em] text-[#00f2ff] transition hover:bg-[#00f2ff]/18 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Execute
                </button>
              </form>
            </div>
          </div>

          <aside className="space-y-6">
            <div className="glass-panel overflow-hidden">
              <div className="border-b border-white/10 px-5 py-4">
                <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-[#00f2ff]">system topology</p>
              </div>

              <div className="relative px-5 py-6">
                <svg viewBox="0 0 500 360" className="w-full">
                  {topologyNodes.map((node) => (
                    <line
                      key={`line-${node.id}`}
                      x1="250"
                      y1="180"
                      x2={node.x}
                      y2={node.y}
                      stroke="rgba(132,148,149,0.28)"
                      strokeWidth="1"
                    />
                  ))}

                  <circle cx="250" cy="180" r="46" fill="rgba(28,27,27,0.85)" stroke="rgba(0,242,255,0.45)" strokeWidth="1.5" />
                  <circle cx="250" cy="180" r="28" fill="rgba(0,242,255,0.1)" stroke="rgba(0,242,255,0.6)" strokeWidth="1.5" />
                  <text x="250" y="172" textAnchor="middle" className="fill-white text-[10px] tracking-[0.2em]">
                    {blueprint?.name ?? "KAPPA_CORE"}
                  </text>
                  <text x="250" y="194" textAnchor="middle" className="fill-[#00f2ff] text-[9px] tracking-[0.18em]">
                    LIVE MAP
                  </text>

                  {topology.map((node) => {
                    const color =
                      node.status === "active" ? "#00f2ff" : node.status === "standby" ? "#bc13fe" : "rgba(132,148,149,0.4)";
                    const fill =
                      node.status === "active" ? "rgba(0,242,255,0.12)" : node.status === "standby" ? "rgba(188,19,254,0.12)" : "rgba(255,255,255,0.02)";

                    return (
                      <g key={node.id}>
                        <circle cx={node.x} cy={node.y} r="28" fill={fill} stroke={color} strokeWidth="1.5" />
                        <text x={node.x} y={node.y + 4} textAnchor="middle" className="fill-white text-[9px] tracking-[0.16em]">
                          {node.label}
                        </text>
                      </g>
                    );
                  })}
                </svg>

                <div className="mt-4 grid gap-2">
                  {topology.map((node) => (
                    <div key={node.id} className="flex items-center justify-between border border-white/6 bg-white/[0.02] px-3 py-2">
                      <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/65">{node.title}</span>
                      <span
                        className={`font-mono text-[10px] uppercase tracking-[0.22em] ${
                          node.status === "active" ? "text-[#00f2ff]" : node.status === "standby" ? "text-[#bc13fe]" : "text-white/28"
                        }`}
                      >
                        {node.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="glass-panel overflow-hidden">
              <div className="border-b border-white/10 px-5 py-4">
                <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-[#00f2ff]">session variables</p>
              </div>
              <div className="grid gap-3 px-5 py-5">
                {[
                  ["identity", session.identity ?? "pending"],
                  ["bottleneck", session.bottleneck ?? "pending"],
                  ["objective", session.objective ?? "pending"],
                  ["constraint", session.constraint ?? "pending"]
                ].map(([label, value]) => (
                  <div key={label} className="grid grid-cols-[92px_minmax(0,1fr)] gap-4 border-b border-white/6 pb-3">
                    <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/34">{label}</span>
                    <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/78">{value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="glass-panel overflow-hidden">
              <div className="border-b border-white/10 px-5 py-4">
                <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-[#00f2ff]">compiled blueprint</p>
              </div>
              <div className="px-5 py-5">
                {blueprint ? (
                  <>
                    <p className="font-headline text-3xl font-bold uppercase tracking-[-0.03em] text-white">{blueprint.name}</p>
                    <div className="mt-5 space-y-3 font-mono text-[11px] uppercase tracking-[0.18em] text-white/72">
                      <p>primary_gain // {blueprint.primaryGain}</p>
                      <p>failure_point // {blueprint.failurePoint}</p>
                      <p>deploy_order // {blueprint.deployOrder.join(" -> ")}</p>
                    </div>
                    <p className="mt-5 text-sm leading-7 text-white/66">{blueprint.narrative}</p>

                    <a
                      href={deployHref}
                      target="_blank"
                      rel="noreferrer"
                      className={`mt-6 inline-flex w-full items-center justify-center border px-4 py-3 font-mono text-[11px] uppercase tracking-[0.22em] transition ${
                        deployed
                          ? "border-[#00f2ff]/40 bg-[#00f2ff]/12 text-[#00f2ff] hover:bg-[#00f2ff]/16"
                          : "border-white/10 bg-white/[0.03] text-white/66 hover:border-[#00f2ff]/30 hover:text-[#00f2ff]"
                      }`}
                    >
                      {deployed ? "Open Secure Uplink" : "Awaiting deploy --contact"}
                    </a>
                  </>
                ) : (
                  <div className="space-y-4">
                    <p className="font-headline text-2xl font-bold uppercase tracking-[-0.03em] text-white/26">NO BLUEPRINT</p>
                    <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/34">complete intake to compile profile</p>
                  </div>
                )}
              </div>
            </div>
          </aside>
        </div>

        <div className="glass-panel mt-6 hidden overflow-hidden lg:block">
          <div className="grid gap-px bg-white/6 md:grid-cols-[1fr_1fr_1fr_1fr_auto]">
            {[
              ["identity", session.identity ?? "pending"],
              ["bottleneck", session.bottleneck ?? "pending"],
              ["objective", session.objective ?? "pending"],
              ["constraint", session.constraint ?? "pending"],
              ["uplink", deployed ? "ready" : "locked"]
            ].map(([label, value]) => (
              <div key={label} className="bg-[#0b0c0f] px-4 py-4">
                <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-white/32">{label}</p>
                <p className={`mt-2 font-mono text-[11px] uppercase tracking-[0.18em] ${label === "uplink" && deployed ? "text-[#00f2ff]" : "text-white/74"}`}>{value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
