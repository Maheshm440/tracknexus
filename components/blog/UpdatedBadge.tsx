import { RefreshCw } from 'lucide-react';
import { format } from 'date-fns';

interface UpdatedBadgeProps {
  publishedDate: string;
  lastModified?: string;
}

export function UpdatedBadge({ publishedDate, lastModified }: UpdatedBadgeProps) {
  if (!lastModified || lastModified === publishedDate) return null;

  const published = new Date(publishedDate);
  const modified = new Date(lastModified);
  const daysDiff = (modified.getTime() - published.getTime()) / (1000 * 60 * 60 * 24);

  // Only show if updated at least 7 days after publication
  if (daysDiff < 7) return null;

  return (
    <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-green-50 border border-green-200 rounded-full">
      <RefreshCw className="w-3.5 h-3.5 text-green-600" />
      <span className="text-xs font-medium text-green-700">
        Updated {format(modified, 'MMM d, yyyy')}
      </span>
    </div>
  );
}
