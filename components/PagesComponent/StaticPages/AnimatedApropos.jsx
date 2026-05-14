"use client";

import Layout from "@/components/Layout/Layout";
import BreadCrumb from "@/components/BreadCrumb/BreadCrumb";
import CustomLink from "@/components/Common/CustomLink";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { aproposContent } from "@/utils/aproposContent";
import { t } from "@/utils";
import {
  ArrowDown,
  CheckCircle2,
  Eye,
  Sparkles,
  Target,
} from "lucide-react";
import { useInView } from "react-intersection-observer";

function RevealBlock({ children, className, staggerIndex = 0 }) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.08,
    rootMargin: "0px 0px -48px 0px",
  });

  return (
    <div
      ref={ref}
      style={{
        transitionDelay: inView ? `${staggerIndex * 70}ms` : "0ms",
      }}
      className={cn(
        "transition-all duration-700 ease-out motion-reduce:transition-none",
        inView
          ? "translate-y-0 opacity-100"
          : "translate-y-10 opacity-0 motion-reduce:translate-y-0 motion-reduce:opacity-100",
        className
      )}
    >
      {children}
    </div>
  );
}

export default function AnimatedApropos({
  breadcrumbTitleKey = "aboutUs",
}) {
  const c = aproposContent;

  return (
    <Layout>
      <BreadCrumb title2={t(breadcrumbTitleKey)} />

      <main className="relative overflow-hidden bg-background">
        {/* Hero */}
        <section className="relative isolate min-h-[min(88vh,760px)] overflow-hidden border-b border-primary/10">
          <div
            className="absolute inset-0 bg-[length:220%_220%] bg-gradient-to-br from-slate-950 via-cyan-950/90 to-slate-900 animate-apropos-gradient motion-reduce:animate-none"
            style={{ backgroundPosition: "0% 50%" }}
            aria-hidden
          />
          <div
            className="pointer-events-none absolute -left-24 top-20 h-72 w-72 rounded-full bg-primary/25 blur-[100px] animate-apropos-float motion-reduce:animate-none"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute -right-16 bottom-10 h-80 w-80 rounded-full bg-cyan-400/20 blur-[110px] animate-apropos-float motion-reduce:animate-none [animation-delay:-7s]"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute left-1/2 top-1/3 h-64 w-64 -translate-x-1/2 rounded-full bg-teal-400/15 blur-[90px] animate-apropos-float motion-reduce:animate-none [animation-delay:-12s]"
            aria-hidden
          />

          <div className="container relative z-10 flex flex-col items-center justify-center px-4 pb-14 pt-10 text-center md:pb-20 md:pt-14">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.18em] text-cyan-100/90 opacity-0 shadow-lg backdrop-blur-md animate-apropos-fade-up motion-reduce:animate-none motion-reduce:opacity-100">
              <Sparkles className="size-3.5 text-cyan-300" aria-hidden />
              {c.heroEyebrow}
            </div>

            <h1 className="mt-2 max-w-4xl font-semibold tracking-tight text-white opacity-0 shadow-sm animate-apropos-fade-up motion-reduce:animate-none motion-reduce:opacity-100 [animation-delay:120ms] text-balance text-4xl sm:text-5xl md:text-6xl lg:text-[3.25rem]">
              <span className="bg-gradient-to-r from-white via-cyan-100 to-cyan-300 bg-clip-text text-transparent">
                {c.heroTitle}
              </span>
            </h1>

            <p className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-cyan-50/90 opacity-0 animate-apropos-fade-up motion-reduce:animate-none motion-reduce:opacity-100 [animation-delay:220ms] md:text-xl">
              {c.heroLead}
            </p>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-3 opacity-0 animate-apropos-fade-up motion-reduce:animate-none motion-reduce:opacity-100 [animation-delay:320ms]">
              <Button
                asChild
                size="lg"
                className="rounded-full bg-primary px-8 text-base font-semibold text-primary-foreground shadow-lg shadow-cyan-500/25 transition hover:scale-[1.02] hover:shadow-cyan-500/35 active:scale-[0.98]"
              >
                <CustomLink href="/ads">{c.ctaBrowse}</CustomLink>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="rounded-full border-white/25 bg-white/5 px-8 text-base font-semibold text-white backdrop-blur-sm hover:bg-white/10 hover:text-white"
              >
                <CustomLink href="/contact-us">{c.ctaContact}</CustomLink>
              </Button>
            </div>

            <div
              className="mt-14 flex flex-col items-center gap-1 text-xs text-cyan-200/60 opacity-0 animate-apropos-fade-up motion-reduce:animate-none motion-reduce:opacity-100 [animation-delay:420ms]"
              aria-hidden
            >
              <span>{c.scrollHint}</span>
              <ArrowDown className="size-5 motion-safe:animate-bounce" />
            </div>
          </div>
        </section>

        {/* Introduction */}
        <section className="border-b bg-muted/35 py-14 md:py-20">
          <div className="container max-w-3xl px-4">
            <div className="space-y-6 text-lg leading-relaxed text-muted-foreground">
              {c.introParagraphs.map((paragraph, i) => (
                <RevealBlock key={i} staggerIndex={i}>
                  <p>{paragraph}</p>
                </RevealBlock>
              ))}
            </div>
          </div>
        </section>

        {/* Mission & vision */}
        <section className="py-14 md:py-20">
          <div className="container grid gap-8 px-4 md:grid-cols-2 md:gap-10">
            <RevealBlock
              staggerIndex={0}
              className="relative overflow-hidden rounded-2xl border bg-card p-8 shadow-sm transition hover:border-primary/30 hover:shadow-md"
            >
              <div className="mb-4 inline-flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Target className="size-6" aria-hidden />
              </div>
              <h2 className="text-2xl font-semibold tracking-tight">
                {c.mission.title}
              </h2>
              <p className="mt-4 leading-relaxed text-muted-foreground">
                {c.mission.body}
              </p>
            </RevealBlock>
            <RevealBlock
              staggerIndex={1}
              className="relative overflow-hidden rounded-2xl border bg-card p-8 shadow-sm transition hover:border-primary/30 hover:shadow-md"
            >
              <div className="mb-4 inline-flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Eye className="size-6" aria-hidden />
              </div>
              <h2 className="text-2xl font-semibold tracking-tight">
                {c.vision.title}
              </h2>
              <p className="mt-4 leading-relaxed text-muted-foreground">
                {c.vision.body}
              </p>
            </RevealBlock>
          </div>
        </section>

        {/* Valeurs */}
        <section className="border-y bg-muted/30 py-14 md:py-20">
          <div className="container px-4">
            <RevealBlock className="mx-auto mb-10 max-w-2xl text-center">
              <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
                {c.values.title}
              </h2>
            </RevealBlock>
            <div className="mx-auto flex max-w-4xl flex-wrap justify-center gap-3">
              {c.values.items.map((label, i) => (
                <RevealBlock
                  key={label}
                  staggerIndex={i}
                  className="rounded-full border border-primary/20 bg-background px-5 py-2.5 text-sm font-medium text-foreground shadow-sm transition hover:-translate-y-0.5 hover:border-primary/40 hover:bg-primary/5 motion-reduce:hover:translate-y-0"
                >
                  {label}
                </RevealBlock>
              ))}
            </div>
          </div>
        </section>

        {/* Ce que nous proposons */}
        <section className="py-14 md:py-20">
          <div className="container px-4">
            <RevealBlock className="mx-auto mb-10 max-w-2xl text-center">
              <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
                {c.offers.title}
              </h2>
            </RevealBlock>
            <div className="mx-auto max-w-2xl rounded-2xl border bg-card p-6 shadow-sm md:p-10">
              <ul className="space-y-4">
                {c.offers.items.map((item, i) => (
                  <RevealBlock key={item} staggerIndex={i}>
                    <li className="flex gap-3 text-left leading-relaxed text-muted-foreground">
                      <CheckCircle2
                        className="mt-0.5 size-5 shrink-0 text-primary"
                        aria-hidden
                      />
                      <span className="text-foreground">{item}</span>
                    </li>
                  </RevealBlock>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Pourquoi nous */}
        <section className="border-t bg-muted/25 py-14 md:py-20">
          <div className="container px-4">
            <RevealBlock className="mx-auto max-w-3xl text-center">
              <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
                {c.why.title}
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
                {c.why.body}
              </p>
            </RevealBlock>
          </div>
        </section>

        {/* CTA */}
        <section className="relative overflow-hidden py-16 md:py-24">
          <div
            className="absolute inset-0 bg-gradient-to-br from-primary/15 via-background to-cyan-500/10"
            aria-hidden
          />
          <div className="container relative z-10 px-4 text-center">
            <RevealBlock className="mx-auto max-w-xl">
              <div className="mt-2 flex flex-wrap justify-center gap-3">
                <Button asChild size="lg" className="rounded-full px-8">
                  <CustomLink href="/ads">{c.ctaBrowse}</CustomLink>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="rounded-full px-8"
                >
                  <CustomLink href="/contact-us">{c.ctaContact}</CustomLink>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="secondary"
                  className="rounded-full px-8"
                >
                  <CustomLink href="/faqs">{c.ctaFaq}</CustomLink>
                </Button>
              </div>
            </RevealBlock>
          </div>
        </section>
      </main>
    </Layout>
  );
}
