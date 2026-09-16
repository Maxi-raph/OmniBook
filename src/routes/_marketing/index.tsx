import AnimatedContainer from '#/components/AnimatedContainer'
import AnimatedLink from '#/components/AnimatedLink'
import { createFileRoute } from '@tanstack/react-router'
import { PlayIcon, Star, Users } from 'lucide-react'

export const Route = createFileRoute('/_marketing/')({
  component: MarketingPage,
})

function MarketingPage() {
  return(
    <div className='mt-18 page-wrap'>
      <section className="flex justify-around items-center">
        <AnimatedContainer
          type='load'
          containerType='div'
          delay={0.3}
          direction='left'
          className="flex flex-col gap-6">
          <h1 className="text-text-primary text-3xl font-bold md:text-5xl md:max-w-118">
            Stop juggling schedules. Start growing your business.
          </h1>
          <p className="text-text-muted text-sm md:max-w-107.5 leading-relaxed">
            Omnibook automates your booking, payments, and client management — 
            so you can focus on your craft. The technical choice for professionals who value precision.
          </p>
          <div className="flex gap-4 items-center mt-2">
            <AnimatedLink
              route="/"
              classes="flex items-center rounded-lg bg-accent-primary px-4 py-2 text-sm font-semibold text-white hover:bg-accent-hover shadow-lg shadow-shadow-heavy transition-all duration-200"
            >Start Free Trial</AnimatedLink>
            <AnimatedLink
              route="/"
              classes="flex items-center justify-center gap-1.5 rounded-lg bg-transparent border border-default px-4 py-2 w-44 text-sm font-semibold shadow-lg shadow-shadow-heavy text-text-secondary transition-all duration-200"
            ><PlayIcon className='shrink-0' size={16}/> Show Demo</AnimatedLink>
          </div>
          <div className='flex gap-6 items-center'>
            <div className="flex gap-2 items-center text-text-muted text-xs">
              <Users className='shrink-0' size={14}/>
              <p>10k+ users</p>
            </div>
            <div className="flex gap-2 items-center text-text-muted text-xs">
              <Star className='shrink-0 text-accent-primary' size={14}/>
              <p>4.9/5 Rating</p>
            </div>
          </div>
        </AnimatedContainer>
        <AnimatedContainer
          type='load'
          containerType='div'
          delay={0.3}
          direction='right'
          className="relative w-100 h-100 rounded-xl border border-default shadow-2xl shadow-shadow-glow
             before:content-[''] before:rounded-xl before:absolute before:inset-0
             before:bg-linear-to-t before:from-black/60 before:to-transparent
             before:pointer-events-none before:z-10">
            <img src="src/assets/images/visily-image.png" alt="Hero-Image" 
            className='w-full h-full object-cover'/>
        </AnimatedContainer>
      </section>
      <hr className="text-text-muted w-full h-0.5 mt-18 mb-18" />
      <AnimatedContainer 
        type='load'
        containerType='section'
        delay={0.3}
        className='flex flex-col gap-14'>
       <h2 className="text-text-primary font-bold text-2xl text-center">Everything you need to scale</h2>
      </AnimatedContainer>
    </div>
  )
}
