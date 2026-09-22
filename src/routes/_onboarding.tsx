import Footer from '#/components/Footer'
import { createFileRoute, Outlet, useLocation } from '@tanstack/react-router'
import { Calendar, Layers, Check } from 'lucide-react'

export const Route = createFileRoute('/_onboarding')({
  component: RouteComponent,
})

function RouteComponent() {
    const location = useLocation()
  return(
    <div className='py-8 page-wrap'>
        {/* Desktop Progress Bar*/}
        <div className="flex justify-center items-center gap-3 max-w-4xl mx-auto">
            <div className={`hidden md:flex justify-center items-center w-8 h-8 rounded-full p-1 border border-text-muted 
                ${location.pathname === '/onboarding' ? 'bg-accent-hover text-surface-elevated' : ''}`}>
                <h2 className="font-bold text-sm">1</h2>
            </div>
            <p className={`hidden md:block text-sm font-semibold ${location.pathname === '/onboarding' ? 'text-text-primary' : 'text-text-muted'}`}>Business info</p>
            <hr className="hidden md:block text-text-muted w-11 md:w-30 h-0.5" />
            <div className={`hidden md:flex justify-center items-center w-8 h-8 rounded-full p-1 border border-text-muted
                ${location.pathname === '/onboarding/availability' ? 'bg-accent-hover text-surface-elevated' : ''}`}>
                <h2 className="font-bold text-sm">2</h2>
            </div>
            <p className={`hidden md:block text-sm font-semibold ${location.pathname === '/onboarding/availability' ? 'text-text-primary' : 'text-text-muted'}`}>Availability</p>
            <hr className="hidden md:block text-text-muted w-11 md:w-30 h-0.5" />
            <div className={`hidden md:flex justify-center items-center w-8 h-8 rounded-full p-1 border border-text-muted
                ${location.pathname === '/onboarding/services' ? ' bg-accent-hover text-surface-elevated' : ''}`}>
                <h2 className="font-bold text-sm">3</h2>
            </div>
            <p className={`hidden md:block text-sm font-semibold ${location.pathname === '/onboarding/services' ? 'text-text-primary' : 'text-text-muted'}`}>Services</p>
        </div>
        {/* Mobile Progress Bar*/}
        <div>
            <div className={`mt-6 items-center justify-center gap-3 ${location.pathname === '/onboarding' ? 'flex' : 'hidden'}`}>
                <hr className="block md:hidden text-text-muted w-32 h-0.5" />
                <div className={`flex md:hidden justify-center items-center w-8 h-8 rounded-full p-1 border border-text-muted 
                    ${location.pathname === '/onboarding' ? 'bg-accent-hover text-surface-elevated' : ''}`}>
                    <h2 className="font-bold text-sm">1</h2>
                </div>
                <p className={`block md:hidden text-sm font-semibold ${location.pathname === '/onboarding' ? 'text-text-primary' : 'text-text-muted'}`}>Business Info</p>
                <hr className="block md:hidden text-text-muted w-32 md:w-30 h-0.5" />
            </div>
            <div className={`mt-6 items-center justify-center gap-3 ${location.pathname === '/onboarding/availability' ? 'flex' : 'hidden'}`}>
                <hr className="block md:hidden text-text-muted w-32 h-0.5" />
                <div className={`flex md:hidden justify-center items-center w-8 h-8 rounded-full p-1 border border-text-muted 
                    ${location.pathname === '/onboarding/availability' ? 'bg-accent-hover text-surface-elevated' : ''}`}>
                    <h2 className="font-bold text-sm">2</h2>
                </div>
                <p className={`block md:hidden text-sm font-semibold ${location.pathname === '/onboarding/availability' ? 'text-text-primary' : 'text-text-muted'}`}>Availability</p>
                <hr className="block md:hidden text-text-muted w-32 md:w-30 h-0.5" />
            </div>
            <div className={`mt-6 items-center justify-center gap-3 ${location.pathname === '/onboarding/services' ? 'flex' : 'hidden'}`}>
                <hr className="block md:hidden text-text-muted w-32 h-0.5" />
                <div className={`flex md:hidden justify-center items-center w-8 h-8 rounded-full p-1 border border-text-muted 
                    ${location.pathname === '/onboarding/services' ? 'bg-accent-hover text-surface-elevated' : ''}`}>
                    <h2 className="font-bold text-sm">3</h2>
                </div>
                <p className={`block md:hidden text-sm font-semibold ${location.pathname === '/onboarding/services' ? 'text-text-primary' : 'text-text-muted'}`}>Services</p>
                <hr className="block md:hidden text-text-muted w-32 md:w-30 h-0.5" />
            </div>
        </div>
        <div className="page-wrap py-8 min-h-screen">
            <Outlet />
        </div>
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-surface-elevated flex gap-3 p-6 rounded-xl border border-border-default">
            <Calendar className='shrink-0 mt-1 text-accent-hover'  size={16} />
            <div className="flex flex-col gap-2">
                <h3 className="font-semibold">Calendar Sync</h3>
                <p className="text-xs text-text-muted">In the next step, you'll be able to 
                connect Google or Outlook calendars.
                </p>
            </div>
            </div>
            <div className="bg-surface-elevated flex gap-3 p-6 rounded-xl border border-border-default">
            <Layers className='shrink-0 mt-1 text-accent-hover'  size={16} />
            <div className="flex flex-col gap-2">
                <h3 className="font-semibold">Brand Consistency</h3>
                <p className="text-xs text-text-muted">Your logo and colors will be reflected on your public booking page.
                </p>
            </div>
            </div>
        </div>
        <div className="max-w-4xl mx-auto text-center mt-14">
            <p className="text-xs text-text-muted mb-3">Having Trouble? <a href="#" className='text-accent-primary hover:text-accent-hover ml-1 mr-1'>Contact support</a>or 
            <a href="#" className='text-accent-primary hover:text-accent-hover ml-1 mr-1'>Visit help center</a></p>
            <div className="flex gap-4 items-center justify-center">
            <p className="flex gap-2 items-center justify-center text-xs text-text-muted"><Check className='shrink-0' size={14}/> Encrypted</p>
            <p className="flex gap-2 items-center justify-center text-xs text-text-muted"><Check className='shrink-0' size={14}/> Auto-saving</p>
            </div>
        </div>
        <Footer />
    </div>
  )
}
