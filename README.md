# NYC タクシー分析ダッシュボード

Databricks [AppKit](https://developers.databricks.com/docs/appkit/v0/)（React + TypeScript + Tailwind CSS）で構築した、NYC イエローキャブの走行データ（`samples.nyctaxi.trips`）を可視化する分析ダッシュボードです。

## 画面

- **KPI**: 総トリップ数 / 平均運賃 / 総運賃 / 平均距離 / 平均所要時間
- **日次トリップ数**（折れ線）/ **時間帯別トリップ数**（棒）/ **運賃の分布**（棒）
- **人気ルート**（乗車→降車 ZIP コード トップ10）
- **乗車日の範囲フィルタ**で全グラフ・KPI が連動更新

SQL クエリは `config/queries/*.obo.sql` に定義され、ログインユーザー権限（OBO）で SQL ウェアハウス上で実行されます。

## 技術スタック

- **フロントエンド**: React 19, TypeScript, Vite, Tailwind CSS, React Router
- **チャート**: Apache ECharts（自前の軽量ラッパー `client/src/components/charts/EChart.tsx`）
- **バックエンド**: Node.js, Express（AppKit `server()` + `analytics()` プラグイン）
- **データ**: Databricks SQL ウェアハウス経由の Unity Catalog テーブル

## プロジェクト構成

```
config/queries/*.obo.sql        # SQL クエリ（OBO 実行）
client/src/
├── App.tsx                     # ルーティング
├── pages/DashboardPage.tsx     # ダッシュボード本体
├── components/
│   ├── layout/AppHeader.tsx
│   ├── dashboard/              # KPI・各チャート・テーブル・フィルタ
│   └── charts/                 # ECharts ラッパー / オプション / 状態表示
└── lib/                        # formatters・constants
server/server.ts                # バックエンドのエントリポイント
app.yaml                        # アプリ設定（SQL ウェアハウスのバインド）
```

## 開発

```bash
npm install
npm run dev        # ホットリロード付き開発サーバー
npm run typecheck  # 型チェック
npm run lint       # Lint
npm run build      # 本番ビルド
```

### 必要な環境変数

`analytics()` プラグインが SQL ウェアハウスへ接続するために `DATABRICKS_WAREHOUSE_ID` が必要です（`app.yaml` で設定済み。ローカル開発では `.env` に設定）。

```env
DATABRICKS_HOST=https://<your-workspace>.cloud.databricks.com
DATABRICKS_WAREHOUSE_ID=<sql-warehouse-id>
```

## デプロイ

Databricks Apps 上で動作します（サーバー + SQL ウェアハウスが必要なため、静的ホスティングでは動作しません）。

```bash
databricks apps deploy
```
