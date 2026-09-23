import { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from '#/lib/supabase'
import { getCurrentUser } from '#/lib/auth'
import { useNavigate } from '@tanstack/react-router'

// ============================================
// TYPES
// ============================================

// A single day's availability. Mirrors the `availability` table in Supabase,
// but uses human-readable day names and boolean flags for rendering.
export type OnboardingDay = {
  day: string
  isOpen: boolean
  startTime: string
  endTime: string
}

// A single service the business offers. Mirrors the `services` table.
// `priceCents` stores the price as an integer to avoid floating-point issues.
export type OnboardingService = {
  name: string
  durationMinutes: number
  priceCents: number
  description: string
  id: string
}

// Everything the onboarding wizard collects across all three steps.
// This is the full shape of the context's state.
export type OnboardingData = {
  // Step 1 — Business info
  logoFile: File | null
  tagline: string
  slug: string

  // Step 2 — Availability
  days: OnboardingDay[]
  timezone: string

  // Step 3 — Services (at least one)
  services: OnboardingService[]
}

// ============================================
// DEFAULTS
// ============================================

// Default working hours: weekdays 9–5, weekends closed.
// Used as the starting state until the user changes them in Step 2.
const DEFAULT_DAYS: OnboardingDay[] = [
  { day: 'Monday',    isOpen: true,  startTime: '09:00', endTime: '17:00' },
  { day: 'Tuesday',   isOpen: true,  startTime: '09:00', endTime: '17:00' },
  { day: 'Wednesday', isOpen: true,  startTime: '09:00', endTime: '17:00' },
  { day: 'Thursday',  isOpen: true,  startTime: '09:00', endTime: '17:00' },
  { day: 'Friday',    isOpen: true,  startTime: '09:00', endTime: '17:00' },
  { day: 'Saturday',  isOpen: false, startTime: '09:00', endTime: '17:00' },
  { day: 'Sunday',    isOpen: false, startTime: '09:00', endTime: '17:00' },
]

// Factory for a blank service. Called when the user adds a new service,
// and to seed the initial one in INITIAL_DATA. Using a function (not a
// constant) ensures each service is a distinct object — mutating one won't
// affect others.
function createEmptyService(): OnboardingService {
  return {
    name: '',
    durationMinutes: 60,
    priceCents: 0,
    description: '',
    id: crypto.randomUUID(), 
  }
}

// The full initial state. Used when the provider first mounts,
// and when `reset()` is called after onboarding completes.
const INITIAL_DATA: OnboardingData = {
  logoFile: null,
  tagline: '',
  slug: '',
  days: DEFAULT_DAYS,
  timezone: 'UTC',
  services: [createEmptyService()],
}

// ============================================
// CONTEXT
// ============================================

// What the context exposes to consumers.
type OnboardingContextValue = {
  data: OnboardingData
  // `setData` accepts a functional updater to safely merge partial changes.
  // Callers must pass `(prev) => ({ ...prev, field: value })`.
  setData: (updater: (prev: OnboardingData) => OnboardingData) => void
  reset: () => void
  loading: boolean

  // Service helpers — avoid repetitive array-mapping in components.
  addService: () => void
  updateService: <K extends keyof OnboardingService>(
    index: number,
    field: K,
    value: OnboardingService[K]
  ) => void
  removeService: (index: number) => void
}

const OnboardingContext = createContext<OnboardingContextValue | null>(null)

// ============================================
// PROVIDER
// ============================================

export function OnboardingProvider({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate()
  // The full onboarding state. Everything the user enters lives here.
  const [data, setDataState] = useState<OnboardingData>(INITIAL_DATA)

  // True while we're fetching the user's org from Supabase on mount.
  // The layout uses this to show a loading screen instead of rendering
  // steps with empty data.
  const [loading, setLoading] = useState(true)

  // On mount, fetch the user's org to seed the slug, tagline, and timezone.
  // These were created during signup, so they already exist in the database.
  useEffect(() => {
    async function loadOrg() {
      const user = await getCurrentUser()

      // Fetch only the fields we need to seed the context.
      // The user's org is joined via the `users` table.
      const { data: userRow, error } = await supabase
        .from('users')
        .select('organizations(slug, tagline, timezone)')
        .eq('id', user?.id)
        .single()

      if (error || !userRow) {
        // No org found — bail without seeding. The route guard will
        // redirect unauthenticated users away from onboarding.
        setLoading(false)
        return
      }

      // Supabase returns the joined relation as either an array or an
      // object depending on relationship type. Normalize to a single object.
      const org = Array.isArray(userRow.organizations)
        ? userRow.organizations[0]
        : userRow.organizations

      // Seed the context with the org's existing data.
      setDataState((prev) => ({
        ...prev,
        slug: org?.slug ?? '',
        tagline: org?.tagline ?? '',
        timezone: org?.timezone ?? 'UTC',
      }))

      setLoading(false)
    }

    loadOrg()
  }, [])

  // Wrapper that forces the functional-update form.
  // Callers must pass `(prev) => ({ ...prev, field: value })`.
  // This prevents stale-state bugs when multiple updates fire in the
  // same tick (e.g., fast typing + a file upload).
  function setData(updater: (prev: OnboardingData) => OnboardingData) {
    setDataState(updater)
  }

  // Reset back to initial state. Called after successful save.
  // NOTE: the useNavigate call below is a bug — hooks can't be called
  // inside a regular function. See the note at the end.
  function reset() {
    setDataState(INITIAL_DATA)
    navigate({ to: '/onboarding' })
  }

  // ---- Service helpers ----

  // Append a new empty service to the array. Used by the "Add another
  // service" button on Step 3.
  function addService() {
    setDataState((prev) => ({
      ...prev,
      services: [...prev.services, createEmptyService()],
    }))
  }

  // Update a single field on a single service, identified by index.
  // The generic `K` ensures the value type matches the field type
  // (e.g., 'name' must be a string, 'priceCents' must be a number).
  function updateService<K extends keyof OnboardingService>(
    index: number,
    field: K,
    value: OnboardingService[K]
  ) {
    setDataState((prev) => ({
      ...prev,
      services: prev.services.map((s, i) =>
        i === index ? { ...s, [field]: value } : s
      ),
    }))
  }

  // Remove a service by index. If the user removes the last remaining
  // service, reset to a single empty one instead — the array must never
  // be empty, since the UI and Step 3 validation expect at least one.
  function removeService(index: number) {
    setDataState((prev) => ({
      ...prev,
      services:
        prev.services.length > 1
          ? prev.services.filter((_, i) => i !== index)
          : [createEmptyService()],
    }))
  }

  return (
    <OnboardingContext.Provider
      value={{
        data,
        setData,
        reset,
        loading,
        addService,
        updateService,
        removeService,
      }}
    >
      {children}
    </OnboardingContext.Provider>
  )
}

// ============================================
// HOOK
// ============================================

// Consumer hook. Throws if used outside the provider, which catches
// the common mistake of forgetting to wrap the component tree.
export function useOnboarding() {
  const ctx = useContext(OnboardingContext)
  if (!ctx) {
    throw new Error('useOnboarding must be used inside <OnboardingProvider>')
  }
  return ctx
}