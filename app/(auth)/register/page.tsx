import { AuthLayout } from "@/app/(auth)/_components/auth-layout";
import { RegisterForm } from "@/app/(auth)/_components/register-form";

export default function RegisterPage() {
  return (
    <AuthLayout
      title="Create your account"
      subtitle="Join the dev community and start publishing practical knowledge."
      footerPrompt="Already have an account?"
      footerLinkLabel="Sign in"
      footerHref="/login"
    >
      <RegisterForm />
    </AuthLayout>
  );
}
