import Footer from '#/components/Footer'
import { createFileRoute, Outlet, useLocation } from '@tanstack/react-router'
import { Check } from 'lucide-react'

/**
 * Layout for the onboarding flow.
 *
 * Wraps all three onboarding steps with:
 *   - A progress bar (desktop + mobile variants)
 *   - The current step's content (via <Outlet />)
 *   - Help links and trust indicators at the bottom
 *   - The shared site footer
 *
 * The `useOnboarding` provider is NOT here. It's wrapped around this layout
 * by the parent route. This file only handles the visual chrome.
 */
export const Route = createFileRoute('/_onboarding')({
  component: OnboardingLayout,
})

function OnboardingLayout() {
  // Read the current URL to determine which step is active.
  // The progress bar highlights the active step based on this.
  const location = useLocation()

  return (
    <div className="py-8 page-wrap">
      {/* ============================================================
          DESKTOP PROGRESS BAR
          Hidden on mobile. Shows: 1 — Business info — 2 — Availability — 3 — Services
          The active step is highlighted with an indigo circle and bold text.
          ============================================================ */}
      <div className="flex justify-center items-center gap-3 max-w-4xl mx-auto">
        {/* Step 1 circle — filled indigo when on /onboarding */}
        <div
          className={`hidden md:flex justify-center items-center w-8 h-8 rounded-full p-1 border border-text-muted
            ${location.pathname === '/onboarding' ? 'bg-accent-hover text-surface-elevated' : ''}`}
        >
          <h2 className="font-bold text-sm">1</h2>
        </div>
        {/* Step 1 label — darker when active */}
        <p
          className={`hidden md:block text-sm font-semibold ${
            location.pathname === '/onboarding' ? 'text-text-primary' : 'text-text-muted'
          }`}
        >
          Business info
        </p>

        {/* Connector line between step 1 and step 2 */}
        <hr className="hidden md:block text-text-muted w-11 md:w-30 h-0.5" />

        {/* Step 2 circle — filled indigo when on /onboarding/availability */}
        <div
          className={`hidden md:flex justify-center items-center w-8 h-8 rounded-full p-1 border border-text-muted
            ${location.pathname === '/onboarding/availability' ? 'bg-accent-hover text-surface-elevated' : ''}`}
        >
          <h2 className="font-bold text-sm">2</h2>
        </div>
        <p
          className={`hidden md:block text-sm font-semibold ${
            location.pathname === '/onboarding/availability' ? 'text-text-primary' : 'text-text-muted'
          }`}
        >
          Availability
        </p>

        {/* Connector line between step 2 and step 3 */}
        <hr className="hidden md:block text-text-muted w-11 md:w-30 h-0.5" />

        {/* Step 3 circle — filled indigo when on /onboarding/services */}
        <div
          className={`hidden md:flex justify-center items-center w-8 h-8 rounded-full p-1 border border-text-muted
            ${location.pathname === '/onboarding/services' ? 'bg-accent-hover text-surface-elevated' : ''}`}
        >
          <h2 className="font-bold text-sm">3</h2>
        </div>
        <p
          className={`hidden md:block text-sm font-semibold ${
            location.pathname === '/onboarding/services' ? 'text-text-primary' : 'text-text-muted'
          }`}
        >
          Services
        </p>
      </div>

      {/* ============================================================
          MOBILE PROGRESS BAR
          Hidden on desktop. Shows only the current step as a single row.
          Three separate blocks (one per step) — only the matching one is visible.
          ============================================================ */}
      <div>
        {/* Step 1 indicator — only visible on /onboarding (mobile) */}
        <div
          className={`mt-6 items-center justify-center gap-3 ${
            location.pathname === '/onboarding' ? 'flex' : 'hidden'
          }`}
        >
          <hr className="block md:hidden text-text-muted w-32 h-0.5" />
          <div
            className={`flex md:hidden justify-center items-center w-8 h-8 rounded-full p-1 border border-text-muted
              ${location.pathname === '/onboarding' ? 'bg-accent-hover text-surface-elevated' : ''}`}
          >
            <h2 className="font-bold text-sm">1</h2>
          </div>
          <p
            className={`block md:hidden text-sm font-semibold ${
              location.pathname === '/onboarding' ? 'text-text-primary' : 'text-text-muted'
            }`}
          >
            Business Info
          </p>
          <hr className="block md:hidden text-text-muted w-32 md:w-30 h-0.5" />
        </div>

        {/* Step 2 indicator — only visible on /onboarding/availability (mobile) */}
        <div
          className={`mt-6 items-center justify-center gap-3 ${
            location.pathname === '/onboarding/availability' ? 'flex' : 'hidden'
          }`}
        >
          <hr className="block md:hidden text-text-muted w-32 h-0.5" />
          <div
            className={`flex md:hidden justify-center items-center w-8 h-8 rounded-full p-1 border border-text-muted
              ${location.pathname === '/onboarding/availability' ? 'bg-accent-hover text-surface-elevated' : ''}`}
          >
            <h2 className="font-bold text-sm">2</h2>
          </div>
          <p
            className={`block md:hidden text-sm font-semibold ${
              location.pathname === '/onboarding/availability' ? 'text-text-primary' : 'text-text-muted'
            }`}
          >
            Availability
          </p>
          <hr className="block md:hidden text-text-muted w-32 md:w-30 h-0.5" />
        </div>

        {/* Step 3 indicator — only visible on /onboarding/services (mobile) */}
        <div
          className={`mt-6 items-center justify-center gap-3 ${
            location.pathname === '/onboarding/services' ? 'flex' : 'hidden'
          }`}
        >
          <hr className="block md:hidden text-text-muted w-32 h-0.5" />
          <div
            className={`flex md:hidden justify-center items-center w-8 h-8 rounded-full p-1 border border-text-muted
              ${location.pathname === '/onboarding/services' ? 'bg-accent-hover text-surface-elevated' : ''}`}
          >
            <h2 className="font-bold text-sm">3</h2>
          </div>
          <p
            className={`block md:hidden text-sm font-semibold ${
              location.pathname === '/onboarding/services' ? 'text-text-primary' : 'text-text-muted'
            }`}
          >
            Services
          </p>
          <hr className="block md:hidden text-text-muted w-32 md:w-30 h-0.5" />
        </div>
      </div>

      {/* ============================================================
          CURRENT STEP CONTENT
          TanStack Router renders the matched child route here
          (Step 1, Step 2, or Step 3, depending on the URL).
          ============================================================ */}
      <div className="px-2 pt-8 min-h-screen">
        <Outlet />
      </div>

      {/* ============================================================
          HELP LINKS + TRUST INDICATORS
          Shown at the bottom of every onboarding step.
          ============================================================ */}
      <div className="max-w-4xl mx-auto text-center mt-14">
        <p className="text-xs text-text-muted mb-3">
          Having Trouble?{' '}
          <a href="#" className="text-accent-primary hover:text-accent-hover ml-1 mr-1">
            Contact support
          </a>
          or{' '}
          <a href="#" className="text-accent-primary hover:text-accent-hover ml-1 mr-1">
            Visit help center
          </a>
        </p>
        {/* Trust indicators — reassure the user during setup */}
        <div className="flex gap-4 items-center justify-center">
          <p className="flex gap-2 items-center justify-center text-xs text-text-muted">
            <Check className="shrink-0" size={14} /> Encrypted
          </p>
          <p className="flex gap-2 items-center justify-center text-xs text-text-muted">
            <Check className="shrink-0" size={14} /> Auto-saving
          </p>
        </div>
      </div>

      {/* Shared site footer */}
      <Footer />
    </div>
  )
}