import { useAnalyticsQuery } from '@databricks/appkit-ui/react';
import { sql } from '@databricks/appkit-ui/js';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Skeleton,
  Alert,
  AlertTitle,
  AlertDescription,
} from '@databricks/appkit-ui/react';
import { Car, DollarSign, Route, Timer, Banknote } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import type { DateRange } from './DateRangeFilter';
import {
  formatCount,
  formatCurrency,
  formatMiles,
  formatMinutes,
} from '@/lib/formatters';

interface KpiDef {
  key: string;
  label: string;
  icon: LucideIcon;
  format: (row: KpiRow) => string;
}

type KpiRow = {
  trip_count: number;
  avg_fare: number;
  total_fare: number;
  avg_distance: number;
  avg_duration_min: number;
};

const KPIS: KpiDef[] = [
  { key: 'trips', label: 'トリップ数2', icon: Car, format: (r) => formatCount(r.trip_count) },
  { key: 'avg_fare', label: '平均運賃', icon: DollarSign, format: (r) => formatCurrency(r.avg_fare) },
  { key: 'total_fare', label: '総運賃', icon: Banknote, format: (r) => formatCurrency(r.total_fare, 0) },
  { key: 'avg_distance', label: '平均距離', icon: Route, format: (r) => formatMiles(r.avg_distance) },
  { key: 'avg_duration', label: '平均所要時間', icon: Timer, format: (r) => formatMinutes(r.avg_duration_min) },
];

export function KpiCards({ range }: { range: DateRange }) {
  const { data, loading, error } = useAnalyticsQuery('kpi_summary', {
    start_date: sql.date(range.start),
    end_date: sql.date(range.end),
  });

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertTitle>KPIの読み込みに失敗しました</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  const row = data?.[0];

  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
      {KPIS.map((kpi) => {
        const Icon = kpi.icon;
        return (
          <Card key={kpi.key}>
            <CardHeader className="flex flex-row items-center justify-between gap-2 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {kpi.label}
              </CardTitle>
              <Icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              {loading || !row ? (
                <Skeleton className="h-8 w-24" />
              ) : (
                <span className="text-2xl font-bold text-foreground">
                  {kpi.format(row)}
                </span>
              )}
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
