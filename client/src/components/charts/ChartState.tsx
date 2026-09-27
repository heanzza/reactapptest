import {
  Skeleton,
  Empty,
  EmptyHeader,
  EmptyTitle,
  Alert,
  AlertTitle,
  AlertDescription,
} from '@databricks/appkit-ui/react';

/**
 * Renders the appropriate loading / error / empty state for a chart, or the
 * chart itself once data is present. Centralizes the required-state handling.
 */
export function ChartState({
  loading,
  error,
  isEmpty,
  height = 280,
  children,
}: {
  loading: boolean;
  error: string | null;
  isEmpty: boolean;
  height?: number;
  children: React.ReactNode;
}) {
  if (error) {
    return (
      <Alert variant="destructive">
        <AlertTitle>読み込みに失敗しました</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }
  if (loading) {
    return <Skeleton style={{ height }} className="w-full" />;
  }
  if (isEmpty) {
    return (
      <div style={{ height }} className="flex items-center justify-center">
        <Empty>
          <EmptyHeader>
            <EmptyTitle>該当するデータがありません</EmptyTitle>
          </EmptyHeader>
        </Empty>
      </div>
    );
  }
  return <>{children}</>;
}
