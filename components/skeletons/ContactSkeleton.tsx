import Skeleton from "@/components/ui/Skeleton";
import MaxWrapper from "@/components/ui/MaxWrapper";

export default function ContactSkeleton() {
  return (
    <main className="min-h-screen bg-background pt-28 pb-20 overflow-hidden text-foreground">
      {/* Page Hero */}
      <section className="relative py-16 border-b border-white/5">
        <MaxWrapper>
          <div className="max-w-4xl space-y-6">
            <Skeleton className="h-8 w-52 rounded-full" />
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

      {/* Main Contact Section */}
      <section className="py-24 border-b border-white/5">
        <MaxWrapper>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left Contact Details Skeleton */}
            <div className="lg:col-span-5 space-y-8">
              <div className="space-y-3">
                <Skeleton className="h-4 w-28 rounded-full" />
                <Skeleton className="h-8 w-5/6 rounded-xl" />
                <Skeleton className="h-4 w-full rounded-lg" />
                <Skeleton className="h-4 w-4/5 rounded-lg" />
              </div>

              <div className="space-y-6">
                {Array.from({ length: 3 }).map((_, idx) => (
                  <div key={idx} className="p-6 rounded-2xl glass border border-white/10 flex items-center gap-4">
                    <Skeleton className="w-10 h-10 rounded-xl shrink-0" />
                    <div className="space-y-2 flex-1">
                      <Skeleton className="h-3 w-24 rounded-full" />
                      <Skeleton className="h-5 w-40 rounded-lg" />
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-3 pt-2">
                <Skeleton className="h-3 w-32 rounded-full" />
                <div className="flex gap-4">
                  <Skeleton className="h-10 w-28 rounded-xl" />
                  <Skeleton className="h-10 w-28 rounded-xl" />
                </div>
              </div>
            </div>

            {/* Right Contact Form Card Skeleton */}
            <div className="lg:col-span-7">
              <div className="p-8 sm:p-10 rounded-3xl glass border border-white/10 space-y-6">
                <div className="flex items-center justify-between">
                  <Skeleton className="h-8 w-56 rounded-xl" />
                  <Skeleton className="h-6 w-24 rounded-full" />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Skeleton className="h-3 w-20 rounded-md" />
                    <Skeleton className="h-12 w-full rounded-xl" />
                  </div>
                  <div className="space-y-2">
                    <Skeleton className="h-3 w-24 rounded-md" />
                    <Skeleton className="h-12 w-full rounded-xl" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Skeleton className="h-3 w-28 rounded-md" />
                  <Skeleton className="h-12 w-full rounded-xl" />
                </div>

                <div className="space-y-3">
                  <Skeleton className="h-3 w-32 rounded-md" />
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {Array.from({ length: 6 }).map((_, i) => (
                      <Skeleton key={i} className="h-10 w-full rounded-xl" />
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Skeleton className="h-3 w-40 rounded-md" />
                  <Skeleton className="h-32 w-full rounded-xl" />
                </div>

                <Skeleton className="h-14 w-full rounded-full pt-2" />
              </div>
            </div>

          </div>
        </MaxWrapper>
      </section>

      {/* Timeline Section */}
      <section className="py-24 border-b border-white/5">
        <MaxWrapper>
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <Skeleton className="h-4 w-32 mx-auto rounded-full" />
            <Skeleton className="h-10 w-3/4 mx-auto rounded-2xl" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, idx) => (
              <div key={idx} className="p-8 rounded-2xl glass border border-white/10 space-y-4">
                <Skeleton className="h-8 w-10 rounded-md" />
                <Skeleton className="w-10 h-10 rounded-xl" />
                <Skeleton className="h-6 w-3/4 rounded-lg" />
                <Skeleton className="h-4 w-full rounded-lg" />
              </div>
            ))}
          </div>
        </MaxWrapper>
      </section>
    </main>
  );
}
