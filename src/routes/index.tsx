import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  Flame,
  Wallet,
  TrendingUp,
  Target,
  Brush,
  CalendarClock,
  Filter,
  GraduationCap,
  Users,
  AlertCircle,
  Copy,
  FileQuestion,
  Percent,
  Scale,
  ListOrdered,
  ChevronUp,
  ChevronDown,
} from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { cn } from "@/lib/utils";

// ============================================================================
// CONFIGURACIÓN DE RUTA Y METADATOS
// ============================================================================
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

// ============================================================================
// CONSTANTES DE DATOS
// ============================================================================
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

// ============================================================================
// COMPONENTES COMUNES
// ============================================================================

/**
 * Logo persistente en la esquina superior izquierda
 */
function HeaderLogo({ visible }: { visible: boolean }) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.header
          initial={{ opacity: 0, y: -15 }}
          animate={{
            opacity: 1,
            y: 0,
            transition: { duration: 0.5, ease: "easeOut", delay: 0.35 },
          }}
          exit={{
            opacity: 0,
            y: -15,
            transition: { duration: 0.25, ease: "easeIn" },
          }}
          className="fixed left-0 top-0 z-50 w-full p-4 pointer-events-none"
        >
          <div className="mx-auto flex max-w-6xl items-center px-1">
            <div className="pointer-events-auto inline-flex items-center gap-2.5 rounded-xl border border-border/50 bg-background/70 p-2 pr-4 shadow-sm backdrop-blur-md transition-all hover:bg-background/90">
              <span className="grid size-9 place-items-center rounded-lg bg-primary text-primary-foreground font-display text-sm font-bold">
                33
              </span>
              <span className="text-sm font-semibold tracking-tight text-foreground">
                Grupo 33 · Aprendizaje Automático · UGR
              </span>
            </div>
          </div>
        </motion.header>
      )}
    </AnimatePresence>
  );
}

/**
 * Título unificado para las diapositivas
 */
function SectionTitle({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div className="max-w-2xl">
      <p className="text-caption uppercase text-accent/80">
        {eyebrow}
      </p>
      <h2 className="mt-2 text-h2">{title}</h2>
      <div className="mt-4 h-1 w-16 rounded-full bg-accent" />
    </div>
  );
}

// ============================================================================
// DEFINICIÓN DE DIAPOSITIVAS (SCENES)
// ============================================================================

const slidesContent = [
  {
    id: "inicio",
    theme: "dark",
    component: () => (
      <div className="relative flex h-full flex-col justify-center overflow-hidden surface-deep w-full">
        <div className="absolute inset-0 grid-dots opacity-70" aria-hidden />
        <div className="absolute -right-24 -top-24 size-[26rem] rounded-full bg-accent/20 blur-3xl" aria-hidden />
        <div className="relative mx-auto max-w-6xl px-5 w-full">
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
            <h1 className="mt-8 max-w-4xl text-display text-primary-foreground drop-shadow-sm">
              Clasificador para la priorización de asistencia frente a la dificultad de pago del servicio de gas
            </h1>
          </Reveal>

          <Reveal delay={220}>
            <p className="mt-6 max-w-2xl text-body text-primary-foreground/90">
              Un enfoque de Machine Learning para optimizar recursos en Mar del Plata
            </p>
          </Reveal>

          <Reveal delay={320}>
            <div className="mt-12 grid gap-5 border-t border-primary-foreground/15 pt-8 md:grid-cols-2 lg:gap-8">
              <div className="flex flex-col justify-between rounded-2xl border border-accent/40 bg-accent/15 p-5 backdrop-blur-md shadow-sm">
                <div>
                  <div className="flex items-center gap-2.5">
                    <span className="grid size-8 place-items-center rounded-lg bg-accent text-accent-foreground shadow-sm">
                      <GraduationCap className="size-4" />
                    </span>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.18em] text-accent-foreground">Cuerpo Docente</p>
                      <p className="text-[11px] text-primary-foreground/75">Cátedra de Aprendizaje Automático</p>
                    </div>
                  </div>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {TEACHERS.map((name) => (
                      <li key={name} className="inline-flex items-center gap-2 rounded-lg border border-accent/30 bg-primary-foreground/15 px-3 py-1.5 text-sm font-semibold text-primary-foreground backdrop-blur-sm">
                        <span className="size-2 rounded-full bg-accent" />
                        {name}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="flex flex-col justify-between rounded-2xl border border-primary-foreground/20 bg-primary-foreground/10 p-5 backdrop-blur-md shadow-sm">
                <div>
                  <div className="flex items-center gap-2.5">
                    <span className="grid size-8 place-items-center rounded-lg bg-highlight/25 text-highlight shadow-sm">
                      <Users className="size-4" />
                    </span>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary-foreground/90">Integrantes del Grupo</p>
                      <p className="text-[11px] text-primary-foreground/75">Grupo 33</p>
                    </div>
                  </div>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {MEMBERS.map((name) => (
                      <li key={name} className="inline-flex items-center gap-2 rounded-lg border border-primary-foreground/15 bg-primary-foreground/10 px-3 py-1.5 text-sm font-medium text-primary-foreground/95 backdrop-blur-sm">
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
      </div>
    ),
  },
  {
    id: "contexto",
    theme: "light",
    component: () => (
      <div className="mx-auto flex h-full w-full max-w-6xl flex-col justify-center px-5">
        <div className="grid items-start gap-12 lg:grid-cols-2">
          <Reveal>
            <SectionTitle eyebrow="01 — Contexto" title="Contexto y Problema" />
            <p className="mt-6 text-body text-muted-foreground">
              Entre 2015 y 2016, Argentina atravesó un fuerte ajuste tarifario que impactó
              directamente en el servicio de gas residencial en Mar del Plata. En un escenario de
              recursos limitados, no alcanza con describir el problema: necesitamos un criterio
              objetivo para decidir a qué hogares dirigir la asistencia.
            </p>
            <div className="mt-8 flex items-center gap-3 rounded-xl border border-border bg-secondary/60 p-4">
              <TrendingUp className="size-5 shrink-0 text-accent" />
              <p className="text-body font-medium">
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
                  <span className="font-display text-sm font-semibold text-muted-foreground">2015</span>
                </div>
                <p className="mt-6 text-display text-primary">14%</p>
                <p className="mt-2 text-caption text-muted-foreground">de hogares con dificultad de pago</p>
              </article>
            </Reveal>

            <Reveal delay={200}>
              <article className="card-elevated h-full border-accent/40 p-6">
                <div className="flex items-center justify-between">
                  <span className="grid size-11 place-items-center rounded-lg bg-accent/15 text-accent">
                    <Wallet className="size-5" />
                  </span>
                  <span className="font-display text-sm font-semibold text-muted-foreground">2016</span>
                </div>
                <p className="mt-6 text-display text-accent">37%</p>
                <p className="mt-2 text-caption text-muted-foreground">de hogares con dificultad de pago</p>
              </article>
            </Reveal>

            <Reveal delay={300} className="sm:col-span-2">
              <article className="card-elevated flex items-center gap-4 p-6">
                <span className="grid size-11 shrink-0 place-items-center rounded-lg bg-accent/20 text-accent-foreground">
                  <TrendingUp className="size-5" />
                </span>
                <div>
                  <p className="font-display text-h2">+23 puntos porcentuales</p>
                  <p className="text-caption text-muted-foreground">Salto registrado entre ambas ediciones de la encuesta.</p>
                </div>
              </article>
            </Reveal>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "objetivo",
    theme: "secondary",
    component: () => (
      <div className="mx-auto flex h-full w-full max-w-6xl flex-col justify-center px-5">
        <Reveal>
          <SectionTitle eyebrow="02 — Propósito" title="El Objetivo del Proyecto" />
        </Reveal>
        <Reveal delay={150}>
          <blockquote className="relative mt-10 overflow-hidden rounded-2xl surface-deep p-8 shadow-[var(--shadow-float)] sm:p-12">
            <div className="absolute inset-0 grid-dots opacity-60" aria-hidden />
            <Target className="relative size-8 text-accent" />
            <p className="relative mt-6 text-h2 font-normal text-primary-foreground">
              Generar un modelo de clasificación supervisada que, a través del perfil
              socioeconómico y geográfico, prediga la dificultad de pago del gas y traduzca esta
              probabilidad en un criterio de priorización basado en el costo relativo de los
              errores (falsos positivos vs. falsos negativos).
            </p>
          </blockquote>
        </Reveal>
      </div>
    ),
  },
  {
    id: "metodologia",
    theme: "light",
    component: () => (
      <div className="mx-auto flex h-full w-full max-w-6xl flex-col justify-center px-5">
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
                  <p className="text-caption uppercase text-accent">
                    {step.step}
                  </p>
                  <h3 className="mt-2 text-[1.25rem] font-bold font-display">{step.title}</h3>
                  <p className="mt-3 text-body text-muted-foreground">{step.body}</p>
                </div>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    ),
  },
  {
    id: "hallazgos",
    theme: "secondary",
    component: () => (
      <div className="mx-auto flex h-full w-full max-w-6xl flex-col justify-center px-5">
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
                  <h3 className="font-display font-bold text-[1.125rem] leading-snug">{hallazgo.title}</h3>
                </div>
                <p className="mt-4 text-body text-muted-foreground">
                  {hallazgo.body}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    ),
  },
  {
    id: "aporte",
    theme: "light",
    component: () => (
      <div className="mx-auto flex h-full w-full max-w-6xl flex-col justify-center px-5">
        <Reveal>
          <SectionTitle eyebrow="05 — Aporte" title="El Aporte del Proyecto" />
        </Reveal>
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {APORTES.map((aporte, i) => (
            <Reveal key={aporte.title} delay={i * 120}>
              <article className="card-elevated flex h-full flex-col p-6">
                <div className="flex items-center gap-3">
                  <span className="grid size-10 place-items-center rounded-lg bg-accent/15 text-accent">
                    <aporte.icon className="size-5" />
                  </span>
                  <h3 className="font-display font-bold text-[1.125rem] leading-snug">{aporte.title}</h3>
                </div>
                <p className="mt-4 text-body text-muted-foreground">
                  {aporte.body}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    ),
  },
  {
    id: "cierre",
    theme: "secondary",
    component: () => (
      <div className="mx-auto flex h-full w-full max-w-6xl flex-col justify-between pt-32 pb-8 px-5">
        <div className="flex-1 flex flex-col justify-center">
          <Reveal>
            <div className="card-elevated overflow-hidden p-8 text-center sm:p-12">
              <h2 className="text-display text-accent">
                ¡Gracias por su atención!
              </h2>
              <p className="mx-auto mt-6 max-w-2xl text-body text-muted-foreground">
                Agradecemos el tiempo dedicado a recorrer los detalles de este proyecto, su propuesta metodológica y el impacto que busca generar.
              </p>
            </div>
          </Reveal>
        </div>
        <footer className="w-full border-t border-border pt-8 mt-12 shrink-0">
          <div className="text-center text-sm text-muted-foreground">
            Grupo 33 · Aprendizaje Automático · Universidad del Gran Rosario (UGR)
          </div>
        </footer>
      </div>
    ),
  },
];

// ============================================================================
// COMPONENTE PRINCIPAL: SLIDESHOW
// ============================================================================

function Index() {
  const [[page, direction], setPage] = useState([0, 0]);
  const isAnimating = useRef(false);
  const shouldReduceMotion = useReducedMotion();

  // Función para cambiar de diapositiva
  const paginate = useCallback(
    (newDirection: number) => {
      if (isAnimating.current) return;
      const newPage = page + newDirection;
      
      // Limitar límites de navegación
      if (newPage < 0 || newPage >= slidesContent.length) return;

      setPage([newPage, newDirection]);
      isAnimating.current = true;

      // Bloquear scroll rápido durante la transición
      setTimeout(() => {
        isAnimating.current = false;
      }, 700);
    },
    [page]
  );

  // Soporte para Scroll (Wheel)
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      // Pequeño umbral para evitar saltos accidentales por trackpads sensibles
      if (Math.abs(e.deltaY) > 30) {
        if (e.deltaY > 0) paginate(1);
        else paginate(-1);
      }
    };
    // non-passive para poder prevenir el scroll nativo
    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => window.removeEventListener("wheel", handleWheel);
  }, [paginate]);

  // Soporte para Teclado
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown" || e.key === "ArrowRight" || e.key === " ") {
        e.preventDefault();
        paginate(1);
      } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
        e.preventDefault();
        paginate(-1);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [paginate]);

  // Variantes de animación cinematográfica con profundidad
  const slideVariants = {
    enter: (direction: number) => ({
      y: shouldReduceMotion ? 0 : direction > 0 ? "100%" : "-100%",
      scale: shouldReduceMotion ? 1 : 0.9,
      opacity: 0,
      filter: shouldReduceMotion ? "blur(0px)" : "blur(8px)",
      zIndex: 0,
    }),
    center: {
      zIndex: 1,
      y: 0,
      scale: 1,
      opacity: 1,
      filter: "blur(0px)",
    },
    exit: (direction: number) => ({
      zIndex: 0,
      y: shouldReduceMotion ? 0 : direction < 0 ? "100%" : "-100%",
      scale: shouldReduceMotion ? 1 : 0.9,
      opacity: 0,
      filter: shouldReduceMotion ? "blur(0px)" : "blur(8px)",
    }),
  };

  const activeSlide = slidesContent[page];

  return (
    <main className="relative h-[100svh] w-full overflow-hidden bg-background text-foreground">
      <HeaderLogo visible={page > 0} />

      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={page}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            y: { type: "spring", stiffness: 260, damping: 30, mass: 1 },
            opacity: { duration: 0.4 },
            scale: { duration: 0.6, ease: [0.25, 1, 0.5, 1] }, // Cinematic ease
            filter: { duration: 0.5 },
          }}
          drag="y"
          dragConstraints={{ top: 0, bottom: 0 }}
          dragElastic={0.2}
          onDragEnd={(e, { offset, velocity }) => {
            const swipeDistance = offset.y;
            const swipeVelocity = velocity.y;
            
            if (swipeDistance < -60 || swipeVelocity < -500) {
              paginate(1); // Deslizar hacia arriba avanza
            } else if (swipeDistance > 60 || swipeVelocity > 500) {
              paginate(-1); // Deslizar hacia abajo retrocede
            }
          }}
          className={cn(
            "absolute inset-0 w-full h-full will-change-transform",
            activeSlide.theme === "secondary" && "bg-secondary/50",
            activeSlide.theme === "dark" && "bg-background"
          )}
        >
          {activeSlide.component()}
        </motion.div>
      </AnimatePresence>

      {/* Controles: Paginación lateral (Dots) */}
      <div className="absolute right-5 top-1/2 z-50 -translate-y-1/2 flex flex-col gap-3">
        {slidesContent.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              if (i === page) return;
              setPage([i, i > page ? 1 : -1]);
            }}
            aria-label={`Ir a la diapositiva ${i + 1}`}
            className={cn(
              "h-2.5 w-2.5 rounded-full transition-all duration-300",
              i === page
                ? "bg-primary scale-150"
                : "bg-primary/25 hover:bg-primary/60 hover:scale-125"
            )}
          />
        ))}
      </div>

      {/* Controles: Botones Anterior / Siguiente (Flotantes abajo a la derecha) */}
      <div className="absolute bottom-6 right-6 z-50 flex gap-2">
        <button
          onClick={() => paginate(-1)}
          disabled={page === 0}
          aria-label="Diapositiva anterior"
          className="grid size-11 place-items-center rounded-full bg-background/80 border border-border text-foreground shadow-sm backdrop-blur-md transition-all hover:bg-secondary hover:scale-105 active:scale-95 disabled:opacity-40 disabled:hover:scale-100 disabled:cursor-not-allowed"
        >
          <ChevronUp className="size-5" />
        </button>
        <button
          onClick={() => paginate(1)}
          disabled={page === slidesContent.length - 1}
          aria-label="Diapositiva siguiente"
          className="grid size-11 place-items-center rounded-full bg-primary text-primary-foreground shadow-sm transition-all hover:bg-primary/90 hover:scale-105 active:scale-95 disabled:opacity-40 disabled:hover:scale-100 disabled:cursor-not-allowed"
        >
          <ChevronDown className="size-5" />
        </button>
      </div>
    </main>
  );
}
