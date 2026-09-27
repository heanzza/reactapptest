import { useMemo } from 'react';
import { useAnalyticsQuery } from '@databricks/appkit-ui/react';
import { sql } from '@databricks/appkit-ui/js';
import { ChartCard } from './ChartCard';
import { EChart } from '@/components/charts/EChart';
import { ChartState } from '@/components/charts/ChartState';
import { lineOption } from '@/components/charts/chartOptions';
import type { DateRange } from './DateRangeFilter';
import { toNumber, formatCount, formatShortDate } from '@/lib/formatters';

/** 乗車日ごとのトリップ件数トレンド。 */
export function TripsByDayChart({ range }: { range: DateRange }) {
  const { data, loading, error } = useAnalyticsQuery('trips_by_day', {
    start_date: sql.date(range.start),
    end_date: sql.date(range.end),
  });

  const option = useMemo(
    () =>
      lineOption({
        categories: (data ?? []).map((r) => formatShortDate(r.trip_date)),
        values: (data ?? []).map((r) => toNumber(r.trip_count)),
        valueFormatter: (v) => `${formatCount(v)} 件`,
      }),
    [data]
  );

  return (
    <ChartCard title="日次トリップ数" description="乗車日ごとのトリップ件数">
      <ChartState loading={loading} error={error} isEmpty={!data?.length}>
        <EChart option={option} />
      </ChartState>
    </ChartCard>
  );
}
