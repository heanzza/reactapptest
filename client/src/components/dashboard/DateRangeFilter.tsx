import { Button, Input, Label } from '@databricks/appkit-ui/react';
import { DATA_MIN_DATE, DATA_MAX_DATE } from '@/lib/constants';

export interface DateRange {
  start: string;
  end: string;
}

/**
 * Two native date inputs (bounded to the dataset range) plus a reset button.
 * Emits committed ranges upward; the page owns the query parameters.
 */
export function DateRangeFilter({
  value,
  onChange,
}: {
  value: DateRange;
  onChange: (next: DateRange) => void;
}) {
  return (
    <div className="flex flex-wrap items-end gap-3">
      <div className="grid gap-1.5">
        <Label htmlFor="start-date" className="text-xs text-muted-foreground">
          開始日
        </Label>
        <Input
          id="start-date"
          type="date"
          className="w-40"
          min={DATA_MIN_DATE}
          max={value.end}
          value={value.start}
          onChange={(e) => onChange({ ...value, start: e.target.value })}
        />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="end-date" className="text-xs text-muted-foreground">
          To
        </Label>
        <Input
          id="end-date"
          type="date"
          className="w-40"
          min={value.start}
          max={DATA_MAX_DATE}
          value={value.end}
          onChange={(e) => onChange({ ...value, end: e.target.value })}
        />
      </div>
      <Button
        variant="outline"
        onClick={() => onChange({ start: DATA_MIN_DATE, end: DATA_MAX_DATE })}
      >
        リセット
      </Button>
    </div>
  );
}
