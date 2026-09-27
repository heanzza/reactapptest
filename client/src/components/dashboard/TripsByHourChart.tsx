import { useMemo } from 'react';
import { useAnalyticsQuery } from '@databricks/appkit-ui/react';
import { sql } from '@databricks/appkit-ui/js';
import { ChartCard } from './ChartCard';
import { EChart } from '@/components/charts/EChart';
import { ChartState } from '@/components/charts/ChartState';
import { barOption } from '@/components/charts/chartOptions';
import type { DateRange } from './DateRangeFilter';
import { toNumber, formatCount } from '@/lib/formatters';

/** 乗車時刻（0〜23時）ごとのトリップ件数。 */
export function TripsByHourChart({ range }: { range: DateRange }) {
  const { data, loading, error } = useAnalyticsQuery('trips_by_hour', {
    start_date: sql.date(range.start),
    end_date: sql.date(range.end),
  });

  const option = useMemo(
    () =>
      barOption({
        categories: (data ?? []).map((r) => `${r.pickup_hour}時`),
        values: (data ?? []).map((r) => toNumber(r.trip_count)),
        valueFormatter: (v) => `${formatCount(v)} 件`,
      }),
    [data]
  );

  return (
    <ChartCard title="時間帯別トリップ数" description="乗車時刻（0〜23時）ごとの件数2">
      <ChartState loading={loading} error={error} isEmpty={!data?.length}>
        <EChart option={option} />
      </ChartState>
    </ChartCard>
  );
}
