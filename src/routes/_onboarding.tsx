import Footer from '#/components/Footer'
import { createFileRoute, Outlet, useLocation } from '@tanstack/react-router'

export const Route = createFileRoute('/_onboarding')({
  component: RouteComponent,
})

function RouteComponent() {
    const location = useLocation()
  return(
    <div className='py-8 page-wrap'>
        <div className="flex justify-center items-center gap-3 max-w-4xl mx-auto">
            <hr className="block md:hidden text-text-muted w-11 h-0.5" />
            <div className={`flex justify-center items-center w-8 h-8 rounded-full p-1 border border-text-muted 
                ${location.pathname === '/onboarding' ? 'bg-accent-hover text-surface-elevated' : ''}`}>
                <h2 className="font-bold text-sm">1</h2>
            </div>
            <p className={`text-sm font-semibold ${location.pathname === '/onboarding' ? 'text-text-primary' : 'text-text-muted'}`}>Business info</p>
            <hr className="text-text-muted w-11 md:w-30 h-0.5" />
            <div className={`flex justify-center items-center w-8 h-8 rounded-full p-1 border border-text-muted
                ${location.pathname === '/onboarding/availability' ? 'bg-accent-hover text-surface-elevated' : ''}`}>
                <h2 className="font-bold text-sm">2</h2>
            </div>
            <p className={`text-sm font-semibold ${location.pathname === '/onboarding/availability' ? 'text-text-primary' : 'text-text-muted'}`}>Availability</p>
            <hr className="text-text-muted w-11 md:w-30 h-0.5" />
            <div className={`hidden md:flex justify-center items-center w-8 h-8 rounded-full p-1 border border-text-muted
                ${location.pathname === '/onboarding/services' ? ' bg-accent-hover text-surface-elevated' : ''}`}>
                <h2 className="font-bold text-sm">3</h2>
            </div>
            <p className={`hidden md:block text-sm font-semibold ${location.pathname === '/onboarding/services' ? 'text-text-primary' : 'text-text-muted'}`}>Services</p>
        </div>
        <div className="mt-6 flex items-center justify-center gap-3">
            <hr className="block md:hidden text-text-muted w-32 h-0.5" />
            <div className={`flex md:hidden justify-center items-center w-8 h-8 rounded-full p-1 border border-text-muted 
                ${location.pathname === '/onboarding/services' ? 'bg-accent-hover text-surface-elevated' : ''}`}>
                <h2 className="font-bold text-sm">3</h2>
            </div>
            <p className={`block md:hidden text-sm font-semibold ${location.pathname === '/onboarding/services' ? 'text-text-primary' : 'text-text-muted'}`}>Services</p>
            <hr className="block md:hidden text-text-muted w-32 md:w-30 h-0.5" />
        </div>
        <div className="page-wrap py-8 min-h-screen">
            <Outlet />
        </div>
        <Footer />
    </div>
  )
}
