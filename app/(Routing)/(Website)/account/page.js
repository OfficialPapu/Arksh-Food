import { redirect } from 'next/navigation'

export default function RedirectToDashboard() {
  redirect("/account/dashboard")
}
