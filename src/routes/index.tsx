import { createFileRoute } from "@tanstack/react-router";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import {
  Phone,
  Calendar,
  Stethoscope,
  Syringe,
  HeartPulse,
  FlaskConical,
  Scan,
  Activity,
  ShieldCheck,
  Award,
  Sparkles,
  Clock,
  PawPrint,
  MapPin,
  MessageCircle,
  Navigation,
  ArrowUp,
  X,
  Quote,
  Star,
  Menu,
} from "lucide-react";

import heroImg from "@/assets/hero-vet.jpg";
import gClinic from "@/assets/gallery-clinic.jpg";
import gExam from "@/assets/gallery-exam.jpg";
import gPets from "@/assets/gallery-pets.jpg";
import gDiag from "@/assets/gallery-diagnostic.jpg";
import gCare from "@/assets/gallery-care.jpg";
import gSmall from "@/assets/gallery-small.jpg";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Ветклиника Доктора Абдулазиза — Фергана" },
      {
        name: "description",
        content:
          "Профессиональная ветеринарная помощь в Фергане: лечение, вакцинация, хирургия, лабораторная диагностика, рентген и УЗИ. Опыт более 10 лет.",
      },
      { property: "og:title", content: "Ветклиника Доктора Абдулазиза — Фергана" },
      {
        property: "og:description",
        content:
          "Заботливая ветеринарная помощь с современным оборудованием. Запишитесь на консультацию в Фергане.",
      },
    ],
  }),
});

const PHONE_PRIMARY = "+998 95 336 66 36";
const PHONE_SECONDARY = "+998 90 336 66 36";
const PHONE_PRIMARY_HREF = "tel:+998953366636";
const PHONE_SECONDARY_HREF = "tel:+998903366636";
const WHATSAPP_HREF = "https://wa.me/998953366636";
const MAPS_HREF = "https://www.google.com/maps?q=Fergana,Uzbekistan";

const navLinks = [
  { id: "about", label: "О клинике" },
  { id: "services", label: "Услуги" },
  { id: "why", label: "Преимущества" },
  { id: "gallery", label: "Галерея" },
  { id: "reviews", label: "Отзывы" },
  { id: "contact", label: "Контакты" },
];

function Index() {
  const [showTop, setShowTop] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 600);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Nav menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <Hero />
      <About />
      <Services />
      <Why />
      <Gallery />
      <Testimonials />
      <Contact />
      <MapSection />
      <Footer />

      {/* Floating actions */}
      <a
        href={WHATSAPP_HREF}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="WhatsApp"
        className="fixed bottom-6 right-6 z-40 grid h-14 w-14 place-items-center rounded-full bg-[oklch(0.72_0.16_145)] text-white shadow-glow animate-pulse-ring transition-transform hover:scale-110"
      >
        <MessageCircle className="h-6 w-6" />
      </a>

      {/* Floating call button — mobile only */}
      <a
        href={PHONE_PRIMARY_HREF}
        aria-label="Позвонить"
        className="fixed bottom-6 left-6 z-40 grid h-14 w-14 place-items-center rounded-full bg-gradient-cta text-white shadow-glow md:hidden transition-transform hover:scale-110"
      >
        <Phone className="h-6 w-6" />
      </a>

      <AnimatePresence>
        {showTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            aria-label="Наверх"
            className="fixed bottom-24 right-6 z-40 grid h-12 w-12 place-items-center rounded-full glass text-foreground shadow-soft transition-transform hover:scale-110"
          >
            <ArrowUp className="h-5 w-5" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ---------------- NAV ---------------- */
function Nav({ menuOpen, setMenuOpen }: { menuOpen: boolean; setMenuOpen: (v: boolean) => void }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "py-2" : "py-4"
      }`}
    >
      <div
        className={`mx-auto max-w-7xl px-4 transition-all duration-300 ${
          scrolled ? "" : ""
        }`}
      >
        <div
          className={`glass flex items-center justify-between rounded-2xl px-4 py-3 transition-all ${
            scrolled ? "shadow-soft" : ""
          }`}
        >
          <a href="#top" className="flex items-center gap-2 group">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-cta text-white shadow-soft transition-transform group-hover:scale-110">
              <PawPrint className="h-5 w-5" />
            </span>
            <div className="leading-tight">
              <div className="text-sm font-bold">Dr. Abdulaziz</div>
              <div className="text-[11px] text-muted-foreground">Ветклиника · Фергана</div>
            </div>
          </a>

          <nav className="hidden md:flex items-center gap-7">
            {navLinks.map((l) => (
              <a
                key={l.id}
                href={`#${l.id}`}
                className="relative text-sm font-medium text-foreground/80 transition-colors hover:text-foreground after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-0 after:bg-primary after:transition-all hover:after:w-full"
              >
                {l.label}
              </a>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-2">
            <a
              href={PHONE_PRIMARY_HREF}
              className="inline-flex items-center gap-2 rounded-full bg-gradient-cta px-4 py-2 text-sm font-semibold text-white shadow-soft transition-all hover:shadow-glow hover:scale-[1.03]"
            >
              <Phone className="h-4 w-4" /> Позвонить
            </a>
          </div>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden grid h-10 w-10 place-items-center rounded-xl glass"
            aria-label="Меню"
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="md:hidden mt-2 glass rounded-2xl p-4 shadow-soft"
            >
              <div className="flex flex-col gap-1">
                {navLinks.map((l) => (
                  <a
                    key={l.id}
                    href={`#${l.id}`}
                    onClick={() => setMenuOpen(false)}
                    className="rounded-xl px-3 py-2.5 text-sm font-medium hover:bg-muted transition-colors"
                  >
                    {l.label}
                  </a>
                ))}
                <a
                  href={PHONE_PRIMARY_HREF}
                  className="mt-2 inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-cta px-4 py-3 text-sm font-semibold text-white"
                >
                  <Phone className="h-4 w-4" /> {PHONE_PRIMARY}
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}

/* ---------------- HERO ---------------- */
function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 120]);

  return (
    <section id="top" ref={ref} className="relative isolate overflow-hidden pt-32 pb-20 md:pt-40 md:pb-28">
      {/* gradient background */}
      <div className="absolute inset-0 -z-10 bg-gradient-hero" />
      <div className="absolute -top-32 -left-32 -z-10 h-[28rem] w-[28rem] rounded-full bg-[oklch(0.85_0.10_185_/_0.5)] blur-3xl animate-float-slow" />
      <div className="absolute -bottom-40 -right-20 -z-10 h-[32rem] w-[32rem] rounded-full bg-[oklch(0.88_0.08_150_/_0.5)] blur-3xl animate-float-reverse" />
      <div className="absolute top-1/3 right-1/4 -z-10 h-72 w-72 rounded-full bg-[oklch(0.90_0.06_220_/_0.4)] blur-3xl animate-float-slow" />

      <div className="mx-auto max-w-7xl px-4">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.span
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
              className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs font-medium text-foreground/80"
            >
              <Sparkles className="h-3.5 w-3.5 text-primary" />
              Современная ветеринарная клиника в Фергане
            </motion.span>

            <h1 className="mt-6 text-balance font-display text-4xl font-extrabold leading-[1.05] tracking-tight md:text-6xl">
              Профессиональная{" "}
              <span className="relative inline-block">
                <span className="relative z-10 bg-gradient-to-r from-[oklch(0.55_0.13_185)] to-[oklch(0.55_0.13_150)] bg-clip-text text-transparent">
                  ветеринарная помощь
                </span>
                <span className="absolute inset-x-0 bottom-1 h-3 -z-0 bg-[oklch(0.85_0.13_180_/_0.5)] rounded" />
              </span>{" "}
              в Фергане
            </h1>

            <p className="mt-6 max-w-xl text-lg text-muted-foreground text-balance">
              Лечение, диагностика, хирургия и вакцинация — с заботой о ваших питомцах
              и опытом более 10 лет.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={PHONE_PRIMARY_HREF}
                className="group inline-flex items-center gap-2 rounded-full bg-gradient-cta px-6 py-3.5 text-sm font-semibold text-white shadow-soft transition-all hover:shadow-glow hover:scale-[1.03]"
              >
                <Phone className="h-4 w-4 transition-transform group-hover:rotate-12" />
                Позвонить сейчас
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-full glass px-6 py-3.5 text-sm font-semibold text-foreground shadow-soft transition-all hover:scale-[1.03]"
              >
                <Calendar className="h-4 w-4" />
                Записаться на приём
              </a>
            </div>

            {/* trust badges */}
            <div className="mt-10 grid grid-cols-3 gap-3 max-w-xl">
              {[
                { icon: Award, label: "10+ лет", sub: "опыта" },
                { icon: Activity, label: "Современное", sub: "оборудование" },
                { icon: HeartPulse, label: "Заботливый", sub: "подход" },
              ].map((b, i) => (
                <motion.div
                  key={b.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  className="glass rounded-2xl px-3 py-3 text-center shadow-soft transition-transform hover:-translate-y-1"
                >
                  <b.icon className="mx-auto h-5 w-5 text-primary" />
                  <div className="mt-1.5 text-sm font-bold leading-tight">{b.label}</div>
                  <div className="text-[11px] text-muted-foreground">{b.sub}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Image */}
          <motion.div
            style={{ y }}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative"
          >
            <div className="relative aspect-[5/6] w-full overflow-hidden rounded-[2rem] shadow-glow">
              <img
                src={heroImg}
                alt="Ветеринар держит щенка и кошку"
                width={1536}
                height={1152}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[oklch(0.20_0.04_190_/_0.30)] to-transparent" />
            </div>

            {/* Floating cards */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
              className="absolute -left-4 top-6 glass rounded-2xl p-3 shadow-soft md:-left-8"
            >
              <div className="flex items-center gap-2">
                <div className="grid h-9 w-9 place-items-center rounded-xl bg-[oklch(0.85_0.13_150_/_0.5)]">
                  <PawPrint className="h-4 w-4 text-[oklch(0.45_0.13_150)]" />
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">Питомцев в год</div>
                  <div className="text-sm font-bold">2 000+</div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 }}
              className="absolute -right-4 bottom-10 glass rounded-2xl p-3 shadow-soft md:-right-8"
            >
              <div className="flex items-center gap-2">
                <div className="grid h-9 w-9 place-items-center rounded-xl bg-[oklch(0.85_0.10_190_/_0.6)]">
                  <ShieldCheck className="h-4 w-4 text-[oklch(0.40_0.12_190)]" />
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">Безопасность</div>
                  <div className="text-sm font-bold">Сертифицировано</div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- SECTION HELPERS ---------------- */
function SectionTitle({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string;
  title: React.ReactNode;
  subtitle?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6 }}
      className="mx-auto max-w-2xl text-center"
    >
      <span className="inline-flex items-center gap-2 rounded-full bg-secondary px-3 py-1 text-xs font-semibold uppercase tracking-wider text-secondary-foreground">
        <PawPrint className="h-3.5 w-3.5" />
        {eyebrow}
      </span>
      <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-balance md:text-5xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-muted-foreground text-balance">{subtitle}</p>
      )}
    </motion.div>
  );
}

/* ---------------- ABOUT ---------------- */
function About() {
  return (
    <section id="about" className="relative py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="relative aspect-square w-full overflow-hidden rounded-[2rem] shadow-soft">
              <img
                src={gCare}
                alt="Доктор Абдулазиз с собакой"
                width={1024}
                height={1024}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 glass rounded-2xl p-5 shadow-glow max-w-[220px]">
              <div className="text-4xl font-extrabold bg-gradient-to-br from-[oklch(0.55_0.13_185)] to-[oklch(0.55_0.13_150)] bg-clip-text text-transparent">
                10+
              </div>
              <div className="text-sm text-muted-foreground">лет опыта в ветеринарии</div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <span className="inline-flex items-center gap-2 rounded-full bg-secondary px-3 py-1 text-xs font-semibold uppercase tracking-wider text-secondary-foreground">
              <Stethoscope className="h-3.5 w-3.5" />
              О клинике
            </span>
            <h2 className="mt-4 font-display text-3xl font-bold tracking-tight md:text-4xl">
              🐾 Ветеринарная клиника Доктора Абдулазиза
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              👨‍⚕️ Ветеринарный врач с более чем 10-летним опытом работы.
            </p>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              Мы относимся к каждому питомцу как к члену семьи. Используем современные
              методы диагностики и лечения, постоянно повышаем квалификацию и
              создаём комфортную, спокойную атмосферу для ваших любимцев.
            </p>

            <div className="mt-8 grid grid-cols-2 gap-4">
              {[
                { icon: HeartPulse, t: "Забота", d: "Индивидуальный подход к каждому животному" },
                { icon: Award, t: "Опыт", d: "Сотни успешно вылеченных питомцев" },
                { icon: Activity, t: "Технологии", d: "Современное оборудование и методики" },
                { icon: Clock, t: "Скорость", d: "Быстрая консультация и приём" },
              ].map((f) => (
                <div
                  key={f.t}
                  className="group rounded-2xl border border-border/60 bg-card p-4 shadow-soft transition-all hover:-translate-y-1 hover:border-primary/40"
                >
                  <f.icon className="h-5 w-5 text-primary transition-transform group-hover:scale-110" />
                  <div className="mt-2 font-semibold">{f.t}</div>
                  <div className="text-sm text-muted-foreground">{f.d}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- SERVICES ---------------- */
function Services() {
  const services = [
    { icon: Stethoscope, title: "Лечение", desc: "Терапия заболеваний у животных всех видов и возрастов." },
    { icon: Syringe, title: "Вакцинация", desc: "Полный спектр прививок по индивидуальному графику." },
    { icon: HeartPulse, title: "Хирургия", desc: "Плановые и срочные операции в стерильных условиях." },
    { icon: FlaskConical, title: "Лабораторная диагностика", desc: "Анализы крови, мочи и других показателей." },
    { icon: Scan, title: "Рентген", desc: "Цифровой рентген для точной визуализации." },
    { icon: Activity, title: "УЗИ (УЗД)", desc: "Безболезненная и точная ультразвуковая диагностика." },
  ];

  return (
    <section id="services" className="relative py-20 md:py-28 bg-gradient-soft">
      <div className="mx-auto max-w-7xl px-4">
        <SectionTitle
          eyebrow="Наши услуги"
          title={<>Полный спектр <span className="text-primary">ветеринарной помощи</span></>}
          subtitle="Всё необходимое для здоровья ваших питомцев — в одном месте."
        />

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className="group relative overflow-hidden rounded-3xl border border-border/60 bg-card p-7 shadow-soft transition-all duration-500 hover:-translate-y-2 hover:shadow-glow hover:border-primary/40"
            >
              <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-gradient-cta opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-30" />
              <div className="relative">
                <div className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-cta text-white shadow-soft transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6">
                  <s.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-5 text-xl font-bold">{s.title}</h3>
                <p className="mt-2 text-muted-foreground">{s.desc}</p>
                <div className="mt-5 flex items-center gap-2 text-sm font-semibold text-primary opacity-0 transition-opacity group-hover:opacity-100">
                  Записаться <span className="transition-transform group-hover:translate-x-1">→</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- WHY ---------------- */
function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          const duration = 1400;
          const start = performance.now();
          const tick = (t: number) => {
            const p = Math.min((t - start) / duration, 1);
            setVal(Math.floor(to * (1 - Math.pow(1 - p, 3))));
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
          io.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [to]);
  return (
    <span ref={ref}>
      {val}
      {suffix}
    </span>
  );
}

function Why() {
  const items = [
    { icon: Award, t: "10+ лет опыта", d: "Глубокие знания и сотни успешных случаев." },
    { icon: Activity, t: "Современное оборудование", d: "УЗИ, рентген и лабораторные исследования." },
    { icon: HeartPulse, t: "Заботливый подход", d: "Внимание к каждому питомцу как к своему." },
    { icon: ShieldCheck, t: "Точная диагностика", d: "Корректные диагнозы и эффективное лечение." },
    { icon: Clock, t: "Быстрые консультации", d: "Минимум ожидания, максимум внимания." },
    { icon: Sparkles, t: "Комфортная атмосфера", d: "Спокойная и уютная среда для животных." },
  ];

  const stats = [
    { num: 10, suf: "+", label: "лет практики" },
    { num: 2000, suf: "+", label: "питомцев в год" },
    { num: 98, suf: "%", label: "довольных клиентов" },
    { num: 24, suf: "/7", label: "поддержка по телефону" },
  ];

  return (
    <section id="why" className="relative py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4">
        <SectionTitle
          eyebrow="Почему выбирают нас"
          title={<>Доверие, которое <span className="text-primary">заслужено</span></>}
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((it, i) => (
            <motion.div
              key={it.t}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="group flex gap-4 rounded-3xl border border-border/60 bg-card p-6 shadow-soft transition-all hover:-translate-y-1 hover:border-primary/40"
            >
              <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-secondary text-secondary-foreground transition-transform group-hover:scale-110">
                <it.icon className="h-5 w-5" />
              </div>
              <div>
                <div className="font-semibold">{it.t}</div>
                <div className="text-sm text-muted-foreground">{it.d}</div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Counters */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mt-14 grid gap-4 rounded-[2rem] bg-gradient-cta p-8 text-white shadow-glow sm:grid-cols-4 md:p-12"
        >
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-4xl font-extrabold md:text-5xl">
                <Counter to={s.num} suffix={s.suf} />
              </div>
              <div className="mt-1 text-sm text-white/85">{s.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ---------------- GALLERY ---------------- */
function Gallery() {
  const images = [
    { src: gClinic, alt: "Интерьер клиники", span: "md:col-span-2 md:row-span-2" },
    { src: gExam, alt: "Осмотр питомца" },
    { src: gPets, alt: "Счастливые питомцы" },
    { src: gDiag, alt: "Диагностическое оборудование" },
    { src: gCare, alt: "Забота о питомце", span: "md:col-span-2" },
    { src: gSmall, alt: "Маленькие питомцы" },
  ];
  const [open, setOpen] = useState<string | null>(null);

  return (
    <section id="gallery" className="relative py-20 md:py-28 bg-muted/40">
      <div className="mx-auto max-w-7xl px-4">
        <SectionTitle
          eyebrow="Галерея"
          title={<>Загляните в нашу <span className="text-primary">клинику</span></>}
          subtitle="Современные кабинеты, заботливые специалисты и счастливые питомцы."
        />

        <div className="mt-14 grid grid-cols-2 gap-3 md:grid-cols-4 md:auto-rows-[180px]">
          {images.map((img, i) => (
            <motion.button
              key={i}
              type="button"
              onClick={() => setOpen(img.src)}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className={`group relative overflow-hidden rounded-2xl shadow-soft ${img.span ?? ""}`}
            >
              <img
                src={img.src}
                alt={img.alt}
                width={1024}
                height={1024}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <div className="absolute bottom-3 left-3 right-3 translate-y-3 text-left text-sm font-semibold text-white opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                {img.alt}
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(null)}
            className="fixed inset-0 z-[60] grid place-items-center bg-black/80 p-4 backdrop-blur-sm"
          >
            <motion.img
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              src={open}
              alt=""
              className="max-h-[90vh] max-w-[90vw] rounded-2xl shadow-glow"
            />
            <button
              onClick={() => setOpen(null)}
              aria-label="Закрыть"
              className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full bg-white/10 text-white backdrop-blur-md hover:bg-white/20"
            >
              <X className="h-5 w-5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

/* ---------------- TESTIMONIALS ---------------- */
function Testimonials() {
  const reviews = [
    {
      name: "Малика Турсунова",
      pet: "Кошка Муся",
      text: "Доктор Абдулазиз спас нашу Мусю. Внимательный, заботливый и настоящий профессионал. Спасибо вам огромное!",
    },
    {
      name: "Алишер Каримов",
      pet: "Овчарка Рекс",
      text: "Очень рады, что нашли эту клинику. Современное оборудование и спокойная атмосфера. Рекс совсем не боится приходить.",
    },
    {
      name: "Дилфуза Юсупова",
      pet: "Щенок Бим",
      text: "Сделали все прививки нашему щенку. Объяснили каждый шаг, дали советы по уходу. Очень рекомендую!",
    },
    {
      name: "Шахзод Рахимов",
      pet: "Кролик Снежок",
      text: "Лечили нашего кролика — всё прошло отлично. Видно, что врач любит животных и работает с душой.",
    },
  ];

  return (
    <section id="reviews" className="relative py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4">
        <SectionTitle
          eyebrow="Отзывы"
          title={<>Слова <span className="text-primary">благодарности</span> от наших клиентов</>}
        />

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {reviews.map((r, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className="group relative overflow-hidden rounded-3xl border border-border/60 bg-card p-7 shadow-soft transition-all hover:-translate-y-1 hover:shadow-glow"
            >
              <Quote className="absolute right-6 top-6 h-10 w-10 text-primary/15" />
              <div className="flex gap-1 text-[oklch(0.78_0.15_85)]">
                {Array.from({ length: 5 }).map((_, j) => (
                  <Star key={j} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <p className="mt-4 text-foreground/90 leading-relaxed">«{r.text}»</p>
              <div className="mt-6 flex items-center gap-3">
                <div className="grid h-11 w-11 place-items-center rounded-full bg-gradient-cta text-sm font-bold text-white">
                  {r.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <div>
                  <div className="font-semibold">{r.name}</div>
                  <div className="text-xs text-muted-foreground">{r.pet}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- CONTACT ---------------- */
function Contact() {
  return (
    <section id="contact" className="relative py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative overflow-hidden rounded-[2.5rem] bg-gradient-cta p-8 text-white shadow-glow md:p-14"
        >
          {/* decorative blobs */}
          <div className="absolute -left-20 -top-20 h-80 w-80 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute -right-20 -bottom-20 h-80 w-80 rounded-full bg-white/10 blur-3xl" />

          <div className="relative grid gap-10 lg:grid-cols-2 lg:items-center">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-wider">
                <PawPrint className="h-3.5 w-3.5" /> Свяжитесь с нами
              </span>
              <h2 className="mt-4 font-display text-3xl font-extrabold leading-tight md:text-5xl">
                Здоровье вашего питомца — <br className="hidden md:block" />
                наш главный приоритет
              </h2>
              <p className="mt-4 max-w-lg text-white/85">
                Позвоните прямо сейчас или напишите в WhatsApp — мы ответим
                на все вопросы и поможем записаться на удобное время.
              </p>

              <div className="mt-8 space-y-3">
                <div className="flex items-center gap-3">
                  <MapPin className="h-5 w-5" />
                  <span className="font-medium">📍 Фергана, Узбекистан</span>
                </div>
                <a href={PHONE_PRIMARY_HREF} className="flex items-center gap-3 hover:underline">
                  <Phone className="h-5 w-5" />
                  <span className="font-medium">{PHONE_PRIMARY}</span>
                </a>
                <a href={PHONE_SECONDARY_HREF} className="flex items-center gap-3 hover:underline">
                  <Phone className="h-5 w-5" />
                  <span className="font-medium">{PHONE_SECONDARY}</span>
                </a>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-1">
              <a
                href={PHONE_PRIMARY_HREF}
                className="group inline-flex items-center justify-between rounded-2xl bg-white/15 px-5 py-4 backdrop-blur-md transition-all hover:bg-white/25"
              >
                <span className="flex items-center gap-3 font-semibold">
                  <Phone className="h-5 w-5" /> Позвонить в клинику
                </span>
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </a>
              <a
                href={WHATSAPP_HREF}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-between rounded-2xl bg-white text-[oklch(0.40_0.10_180)] px-5 py-4 transition-all hover:scale-[1.01] shadow-soft"
              >
                <span className="flex items-center gap-3 font-semibold">
                  <MessageCircle className="h-5 w-5" /> Открыть WhatsApp
                </span>
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </a>
              <a
                href={MAPS_HREF}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-between rounded-2xl bg-white/15 px-5 py-4 backdrop-blur-md transition-all hover:bg-white/25"
              >
                <span className="flex items-center gap-3 font-semibold">
                  <Navigation className="h-5 w-5" /> Построить маршрут
                </span>
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ---------------- MAP ---------------- */
function MapSection() {
  return (
    <section id="map" className="relative pb-20 md:pb-28">
      <div className="mx-auto max-w-7xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="overflow-hidden rounded-[2rem] border border-border/60 shadow-soft"
        >
          <iframe
            title="Клиника на карте — Фергана"
            src="https://www.google.com/maps?q=Fergana,Uzbekistan&z=13&output=embed"
            width="100%"
            height="450"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="block w-full grayscale-[20%] transition-all hover:grayscale-0"
          />
        </motion.div>
      </div>
    </section>
  );
}

/* ---------------- FOOTER ---------------- */
function Footer() {
  return (
    <footer className="border-t border-border/60 bg-card/50 py-10">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <div className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-cta text-white shadow-soft">
              <PawPrint className="h-5 w-5" />
            </span>
            <div>
              <div className="font-bold">Ветклиника Доктора Абдулазиза</div>
              <div className="text-xs text-muted-foreground italic">
                С заботой о здоровье ваших питомцев
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center gap-1 text-sm text-muted-foreground md:items-end">
            <a href={PHONE_PRIMARY_HREF} className="hover:text-foreground transition-colors">
              {PHONE_PRIMARY}
            </a>
            <a href={PHONE_SECONDARY_HREF} className="hover:text-foreground transition-colors">
              {PHONE_SECONDARY}
            </a>
          </div>
        </div>

        <div className="mt-8 border-t border-border/60 pt-6 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} Ветеринарная клиника Доктора Абдулазиза. Все права защищены.
        </div>
      </div>
    </footer>
  );
}
