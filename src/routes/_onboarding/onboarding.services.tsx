import AnimatedButton from '#/components/AnimatedButton'
import { useOnboarding } from '#/context/OnboardingContext'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { ArrowLeft, ArrowRight, Clock, Plus, Stars, Zap } from 'lucide-react'

/**
 * Step 3 of onboarding — "Services".
 *
 * The user defines the bookable services they offer. At least one service
 * is required (the primary). Additional services can be added dynamically
 * with the "Add another service" button.
 *
 * All services live in OnboardingContext. Clicking "Finish Setup" will
 * eventually save everything (business info + availability + services) to
 * Supabase in one shot, then redirect to the dashboard.
 */
export const Route = createFileRoute('/_onboarding/onboarding/services')({
  component: onboardingServices,
})

function onboardingServices() {
  const navigate = useNavigate()

  // Shared onboarding state and service helpers.
  // `data.services` is the array of services being built.
  const {
    data,
    setData,
    loading,
    addService,
    updateService,
    removeService,
  } = useOnboarding()

  // Navigate back to Step 2 without saving — services are still in context.
  function handleBack() {
    navigate({ to: '/onboarding/availability' })
  }

  // Placeholder submit handler. Later, this will call saveOnboarding(data)
  // to write everything to Supabase, then redirect to /dashboard.
  function handleNext() {
    // Later: save all onboarding data to Supabase
    navigate({ to: '/' })
  }

  return (
    <div className="mx-auto max-w-4xl">
      {/* Heading */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-text-primary">
          Add your first service
        </h1>
        <p className="mt-2 text-sm text-text-muted font-semibold">
          What will clients be able to book with you?
        </p>
      </div>

      {/* Service Card(s) — one card per service in the array.
          Index 0 is styled as the "Primary Service"; the rest are "Other Service".
          Each card has its own inputs, all wired to the shared context. */}
      {data.services.map((service, index) => (
        <div
          key={service.name}
          className="mt-8 rounded-xl border border-border-default bg-surface-elevated shadow-lg shadow-shadow-heavy py-6"
        >
          {/* Card header — service label + star icon */}
          <div className="flex gap-3 justify-between items-center px-6">
            <div className="flex flex-col gap-1">
              <h3 className="text-xl font-bold">
                {index === 0 ? 'Primary Service' : 'Other Service'}
              </h3>
              <p className="flex gap-2 items-center text-sm text-text-muted font-semibold">
                {index === 0
                  ? 'Configure the details for your main booking option'
                  : 'Configure the details for your other booking option'}
              </p>
            </div>
            <Stars className="shrink-0 text-text-muted" size={14} />
          </div>

          {/* Divider between the card header and the service form */}
          <hr className="text-text-muted w-full h-0.5 mt-4 mb-6" />

          {/* Service name — controlled input, writes to context on every keystroke.
              The id uses the index so each card has a unique input id. */}
          <div className="flex flex-col gap-2 px-6 mb-3">
            <label className="font-bold" htmlFor={`serviceName-${index}`}>
              Service Name
            </label>
            <input
              type="text"
              id={`serviceName-${index}`}
              name="serviceName"
              value={service.name}
              onChange={(e) => updateService(index, 'name', e.target.value)}
              className="w-full h-11 px-4 rounded-xl border border-text-muted
                placeholder:text-text-muted placeholder:text-sm
                focus:border-accent-primary focus:outline-none
                focus:ring-2 focus:ring-accent-primary/20
                active:border-accent-primary"
              placeholder="60-min Career Consultation"
            />
          </div>

          {/* Duration + Price — side by side on desktop, stacked on mobile */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-3">
            {/* Duration — select with fixed options.
                Stored as minutes (number) in context. */}
            <div className="flex flex-col gap-2 pl-6 pr-6 md:pr-0">
              <label className="font-bold" htmlFor={`duration-${index}`}>
                Duration
              </label>
              <select
                id={`duration-${index}`}
                name="duration"
                value={service.durationMinutes}
                onChange={(e) =>
                  updateService(index, 'durationMinutes', Number(e.target.value))
                }
                className="w-full h-11 px-4 rounded-xl border border-text-muted
                  placeholder:text-text-muted placeholder:text-sm
                  focus:border-accent-primary focus:outline-none
                  focus:ring-2 focus:ring-accent-primary/20
                  active:border-accent-primary"
              >
                <option value="120">120 min</option>
                <option value="90">90 min</option>
                <option value="60">60 min</option>
                <option value="45">45 min</option>
                <option value="30">30 min</option>
                <option value="15">15 min</option>
              </select>
            </div>

            {/* Price — number input.
                Stored as cents in context. The display shows the raw value
                (not divided by 100), so the user types dollars but the value
                is stored as the same number (e.g., "150" becomes 150 cents). */}
            <div className="flex flex-col gap-2 pr-6 pl-6 md:pl-0">
              <label className="font-bold" htmlFor={`price-${index}`}>
                Price
              </label>
              <input
                type="number"
                id={`price-${index}`}
                name="price"
                value={service.priceCents === 0 ? '' : service.priceCents}
                onChange={(e) =>
                  updateService(index, 'priceCents', parseFloat(e.target.value))
                }
                className="w-full h-11 px-4 rounded-xl border border-text-muted
                  placeholder:text-text-muted placeholder:text-sm
                  focus:border-accent-primary focus:outline-none
                  focus:ring-2 focus:ring-accent-primary/20
                  active:border-accent-primary"
                placeholder="Enter your price"
              />
            </div>
          </div>

          {/* Description — textarea, controlled, writes to context on change */}
          <div className="flex flex-col gap-2 px-6 mb-4">
            <label className="font-bold" htmlFor={`description-${index}`}>
              Description
            </label>
            <textarea
              rows={6}
              id={`description-${index}`}
              name="description"
              value={service.description}
              onChange={(e) =>
                updateService(index, 'description', e.target.value)
              }
              className="w-full p-4 rounded-xl border border-text-muted
                placeholder:text-text-muted placeholder:text-sm
                focus:border-accent-primary focus:outline-none
                focus:ring-2 focus:ring-accent-primary/20
                active:border-accent-primary"
              placeholder="60-min Career Consultation"
            />
            <span className="text-xs text-text-muted">
              A brief summary helps clients choose the right service
            </span>
          </div>

          {/* Remove button — only shown for non-primary services.
              Prevents the user from deleting the last remaining service. */}
          {index !== 0 && (
            <div className="flex justify-end px-6">
              <AnimatedButton
                type="button"
                func={() => removeService(index)}
                classes="flex items-center gap-1.5 rounded-lg bg-error px-5 py-2.5 text-sm font-semibold text-white shadow-lg hover:bg-error/70 cursor-pointer focus:border-error/70 active:border-error/70"
              >
                Remove Service
              </AnimatedButton>
            </div>
          )}
        </div>
      ))}

      {/* Add another service button — appends an empty service to the array */}
      <AnimatedButton
        func={addService}
        classes="w-full mt-6 h-30 rounded-xl border border-dashed border-text-muted py-6 flex flex-col justify-center items-center gap-2 cursor-pointer"
      >
        <div className="p-2 flex justify-center items-center rounded-full bg-border-default">
          <Plus className="shrink-0 text-text-muted" size={16} />
        </div>
        <p className="text-text-muted font-semibold text-sm">
          Add another service
        </p>
      </AnimatedButton>

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
          Finish Setup <ArrowRight size={14} />
        </AnimatedButton>
      </div>

      {/* Divider separating the form from the info cards below */}
      <hr className="text-text-muted max-w-4xl mx-auto h-0.5 mt-14 mb-14" />

      {/* Informational cards — explain features available after onboarding */}
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Card 1 — buffer time feature */}
        <div className="bg-surface-elevated flex gap-3 p-6 rounded-xl border border-border-default">
          <Clock className="shrink-0 mt-1 text-accent-hover" size={16} />
          <div className="flex flex-col gap-2">
            <h3 className="font-semibold">Custom Buffers</h3>
            <p className="text-xs text-text-muted">
              You can add preparation times between sessions in your advanced
              settings.
            </p>
          </div>
        </div>

        {/* Card 2 — Stripe integration feature */}
        <div className="bg-surface-elevated flex gap-3 p-6 rounded-xl border border-border-default">
          <Zap className="shrink-0 mt-1 text-accent-hover" size={16} />
          <div className="flex flex-col gap-2">
            <h3 className="font-semibold">Stripe integration</h3>
            <p className="text-xs text-text-muted">
              Payments are automatically collected upon booking once you connect
              stripe.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}