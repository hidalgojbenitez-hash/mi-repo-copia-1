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
  GraduationCap,
  Menu,
  X,
  Users,
  AlertCircle,
  Copy,
  FileQuestion,
  Percent,
  Scale,
  ListOrdered,
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

const HALLAZGOS_NUEVOS = [
  {
    icon: AlertCircle,
    title: "El ingreso no discrimina",
    body: "La proporción de hogares con dificultad fue prácticamente la misma en todos los niveles de ingreso. Lo que parecía obvio, no lo fue.",
  },
  {
    icon: Copy,
    title: "Múltiples variables, un mismo fondo",
    body: "Variables de distintos temas compartían el mismo fondo: el estrés económico. Distinguir cuáles aportaban información nueva y cuáles repetían lo mismo fue clave.",
  },
  {
    icon: FileQuestion,
    title: "Respuestas irreales",
    body: "El dataset tiene códigos que no son respuestas sustantivas —como 'no aplica' o 'no contesta'— mezclados con valores reales. Tratarlos correctamente previno conclusiones falsas.",
  },
];

const APORTES = [
  {
    icon: Percent,
    title: "Probabilidades, no etiquetas",
    body: "En lugar de sentenciar 'este hogar paga o no paga', el modelo asignará una probabilidad de dificultad de pago a cada hogar.",
  },
  {
    icon: Scale,
    title: "Umbral de decisión calibrado",
    body: "Ajustado según el costo de los errores: dejar afuera un hogar vulnerable pesa mucho más que asistir a alguien que no lo necesita.",
  },
  {
    icon: ListOrdered,
    title: "Herramienta de priorización",
    body: "Permite ordenar hogares por riesgo para dirigir las ayudas del Estado o municipio de forma mucho más eficiente y precisa.",
  },
];

function HeaderLogo() {
  return (
    <header className="fixed left-0 top-0 z-50 w-full p-4 pointer-events-none">
      <div className="mx-auto flex max-w-6xl items-center px-1">
        <div className="pointer-events-auto inline-flex items-center gap-2.5 rounded-xl border border-border/50 bg-background/70 p-2 pr-4 shadow-sm backdrop-blur-md">
          <span className="grid size-9 place-items-center rounded-lg bg-primary text-primary-foreground font-display text-sm font-bold">
            33
          </span>
          <span className="text-sm font-semibold tracking-tight text-foreground">
            Grupo 33 · Aprendizaje Automático · UGR
          </span>
        </div>
      </div>
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
    <main className="h-[100svh] w-full overflow-y-scroll overflow-x-hidden snap-y snap-mandatory scroll-smooth bg-background text-foreground">
      <HeaderLogo />

      {/* Hero */}
      <section id="inicio" className="relative flex h-[100svh] snap-start flex-col justify-center overflow-hidden surface-deep shrink-0">
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
            <div className="mt-12 grid gap-5 border-t border-primary-foreground/15 pt-8 md:grid-cols-2 lg:gap-8">
              {/* Docentes */}
              <div className="flex flex-col justify-between rounded-2xl border border-accent/40 bg-accent/15 p-5 backdrop-blur-md shadow-sm">
                <div>
                  <div className="flex items-center gap-2.5">
                    <span className="grid size-8 place-items-center rounded-lg bg-accent text-accent-foreground shadow-sm">
                      <GraduationCap className="size-4" />
                    </span>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.18em] text-accent-foreground">
                        Cuerpo Docente
                      </p>
                      <p className="text-[11px] text-primary-foreground/75">
                        Cátedra de Aprendizaje Automático
                      </p>
                    </div>
                  </div>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {TEACHERS.map((name) => (
                      <li
                        key={name}
                        className="inline-flex items-center gap-2 rounded-lg border border-accent/30 bg-primary-foreground/15 px-3 py-1.5 text-sm font-semibold text-primary-foreground backdrop-blur-sm"
                      >
                        <span className="size-2 rounded-full bg-accent" />
                        {name}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Integrantes */}
              <div className="flex flex-col justify-between rounded-2xl border border-primary-foreground/20 bg-primary-foreground/10 p-5 backdrop-blur-md shadow-sm">
                <div>
                  <div className="flex items-center gap-2.5">
                    <span className="grid size-8 place-items-center rounded-lg bg-highlight/25 text-highlight shadow-sm">
                      <Users className="size-4" />
                    </span>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary-foreground/90">
                        Integrantes del Grupo
                      </p>
                      <p className="text-[11px] text-primary-foreground/75">
                        Grupo 33
                      </p>
                    </div>
                  </div>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {MEMBERS.map((name) => (
                      <li
                        key={name}
                        className="inline-flex items-center gap-2 rounded-lg border border-primary-foreground/15 bg-primary-foreground/10 px-3 py-1.5 text-sm font-medium text-primary-foreground/95 backdrop-blur-sm"
                      >
                        <span className="size-1.5 rounded-full bg-highlight" />
                        {name}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Secciones inferiores con fondo claro */}
      {/* Contexto */}
      <section id="contexto" className="mx-auto flex h-[100svh] snap-start shrink-0 w-full max-w-6xl flex-col justify-center px-5 py-24">
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
      <section id="objetivo" className="flex h-[100svh] snap-start shrink-0 flex-col justify-center bg-secondary/50 py-24">
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

      {/* Metodología */}
      <section id="metodologia" className="mx-auto flex h-[100svh] snap-start shrink-0 w-full max-w-6xl flex-col justify-center px-5 py-24">
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

      {/* Hallazgos */}
      <section id="hallazgos" className="flex h-[100svh] snap-start shrink-0 flex-col justify-center bg-secondary/50 py-24">
        <div className="mx-auto max-w-6xl px-5">
          <Reveal>
            <SectionTitle eyebrow="04 — Hallazgos" title="Descubrimientos del Análisis" />
          </Reveal>

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {HALLAZGOS_NUEVOS.map((hallazgo, i) => (
              <Reveal key={hallazgo.title} delay={i * 120}>
                <article className="card-elevated flex h-full flex-col p-6">
                  <div className="flex items-center gap-3">
                    <span className="grid size-10 place-items-center rounded-lg bg-primary/10 text-primary">
                      <hallazgo.icon className="size-5" />
                    </span>
                    <h3 className="text-base font-semibold leading-snug">{hallazgo.title}</h3>
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                    {hallazgo.body}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Aporte */}
      <section id="aporte" className="flex h-[100svh] snap-start shrink-0 flex-col justify-center py-24">
        <div className="mx-auto max-w-6xl px-5">
          <Reveal>
            <SectionTitle eyebrow="05 — Aporte" title="El Aporte del Proyecto" />
          </Reveal>

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {APORTES.map((aporte, i) => (
              <Reveal key={aporte.title} delay={i * 120}>
                <article className="card-elevated flex h-full flex-col p-6">
                  <div className="flex items-center gap-3">
                    <span className="grid size-10 place-items-center rounded-lg bg-highlight/15 text-highlight">
                      <aporte.icon className="size-5" />
                    </span>
                    <h3 className="text-base font-semibold leading-snug">{aporte.title}</h3>
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                    {aporte.body}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Cierre */}
      <section id="cierre" className="flex h-[100svh] snap-start shrink-0 flex-col justify-center bg-secondary/50 py-24">
        <div className="mx-auto max-w-6xl px-5">
          <Reveal>
            <div className="card-elevated overflow-hidden p-8 text-center sm:p-12">
              <h2 className="font-display text-4xl font-bold tracking-tight sm:text-5xl">
                ¡Gracias por su atención!
              </h2>
              <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
                Agradecemos el tiempo dedicado a recorrer los detalles de este proyecto, su propuesta metodológica y el impacto que busca generar.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <footer className="snap-start shrink-0 border-t border-border py-8 bg-background">
        <div className="mx-auto max-w-6xl px-5 text-sm text-muted-foreground">
          Grupo 33 · Aprendizaje Automático · Universidad del Gran Rosario (UGR)
        </div>
      </footer>
    </main>
  );
}
