import AnimatedContainer from '#/components/AnimatedContainer'
import AnimatedLink from '#/components/AnimatedLink'
import { createFileRoute } from '@tanstack/react-router'
import heroImage from '@/assets/images/visily-image.png'

import { ArrowRight, Bell, CreditCard, Globe, PlayIcon, Star, Users, Calendar, Link as LinkIcon } from 'lucide-react'

/**
 * Marketing landing page — the public homepage at `/`.
 *
 * This is what a business owner sees before signing up. It explains what
 * OmniBook does, shows social proof, and funnels them toward `/auth/signup`.
 *
 * Sections in order:
 * 1. Hero (headline + CTAs + trust indicators + product screenshot)
 * 2. Features (3 cards: time zones, Stripe, confirmations)
 * 3. How It Works (3-step visual)
 * 4. Testimonials (horizontal scroll carousel)
 * 5. Final CTA (signup + sales buttons)
 *
 * All animations use `AnimatedContainer`, which handles both load-in
 * (`type='load'`) and scroll-triggered (`type='scroll'`) animations.
 */
export const Route = createFileRoute('/_marketing/')({
  component: MarketingPage,
  head: () => ({
    meta: [
      { title: 'OmniBook — Automated Scheduling & Client Management for Service Businesses' },
      {
        name: 'description',
        content:
          'OmniBook automates your booking, payments, and client management — so you can focus on your craft. Time-zone aware booking, Stripe payments upfront, and automatic confirmations.',
      },
    ],
  }),
})

function MarketingPage() {
  return (
    <div className="mt-14 page-wrap">
      {/* ============================================================
          HERO SECTION
          Left: headline, subheadline, CTAs, trust badges
          Right: product screenshot with a dark gradient overlay
          ============================================================ */}
      <section className="grid gap-12 grid-cols-1 md:grid-cols-2 items-center ">
        {/* Left column — text content.
            Animates in from the left on page load. */}
        <AnimatedContainer
          type="load"
          containerType="div"
          delay={0.3}
          direction="left"
          className="flex flex-col gap-6"
        >
          {/* Main headline — responsive sizes */}
          <h1 className="text-text-primary text-3xl font-bold md:text-[37px] lg:text-[43px] md:max-w-lg">
            Stop juggling schedules. Start growing your business.
          </h1>

          {/* Subheadline / value proposition */}
          <p className="text-text-muted text-sm md:max-w-117 leading-relaxed">
            Omnibook automates your booking, payments, and client management —
            so you can focus on your craft. The technical choice for professionals who value precision.
          </p>

          {/* CTA buttons — primary (signup) and secondary (demo) */}
          <div className="flex gap-4 items-center mt-2 md:flex-wrap lg:flex-nowrap">
            <AnimatedLink
              route="/auth/signup"
              classes="flex items-center rounded-lg bg-accent-primary px-4 py-2 text-sm font-semibold text-white hover:bg-accent-hover
              focus:border-accent-hover active:border-accent-hover shadow-lg shadow-shadow-glow transition-all duration-200"
            >
              Start Free Trial
            </AnimatedLink>
            <AnimatedLink
              route="/"
              classes="flex items-center justify-center gap-1.5 rounded-lg bg-transparent hover:bg-surface border border-default
              hover:bg-surface-elevated focus:border-surface-elevated active:border-surface-elevated px-4 py-2 w-44 text-sm font-semibold shadow-lg shadow-shadow-heavy text-text-secondary transition-all duration-200"
            >
              <PlayIcon className="shrink-0" size={16} /> Show Demo
            </AnimatedLink>
          </div>

          {/* Trust indicators — social proof under the CTAs */}
          <div className="flex gap-6 items-center">
            <div className="flex gap-2 items-center text-text-muted text-xs">
              <Users className="shrink-0" size={14} />
              <p>10k+ users</p>
            </div>
            <div className="flex gap-2 items-center text-text-muted text-xs">
              <Star className="shrink-0 text-accent-primary" size={14} />
              <p>4.9/5 Rating</p>
            </div>
          </div>
        </AnimatedContainer>

        {/* Right column — product screenshot.
            `before:` pseudo-element adds a gradient overlay from the
            bottom up, which makes any text or UI elements over the image
            more readable. */}
        <AnimatedContainer
          type="load"
          containerType="div"
          delay={0.3}
          direction="right"
          className="md:flex md:justify-self-end relative h-60 md:w-85 md:h-90 lg:w-100 lg:h-100 rounded-xl border border-default shadow-2xl shadow-shadow-glow
             before:content-[''] before:rounded-xl before:absolute before:inset-0
             before:bg-linear-to-t before:from-black/60 before:to-transparent
             before:pointer-events-none before:z-10"
        >
          <img
            src={heroImage}
            alt="Hero-Image"
            className="w-full h-full object-cover"
          />
        </AnimatedContainer>
      </section>

      <hr className="text-text-muted w-full h-0.5 mt-18 mb-18" />

      {/* ============================================================
          FEATURES SECTION
          Three cards explaining the core value props.
          ============================================================ */}
      <AnimatedContainer
        type="scroll"
        containerType="section"
        delay={0.3}
        className="flex flex-col gap-16"
      >
        <h2 className="text-text-primary font-bold text-3xl text-center">
          Everything you need to scale
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-center">
          {/* Feature 1 — Time zones.
              Each card animates up on scroll with a staggered delay
              (0.3s, 0.5s, 0.7s) so they appear sequentially. */}
          <AnimatedContainer
            type="load"
            containerType="div"
            delay={0.3}
            direction="up"
            className="rounded-2xl border border-border-default bg-surface-elevated p-8 shadow-lg shadow-light"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent-pending/30">
              <Globe className="h-6 w-6 text-accent-primary" strokeWidth={2} />
            </div>
            <h3 className="mt-6 text-lg font-bold text-text-primary">
              Time-zone aware booking
            </h3>
            <p className="mt-3 text-sm text-text-muted">
              Automatically detect and sync schedules across global time
              zones. No more manual math or missed appointments.
            </p>
            <AnimatedLink
              route="/"
              classes="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-accent-primary hover:text-accent-hover focus:text-accent-hover active:text-accent-hover"
            >
              Learn more <ArrowRight className="h-3.5 w-3.5" />
            </AnimatedLink>
          </AnimatedContainer>

          {/* Feature 2 — Stripe payments */}
          <AnimatedContainer
            type="scroll"
            containerType="div"
            delay={0.5}
            direction="up"
            className="rounded-2xl border border-border-default bg-surface-elevated p-8 shadow-lg shadow-light"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent-pending/30">
              <CreditCard className="h-6 w-6 text-accent-primary" strokeWidth={2} />
            </div>
            <h3 className="mt-6 text-lg font-bold text-text-primary">
              Stripe payments upfront
            </h3>
            <p className="mt-3 text-sm text-text-muted">
              Secure deposits or full payments during booking. Fully
              integrated with Stripe for seamless financial management.
            </p>
            <AnimatedLink
              route="/"
              classes="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-accent-primary hover:text-accent-hover focus:text-accent-hover active:text-accent-hover"
            >
              View pricing <ArrowRight className="h-3.5 w-3.5" />
            </AnimatedLink>
          </AnimatedContainer>

          {/* Feature 3 — Automatic confirmations */}
          <AnimatedContainer
            type="scroll"
            containerType="div"
            delay={0.7}
            direction="up"
            className="rounded-2xl border border-border-default bg-surface-elevated p-8 shadow-lg shadow-light"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent-pending/30">
              <Bell className="h-6 w-6 text-accent-primary" strokeWidth={2} />
            </div>
            <h3 className="mt-6 text-lg font-bold text-text-primary">
              Automatic confirmations
            </h3>
            <p className="mt-3 text-sm text-text-muted">
              Send instant email and SMS triggers. Keep clients informed and
              reduce no-shows with intelligent reminder flows.
            </p>
            <AnimatedLink
              route="/"
              classes="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-accent-primary hover:text-accent-hover focus:text-accent-hover active:text-accent-hover"
            >
              Explore API <ArrowRight className="h-3.5 w-3.5" />
            </AnimatedLink>
          </AnimatedContainer>
        </div>
      </AnimatedContainer>

      <hr className="text-text-muted w-full h-0.5 mt-18 mb-18" />

      {/* ============================================================
          HOW IT WORKS SECTION
          Three numbered steps explaining the user flow.
          ============================================================ */}
      <AnimatedContainer
        type="scroll"
        containerType="section"
        delay={0.3}
        direction="up"
        className="page-wrap"
      >
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold text-text-primary lg:text-4xl">
            How it works
          </h2>
          <p className="mt-4 text-lg text-text-muted">
            Get booked in three simple steps.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* Step 1 — Connect calendar.
              Each step has a numbered circle, an icon, a title, and a
              short description. Staggered delays for sequential reveal. */}
          <AnimatedContainer
            type="scroll"
            containerType="div"
            delay={0.3}
            direction="up"
            className="text-center"
          >
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-accent-primary text-lg font-bold text-white">
              1
            </div>
            <div className="mt-6 flex justify-center">
              <Calendar className="h-8 w-8 text-accent-primary shrink-0" strokeWidth={1.5} />
            </div>
            <h3 className="mt-4 text-lg font-bold text-text-primary">
              Connect your calendar
            </h3>
            <p className="mt-2 text-sm text-text-muted">
              Sync your existing schedule and set your availability in minutes.
            </p>
          </AnimatedContainer>

          {/* Step 2 — Share booking link */}
          <AnimatedContainer
            type="scroll"
            containerType="div"
            delay={0.5}
            direction="up"
            className="text-center"
          >
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-accent-primary text-lg font-bold text-white">
              2
            </div>
            <div className="mt-6 flex justify-center">
              <LinkIcon className="h-8 w-8 text-accent-primary shrink-0" strokeWidth={1.5} />
            </div>
            <h3 className="mt-4 text-lg font-bold text-text-primary">
              Share your booking link
            </h3>
            <p className="mt-2 text-sm text-text-muted">
              Send clients a link to your branded booking page.
            </p>
          </AnimatedContainer>

          {/* Step 3 — Get paid */}
          <AnimatedContainer
            type="scroll"
            containerType="div"
            delay={0.7}
            direction="up"
            className="text-center"
          >
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-accent-primary text-lg font-bold text-white">
              3
            </div>
            <div className="mt-6 flex justify-center">
              <CreditCard className="h-8 w-8 text-accent-primary shrink-0" strokeWidth={1.5} />
            </div>
            <h3 className="mt-4 text-lg font-bold text-text-primary">
              Get paid automatically
            </h3>
            <p className="mt-2 text-sm text-text-muted">
              Clients book, pay via Stripe, and receive instant confirmation.
            </p>
          </AnimatedContainer>
        </div>
      </AnimatedContainer>

      <hr className="text-text-muted w-full h-0.5 mt-18 mb-18" />

      {/* ============================================================
          TESTIMONIALS SECTION
          Horizontal scrolling carousel of 3 testimonials.
          Scrollbar hidden via `.scrollbar-hide` utility.
          ============================================================ */}
      <AnimatedContainer
        type="scroll"
        containerType="section"
        delay={0.3}
        direction="up"
        className="page-wrap"
      >
        <h2 className="text-3xl font-bold text-text-primary lg:text-4xl text-center mb-16">
          What Our Clients Say
        </h2>

        <div className="flex gap-3 overflow-x-scroll scrollbar-hide px-2 py-6 border-y border-y-border-default rounded-lg">
          {/* Testimonial 1 — Marcus Thorne */}
          <div className="max-w-[320px] md:max-w-120 lg:max-w-125 shrink-0
          text-center p-4 rounded-xl bg-surface-elevated border border-border-default
           shadow-lg shadow-light">
            <blockquote className="text-sm md:text-[16px] font-medium leading-relaxed text-text-primary">
              "OmniBook has completely transformed how we handle our consulting
              pipeline. We've seen a 40% reduction in admin overhead in just
              three months."
            </blockquote>

            <div className="mt-6 flex gap-3 items-center justify-center">
              {/* Avatar — scales up on tablet+ */}
              <div className="h-8 w-8 md:h-16 md:w-16 overflow-hidden rounded-full bg-surface">
                <img
                  src="/testimonial-marcus.jpg"
                  alt="Marcus Thorne"
                  loading="lazy"
                  decoding="async"
                  width={8}
                  height={8}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="flex flex-col">
                <p className="font-bold text-text-primary text-sm">Marcus Thorne</p>
                <p className="text-xs text-text-muted">
                  Managing Partner, Stratos Global
                </p>
              </div>
            </div>
          </div>

          {/* Testimonial 2 — Amara Okafor */}
          <div className="max-w-[320px] md:max-w-120 lg:max-w-125 shrink-0
          text-center p-4 rounded-xl bg-surface-elevated border border-border-default
           shadow-lg shadow-light">
            <blockquote className="text-sm md:text-[16px] font-medium leading-relaxed text-text-primary">
              "I used to spend hours every week going back and forth with clients
              over email. Now they just book, pay, and show up. It's changed
              how I run my practice."
            </blockquote>

            <div className="mt-6 flex gap-3 items-center justify-center">
              <div className="h-8 w-8 md:h-16 md:w-16 overflow-hidden rounded-full bg-surface">
                <img
                  src="/testimonial-amara.jpg"
                  alt="Amara Okafor"
                  loading="lazy"
                  decoding="async"
                  width={8}
                  height={8}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="flex flex-col">
                <p className="font-bold text-text-primary text-sm">Amara Okafor</p>
                <p className="text-xs text-text-muted">
                  Founder, Okafor Wellness Studio
                </p>
              </div>
            </div>
          </div>

          {/* Testimonial 3 — David Chen */}
          <div className="max-w-[320px] md:max-w-120 lg:max-w-125 shrink-0
          text-center p-4 rounded-xl bg-surface-elevated border border-border-default
           shadow-lg shadow-light">
            <blockquote className="text-sm md:text-[16px] font-medium leading-relaxed text-text-primary">
              "As a solo consultant, no-shows used to cost me thousands every
              month. Since switching to OmniBook and requiring payment upfront,
              I haven't had a single one."
            </blockquote>

            <div className="mt-6 flex gap-3 items-center justify-center">
              <div className="h-8 w-8 md:h-16 md:w-16 overflow-hidden rounded-full bg-surface">
                <img
                  src="/testimonial-david.jpg"
                  alt="David Chen"
                  loading="lazy"
                  decoding="async"
                  width={8}
                  height={8}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="flex flex-col">
                <p className="font-bold text-text-primary text-sm">David Chen</p>
                <p className="text-xs text-text-muted">
                  Independent Business Consultant
                </p>
              </div>
            </div>
          </div>
        </div>
      </AnimatedContainer>

      <hr className="text-text-muted w-full h-0.5 mt-18 mb-18" />

      {/* ============================================================
          FINAL CTA SECTION
          Last push toward signup before the footer.
          ============================================================ */}
      <AnimatedContainer
        type="scroll"
        containerType="section"
        delay={0.3}
        direction="up"
        className="border border-border-default bg-surface-elevated rounded-xl p-6"
      >
        <div className="page-wrap mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold text-text-primary lg:text-4xl">
            Ready to reclaim your time?
          </h2>
          <p className="mt-4 text-[16px] md:text-lg text-text-muted">
            Join 10,000+ businesses worldwide using OmniBook to scale their
            operations with technical precision.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {/* Primary CTA — solid indigo */}
            <AnimatedLink
              route="/auth/signup"
              classes="flex items-center gap-1.5 rounded-lg bg-accent-primary px-4 py-2 text-sm hover:bg-accent-hover focus:border-accent-hover active:border-accent-hover
              font-semibold text-white transition-colors shadow-lg shadow-shadow-glow"
            >
              Get Started for Free
              <ArrowRight className="h-4 w-4" />
            </AnimatedLink>

            {/* Secondary CTA — outlined */}
            <AnimatedLink
              route="/"
              classes="inline-flex items-center gap-2 rounded-lg border border-border-default bg-background hover:bg-surface focus:border-surface active:border-surface
               px-6 py-2 text-sm font-semibold text-text-primary transition-colors shadow-lg shadow-shadow-heavy"
            >
              Talk to Sales
            </AnimatedLink>
          </div>
        </div>
      </AnimatedContainer>
    </div>
  )
}