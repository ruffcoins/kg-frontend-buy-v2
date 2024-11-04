"use client";

import Logo from "@/components/shared/Logo";
import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="grid min-h-screen max-w-screen place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
      <Logo className="mx-auto" />

      <div className="text-center">
        <p className="text-base font-semibold text-kaiglo_critical-base">
          Uh Oh!
        </p>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          Something went wrong!
        </h1>
        <p className="mt-6 text-base leading-7 text-gray-600">
          {error.message}
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Button
            className="rounded-md bg-kaiglo_critical-base px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-kaiglo_critical-base focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-kaiglo_critical-base"
            onClick={reset}
          >
            Go back home
          </Button>
        </div>
      </div>
    </main>
  );
}
