import { Outlet } from 'react-router-dom'
import { SiteFooter } from './SiteFooter'
import { TopNav } from './TopNav'

export function Layout() {
  return (
    <div className="flex min-h-screen flex-col bg-surface">
      <TopNav />
      <Outlet />
      <SiteFooter />
    </div>
  )
}
