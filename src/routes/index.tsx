import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  Flame,
  Wallet,
  TrendingUp,
  Target,
  Brush,
  CalendarClock,
  Filter,
  ArrowRight,
  User,
  GraduationCap,
  Briefcase,
  Search,
  HeartPulse,
  ShieldCheck,
  MapPin,
  Wifi,
  Menu,
  X,
  Shuffle,
  AlertTriangle,
  SplitSquareHorizontal,
  Lightbulb,
  CheckCircle2,
} from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      {
        title: "Clasificador de priorización de asistencia | Grupo 33 UGR",
      },
      {
        name: "description",
        content:
          "Proyecto de Ciencia de Datos: modelo de clasificación supervisada para priorizar la asistencia frente a la dificultad de pago del gas en Mar del Plata.",
      },
      {
        property: "og:title",
        content: "Clasificador de priorización de asistencia | Grupo 33 UGR",
      },
      {
        property: "og:description",
        content:
          "Machine Learning aplicado a la priorización de hogares con dificultad de pago del servicio de gas en Mar del Plata.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const NAV = [
  { id: "inicio", label: "Inicio" },
  { id: "contexto", label: "Contexto" },
  { id: "objetivo", label: "Objetivo" },
  { id: "hallazgo", label: "Hallazgo" },
  { id: "metodologia", label: "Metodología" },
  { id: "variables", label: "Variables" },
  { id: "proximos-pasos", label: "Próximos pasos" },
];

const MEMBERS = [
  "Paola Flament",
  "César Augusto Da Silva",
  "Sebastián Simonetta",
  "Franco Vicente",
  "Juan Marcos Payetta",
];

const TEACHERS = ["Fabiana Escobar", "Ana María Nardin", "Lujan Cazenabe"];

const STEPS = [
  {
    icon: Brush,
    step: "Paso 1",
    title: "Auditoría de Formatos",
    body: "Revisión y homogeneización de los formatos de la encuesta 2016: tipos de datos, codificaciones de categorías y consistencia entre preguntas.",
  },
  {
    icon: CalendarClock,
    step: "Paso 2",
    title: "Imputación de Nulos",
    body: "Categorización de los valores faltantes en explícitos y estructurales (cuando una pregunta no aplica al hogar encuestado) y tratamiento diferenciado para cada tipo.",
  },
  {
    icon: Filter,
    step: "Paso 3",
    title: "Filtrado de Variables",
    body: "De 403 variables iniciales se eliminó el ruido y la fuga de información, por ejemplo la dificultad para pagar otros servicios como luz o agua.",
  },
];

const EVIDENCE = [
  {
    icon: Shuffle,
    title: "Prueba Cruzada",
    metric: "AUC ≈ 0.55",
    note: "Rinde al nivel del azar",
    body: "Entrenar en un año y evaluar en el otro rinde al nivel del azar; el patrón no transfiere entre coyunturas tarifarias.",
  },
  {
    icon: AlertTriangle,
    title: "Atajo Predictivo",
    metric: "El año domina",
    note: "Clasifica el tiempo, no el perfil",
    body: "Al unirlas, el año se vuelve la variable principal: el modelo clasifica el tiempo, no el perfil vulnerable.",
  },
  {
    icon: SplitSquareHorizontal,
    title: "Clasificador de Edición",
    metric: "AUC = 0.87",
    note: "Poblaciones distinguibles",
    body: "Las dos ediciones resultan poblaciones distinguibles; el ajuste de 2016 alteró el fenómeno estructural.",
  },
];

const VARIABLES = [
  { icon: User, label: "Edad" },
  { icon: GraduationCap, label: "Años de educación" },
  { icon: Briefcase, label: "Ocupación" },
  { icon: Search, label: "Búsqueda de trabajo" },
  { icon: HeartPulse, label: "Preocupación por el empleo" },
  { icon: ShieldCheck, label: "Aportes a la seguridad social" },
  { icon: MapPin, label: "Zona de residencia" },
  { icon: Wifi, label: "Acceso a internet" },
];

function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-border/60 bg-background/85 backdrop-blur-md shadow-[var(--shadow-card)]"
          : "bg-transparent",
      )}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3.5">
        <a href="#inicio" className="flex items-center gap-2.5">
          <span className="grid size-9 place-items-center rounded-lg surface-deep font-display text-sm font-bold">
            33
          </span>
          <span className="hidden text-sm font-semibold tracking-tight sm:block">
            Grupo 33 · UGR
          </span>
        </a>

        <ul className="hidden items-center gap-1 md:flex">
          {NAV.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <button
          type="button"
          aria-label="Abrir menú"
          onClick={() => setOpen((v) => !v)}
          className="grid size-10 place-items-center rounded-md border border-border bg-card text-foreground md:hidden"
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </nav>

      {open && (
        <ul className="border-t border-border bg-background/95 px-5 py-2 backdrop-blur-md md:hidden">
          {NAV.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                onClick={() => setOpen(false)}
                className="block rounded-md px-2 py-3 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}

function SectionTitle({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div className="max-w-2xl">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent-foreground/70">
        {eyebrow}
      </p>
      <h2 className="mt-2 text-3xl font-bold sm:text-4xl">{title}</h2>
      <div className="mt-4 h-1 w-16 rounded-full bg-highlight" />
    </div>
  );
}

function Index() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section id="inicio" className="relative overflow-hidden surface-deep">
        <div className="absolute inset-0 grid-dots opacity-70" aria-hidden />
        <div className="absolute -right-24 -top-24 size-[26rem] rounded-full bg-accent/20 blur-3xl" aria-hidden />
        <div className="relative mx-auto max-w-6xl px-5 pb-24 pt-32 sm:pt-40">
          <Reveal>
            <div className="flex flex-wrap gap-2">
              {["Universidad del Gran Rosario (UGR)", "Aprendizaje Automático", "Grupo 33"].map(
                (badge) => (
                  <span
                    key={badge}
                    className="rounded-full border border-primary-foreground/25 bg-primary-foreground/10 px-3.5 py-1.5 text-xs font-medium tracking-wide backdrop-blur-sm"
                  >
                    {badge}
                  </span>
                ),
              )}
            </div>
          </Reveal>

          <Reveal delay={120}>
            <h1 className="mt-8 max-w-4xl text-4xl font-bold leading-[1.1] sm:text-5xl lg:text-6xl">
              Clasificador para la priorización de asistencia frente a la dificultad de pago del
              servicio de gas
            </h1>
          </Reveal>

          <Reveal delay={220}>
            <p className="mt-6 max-w-2xl text-lg text-primary-foreground/80">
              Un enfoque de Machine Learning para optimizar recursos en Mar del Plata
            </p>
          </Reveal>

          <Reveal delay={320}>
            <div className="mt-12 border-t border-primary-foreground/15 pt-6">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary-foreground/60">
                Integrantes
              </p>
              <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
                {MEMBERS.map((name) => (
                  <li
                    key={name}
                    className="flex items-center gap-2 text-sm font-medium text-primary-foreground/90"
                  >
                    <span className="size-1.5 rounded-full bg-highlight" />
                    {name}
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-xs font-semibold uppercase tracking-[0.18em] text-primary-foreground/60">
                Docentes
              </p>
              <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
                {TEACHERS.map((name) => (
                  <li
                    key={name}
                    className="flex items-center gap-2 text-sm font-medium text-primary-foreground/75"
                  >
                    <span className="size-1.5 rounded-full bg-accent" />
                    {name}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Contexto */}
      <section id="contexto" className="mx-auto max-w-6xl px-5 py-24">
        <div className="grid items-start gap-12 lg:grid-cols-2">
          <Reveal>
            <SectionTitle eyebrow="01 — Contexto" title="Contexto y Problema" />
            <p className="mt-6 text-base leading-relaxed text-muted-foreground">
              Entre 2015 y 2016, Argentina atravesó un fuerte ajuste tarifario que impactó
              directamente en el servicio de gas residencial en Mar del Plata. En un escenario de
              recursos limitados, no alcanza con describir el problema: necesitamos un criterio
              objetivo para decidir a qué hogares dirigir la asistencia.
            </p>
            <div className="mt-8 flex items-center gap-3 rounded-xl border border-border bg-secondary/60 p-4">
              <TrendingUp className="size-5 shrink-0 text-highlight" />
              <p className="text-sm font-medium">
                La dificultad de pago se multiplicó por más de 2,5 en un solo año.
              </p>
            </div>
          </Reveal>

          <div className="grid gap-5 sm:grid-cols-2">
            <Reveal delay={100}>
              <article className="card-elevated h-full p-6">
                <div className="flex items-center justify-between">
                  <span className="grid size-11 place-items-center rounded-lg bg-secondary text-primary">
                    <Flame className="size-5" />
                  </span>
                  <span className="font-display text-sm font-semibold text-muted-foreground">
                    2015
                  </span>
                </div>
                <p className="mt-6 font-display text-5xl font-bold text-primary">14%</p>
                <p className="mt-2 text-sm text-muted-foreground">
                  de hogares con dificultad de pago
                </p>
              </article>
            </Reveal>

            <Reveal delay={200}>
              <article className="card-elevated h-full border-highlight/40 p-6">
                <div className="flex items-center justify-between">
                  <span className="grid size-11 place-items-center rounded-lg bg-highlight/15 text-highlight">
                    <Wallet className="size-5" />
                  </span>
                  <span className="font-display text-sm font-semibold text-muted-foreground">
                    2016
                  </span>
                </div>
                <p className="mt-6 font-display text-5xl font-bold text-highlight">37%</p>
                <p className="mt-2 text-sm text-muted-foreground">
                  de hogares con dificultad de pago
                </p>
              </article>
            </Reveal>

            <Reveal delay={300} className="sm:col-span-2">
              <article className="card-elevated flex items-center gap-4 p-6">
                <span className="grid size-11 shrink-0 place-items-center rounded-lg bg-accent/20 text-accent-foreground">
                  <TrendingUp className="size-5" />
                </span>
                <div>
                  <p className="font-display text-lg font-semibold">+23 puntos porcentuales</p>
                  <p className="text-sm text-muted-foreground">
                    Salto registrado entre ambas ediciones de la encuesta.
                  </p>
                </div>
              </article>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Objetivo */}
      <section id="objetivo" className="bg-secondary/50 py-24">
        <div className="mx-auto max-w-6xl px-5">
          <Reveal>
            <SectionTitle eyebrow="02 — Propósito" title="El Objetivo del Proyecto" />
          </Reveal>
          <Reveal delay={150}>
            <blockquote className="relative mt-10 overflow-hidden rounded-2xl surface-deep p-8 shadow-[var(--shadow-float)] sm:p-12">
              <div className="absolute inset-0 grid-dots opacity-60" aria-hidden />
              <Target className="relative size-8 text-highlight" />
              <p className="relative mt-6 font-display text-xl leading-relaxed sm:text-2xl">
                Generar un modelo de clasificación supervisada que, a través del perfil
                socioeconómico y geográfico, prediga la dificultad de pago del gas y traduzca esta
                probabilidad en un criterio de priorización basado en el costo relativo de los
                errores (falsos positivos vs. falsos negativos).
              </p>
            </blockquote>
          </Reveal>
        </div>
      </section>

      {/* Hallazgo */}
      <section id="hallazgo" className="py-24">
        <div className="mx-auto max-w-6xl px-5">
          <div className="rounded-3xl border border-border bg-gradient-to-b from-secondary/70 to-background p-6 shadow-[var(--shadow-card)] sm:p-12">
            <Reveal>
              <span className="inline-flex items-center gap-2 rounded-full bg-highlight/15 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-highlight">
                <Lightbulb className="size-3.5" /> Hallazgo Metodológico Central
              </span>
              <h2 className="mt-5 max-w-3xl text-3xl font-bold sm:text-4xl">
                Decisión Clave: No Combinar Ediciones
              </h2>
              <p className="mt-5 max-w-3xl text-lg leading-relaxed text-muted-foreground">
                Evidencia empírica frente al dilema de volumen vs. coyuntura
              </p>
            </Reveal>

            <div className="mt-10 grid gap-5 md:grid-cols-3">
              {EVIDENCE.map((e, i) => (
                <Reveal key={e.title} delay={i * 120}>
                  <article className="card-elevated flex h-full flex-col p-6">
                    <div className="flex items-center gap-3">
                      <span className="grid size-10 place-items-center rounded-lg bg-primary/10 text-primary">
                        <e.icon className="size-5" />
                      </span>
                      <h3 className="text-base font-semibold leading-snug">{e.title}</h3>
                    </div>
                    <p className="mt-6 font-display text-3xl font-bold text-primary">{e.metric}</p>
                    <p className="mt-1 text-xs font-semibold uppercase tracking-[0.14em] text-highlight">
                      {e.note}
                    </p>
                    <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{e.body}</p>
                  </article>
                </Reveal>
              ))}
            </div>

            <Reveal delay={200}>
              <div className="mt-8 flex gap-4 rounded-2xl border-l-4 border-highlight bg-highlight/10 p-6">
                <CheckCircle2 className="size-6 shrink-0 text-highlight" />
                <p className="font-display text-lg leading-relaxed">
                  El modelo se delimita exclusivamente a 2016 con respaldo cuantitativo, no por
                  comodidad.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Metodología */}
      <section id="metodologia" className="mx-auto max-w-6xl px-5 py-24">
        <Reveal>
          <SectionTitle eyebrow="03 — Proceso" title="Desafíos y Metodología" />
        </Reveal>

        <ol className="relative mt-12 space-y-6 border-l border-border pl-6 sm:pl-10">
          {STEPS.map((step, i) => (
            <Reveal key={step.title} delay={i * 130}>
              <li className="relative">
                <span className="absolute -left-[2.15rem] top-6 grid size-8 place-items-center rounded-full border border-border bg-background text-primary sm:-left-[3.35rem]">
                  <step.icon className="size-4" />
                </span>
                <div className="card-elevated p-6 sm:p-7">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-highlight">
                    {step.step}
                  </p>
                  <h3 className="mt-2 text-xl font-semibold">{step.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{step.body}</p>
                </div>
              </li>
            </Reveal>
          ))}
        </ol>
      </section>

      {/* Variables */}
      <section id="variables" className="bg-secondary/50 py-24">
        <div className="mx-auto max-w-6xl px-5">
          <Reveal>
            <SectionTitle eyebrow="04 — Features" title="Las 8 Variables Finales" />
          </Reveal>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {VARIABLES.map((v, i) => (
              <Reveal key={v.label} delay={i * 70}>
                <article className="card-elevated group h-full p-6">
                  <span className="grid size-11 place-items-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-highlight/15 group-hover:text-highlight">
                    <v.icon className="size-5" />
                  </span>
                  <h3 className="mt-5 text-base font-semibold leading-snug">{v.label}</h3>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Próximos pasos */}
      <section id="proximos-pasos" className="mx-auto max-w-6xl px-5 py-24">
        <Reveal>
          <div className="card-elevated overflow-hidden p-8 sm:p-12">
            <SectionTitle eyebrow="05 — Cierre" title="Próximos Pasos" />
            <p className="mt-6 max-w-3xl text-lg leading-relaxed text-muted-foreground">
              Esta entrega presenta las bases sólidas del proyecto y la propuesta metodológica. En
              la próxima etapa: Entrenamiento del Modelo y Definición del Umbral de Priorización.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <span className="inline-flex items-center gap-2 rounded-full surface-deep px-4 py-2 text-sm font-medium">
                Entrenamiento del Modelo <ArrowRight className="size-4" />
              </span>
              <span className="inline-flex items-center gap-2 rounded-full bg-highlight/15 px-4 py-2 text-sm font-medium text-highlight">
                Umbral de Priorización
              </span>
            </div>
          </div>
        </Reveal>
      </section>

      <footer className="border-t border-border py-8">
        <div className="mx-auto max-w-6xl px-5 text-sm text-muted-foreground">
          Grupo 33 · Aprendizaje Automático · Universidad del Gran Rosario (UGR)
        </div>
      </footer>
    </div>
  );
}
