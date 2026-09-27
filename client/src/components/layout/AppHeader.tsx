import { Car } from 'lucide-react';
import { Badge } from '@databricks/appkit-ui/react';
import { SOURCE_TABLE } from '@/lib/constants';

/** アプリのタイトルバー。データソースのバッジを表示。 */
export function AppHeader() {
  return (
    <header className="border-b bg-card">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-3 px-4 py-4 md:px-6">
        <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-yellow-400 text-slate-900">
          <Car className="h-6 w-6" />
        </span>
        <div className="mr-auto">
          <h1 className="text-lg font-semibold text-foreground">
            NYC タクシー分析
          </h1>
          <p className="text-sm text-muted-foreground">
            ニューヨーク イエローキャブの走行データ（乗車数・運賃・ルート）
          </p>
        </div>
        <Badge variant="secondary" className="font-mono text-xs">
          {SOURCE_TABLE}
        </Badge>
      </div>
    </header>
  );
}
