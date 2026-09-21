import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_onboarding/onboarding/services')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_onboarding/services"!</div>
}
