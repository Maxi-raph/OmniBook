import Footer from '#/components/Footer'
import Header from '#/components/Header'
import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/_marketing')({
  component: MarketingLayout,
})

function MarketingLayout() {
  return(
  <>
    <Header />
      <main className='page-wrap min-h-screen'>
        <Outlet />
      </main>
    <Footer />
  </>)
}
