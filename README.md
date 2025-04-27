# Cline 開発スターターキット

Cline を使用したチーム開発のための環境構築と開発ルールを提供するリポジトリです。

## 概要

このリポジトリは、Cline を活用したチーム開発を効率的に行うための基盤を提供します。開発ルール、コード品質基準、アーキテクチャガイドラインなどを含み、チームメンバー全員が一貫した方法で開発を進められるようサポートします。また、GitHub MCPサーバーを含み、Clineの機能を拡張してGitHub APIを活用できるようにします。さらに、CI/CD用のGitHub Actionsワークフローも提供しています。

## ディレクトリ構成

```
cline-dev-starter/
├── .clinerules/                  # Cline 開発ルールファイル
│   ├── team-development-rules.md # チーム開発に関するルール
│   ├── code-quality-rules.md     # コード品質に関するルール
│   └── architecture-rules.md     # アーキテクチャに関するルール
├── .github/                      # GitHub関連の設定
│   ├── README.md                 # GitHub設定の説明
│   └── workflows/                # GitHub Actionsワークフロー
│       ├── aws-deploy.yml        # AWS用デプロイワークフロー
│       └── vercel-deploy.yml     # Vercel用デプロイワークフロー
├── mcp/                          # MCP (Model Context Protocol) サーバー
│   └── github-server/            # GitHub API用MCPサーバー
│       ├── src/                  # ソースコード
│       ├── API_RATE_LIMIT_GUIDE.md # APIレート制限の解消方法
│       ├── GITHUB_TOKEN_GUIDE.md # GitHubトークンの取得方法
│       ├── README.md             # GitHub MCPサーバーの説明
│       ├── package.json          # 依存関係の定義
│       ├── tsconfig.json         # TypeScript設定
│       └── .env.example          # 環境変数の設定例
└── README.md                     # このファイル
```

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

`.github/workflows` ディレクトリには、継続的インテグレーション/継続的デリバリー（CI/CD）のためのGitHub Actionsワークフローが含まれています。以下の2種類のデプロイ先に対応しています：

1. **AWS デプロイ** - S3、CloudFront、ECR、ECSなどへのデプロイをサポート
2. **Vercel デプロイ** - Vercelへのデプロイとプレビュー環境の自動作成をサポート

これらのワークフローは、コードの品質を確保し、デプロイプロセスを自動化するために設計されています。設定方法や詳細については、[GitHub設定の説明](./.github/README.md)を参照してください。

## 使用方法

1. このリポジトリをクローンまたはフォークして、新しいプロジェクトの基盤として使用します。
2. `.clinerules` ディレクトリ内のルールを確認し、必要に応じてプロジェクトの要件に合わせて調整します。
3. チームメンバー全員がこれらのルールを理解し、遵守するようにします。
4. 必要に応じて GitHub MCP サーバーをセットアップし、Cline から GitHub API を活用します。
5. CI/CDワークフローを設定し、自動テストとデプロイを有効にします。
6. Cline を使用して開発を進める際に、これらのルールに基づいてコードの品質とアーキテクチャの一貫性を維持します。

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
