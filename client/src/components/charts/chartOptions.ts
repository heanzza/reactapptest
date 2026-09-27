import type { EChartsOption } from 'echarts';
import { BRAND_COLORS } from '@/lib/constants';

const GRID = { top: 24, right: 16, bottom: 40, left: 56 } as const;
const AXIS_LINE = { lineStyle: { color: '#e2e8f0' } };
const LABEL = { color: '#64748b', fontSize: 12 };

interface CartesianArgs {
  categories: (string | number)[];
  values: number[];
  color?: string;
  /** Tooltip value formatter, e.g. (v) => v.toLocaleString(). */
  valueFormatter?: (value: number) => string;
}

/** Vertical bar chart option. */
export function barOption({
  categories,
  values,
  color = BRAND_COLORS[0],
  valueFormatter,
}: CartesianArgs): EChartsOption {
  return {
    grid: GRID,
    tooltip: {
      trigger: 'axis',
      valueFormatter: (v) =>
        valueFormatter ? valueFormatter(Number(v)) : String(v),
    },
    xAxis: {
      type: 'category',
      data: categories,
      axisLine: AXIS_LINE,
      axisTick: { show: false },
      axisLabel: LABEL,
    },
    yAxis: {
      type: 'value',
      axisLabel: LABEL,
      splitLine: { lineStyle: { color: '#f1f5f9' } },
    },
    series: [
      {
        type: 'bar',
        data: values,
        itemStyle: { color, borderRadius: [4, 4, 0, 0] },
        barMaxWidth: 40,
      },
    ],
  };
}

/** Smooth line chart option. */
export function lineOption({
  categories,
  values,
  color = BRAND_COLORS[0],
  valueFormatter,
}: CartesianArgs): EChartsOption {
  return {
    grid: GRID,
    tooltip: {
      trigger: 'axis',
      valueFormatter: (v) =>
        valueFormatter ? valueFormatter(Number(v)) : String(v),
    },
    xAxis: {
      type: 'category',
      data: categories,
      boundaryGap: false,
      axisLine: AXIS_LINE,
      axisTick: { show: false },
      axisLabel: LABEL,
    },
    yAxis: {
      type: 'value',
      axisLabel: LABEL,
      splitLine: { lineStyle: { color: '#f1f5f9' } },
    },
    series: [
      {
        type: 'line',
        data: values,
        smooth: true,
        showSymbol: false,
        lineStyle: { color, width: 2 },
        areaStyle: { color, opacity: 0.08 },
      },
    ],
  };
}
