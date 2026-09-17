import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_marketing/login')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_marketing/login"!</div>
}
