# Cline 開発スターターキット

Cline を使用したチーム開発のための環境構築と開発ルールを提供するリポジトリです。

## 概要

このリポジトリは、Cline を活用したチーム開発を効率的に行うための基盤を提供します。開発ルール、コード品質基準、アーキテクチャガイドラインなどを含み、チームメンバー全員が一貫した方法で開発を進められるようサポートします。また、GitHub MCPサーバーを含み、Clineの機能を拡張してGitHub APIを活用できるようにします。さらに、CI/CD用のGitHub Actionsワークフローも提供しています。

## ディレクトリ構成

```
cline-dev-starter/
├── .clinerules/                      # Cline 開発ルールファイル
│   ├── team-development-rules.md     # チーム開発に関するルール
│   ├── code-quality-rules.md         # コード品質に関するルール
│   ├── architecture-rules.md         # アーキテクチャに関するルール
│   ├── git-operation-rules.md        # Git操作に関するルール
│   ├── mcp-usage-rules.md            # MCPサーバー利用に関するルール
│   └── tech-stack-selection-rules.md # 技術スタック選定に関するルール
├── .github/                      # GitHub関連の設定
│   ├── GITHUB_ACTIONS.md         # GitHub Actions設定の説明
│   └── workflows/                # GitHub Actionsワークフロー
│       ├── aws-deploy.yml        # AWS用デプロイワークフロー
│       ├── vercel-deploy.yml     # Vercel用デプロイワークフロー
│       └── playwright.yml        # Playwrightテスト用ワークフロー
├── docker/                       # Docker関連ファイル
│   ├── dev/                      # 開発環境用Docker設定
│   │   └── Dockerfile            # 開発環境用Dockerfile
│   └── prod/                     # 本番環境用Docker設定
│       └── Dockerfile            # 本番環境用Dockerfile
├── mcp/                          # MCP (Model Context Protocol) サーバー
│   └── github-server/            # GitHub API用MCPサーバー
│       ├── src/                  # ソースコード
│       ├── API_RATE_LIMIT_GUIDE.md # APIレート制限の解消方法
│       ├── GITHUB_TOKEN_GUIDE.md # GitHubトークンの取得方法
│       ├── README.md             # GitHub MCPサーバーの説明
│       ├── package.json          # 依存関係の定義
│       ├── tsconfig.json         # TypeScript設定
│       └── .env.example          # 環境変数の設定例
├── tests/                        # Playwrightテスト
│   ├── PLAYWRIGHT_GUIDE.md       # Playwrightの使用ガイド
│   ├── example.spec.ts           # サンプルテスト
│   └── global-setup.ts           # テスト実行前の設定
├── CustomInstructions/           # Cline用カスタムインストラクション
│   ├── plan_custominstructions.md # PLANモード用のカスタムインストラクション
│   └── act_customInstructions.md # ACTモード用のカスタムインストラクション
├── memory-bank/                  # Clineのメモリバンク
│   ├── projectbrief.md           # プロジェクトの基本情報
│   ├── productContext.md         # プロジェクトの目的と問題解決
│   ├── systemPatterns.md         # システムアーキテクチャ
│   ├── techContext.md            # 使用技術
│   ├── activeContext.md          # 現在の作業フォーカス
│   └── progress.md               # 進捗状況
├── playwright.config.ts          # Playwright設定ファイル
├── Dockerfile                    # メインのDockerfile
├── docker-compose.yml            # Docker Compose設定ファイル
├── .dockerignore                 # Dockerビルド時に除外するファイル
└── README.md                     # このファイル
```

## メモリバンク

`memory-bank` ディレクトリには、Clineがプロジェクトの状態を理解し、効果的に作業を進めるための重要な情報が含まれています。Clineはセッション間でメモリがリセットされるため、このメモリバンクを通じてプロジェクトの状態を把握します。

### メモリバンクの構成

メモリバンクは以下の6つのコアファイルで構成されています：

1. **projectbrief.md** - プロジェクトの基本情報、目標、制約条件などを記載
2. **productContext.md** - プロジェクトが解決する問題、ユーザー体験目標、主要機能と特徴を記載
3. **systemPatterns.md** - システムアーキテクチャ、設計パターン、コンポーネント構成を記載
4. **techContext.md** - 使用技術、開発環境、依存関係、技術選定理由を記載
5. **activeContext.md** - 現在の作業フォーカス、最近の変更、重要な決定事項を記載
6. **progress.md** - 完了した作業、進行中の作業、今後の予定、課題と障害を記載

### メモリバンクの初期設定方法

新しいプロジェクトでメモリバンクを初期化するには：

1. プロジェクトのルートディレクトリに `memory-bank` ディレクトリを作成します
2. 上記の6つのコアファイルを作成します
3. 各ファイルにプロジェクトの情報を記入します
4. 変更をGitリポジトリにコミットします

簡単な初期化方法として、Clineに「initialize memory bank」と指示することで、基本的なメモリバンク構造を自動的に作成することもできます。

### メモリバンクの更新方法

プロジェクトの進行に伴い、メモリバンクを定期的に更新することが重要です：

1. プロジェクトの状態が変わったら、関連するファイルを手動で更新します
2. 特に `activeContext.md` と `progress.md` は頻繁に更新が必要です
3. 重要な決定や設計変更があった場合は、関連するファイルを更新します
4. 更新後は変更をGitリポジトリにコミットします

Clineに「update memory bank」と指示することで、Clineがすべてのメモリバンクファイルをレビューし、必要な更新を提案することもできます。

### メモリバンクの使用用途

メモリバンクは以下のような用途で活用できます：

- **プロジェクト状態の把握**: Clineがプロジェクトの現状を理解するための情報源
- **知識の継続性**: セッション間でのClineの記憶の継続性を確保
- **チーム内共有**: チームメンバー間での知識共有や引き継ぎ
- **意思決定の記録**: 重要な決定事項とその理由の記録
- **進捗管理**: プロジェクトの進捗状況の可視化
- **課題追跡**: 現在の課題と解決策の記録

メモリバンクを効果的に活用することで、Clineはより的確なサポートを提供し、プロジェクトの成功に貢献します。

## Docker連携

このリポジトリには、サンプル的にDocker環境を構築するための基本的なファイルが含まれています。

### 含まれるファイル

- `Dockerfile` - 基本的なNode.jsアプリケーション用のDockerfile
- `docker/dev/Dockerfile` - 開発環境用のDockerfile
- `docker/prod/Dockerfile` - 本番環境用のDockerfile
- `docker-compose.yml` - アプリケーションとデータベースを連携するための設定
- `.dockerignore` - Dockerビルド時に除外するファイルの設定

### 使用方法

開発環境では `docker-compose up` コマンドで環境を起動できます。

## Cline カスタムインストラクション

`CustomInstructions` ディレクトリには、Clineのプランモードとアクトモードで使用するためのカスタムインストラクションファイルが含まれています。これらのファイルは、**ご自身のローカル環境のCline内におけるactCustomInstructionsとplanCustomInstructionsに設定（コピペ）する用のファイル**です。

### PLANモード用カスタムインストラクション

[plan_custominstructions.md](./CustomInstructions/plan_custominstructions.md) には、PLANモードでClineを使用する際のガイドラインが含まれています：

- 基本計画原則
- ドメインモデリングアプローチ
- アーキテクチャ設計ガイドライン
- 計画プロセス（要件分析、ドメインモデリング、アーキテクチャ設計、詳細設計、実装計画）
- コミュニケーションガイドライン
- 計画ドキュメント形式

### ACTモード用カスタムインストラクション

[act_customInstructions.md](./CustomInstructions/act_customInstructions.md) には、ACTモードでClineを使用する際のガイドラインが含まれています：

- 基本動作原則
- 最重要ルール（**既存のコードを修正する場合既存のコードを省略しないこと**）
- コード実装ルール
- ファイル操作ルール
- Gitコミットルール
- コマンド実行ルール
- テスト実行ルール
- エラー対応ルール
- 実行完了報告

## 開発ルール

`.clinerules` ディレクトリには、開発プロセスを標準化し、コードの品質を維持するためのルールが含まれています。

### チーム開発ルール

[team-development-rules.md](./.clinerules/team-development-rules.md) には以下の内容が含まれています：

- Git ワークフローとブランチ戦略
- コードレビュープロセス
- チーム内コミュニケーション
- 開発環境の統一
- CI/CD パイプライン
- 障害対応とインシデント管理
- ドメイン駆動設計の原則
- コーディング規約
- テスト戦略
- 継続的改善

### コード品質ルール

[code-quality-rules.md](./.clinerules/code-quality-rules.md) には以下の内容が含まれています：

- コードスタイル（命名規則、フォーマット、コメント）
- コード構造（ファイル構成、関数/メソッド、クラス/コンポーネント）
- コード品質（エラー処理、非同期処理、パフォーマンス、セキュリティ）
- テスト（ユニットテスト、統合テスト、E2Eテスト、テストの品質）
- ツールと自動化（リンター、フォーマッター、型チェック、依存関係管理）

### アーキテクチャルール

[architecture-rules.md](./.clinerules/architecture-rules.md) には以下の内容が含まれています：

- 全体アーキテクチャ（レイヤードアーキテクチャ、依存関係の方向）
- フロントエンドアーキテクチャ（コンポーネント設計、状態管理、ルーティング）
- バックエンドアーキテクチャ（API設計、データアクセス、ビジネスロジック）
- クロスカッティングコンサーン（ロギング、エラーハンドリング、認証と認可、キャッシュ戦略）
- マイクロサービスアーキテクチャ（該当する場合）
- セキュリティアーキテクチャ
- パフォーマンスとスケーラビリティ

### Git操作ルール

[git-operation-rules.md](./.clinerules/git-operation-rules.md) には以下の内容が含まれています：

- 基本原則
- 日常的なGit操作フロー
- コンフリクト解決手順
- リベースとマージの使い分け
- タグ付けのルール
- Gitフックの活用
- 高度なGit操作
- トラブルシューティング
- セキュリティ対策
- Git設定のベストプラクティス
- チーム開発でのGit活用

### MCPサーバー利用ルール

[mcp-usage-rules.md](./.clinerules/mcp-usage-rules.md) には以下の内容が含まれています：

- MCP (Model Context Protocol) の概要
- MCPサーバーの設定と管理
- GitHub MCPサーバーの利用
- カスタムMCPサーバーの開発
- セキュリティとプライバシー
- トラブルシューティング
- ベストプラクティス
- 継続的な改善

### 技術スタック選定ルール

[tech-stack-selection-rules.md](./.clinerules/tech-stack-selection-rules.md) には以下の内容が含まれています：

- 基本原則
- 選定プロセス
- ドキュメント化
- 技術スタック変更の管理
- 技術負債の管理
- 新技術の評価と導入

## GitHub MCP サーバー

`mcp/github-server` ディレクトリには、GitHubのAPIを使用するためのMCPサーバーが含まれています。このサーバーを使用することで、Clineから直接GitHubのリポジトリ情報の取得やイシュー・プルリクエストの操作を行うことができます。

### セットアップ手順

1. `mcp/github-server` ディレクトリに移動します
2. `.env.example` ファイルを `.env` にコピーします
3. `.env` ファイルを編集して、`GITHUB_TOKEN` に自分のGitHubトークンを設定します
   - トークンの取得方法は [GITHUB_TOKEN_GUIDE.md](./mcp/github-server/GITHUB_TOKEN_GUIDE.md) を参照してください
4. 依存関係をインストールします
   ```
   npm install
   ```
5. TypeScriptをコンパイルします
   ```
   npm run build
   ```
6. Cline MCPの設定ファイルに以下の設定を追加します
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

詳細な使用方法については、[GitHub MCPサーバーのREADME](./mcp/github-server/README.md)を参照してください。

## CI/CD ワークフロー

`.github/workflows` ディレクトリには、継続的インテグレーション/継続的デリバリー（CI/CD）のためのGitHub Actionsワークフローが含まれています。以下の種類のワークフローが用意されています：

1. **AWS デプロイ** - S3、CloudFront、ECR、ECSなどへのデプロイをサポート
2. **Vercel デプロイ** - Vercelへのデプロイとプレビュー環境の自動作成をサポート
3. **Playwright テスト** - 複数のブラウザでの自動E2Eテストを実行

これらのワークフローは、コードの品質を確保し、デプロイプロセスを自動化するために設計されています。設定方法や詳細については、[GitHub設定の説明](./.github/GITHUB_ACTIONS.md)を参照してください。

## E2E テスト

`tests` ディレクトリには、[Playwright](https://playwright.dev/)を使用したE2Eテストが含まれています。これらのテストは、アプリケーションが実際のブラウザで正しく動作することを確認するために使用されます。

主な特徴：

- 複数のブラウザ（Chromium、Firefox、WebKit）でのテスト実行
- モバイルビューポートのエミュレーション
- APIテストのサポート
- テストレポートの自動生成
- GitHub Actionsとの統合

テストの実行方法や詳細については、[Playwrightガイド](./tests/PLAYWRIGHT_GUIDE.md)を参照してください。

> **注意**: 現段階では、このリポジトリにはテスト対象のアプリケーションコードが含まれていないため、GitHub Actionsのワークフローは失敗します。実際のプロジェクトでは、アプリケーションコードを追加し、必要に応じてテストとワークフロー設定を調整してください。サンプルテストは、実装予定の機能に基づいて作成されています。

## 使用方法

1. このリポジトリをクローンまたはフォークして、新しいプロジェクトの基盤として使用します。
2. `.clinerules` ディレクトリ内のルールを確認し、必要に応じてプロジェクトの要件に合わせて調整します。
3. `CustomInstructions` ディレクトリ内のファイルをClineのカスタムインストラクション設定にコピーします：
   - `plan_custominstructions.md` の内容をClineのPLANモード用カスタムインストラクションにコピー
   - `act_customInstructions.md` の内容をClineのACTモード用カスタムインストラクションにコピー
4. チームメンバー全員がこれらのルールを理解し、遵守するようにします。
5. 必要に応じて GitHub MCP サーバーをセットアップし、Cline から GitHub API を活用します。
6. CI/CDワークフローを設定し、自動テストとデプロイを有効にします。
7. Cline を使用して開発を進める際に、これらのルールに基づいてコードの品質とアーキテクチャの一貫性を維持します。

## Cline との連携

Cline は、これらのルールを理解し、開発プロセスをサポートします。以下のように活用できます：

- コードレビューの支援
- アーキテクチャの提案と検証
- コード品質の改善提案
- ドキュメント生成の支援
- チーム内コミュニケーションの促進
- GitHub APIを活用したリポジトリ管理の自動化
- CI/CDパイプラインの最適化提案

## ライセンス

このプロジェクトは [MIT ライセンス](LICENSE) の下で公開されています。
