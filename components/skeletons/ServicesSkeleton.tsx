import Skeleton from "@/components/ui/Skeleton";
import MaxWrapper from "@/components/ui/MaxWrapper";

export default function ServicesSkeleton() {
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

      {/* Core Services Grid */}
      <section className="py-24 border-b border-white/5">
        <MaxWrapper>
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <Skeleton className="h-4 w-32 mx-auto rounded-full" />
            <Skeleton className="h-10 w-3/4 mx-auto rounded-2xl" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {Array.from({ length: 6 }).map((_, idx) => (
              <div key={idx} className="p-8 rounded-2xl glass border border-white/10 space-y-6 flex flex-col justify-between">
                <div className="space-y-4">
                  <Skeleton className="w-12 h-12 rounded-xl" />
                  <Skeleton className="h-6 w-3/4 rounded-lg" />
                  <Skeleton className="h-4 w-full rounded-lg" />
                  <div className="space-y-2.5 pt-2">
                    <Skeleton className="h-4 w-5/6 rounded-md" />
                    <Skeleton className="h-4 w-4/5 rounded-md" />
                    <Skeleton className="h-4 w-3/4 rounded-md" />
                  </div>
                </div>
                <Skeleton className="h-10 w-full rounded-xl mt-4" />
              </div>
            ))}
          </div>
        </MaxWrapper>
      </section>

      {/* Packages Grid */}
      <section className="py-24 border-b border-white/5">
        <MaxWrapper>
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <Skeleton className="h-4 w-40 mx-auto rounded-full" />
            <Skeleton className="h-10 w-3/4 mx-auto rounded-2xl" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {Array.from({ length: 3 }).map((_, idx) => (
              <div key={idx} className="p-8 rounded-3xl glass border border-white/10 space-y-6 flex flex-col justify-between">
                <div className="space-y-4">
                  <Skeleton className="h-4 w-32 rounded-full" />
                  <Skeleton className="h-8 w-1/2 rounded-xl" />
                  <Skeleton className="h-4 w-full rounded-lg" />
                  <Skeleton className="h-10 w-36 rounded-xl my-4" />
                  <div className="space-y-3 pt-2">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Skeleton key={i} className="h-4 w-full rounded-md" />
                    ))}
                  </div>
                </div>
                <Skeleton className="h-12 w-full rounded-full mt-6" />
              </div>
            ))}
          </div>
        </MaxWrapper>
      </section>
    </main>
  );
}
