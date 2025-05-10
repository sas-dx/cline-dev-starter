# Cline スタートアップ環境

Clineを活用した開発をすぐに始められる統合スターターキットです。このリポジトリは、Clineの能力を最大限に引き出すための環境設定、開発ルール、拡張機能を提供します。

## Clineスタートアップ環境の特徴

- **即時開発可能**: 必要な設定が揃っており、クローン後すぐに開発を開始できます
- **Cline最適化**: Clineの能力を最大限に活用するための各種設定を含みます
- **拡張性**: MCPサーバーやGitHub Actions連携など、拡張機能を簡単に追加できます
- **チーム開発対応**: 一貫した開発プロセスを実現するためのルールとガイドラインを提供します
- **ベストプラクティス**: Clineを活用した開発のベストプラクティスを組み込んでいます

## クイックスタート

1. リポジトリをクローン: `git clone https://github.com/sas-dx/cline-dev-starter.git`
2. カスタムインストラクションを設定: `CustomInstructions`フォルダ内のファイルをClineの設定にコピー
3. メモリバンクを初期化: Clineに「initialize memory bank」と指示
4. 開発を開始: Clineと対話しながら開発を進める

## Clineの拡張機能

このスターターキットには、Clineの能力を拡張するための様々な機能が含まれています。

### メモリバンク

Clineはセッション間でメモリがリセットされるため、`memory-bank`ディレクトリを通じてプロジェクトの状態を継続的に把握します。

- **主要ファイル**: projectbrief.md（基本情報）、activeContext.md（現在の作業）、progress.md（進捗状況）など
- **初期化方法**: Clineに「initialize memory bank」と指示するだけで自動作成
- **更新方法**: 「update memory bank」と指示することで最新状態に更新
- **活用例**: プロジェクト状態の把握、知識の継続性確保、チーム内共有、意思決定の記録

### .clinerules（開発ルール）

`.clinerules`ディレクトリには、Clineが理解して適用できる開発ルールが含まれています。

- **チーム開発ルール**: Gitワークフロー、コードレビュープロセス、コミュニケーション方法
- **コード品質ルール**: 命名規則、コード構造、エラー処理、テスト戦略
- **アーキテクチャルール**: レイヤード構造、フロントエンド/バックエンド設計、セキュリティ
- **Git操作ルール**: コミット規約、ブランチ戦略、コンフリクト解決
- **MCPサーバー利用ルール**: サーバーの設定、セキュリティ、ベストプラクティス
- **技術スタック選定ルール**: 選定プロセス、評価基準、ドキュメント化

### カスタムインストラクション

Clineの動作をプロジェクトに最適化するためのカスタムインストラクションを提供します。

- **PLANモード用**: 計画立案、アーキテクチャ設計、要件分析のためのガイドライン
- **ACTモード用**: コード実装、ファイル操作、Git操作のためのルール

## ディレクトリ構成

```
cline-dev-starter/
├── .clinerules/                  # Cline開発ルール
├── .github/                      # GitHub Actions設定
├── CustomInstructions/           # Clineカスタムインストラクション
├── docker/                       # Docker環境設定
├── mcp/                          # MCPサーバー
│   └── github-server/            # GitHub API用MCPサーバー
├── memory-bank/                  # Clineメモリバンク
├── src/                          # ソースコード
├── tests/                        # Playwrightテスト
├── Dockerfile                    # メインDockerfile
├── docker-compose.yml            # Docker Compose設定
└── README.md                     # このファイル
```

### 主要ファイルの説明

- **カスタムインストラクション**: `plan_custominstructions.md`（計画用）、`act_customInstructions.md`（実行用）
- **メモリバンク**: `projectbrief.md`（概要）、`activeContext.md`（現状）、`progress.md`（進捗）など
- **Docker関連**: 開発環境用と本番環境用のDockerfile、データベース連携用docker-compose.yml
- **テスト**: Playwrightを使用したE2Eテスト（`tests/example.spec.ts`）

## MCPサーバー連携

MCP（Model Context Protocol）サーバーを使用することで、Clineの機能を拡張し、外部APIやサービスと連携できます。

### GitHub MCPサーバー

このスターターキットには、GitHubのAPIを利用するためのMCPサーバーが含まれています。

- **機能**: リポジトリ情報の取得、イシュー作成/一覧表示、プルリクエスト作成/一覧表示
- **セットアップ手順**:
  1. `mcp/github-server/.env.example`を`.env`にコピー
  2. GitHubトークンを取得して`.env`に設定
  3. 依存関係をインストール: `npm install`
  4. ビルド: `npm run build`
  5. Cline MCPの設定ファイルに追加

```json
"github.com/modelcontextprotocol/servers/tree/main/src/github": {
  "autoApprove": [],
  "disabled": false,
  "timeout": 60,
  "command": "node",
  "args": [
    "プロジェクトのパス/mcp/github-server/build/index.js"
  ],
  "transportType": "stdio"
}
```

### 独自MCPサーバーの追加方法

独自のMCPサーバーを作成して追加することも可能です。

1. MCPサーバーのコードを作成（Node.js推奨）
2. 必要なツールとリソースを定義
3. Cline MCPの設定ファイルに追加
4. 環境変数で認証情報を管理

詳細は`.clinerules/mcp-usage-rules.md`を参照してください。

## GitHub Actions連携

`.github/workflows`ディレクトリには、CI/CD自動化のためのGitHub Actionsワークフローが含まれています。

### 提供されているワークフロー

- **AWS デプロイ**: S3、CloudFront、ECR、ECSなどへのデプロイ
- **Vercel デプロイ**: Vercelへのデプロイとプレビュー環境の自動作成
- **Playwright テスト**: 複数ブラウザでの自動E2Eテスト実行

> **注意**: 現段階ではサンプル環境のため、これらのワークフローはそのままでは動作しません。実際のプロジェクトでは、アプリケーションコードを追加し、ワークフロー設定を調整する必要があります。

### カスタマイズ方法

1. `.github/workflows/`内の各YAMLファイルを編集
2. プロジェクトの要件に合わせてトリガー条件やジョブを調整
3. 必要なシークレットをGitHubリポジトリに設定
4. 実際のデプロイ先情報に更新

## その他の機能

### Docker環境

開発と本番環境用のDockerファイルを提供しています。

- **開発環境**: `docker-compose up`で簡単に起動
- **本番環境**: 最適化されたDockerfileで効率的なデプロイ

### E2Eテスト

Playwrightを使用した自動テスト環境が含まれています。

- **複数ブラウザ対応**: Chromium、Firefox、WebKitでのテスト
- **モバイル対応**: レスポンシブデザインのテスト
- **テストレポート**: 自動生成されるテストレポート

### 使用開始の流れ

1. リポジトリをクローン/フォーク
2. カスタムインストラクションを設定
3. メモリバンクを初期化
4. 必要に応じてMCPサーバーをセットアップ
5. 開発ルールを確認・調整
6. Clineと対話しながら開発を進行

## ライセンス

このプロジェクトは [MIT ライセンス](LICENSE) の下で公開されています。
