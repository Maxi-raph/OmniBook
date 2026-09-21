import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_onboarding/onboarding/availability')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/onboarding/availability"!</div>
}
