import AnimatedButton from '#/components/AnimatedButton'
import AnimatedLink from '#/components/AnimatedLink'
import { signUp } from '#/lib/auth'
import { signupSchema } from '#/lib/zodValidation'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { ArrowRight, BookOpen, Shield } from 'lucide-react'
import { useState } from 'react'

export const Route = createFileRoute('/auth/signup')({
  component: signUpPage,
  head: () => ({
    meta: [
      { title: 'Sign Up — OmniBook' },
      { name: 'description', 
        content: 'Create your free OmniBook account and start accepting bookings, payments, and managing clients in minutes. No credit card required.' },
    ]
  })
})

function signUpPage() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [formData, setFormData] = useState({fullName:'',email:'', password:'',businessName:''})
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({})

  const handleSubmit = async (e:React.SyntheticEvent)=>{
    e.preventDefault()
    setError(null)

    // Validate with Zod
  const result = signupSchema.safeParse(formData)

  if (!result.success) {
    const errors: Record<string, string> = {}
    result.error.issues.forEach((err) => {
      const field = err.path[0] as string
      if (!errors[field]) errors[field] = err.message
    })
    setFieldErrors(errors)
    return
  }
    
    setLoading(true)

    try {
      await signUp(formData)
      navigate({to:'/auth/login'})
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
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
      <h2 className="text-text-primary font-bold text-2xl mb-2 text-center">Create Your OmniBook Account</h2>
      <p className="text-text-muted text-sm mb-6 text-center">Join 10,000+ professionals organizing knowledge.</p>
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
          <label className='font-bold' htmlFor="name">Full Name</label>
          <input type="text" id='name' name='name' value={formData.fullName} onChange={(e)=> setFormData((prev)=>({...prev, fullName: e.target.value}))} className={`w-full h-11 border border-border-default rounded-xl px-3 text-text-primary
           placeholder:text-text-muted focus:outline-none focus:ring-2 ${
           fieldErrors.fullName
            ? 'border-error focus:border-error focus:ring-error/20'
            : 'border-border-default focus:border-accent-primary focus:ring-accent-primary/20'
          }`}/>
          {fieldErrors.fullName && (
                  <p className="mt-1 text-xs text-error">{fieldErrors.fullName}</p>
                )}
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
          <input type="password" id='password' name='password' value={formData.password} onChange={(e)=> setFormData((prev)=>({...prev, password: e.target.value}))}  className={`w-full h-11 border border-border-default rounded-xl px-3 text-text-primary
           placeholder:text-text-muted focus:outline-none focus:ring-2 ${
           fieldErrors.password
            ? 'border-error focus:border-error focus:ring-error/20'
            : 'border-border-default focus:border-accent-primary focus:ring-accent-primary/20'
          }`}/>
          {fieldErrors.password && (
                  <p className="mt-1 text-xs text-error">{fieldErrors.password}</p>
                )}
       </div>
        <div className="flex flex-col gap-2">
          <label className='font-bold' htmlFor="businessName">Business Name</label>
          <input type="text" id='businessName' name='businessName' value={formData.businessName} onChange={(e)=> setFormData((prev)=>({...prev, businessName: e.target.value}))}  className={`w-full h-11 border border-border-default rounded-xl px-3 text-text-primary
           placeholder:text-text-muted focus:outline-none focus:ring-2 ${
           fieldErrors.businessName
            ? 'border-error focus:border-error focus:ring-error/20'
            : 'border-border-default focus:border-accent-primary focus:ring-accent-primary/20'
          }`}/>
          {fieldErrors.businessName && (
                  <p className="mt-1 text-xs text-error">{fieldErrors.businessName}</p>
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
           {loading ? 'Creating Account...' : 'Create Your Account'}  <ArrowRight className='shrink-0' size={14}/>
        </AnimatedButton>
        <p className="text-sm text-text-muted text-center">By clicking create account, you agree to our <a href='#' className='text-accent-text ml-0.5 mr-1'>terms and conditions</a> 
          and <a href='#' className='text-accent-text ml-0.5'>privacy policy</a> 
        </p>
      </form>
      <p className="text-sm text-text-muted text-center mt-4">Already have an account? <AnimatedLink route='/auth/login' classes='text-accent-text ml-0.5'>Log in</AnimatedLink></p>
    </div>
  )
}
