import { Skeleton } from "@/components/ui/skeleton"

export function LoadingScreen() {
  return (
    <div className="w-full h-screen p-8 flex flex-col gap-8">
      <Skeleton className="h-12 w-[250px]" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <Skeleton key={i} className="h-[200px] w-full" />
        ))}
      </div>
    </div>
  )
}

