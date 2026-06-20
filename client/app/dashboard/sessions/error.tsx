"use client";

import { ErrorState }
from "@/components/ui/ErrorState";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {

  return (
    <div className="p-8">
      <ErrorState
        title="Sessions Failed"
        message={error.message}
        onRetry={reset}
      />
    </div>
  );
}