import { ForgotPasswordForm } from "../molecules/ForgetPasswordForm"

export default function Page() {

  return (
    <div className="relative flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="absolute top-4 right-4 z-10">
      </div>
      <div className="w-full max-w-sm">
        <ForgotPasswordForm />
      </div>
    </div>
  )
}