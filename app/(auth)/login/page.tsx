import { AuthLayout } from "@/app/(auth)/_components/auth-layout";
import { LoginForm } from "@/app/(auth)/_components/login-form";

export default function LoginPage() {
  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Sign in to continue sharing and discovering developer knowledge."
      footerPrompt="New here?"
      footerLinkLabel="Create an account"
      footerHref="/register"
    >
      <LoginForm />
    </AuthLayout>
  );
}
