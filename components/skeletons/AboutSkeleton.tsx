import Skeleton from "@/components/ui/Skeleton";
import MaxWrapper from "@/components/ui/MaxWrapper";

export default function AboutSkeleton() {
  return (
    <main className="min-h-screen bg-background pt-28 pb-20 overflow-hidden text-foreground">
      {/* Page Hero */}
      <section className="relative py-16 border-b border-white/5">
        <MaxWrapper>
          <div className="max-w-4xl space-y-6">
            <Skeleton className="h-8 w-48 rounded-full" />
            <div className="space-y-3">
              <Skeleton className="h-12 sm:h-14 lg:h-16 w-full rounded-2xl" />
              <Skeleton className="h-12 sm:h-14 lg:h-16 w-3/4 rounded-2xl" />
            </div>
            <div className="space-y-2 pt-2">
              <Skeleton className="h-5 w-full rounded-lg" />
              <Skeleton className="h-5 w-4/5 rounded-lg" />
            </div>
          </div>
        </MaxWrapper>
      </section>

      {/* Vision & Mission */}
      <section className="py-20 border-b border-white/5">
        <MaxWrapper>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-10 rounded-3xl glass border border-white/10 space-y-4">
              <Skeleton className="h-4 w-28 rounded-full" />
              <Skeleton className="h-7 w-5/6 rounded-xl" />
              <Skeleton className="h-4 w-full rounded-lg" />
              <Skeleton className="h-4 w-3/4 rounded-lg" />
            </div>
            <div className="p-10 rounded-3xl glass border border-white/10 space-y-4">
              <Skeleton className="h-4 w-28 rounded-full" />
              <Skeleton className="h-7 w-5/6 rounded-xl" />
              <Skeleton className="h-4 w-full rounded-lg" />
              <Skeleton className="h-4 w-3/4 rounded-lg" />
            </div>
          </div>
        </MaxWrapper>
      </section>

      {/* Core Principles */}
      <section className="py-24 border-b border-white/5">
        <MaxWrapper>
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <Skeleton className="h-4 w-32 mx-auto rounded-full" />
            <Skeleton className="h-10 w-3/4 mx-auto rounded-2xl" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, idx) => (
              <div key={idx} className="p-8 rounded-2xl glass border border-white/10 space-y-4">
                <Skeleton className="w-12 h-12 rounded-xl" />
                <Skeleton className="h-6 w-3/4 rounded-lg" />
                <Skeleton className="h-4 w-full rounded-lg" />
                <Skeleton className="h-4 w-5/6 rounded-lg" />
              </div>
            ))}
          </div>
        </MaxWrapper>
      </section>

      {/* Founder's Message */}
      <section className="py-24 border-b border-white/5">
        <MaxWrapper>
          <div className="p-10 sm:p-14 rounded-3xl glass border border-white/10 max-w-4xl mx-auto space-y-6">
            <Skeleton className="h-4 w-36 rounded-full" />
            <Skeleton className="h-8 w-11/12 rounded-xl" />
            <div className="space-y-3">
              <Skeleton className="h-4 w-full rounded-lg" />
              <Skeleton className="h-4 w-full rounded-lg" />
              <Skeleton className="h-4 w-4/5 rounded-lg" />
            </div>
            <div className="pt-6 border-t border-white/10 flex items-center justify-between">
              <div className="space-y-2">
                <Skeleton className="h-5 w-40 rounded-lg" />
                <Skeleton className="h-4 w-32 rounded-lg" />
              </div>
              <Skeleton className="h-10 w-32 rounded-full" />
            </div>
          </div>
        </MaxWrapper>
      </section>
    </main>
  );
}
