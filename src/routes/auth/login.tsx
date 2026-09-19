import AnimatedButton from '#/components/AnimatedButton'
import AnimatedLink from '#/components/AnimatedLink'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { Shield, BookOpen, ArrowRight } from 'lucide-react'

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
  const navigate = useNavigate()
  const handleSubmit = (e:React.SyntheticEvent)=>{
    e.preventDefault()

    navigate({to:'/auth/login'})
  }
  return(
      <div className='block page-wrap pt-8 pb-8 px-6'>
        <span className="mx-auto w-fit flex justify-center items-center gap-1 py-1 px-3 bg-accent-text/20 border border-accent-hover text-sm text-accent-text rounded-xl mb-2">
          <Shield className='shrink-0' size={14}/>
          EnterPrise Grade Security
        </span>
        <h2 className="text-text-primary font-bold text-2xl mb-6 text-center">Log in to Your OmniBook Account</h2>
        <form action="" onSubmit={()=>undefined} className="bg-surface/80 p-8 rounded-xl flex flex-col gap-6 max-w-3xl mx-auto shadow-shadow-light shadow-2xl">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent-hover">
              <BookOpen className="h-4 w-4 text-background" strokeWidth={2.5} />
            </div>
            <div>
            <span className="text-lg font-bold text-text-primary">Omni</span>
            <span className="text-lg font-bold text-accent-primary">Book</span>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <label className='font-bold' htmlFor="email">Email</label>
            <input type="text" id='email' name='email' className='w-full h-11 border border-border-default rounded-xl px-3 text-text-primary
             placeholder:text-text-muted focus:border-accent-primary focus:outline-none focus:ring-2 focus:ring-accent-primary/20'/>
          </div>
          <div className="flex flex-col gap-2">
            <label className='font-bold' htmlFor="password">Password</label>
            <input type="text" id='password' name='password' className='w-full h-11 border border-border-default rounded-xl px-3 text-text-primary
             placeholder:text-text-muted focus:border-accent-primary focus:outline-none focus:ring-2 focus:ring-accent-primary/20'/>
          </div>
          <AnimatedButton 
           type="submit"
           classes='flex w-full justify-center items-center h-11 gap-1.5 rounded-lg bg-accent-primary px-4 py-2 text-sm 
            font-semibold text-white transition-colors hover:bg-accent-hover shadow-lg shadow-shadow-glow cursor-pointer'>
              Log In <ArrowRight className='shrink-0' size={14}/>
          </AnimatedButton>
        </form>
        <p className="text-sm text-text-muted text-center mt-4">New to OmniBook? <AnimatedLink route='/auth/signup' classes='text-accent-text ml-0.5'>Create an account</AnimatedLink></p>
      </div>
    )
}
