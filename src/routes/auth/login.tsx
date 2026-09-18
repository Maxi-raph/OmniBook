import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/auth/login')({
  component: RouteComponent,
  head: () => ({
    meta: [
      { title: 'Log In — OmniBook' },
      { name: 'description', 
        content: 'Log in to your OmniBook account to manage your bookings, availability, services, and client payments.' },
    ]
  })
})

function RouteComponent() {
  return <div>Hello "/auth/login"!</div>
}
