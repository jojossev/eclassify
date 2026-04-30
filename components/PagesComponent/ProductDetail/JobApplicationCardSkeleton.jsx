import { Card, CardContent, CardHeader } from "@/components/ui/card";

const JobApplicationCardSkeleton = () => {
  return (
    <Card className="animate-pulse">
      <CardHeader>
        <div className="flex items-center justify-between ltr:flex-row rtl:flex-row-reverse">
          <div className="h-5 w-32 rounded bg-muted" />
          <div className="h-5 w-20 rounded bg-muted" />
        </div>
      </CardHeader>

      <CardContent>
        <div className="space-y-3">
          <div className="grid grid-cols-1 gap-3 text-sm sm:grid-cols-2">
            <div className="space-y-2">
              <div className="h-3 w-16 rounded bg-muted" />
              <div className="h-4 w-40 rounded bg-muted" />
            </div>
            <div className="space-y-2">
              <div className="h-3 w-16 rounded bg-muted" />
              <div className="h-4 w-32 rounded bg-muted" />
            </div>
            <div className="space-y-2 sm:col-span-2">
              <div className="h-3 w-24 rounded bg-muted" />
              <div className="h-4 w-36 rounded bg-muted" />
            </div>
          </div>

          <div className="h-px w-full bg-muted" />
          <div className="flex gap-2">
            <div className="h-8 w-20 rounded bg-muted" />
            <div className="h-8 w-20 rounded bg-muted" />
            <div className="h-8 w-24 rounded bg-muted" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default JobApplicationCardSkeleton;
