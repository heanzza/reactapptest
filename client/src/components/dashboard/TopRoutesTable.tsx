import {
  useAnalyticsQuery,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Skeleton,
  Empty,
  EmptyHeader,
  EmptyTitle,
  Alert,
  AlertTitle,
  AlertDescription,
} from '@databricks/appkit-ui/react';
import { sql } from '@databricks/appkit-ui/js';
import { ChartCard } from './ChartCard';
import type { DateRange } from './DateRangeFilter';
import { formatCount, formatCurrency, formatMiles } from '@/lib/formatters';

/** 乗車→降車ZIPコード別の人気ルート トップ10。 */
export function TopRoutesTable({ range }: { range: DateRange }) {
  const { data, loading, error } = useAnalyticsQuery('top_routes', {
    start_date: sql.date(range.start),
    end_date: sql.date(range.end),
  });

  return (
    <ChartCard
      title="人気ルート"
      description="乗車→降車ZIPコードの組み合わせ トップ10（トリップ数順）"
    >
      {error ? (
        <Alert variant="destructive">
          <AlertTitle>ルートの読み込みに失敗しました</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ルート</TableHead>
              <TableHead className="text-right">トリップ数</TableHead>
              <TableHead className="text-right">平均運賃</TableHead>
              <TableHead className="text-right">平均距離</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading || !data ? (
              ['s1', 's2', 's3', 's4', 's5'].map((key) => (
                <TableRow key={key}>
                  <TableCell colSpan={4}>
                    <Skeleton className="h-5 w-full" />
                  </TableCell>
                </TableRow>
              ))
            ) : data.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4}>
                  <Empty>
                    <EmptyHeader>
                      <EmptyTitle>該当するデータがありません</EmptyTitle>
                    </EmptyHeader>
                  </Empty>
                </TableCell>
              </TableRow>
            ) : (
              data.map((r) => (
                <TableRow key={`${r.pickup_zip}-${r.dropoff_zip}`}>
                  <TableCell className="font-medium">
                    {r.pickup_zip} → {r.dropoff_zip}
                  </TableCell>
                  <TableCell className="text-right">
                    {formatCount(r.trip_count)}
                  </TableCell>
                  <TableCell className="text-right">
                    {formatCurrency(r.avg_fare)}
                  </TableCell>
                  <TableCell className="text-right">
                    {formatMiles(r.avg_distance)}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      )}
    </ChartCard>
  );
}
