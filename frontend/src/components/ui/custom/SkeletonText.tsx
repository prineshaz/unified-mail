import { Card, CardHeader, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export function SkeletonText() {
  return (
    <div className="flex w-full min-w-0 flex-col gap-4 text-sm">
      <Card>
        <CardHeader>
            <Skeleton className="h-4 w-full" />
        </CardHeader>
        <CardContent className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-2/3" />
        </CardContent>
    </Card>
  </div>)
}
