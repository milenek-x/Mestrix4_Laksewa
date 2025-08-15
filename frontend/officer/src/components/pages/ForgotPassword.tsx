import { ForgotPasswordForm } from "../molecules/ForgetPasswordForm"
import { ModeToggle } from "../ui/mode-toggle"

export default function Page() {

  return (
    <div className="relative flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      {/* ModeToggle positioned at the top-right */}
      <div className="absolute top-4 right-4 z-10">
        <ModeToggle />
      </div>
      <div className="w-full max-w-sm">
        <ForgotPasswordForm />
      </div>
    </div>
  )
}