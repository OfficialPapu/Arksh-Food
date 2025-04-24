import { LoginForm } from "@/Components/Website/Account/Auth/Login";

export default function LoginPage() {
  return (
    <div className="relative min-h-svh overflow-hidden bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-[#0055a4]/5"></div>
      <div className="absolute -bottom-20 -left-20 h-60 w-60 rounded-full bg-[#39b0e5]/5"></div>
      <div className="absolute left-10 top-20 h-6 w-6 rounded-full bg-[#0055a4]/20"></div>
      <div className="absolute right-20 bottom-32 h-4 w-4 rounded-full bg-[#39b0e5]/30"></div>
      <div className="absolute left-1/4 bottom-20 h-8 w-8 rounded-full bg-[#0055a4]/10"></div>
      <div className="absolute right-1/3 top-40 h-5 w-5 rounded-full bg-[#39b0e5]/20"></div>
      <div className="absolute left-0 top-1/4 h-px w-full bg-gradient-to-r from-transparent via-[#0055a4]/20 to-transparent"></div>
      <div className="absolute left-0 bottom-1/3 h-px w-full bg-gradient-to-r from-transparent via-[#39b0e5]/20 to-transparent"></div>
      <div className="relative z-10 flex min-h-svh items-center justify-center px-4 py-16">
        <div className="w-full max-w-md">
          <div className="relative mt-16 overflow-visible rounded-2xl bg-white p-8 shadow-xl shadow-blue-500/10">
            <LoginForm />
          </div>
        </div>
      </div>
    </div>
  )
}
