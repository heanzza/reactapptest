import { useState } from 'react';
import { AppHeader } from '@/components/layout/AppHeader';
import {
  DateRangeFilter,
  type DateRange,
} from '@/components/dashboard/DateRangeFilter';
import { KpiCards } from '@/components/dashboard/KpiCards';
import { TripsByDayChart } from '@/components/dashboard/TripsByDayChart';
import { TripsByHourChart } from '@/components/dashboard/TripsByHourChart';
import { FareDistributionChart } from '@/components/dashboard/FareDistributionChart';
import { TopRoutesTable } from '@/components/dashboard/TopRoutesTable';
import { DATA_MIN_DATE, DATA_MAX_DATE } from '@/lib/constants';

/**
 * NYC taxi analytics dashboard: a date-range filter drives KPIs, trend /
 * distribution charts, and a top-routes table — all reading OBO from the
 * warehouse as the signed-in user.
 */
export function DashboardPage() {
  const [range, setRange] = useState<DateRange>({
    start: DATA_MIN_DATE,
    end: DATA_MAX_DATE,
  });

  return (
    <div className="min-h-screen bg-muted/30">
      <AppHeader />

      <main className="mx-auto max-w-7xl space-y-6 px-4 py-6 md:px-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="text-sm font-medium text-muted-foreground">
              乗車日の範囲
            </h2>
            <p className="text-xs text-muted-foreground">
              対象期間：2016年1月1日〜2月29日
            </p>
          </div>
          <DateRangeFilter value={range} onChange={setRange} />
        </div>

        <KpiCards range={range} />

        <div className="grid gap-6 lg:grid-cols-2">
          <TripsByDayChart range={range} />
          <TripsByHourChart range={range} />
          <FareDistributionChart range={range} />
          <TopRoutesTable range={range} />
        </div>

        <p className="pt-2 text-center text-xs text-muted-foreground">
          データソース：samples.nyctaxi.trips（{DATA_MIN_DATE}〜{DATA_MAX_DATE}）
          ・クエリはログインユーザー権限（OBO）で実行されます
        </p>
      </main>
    </div>
  );
}
