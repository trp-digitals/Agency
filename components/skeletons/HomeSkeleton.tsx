import Skeleton from "@/components/ui/Skeleton";
import MaxWrapper from "@/components/ui/MaxWrapper";

export default function HomeSkeleton() {
  return (
    <main className="min-h-screen bg-background pt-28 pb-20 overflow-hidden text-foreground">
      {/* Hero Section Skeleton */}
      <section className="relative py-16 border-b border-white/5">
        <MaxWrapper>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              {/* Badge */}
              <Skeleton className="h-8 w-44 rounded-full" />
              {/* Title */}
              <div className="space-y-3">
                <Skeleton className="h-12 sm:h-14 lg:h-16 w-11/12 rounded-2xl" />
                <Skeleton className="h-12 sm:h-14 lg:h-16 w-3/4 rounded-2xl" />
              </div>
              {/* Description */}
              <div className="space-y-2 pt-2">
                <Skeleton className="h-5 w-full rounded-lg" />
                <Skeleton className="h-5 w-5/6 rounded-lg" />
              </div>
              {/* CTAs */}
              <div className="flex flex-wrap gap-4 pt-4">
                <Skeleton className="h-12 w-44 rounded-full" />
                <Skeleton className="h-12 w-40 rounded-full" />
              </div>
            </div>
            {/* Visual/Diagram Placeholder */}
            <div className="lg:col-span-5 hidden lg:block">
              <Skeleton className="h-96 w-full rounded-3xl" />
            </div>
          </div>
        </MaxWrapper>
      </section>

      {/* Bento Grid / Features Section Skeleton */}
      <section className="py-24 border-b border-white/5">
        <MaxWrapper>
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <Skeleton className="h-5 w-32 mx-auto rounded-full" />
            <Skeleton className="h-10 w-3/4 mx-auto rounded-2xl" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Skeleton className="h-64 rounded-3xl" />
            <Skeleton className="h-64 rounded-3xl" />
            <Skeleton className="h-64 rounded-3xl" />
          </div>
        </MaxWrapper>
      </section>

      {/* Services Grid Section Skeleton */}
      <section className="py-24 border-b border-white/5">
        <MaxWrapper>
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <Skeleton className="h-5 w-28 mx-auto rounded-full" />
            <Skeleton className="h-10 w-2/3 mx-auto rounded-2xl" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {Array.from({ length: 6 }).map((_, idx) => (
              <div key={idx} className="p-8 rounded-2xl glass border border-white/10 space-y-4">
                <Skeleton className="w-12 h-12 rounded-xl" />
                <Skeleton className="h-6 w-3/4 rounded-lg" />
                <Skeleton className="h-4 w-full rounded-lg" />
                <Skeleton className="h-4 w-5/6 rounded-lg" />
                <Skeleton className="h-10 w-full rounded-xl pt-4" />
              </div>
            ))}
          </div>
        </MaxWrapper>
      </section>
    </main>
  );
}
