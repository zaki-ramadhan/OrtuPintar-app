export default function ActivityCardSkeleton() {
  return (
    <div className="p-4 sm:p-6 animate-pulse">
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-4 flex-1">
          <div className="flex-shrink-0">
            <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between mb-2">
              <div className="flex-1">
                <div className="h-6 bg-gray-200 rounded-md w-3/4 mb-2"></div>
              </div>
              <div className="h-6 bg-gray-200 rounded-full w-20"></div>
            </div>

            <div className="h-4 bg-gray-200 rounded w-full mb-3"></div>

            <div className="space-y-3 mb-3">
              <div className="h-6 bg-gray-200 rounded-full w-24"></div>

              <div className="space-y-2">
                <div className="h-8 bg-gray-200 rounded-lg w-full"></div>
                <div className="h-8 bg-gray-200 rounded-lg w-full"></div>
                <div className="h-8 bg-gray-200 rounded-lg w-3/4"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
