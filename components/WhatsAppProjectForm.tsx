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

type FormErrors = Partial<Record<"name" | "message", string>>;

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
  const [errors, setErrors] = useState<FormErrors>({});
  const [showSummary, setShowSummary] = useState(false);
  const href = useMemo(() => buildWhatsAppHref(state, mode), [mode, state]);
  const formId = `${mode}-whatsapp-form`;

  const updateField = (field: keyof FormState, value: string) => {
    setState((current) => ({
      ...current,
      [field]: value
    }));
    setShowSummary(false);

    if (field === "name" || field === "message") {
      setErrors((current) => {
        const next = { ...current };
        delete next[field];
        return next;
      });
    }
  };

  const validateForm = () => {
    const nextErrors: FormErrors = {};

    if (!state.name.trim()) {
      nextErrors.name = "Inserisci il tuo nome o il riferimento principale.";
    }

    if (!state.message.trim()) {
      nextErrors.message = "Descrivi almeno obiettivo, contesto o problema da risolvere.";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const openWhatsApp = () => {
    window.open(href, "_blank", "noopener,noreferrer");
  };

  return (
    <form
      id={formId}
      noValidate
      className={mode === "home" ? "space-y-8" : "kappa-contact-panel space-y-4"}
      onSubmit={(event) => {
        event.preventDefault();
        if (validateForm()) {
          setShowSummary(true);
        }
      }}
    >
      {mode === "contact" ? (
        <>
          <p className="kappa-section-tag">FORM // PROJECT INTAKE</p>
          <h2 className="text-2xl font-semibold text-white">Invia una richiesta</h2>
          <p className="text-sm text-white/72">
            Compila il brief rapido: il sito genera un messaggio WhatsApp pronto da inviare, senza salvare dati su un backend. Per documenti e richieste formali usa info@kappa404.it.
          </p>
        </>
      ) : null}

      <div className={mode === "contact" ? "grid gap-4 md:grid-cols-2" : "grid gap-8"}>
        <label className={mode === "home" ? "relative block" : "text-sm text-white/85"}>
          <span className={mode === "home" ? "mb-2 block font-mono text-[10px] uppercase tracking-widest text-[#00f2ff]" : ""}>
            {mode === "home" ? "Nome" : "Nome"}
          </span>
          <input
            id={`${mode}-nome`}
            type="text"
            name="nome"
            value={state.name}
            onChange={(event) => updateField("name", event.target.value)}
            placeholder={mode === "home" ? "Inserisci il tuo nome" : undefined}
            required
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? `${mode}-nome-error` : undefined}
            className={mode === "home" ? "kappa-proto-input border-b px-0" : "kappa-proto-input mt-2"}
          />
          {errors.name ? (
            <p id={`${mode}-nome-error`} className="kappa-form-error">
              {errors.name}
            </p>
          ) : null}
        </label>

        <label className={mode === "home" ? "relative block" : "text-sm text-white/85"}>
          <span className={mode === "home" ? "mb-2 block font-mono text-[10px] uppercase tracking-widest text-[#00f2ff]" : ""}>
            {mode === "home" ? "Canale preferito" : "Canale preferito"}
          </span>
          <input
            id={`${mode}-canale`}
            type="text"
            name="canale"
            value={state.channel}
            onChange={(event) => updateField("channel", event.target.value)}
            placeholder="Email, WhatsApp o LinkedIn"
            className={mode === "home" ? "kappa-proto-input border-b px-0" : "kappa-proto-input mt-2"}
          />
        </label>

        {mode === "contact" ? (
          <>
            <label className="text-sm text-white/85">
              Telefono
              <input
                id="contact-telefono"
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
                id="contact-tipo-progetto"
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
                id="contact-budget"
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
          {mode === "home" ? "Obiettivo del progetto" : "Messaggio"}
        </span>
        <textarea
          id={`${mode}-messaggio`}
          name="messaggio"
          rows={mode === "home" ? 3 : 6}
          value={state.message}
          onChange={(event) => updateField("message", event.target.value)}
          placeholder={mode === "home" ? "Descrivi il tuo progetto..." : undefined}
          required
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? `${mode}-messaggio-error` : undefined}
          className={mode === "home" ? "kappa-proto-input min-h-24 resize-y border-b px-0" : "kappa-proto-input mt-2 min-h-32 resize-y"}
        />
        {errors.message ? (
          <p id={`${mode}-messaggio-error`} className="kappa-form-error">
            {errors.message}
          </p>
        ) : null}
      </label>

      {showSummary ? (
        <div role="region" aria-live="polite" className="border border-[#00f2ff]/20 bg-[#00f2ff]/[0.04] p-4">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#00f2ff]">Riepilogo prima dell'invio</p>
          <dl className="mt-4 grid gap-3 text-sm text-white/76">
            <div>
              <dt className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/42">Nome</dt>
              <dd className="mt-1">{state.name}</dd>
            </div>
            {state.channel ? (
              <div>
                <dt className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/42">Canale preferito</dt>
                <dd className="mt-1">{state.channel}</dd>
              </div>
            ) : null}
            <div>
              <dt className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/42">Obiettivo</dt>
              <dd className="mt-1">{state.message}</dd>
            </div>
          </dl>
          <p className="mt-4 text-xs leading-6 text-white/62">
            Aprendo WhatsApp trasferisci questi dati a WhatsApp/Meta, servizio esterno a Kappa404. Il sito non salva il contenuto in un backend proprietario.
          </p>
          <div className="mt-4 flex flex-col gap-3 sm:flex-row">
            <button type="button" onClick={openWhatsApp} className="btn-primary">
              Apri WhatsApp
            </button>
            <a href={CONTACT_INFO.emailHref} className="btn-secondary">
              Usa email
            </a>
          </div>
        </div>
      ) : null}

      <button
        className={
          mode === "home"
            ? "w-full bg-gradient-to-r from-[#00f2ff] to-[#006a71] py-4 font-headline font-bold uppercase tracking-[0.2em] text-on-primary transition-all hover:shadow-[0_0_25px_rgba(0,242,255,0.3)]"
            : "btn-primary"
        }
        type="submit"
      >
        {mode === "home" ? "Prepara riepilogo WhatsApp" : "Prepara invio WhatsApp"}
      </button>
    </form>
  );
}
