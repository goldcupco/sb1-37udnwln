export default function LoadingSkeleton({ count = 1 }) {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
      <div className="animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {[...Array(count)].map((_, i) => (
            <div key={i} className="bg-gray-200 rounded-lg h-64"></div>
          ))}
        </div>
      </div>
    </div>
  );
}