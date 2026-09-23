import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { ArrowRight, ArrowLeft, Clock, Calendar, Globe } from 'lucide-react'
import AnimatedButton from '@/components/AnimatedButton'
import { useOnboarding } from '#/context/OnboardingContext'

/**
 * Step 2 of onboarding — "Availability".
 *
 * Lets the admin define their weekly working hours. Each day can be
 * toggled on/off, and open days have start/end time pickers. The browser's
 * timezone is auto-detected and shown.
 *
 * Data lives in OnboardingContext, not local state. Toggling a day or
 * changing a time updates the shared context, so the values survive when
 * the user navigates back to this step from Step 3.
 */
export const Route = createFileRoute('/_onboarding/onboarding/availability')({
  head: () => ({
    meta: [
      { title: 'Availability — OmniBook' },
      {
        name: 'description',
        content:
          'Set your weekly working hours and timezone so clients can book your open slots.',
      },
    ],
  }),
  component: onboardingAvailabilityPage,
})

function onboardingAvailabilityPage() {
  const navigate = useNavigate()

  // Shared onboarding state. `days` and `timezone` come from context,
  // set by the provider on mount (seeded with defaults + browser timezone).
  const { data, setData, loading } = useOnboarding()

  // Flip a day between open and closed. When closed, the time pickers
  // are hidden but the start/end values are preserved in state — so
  // toggling back on restores the previous hours.
  function toggleDay(index: number) {
    setData((prev) => ({
      ...prev,
      days: prev.days.map((d, i) =>
        i === index ? { ...d, isOpen: !d.isOpen } : d
      ),
    }))
  }

  // Update either the start or end time for a specific day. Uses a
  // computed key (`[field]`) so one handler serves both inputs.
  function updateTime(
    index: number,
    field: 'startTime' | 'endTime',
    value: string
  ) {
    setData((prev) => ({
      ...prev,
      days: prev.days.map((d, i) =>
        i === index ? { ...d, [field]: value } : d
      ),
    }))
  }

  function handleNext() {
    // No save here — days are already in context. They'll be written
    // to Supabase on the final step (services) when the user hits Finish.
    navigate({ to: '/onboarding/services' })
  }

  function handleBack() {
    navigate({ to: '/onboarding' })
  }

  return (
    <div className="mx-auto max-w-4xl">
      {/* Heading */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-text-primary">
          When are you available?
        </h1>
        <p className="mt-2 text-sm text-text-muted">
          Set your regular working hours. You can add exceptions later.
        </p>
      </div>

      {/* Card with days */}
      <div className="mt-8 rounded-xl border border-border-default bg-surface-elevated shadow-lg shadow-shadow-heavy py-6">
        <div className="flex gap-3 justify-between items-center px-6">
          <h3 className="text-xl font-bold">Weekly Schedule</h3>
          <p className="flex gap-2 items-center text-sm text-accent-primary font-bold">
            <Clock className="shrink-0" size={16} /> Standard Hours
          </p>
        </div>

        {/* Divider between the card header and the day list */}
        <hr className="text-text-muted w-full h-0.5 mt-4 mb-6" />

        <div className="flex flex-col gap-6 px-6 pt-2">
          {/* One row per day. The day's open/closed state controls
              whether the time pickers render. */}
          {data.days.map((d, i) => (
            <div
              key={d.day}
              className="flex flex-col gap-3 border-b border-border-subtle pb-3 last:border-b-0 last:pb-0 md:flex-row md:items-center md:gap-4"
            >
              {/* Day name — fixed width so all rows align vertically */}
              <div className="w-24 shrink-0">
                <span className="text-sm font-medium text-text-primary">
                  {d.day}
                </span>
              </div>

              {/* Time pickers — only rendered when the day is open.
                  Uses native <input type="time"> which gives OS-level
                  time pickers on mobile and desktop. Values are stored
                  as "HH:MM" strings (24-hour format). */}
              {d.isOpen ? (
                <div className="flex flex-1 items-center gap-2">
                  <input
                    type="time"
                    value={d.startTime}
                    onChange={(e) => updateTime(i, 'startTime', e.target.value)}
                    className="h-10 flex-1 rounded-lg border border-border-default bg-background px-3 text-sm text-text-primary focus:border-accent-primary focus:outline-none focus:ring-2 focus:ring-accent-primary/20 active:border-accent-primary"
                  />
                  <span className="text-sm text-text-muted">to</span>
                  <input
                    type="time"
                    value={d.endTime}
                    onChange={(e) => updateTime(i, 'endTime', e.target.value)}
                    className="h-10 flex-1 rounded-lg border border-border-default bg-background px-3 text-sm text-text-primary focus:border-accent-primary focus:outline-none focus:ring-2 focus:ring-accent-primary/20 active:border-accent-primary"
                  />
                </div>
              ) : (
                // Fallback shown when the day is toggled off
                <div className="flex-1">
                  <span className="text-sm text-text-muted">Unavailable</span>
                </div>
              )}

              {/* Toggle switch — custom-styled button, not a native checkbox.
                  aria-pressed communicates the on/off state to screen readers.
                  The dot inside translates when toggled, using a CSS transition. */}
              <button
                type="button"
                onClick={() => toggleDay(i)}
                aria-label={`Toggle ${d.day}`}
                aria-pressed={d.isOpen}
                className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${
                  d.isOpen ? 'bg-accent-primary' : 'bg-border-default'
                }`}
              >
                {/* The sliding dot inside the toggle. Moves right when on. */}
                <span
                  className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white transition-transform ${
                    d.isOpen ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Timezone row — shows the auto-detected browser timezone.
          The value comes from context, set by the provider on mount using
          Intl.DateTimeFormat().resolvedOptions().timeZone.
          "Change" is a placeholder for a future timezone picker. */}
      <div className="mt-6 flex items-center justify-between rounded-lg bg-surface-elevated shadow-lg shadow-shadow-heavy px-6 py-3">
        <div className="flex items-center gap-3">
          <div className="p-2 flex justify-center items-center rounded-full bg-border-default">
            <Globe className="shrink-0 text-accent-hover" size={16} />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-text-muted">
              Time zone
            </span>
            <span className="text-sm font-semibold text-text-primary">
              {data.timezone}
            </span>
          </div>
        </div>
        <AnimatedButton
          type="button"
          func={() => null}
          classes="bg-surface px-4 py-1 flex items-center justify-center border border-text-muted rounded-lg text-sm font-semibold text-accent-primary hover:bg-background focus:bg-background active:bg-background cursor-pointer"
        >
          Change
        </AnimatedButton>
      </div>

      {/* Navigation */}
      <div className="mt-10 flex items-center justify-between">
        <AnimatedButton
          type="button"
          func={handleBack}
          classes="flex items-center gap-1.5 rounded-lg border border-border-default bg-surface px-5 py-2.5 text-sm font-semibold text-text-primary hover:bg-surface-elevated focus:border-surface-elevated active:border-surface-elevated cursor-pointer"
        >
          <ArrowLeft size={14} /> Back
        </AnimatedButton>

        <AnimatedButton
          type="button"
          func={handleNext}
          classes="flex items-center gap-1.5 rounded-lg bg-accent-primary px-5 py-2.5 text-sm font-semibold text-white hover:bg-accent-hover cursor-pointer focus:border-accent-hover active:border-accent-hover"
        >
          Next Step <ArrowRight size={14} />
        </AnimatedButton>
      </div>

      {/* Divider separating the schedule from the info cards below */}
      <hr className="text-text-muted max-w-4xl mx-auto h-0.5 mt-14 mb-14" />

      {/* Informational cards — explain features the user will encounter
          after onboarding is complete. Not interactive. */}
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Card 1 — buffer time explanation */}
        <div className="bg-surface-elevated flex gap-3 p-6 rounded-xl border border-border-default">
          <Calendar className="shrink-0 mt-1 text-accent-hover" size={16} />
          <div className="flex flex-col gap-2">
            <h3 className="font-semibold">Smart Buffers</h3>
            <p className="text-xs text-text-muted">
              We automatically add 15-minute buffers between your back-to-back
              sessions.
            </p>
          </div>
        </div>

        {/* Card 2 — custom hours feature */}
        <div className="bg-surface-elevated flex gap-3 p-6 rounded-xl border border-border-default">
          <Clock className="shrink-0 mt-1 text-accent-hover" size={16} />
          <div className="flex flex-col gap-2">
            <h3 className="font-semibold">Customizable Delays</h3>
            <p className="text-xs text-text-muted">
              You can set different hours for specific dates once you finish the
              wizard.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}