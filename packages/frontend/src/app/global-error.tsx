'use client';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex items-center justify-center bg-[#080B12] text-[#F5F1E8] p-6 font-sans">
        <div className="max-w-md p-6 rounded-2xl bg-[#0F131F] border border-[#D4AF37]/30 text-center space-y-4">
          <h2 className="text-xl font-bold text-[#D4AF37]">Application Encountered an Issue</h2>
          <p className="text-xs text-white/70">{error.message || 'An unexpected error occurred.'}</p>
          <button
            onClick={() => reset()}
            className="px-4 py-2 bg-[#D4AF37] text-black font-bold rounded-xl text-xs uppercase cursor-pointer hover:bg-yellow-400 transition-colors"
          >
            Recover Session
          </button>
        </div>
      </body>
    </html>
  );
}
