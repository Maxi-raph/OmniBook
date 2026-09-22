import OnboardingStep1 from '#/components/OnboardingStep1'
import { createFileRoute, Outlet, useMatchRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_onboarding/onboarding')({
  component: onboardingParent,
  head: () => ({
  meta: [
    { title: 'Business Info — OmniBook' },
      {
        name: 'description',
        content:
          'Add your business name, tagline, logo, and booking link to personalize your OmniBook booking page.',
      },
    ],
  })
})

function onboardingParent() {

  const matchRoute = useMatchRoute()
  const isChildActive = 
    matchRoute({ to: '/onboarding/availability', fuzzy: true }) ||
    matchRoute({ to: '/onboarding/services', fuzzy: true })

  if (isChildActive) {
    return <Outlet />
  }
  
  return <OnboardingStep1 />
}
