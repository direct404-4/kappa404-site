"use client";

import { useMemo, useState } from "react";
import { CONTACT_INFO } from "@/lib/content";

type FormMode = "home" | "contact";

type WhatsAppProjectFormProps = {
  mode?: FormMode;
};

type FormState = {
  name: string;
  channel: string;
  phone: string;
  projectType: string;
  budget: string;
  message: string;
};

const INITIAL_STATE: FormState = {
  name: "",
  channel: "",
  phone: "",
  projectType: "",
  budget: "",
  message: ""
};

function buildWhatsAppHref(state: FormState, mode: FormMode) {
  const lines = [
    "Ciao Kappa404, voglio avviare un progetto.",
    "",
    `Fonte: ${mode === "home" ? "Homepage" : "Pagina contatti"}`,
    state.name ? `Nome: ${state.name}` : null,
    state.channel ? `Canale preferito: ${state.channel}` : null,
    state.phone ? `Telefono: ${state.phone}` : null,
    state.projectType ? `Tipo progetto: ${state.projectType}` : null,
    state.budget ? `Budget indicativo: ${state.budget}` : null,
    state.message ? `Obiettivo: ${state.message}` : null
  ].filter(Boolean);

  return `${CONTACT_INFO.whatsapp}?text=${encodeURIComponent(lines.join("\n"))}`;
}

export default function WhatsAppProjectForm({ mode = "contact" }: WhatsAppProjectFormProps) {
  const [state, setState] = useState<FormState>(INITIAL_STATE);
  const href = useMemo(() => buildWhatsAppHref(state, mode), [mode, state]);

  const updateField = (field: keyof FormState, value: string) => {
    setState((current) => ({
      ...current,
      [field]: value
    }));
  };

  return (
    <form
      className={mode === "home" ? "space-y-8" : "kappa-contact-panel space-y-4"}
      onSubmit={(event) => {
        event.preventDefault();
        window.open(href, "_blank", "noopener,noreferrer");
      }}
    >
      {mode === "contact" ? (
        <>
          <p className="kappa-section-tag">FORM // PROJECT INTAKE</p>
          <h2 className="text-2xl font-semibold text-white">Invia una richiesta</h2>
          <p className="text-sm text-white/72">
            Compila il brief: il sito genera un messaggio WhatsApp pronto da inviare, senza salvare dati su un backend.
          </p>
        </>
      ) : null}

      <div className={mode === "contact" ? "grid gap-4 md:grid-cols-2" : "grid gap-8"}>
        <label className={mode === "home" ? "relative block" : "text-sm text-white/85"}>
          <span className={mode === "home" ? "mb-2 block font-mono text-[10px] uppercase tracking-widest text-[#00f2ff]" : ""}>
            {mode === "home" ? "Operator_Name" : "Nome"}
          </span>
          <input
            type="text"
            name="nome"
            value={state.name}
            onChange={(event) => updateField("name", event.target.value)}
            placeholder={mode === "home" ? "Inserisci il tuo nome" : undefined}
            required
            className={mode === "home" ? "kappa-proto-input border-b px-0" : "kappa-proto-input mt-2"}
          />
        </label>

        <label className={mode === "home" ? "relative block" : "text-sm text-white/85"}>
          <span className={mode === "home" ? "mb-2 block font-mono text-[10px] uppercase tracking-widest text-[#00f2ff]" : ""}>
            {mode === "home" ? "Comms_Endpoint" : "Canale preferito"}
          </span>
          <input
            type="text"
            name="canale"
            value={state.channel}
            onChange={(event) => updateField("channel", event.target.value)}
            placeholder="WhatsApp, Instagram o TikTok"
            className={mode === "home" ? "kappa-proto-input border-b px-0" : "kappa-proto-input mt-2"}
          />
        </label>

        {mode === "contact" ? (
          <>
            <label className="text-sm text-white/85">
              Telefono
              <input
                type="tel"
                name="telefono"
                value={state.phone}
                onChange={(event) => updateField("phone", event.target.value)}
                className="kappa-proto-input mt-2"
              />
            </label>

            <label className="text-sm text-white/85">
              Tipo progetto
              <input
                type="text"
                name="tipo-progetto"
                value={state.projectType}
                onChange={(event) => updateField("projectType", event.target.value)}
                className="kappa-proto-input mt-2"
              />
            </label>

            <label className="text-sm text-white/85">
              Budget
              <input
                type="text"
                name="budget"
                value={state.budget}
                onChange={(event) => updateField("budget", event.target.value)}
                className="kappa-proto-input mt-2"
              />
            </label>
          </>
        ) : null}
      </div>

      <label className={mode === "home" ? "relative block" : "block text-sm text-white/85"}>
        <span className={mode === "home" ? "mb-2 block font-mono text-[10px] uppercase tracking-widest text-[#00f2ff]" : ""}>
          {mode === "home" ? "Mission_Objective" : "Messaggio"}
        </span>
        <textarea
          name="messaggio"
          rows={mode === "home" ? 3 : 6}
          value={state.message}
          onChange={(event) => updateField("message", event.target.value)}
          placeholder={mode === "home" ? "Descrivi il tuo progetto..." : undefined}
          required
          className={mode === "home" ? "kappa-proto-input min-h-24 resize-y border-b px-0" : "kappa-proto-input mt-2 min-h-32 resize-y"}
        />
      </label>

      <button
        className={
          mode === "home"
            ? "w-full bg-gradient-to-r from-[#00f2ff] to-[#006a71] py-4 font-headline font-bold uppercase tracking-[0.2em] text-on-primary transition-all hover:shadow-[0_0_25px_rgba(0,242,255,0.3)]"
            : "btn-primary"
        }
        type="submit"
      >
        {mode === "home" ? "Apri WhatsApp" : "Invia su WhatsApp"}
      </button>
    </form>
  );
}
