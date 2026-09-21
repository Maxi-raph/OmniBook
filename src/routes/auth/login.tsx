import AnimatedButton from '#/components/AnimatedButton'
import AnimatedLink from '#/components/AnimatedLink'
import { signIn } from '#/lib/auth'
import { loginSchema } from '#/lib/zodValidation'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { Shield, BookOpen, ArrowRight } from 'lucide-react'
import { useState } from 'react'

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
  const [formData, setFormData] = useState({email:'', password:''})
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({})

  const handleSubmit = async (e:React.SyntheticEvent)=>{
    e.preventDefault()
    setError(null)
    setFieldErrors({})

    // Validate
    const result = loginSchema.safeParse(formData)
    if (!result.success) {
      const errors: Record<string, string> = {}
      result.error.issues.forEach((err) => {
        const field = err.path[0] as string
        if (!errors[field]) errors[field] = err.message
      })
      setFieldErrors(errors)
      return
    }

    // Sign in
    setLoading(true)
    try {
      const result = await signIn(formData)
      navigate({ to: result.nextRoute })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Invalid email or password')
    } finally {
      setLoading(false)
    }
  }
  return(
      <div className='block page-wrap pt-8 pb-8 px-3'>
        <span className="mx-auto w-fit flex justify-center items-center gap-1 py-1 px-3 bg-accent-text/20 border border-accent-hover text-sm text-accent-text rounded-xl mb-2">
          <Shield className='shrink-0' size={14}/>
          EnterPrise Grade Security
        </span>
        <h2 className="text-text-primary font-bold text-2xl mb-6 text-center">Log in to Your OmniBook Account</h2>
        <form action="" onSubmit={handleSubmit} className="bg-surface/80 p-8 rounded-xl flex flex-col gap-6 max-w-3xl mx-auto shadow-shadow-light shadow-2xl">
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
            <input type="text" id='email' name='email' value={formData.email} onChange={(e)=> setFormData((prev)=>({...prev, email: e.target.value}))} className={`w-full h-11 border border-border-default rounded-xl px-3 text-text-primary
             placeholder:text-text-muted focus:outline-none focus:ring-2 ${
             fieldErrors.email
              ? 'border-error focus:border-error focus:ring-error/20'
              : 'border-border-default focus:border-accent-primary focus:ring-accent-primary/20'
             }`}/>
             {fieldErrors.email && (
               <p className="mt-1 text-xs text-error">{fieldErrors.email}</p>
              )}
          </div>
          <div className="flex flex-col gap-2">
            <label className='font-bold' htmlFor="password">Password</label>
            <input type="password" id='password' name='password' value={formData.password} onChange={(e)=> setFormData((prev)=>({...prev, password: e.target.value}))} className={`w-full h-11 border border-border-default rounded-xl px-3 text-text-primary
             placeholder:text-text-muted focus:outline-none focus:ring-2 ${
           fieldErrors.password
            ? 'border-error focus:border-error focus:ring-error/20'
            : 'border-border-default focus:border-accent-primary focus:ring-accent-primary/20'
          }`}/>
          {fieldErrors.password && (
                  <p className="mt-1 text-xs text-error">{fieldErrors.password}</p>
                )}
          </div>
          {/* Error */}
          {error && (
            <div className="rounded-lg border border-error/30 bg-error/10 p-3 text-sm text-error">
              {error}
            </div>
          )}
          <AnimatedButton 
           type="submit"
           disabled={loading}
           classes={`flex w-full justify-center items-center h-11 gap-1.5 rounded-lg px-4 py-2 text-sm 
            font-semibold text-white transition-colors shadow-lg shadow-shadow-glow
          ${loading ? 'bg-accent-pending cursor-not-allowed' : 'bg-accent-primary hover:bg-accent-hover cursor-pointer'}`}>
            {loading ? 'Logging In...' : 'Log In'} <ArrowRight className='shrink-0' size={14}/></AnimatedButton>
        </form>
        <p className="text-sm text-text-muted text-center mt-4">New to OmniBook? <AnimatedLink route='/auth/signup' classes='text-accent-text ml-0.5'>Create an account</AnimatedLink></p>
      </div>
    )
}
