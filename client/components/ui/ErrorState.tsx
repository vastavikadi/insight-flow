"use client";

interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
}

export function ErrorState({
  title = "Something went wrong",
  message = "Please try again later.",
  onRetry,
}: ErrorStateProps) {
  return (
    <div
      className="
        rounded-3xl

        border
        border-red-500/20

        bg-red-500/5

        p-12

        text-center
      "
    >
      <h2
        className="
          text-2xl
          font-semibold

          text-red-400
        "
      >
        {title}
      </h2>

      <p
        className="
          mt-3

          text-zinc-400
        "
      >
        {message}
      </p>

      {onRetry && (
        <button
          onClick={onRetry}
          className="
            mt-6

            px-5
            py-3

            rounded-xl

            bg-red-500

            hover:bg-red-400
          "
        >
          Retry
        </button>
      )}
    </div>
  );
}
