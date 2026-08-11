import Skeleton from "@/components/ui/Skeleton";
import MaxWrapper from "@/components/ui/MaxWrapper";

interface LegalSkeletonProps {
  title?: string;
}

export default function LegalSkeleton({ title = "Legal Document" }: LegalSkeletonProps) {
  return (
    <main className="min-h-screen bg-background text-white selection:bg-primary/30">
      <MaxWrapper className="pt-40 pb-32">
        <div className="flex flex-col lg:flex-row gap-20">
          
          {/* Sticky Sidebar ToC Skeleton */}
          <aside className="lg:w-64 shrink-0">
            <div className="sticky top-40 space-y-6">
              <div className="flex items-center gap-2 mb-8 px-2">
                <Skeleton className="w-5 h-5 rounded-md" />
                <Skeleton className="h-4 w-28 rounded-full" />
              </div>
              <div className="flex flex-col gap-2">
                {Array.from({ length: 8 }).map((_, idx) => (
                  <Skeleton key={idx} className="h-11 w-full rounded-xl" />
                ))}
              </div>
            </div>
          </aside>

          {/* Content Area Skeleton */}
          <div className="flex-1 max-w-3xl space-y-16">
            <div className="space-y-6">
              <Skeleton className="h-14 sm:h-16 lg:h-20 w-3/4 rounded-2xl" />
              <div className="flex flex-wrap items-center gap-6">
                <Skeleton className="h-6 w-96 rounded-lg" />
                <Skeleton className="h-6 w-44 rounded-full" />
              </div>
            </div>

            <div className="space-y-16">
              {Array.from({ length: 5 }).map((_, idx) => (
                <div key={idx} className="space-y-4">
                  <Skeleton className="h-8 w-1/2 rounded-xl" />
                  <Skeleton className="h-4 w-full rounded-lg" />
                  <Skeleton className="h-4 w-full rounded-lg" />
                  <Skeleton className="h-4 w-4/5 rounded-lg" />
                </div>
              ))}

              <div className="p-8 sm:p-12 rounded-3xl glass border border-white/10 space-y-6">
                <Skeleton className="h-8 w-48 rounded-xl" />
                <Skeleton className="h-4 w-full rounded-lg" />
                <div className="flex flex-wrap gap-4 pt-2">
                  <Skeleton className="h-12 w-36 rounded-2xl" />
                  <Skeleton className="h-12 w-36 rounded-2xl" />
                </div>
              </div>
            </div>
          </div>

        </div>
      </MaxWrapper>
    </main>
  );
}
