import { LoginForm } from "../molecules/LoginForm"
import { ModeToggle } from "../ui/mode-toggle"

export default function Page() {

  return (
    <div className="relative flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <LoginForm />
      </div>
    </div>
  )
}