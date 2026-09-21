import AnimatedButton from '#/components/AnimatedButton'
import { createFileRoute, Outlet, useMatchRoute, useNavigate } from '@tanstack/react-router'
import { ArrowRight, Layers, Calendar, Globe, Info, Link, Upload } from 'lucide-react'

export const Route = createFileRoute('/_onboarding/onboarding')({
  component: onboardingPage,
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

function onboardingPage() {
  const navigate = useNavigate()
  const matchRoute = useMatchRoute()
  const isChildActive = 
    matchRoute({ to: '/onboarding/availability', fuzzy: true }) ||
    matchRoute({ to: '/onboarding/services', fuzzy: true })

  if (isChildActive) {
    return <Outlet />
  }
  
  return(
    <div className='pt-6'>
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold text-text-primary lg:text-4xl">
          Tell us about your business
        </h2>
        <p className="mt-4 text-lg text-text-muted">
          Let's customize your profile to match your professional brand.
        </p>
      </div>
      <div className="bg-surface-elevated max-w-4xl mx-auto mt-6 rounded-xl shadow-lg shadow-shadow-heavy py-6">
        <h3 className="text-xl px-6 font-bold">Profile Details</h3>
        <p className="text-sm px-6 mt 2 text-text-muted">These details will be visible on your public booking page</p>
        <hr className="text-text-muted w-full h-0.5 mt-4 mb-6" />
        <p className="text-xs font-semibold px-6">Upload your logo</p>
        <div className="flex flex-wrap px-6 gap-6 mt-2">
          <div className="w-20 h-20  text-text-muted text-xs rounded-lg flex flex-col 
          border border-text-muted gap-2 items-center justify-center bg-surface">
            <Upload className='shrink-0' size={14}/>
            <p>Empty</p>
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-xs text-text-muted">
              Recommended size: 512px by 512px, SVG,PNG or JPEG. Max size 2MB.
            </p>
            <AnimatedButton
            func={()=>null}
            classes='border border-text-muted py-1 px-2 rounded-lg cursor-pointer
            text-xs font-semibold w-fit bg-surface'
            >Choose File</AnimatedButton>
          </div>
        </div>
        <div className="flex flex-col px-6 gap-2 mt-6">
          <label className="font-bold">Professional Tagline</label>
          <input type="text" className="w-full h-11 px-4 rounded-xl border border-text-muted placeholder:text-text-muted placeholder:text-sm" 
          placeholder='e.g. Executive Career Coach for Tech Professionals'/>
          <p className="text-xs text-text-muted">Keep it short and respectful. It appears under your name.</p>
        </div>
        <div className="flex flex-col px-6 gap-2 mt-6">
          <label className="font-bold">Your booking link</label>
          <AnimatedButton
            func={()=>null}
            classes="w-full h-11 flex justify-between items-center cursor-pointer rounded-xl bg-surface border 
            border-text-muted text-text-muted px-3 py-2 bg-surface">
            <div className="flex gap-2 items-center">
              <Globe className='shrink-0' size={14}/>
              <span className="text-sm">omnibook.com/slug</span>
            </div>
            <Link className='shrink-0' size={14}/>
          </AnimatedButton>
          <p className="text-xs text-text-muted flex items-center gap-1"><Info className='shrink-0 text-accent-hover' size={16}/> This link is unique to you. You can share this directly with clients once you finish setup.</p>
        </div>
      </div>
      <div className="mt-8 max-w-4xl mx-auto flex items-center justify-end">
        <AnimatedButton
        func={()=>null}
        classes='hidden font-semibold text-sm justify-center items-center bg-surface-elevated px-6 py-2 rounded-xl cursor-pointer'
        >Back</AnimatedButton>
        <AnimatedButton
        func={()=>navigate({to:'/onboarding/availability'})}
        classes='bg-accent-hover text-surface font-semibold text-sm flex justify-center items-center px-4 py-2 gap-2 rounded-xl cursor-pointer'
        >Next Step <ArrowRight className='shrink-0' size={14}/></AnimatedButton>
      </div>
      <hr className="text-text-muted max-w-4xl mx-auto h-0.5 mt-6 mb-6" />
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
    </div>
  )
}
