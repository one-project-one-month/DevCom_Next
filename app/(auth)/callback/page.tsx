import { Suspense } from "react";

import { OAuthCallbackClient } from "@/app/(auth)/callback/callback-client";

export default function OAuthCallbackPage() {
  return (
    <Suspense fallback={null}>
      <OAuthCallbackClient />
    </Suspense>
  );
}
