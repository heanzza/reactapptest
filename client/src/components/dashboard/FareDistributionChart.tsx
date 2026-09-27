import { useMemo } from 'react';
import { useAnalyticsQuery } from '@databricks/appkit-ui/react';
import { sql } from '@databricks/appkit-ui/js';
import { ChartCard } from './ChartCard';
import { EChart } from '@/components/charts/EChart';
import { ChartState } from '@/components/charts/ChartState';
import { barOption } from '@/components/charts/chartOptions';
import type { DateRange } from './DateRangeFilter';
import { toNumber, formatCount } from '@/lib/formatters';
import { BRAND_COLORS } from '@/lib/constants';

/** 運賃帯ごとのトリップ件数（ヒストグラム）。 */
export function FareDistributionChart({ range }: { range: DateRange }) {
  const { data, loading, error } = useAnalyticsQuery('fare_distribution', {
    start_date: sql.date(range.start),
    end_date: sql.date(range.end),
  });

  const option = useMemo(
    () =>
      barOption({
        categories: (data ?? []).map((r) => r.fare_bucket),
        values: (data ?? []).map((r) => toNumber(r.trip_count)),
        color: BRAND_COLORS[1],
        valueFormatter: (v) => `${formatCount(v)} 件`,
      }),
    [data]
  );

  return (
    <ChartCard title="運賃の分布" description="運賃帯ごとのトリップ件数">
      <ChartState loading={loading} error={error} isEmpty={!data?.length}>
        <EChart option={option} />
      </ChartState>
    </ChartCard>
  );
}
