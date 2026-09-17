import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_marketing/signup')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_marketing/signup"!</div>
}
