# Cline MCP サーバー利用ルール

## MCP (Model Context Protocol) の概要

### MCPとは
- Model Context Protocol (MCP) は、Clineなどの大規模言語モデル (LLM) と外部サービスやAPIを連携させるためのプロトコル
- MCPサーバーを通じて、LLMに新しい機能やリソースへのアクセスを提供
- ローカル環境で実行され、セキュリティとプライバシーを確保

### 主な機能
- 外部APIへのアクセス（GitHub, Jira, Slack, カスタムAPIなど）
- ローカルファイルシステムとの連携
- データベースへのアクセス
- 特殊なツールや計算機能の提供

## MCPサーバーの設定と管理

### 設定ファイル
- MCPサーバーの設定は `~/.cline/mcp-config.json` で管理
- 各サーバーは一意の識別子（通常はGitHubリポジトリのURL）を持つ
- 設定例:
```json
{
  "github.com/modelcontextprotocol/servers/tree/main/src/github": {
    "autoApprove": ["get_repo_info", "list_issues"],
    "disabled": false,
    "timeout": 60,
    "command": "node",
    "args": [
      "/path/to/github-server/build/index.js"
    ],
    "transportType": "stdio"
  }
}
```

### 設定パラメータ
- `autoApprove`: 自動承認されるツール名の配列（空配列の場合はすべて手動承認）
- `disabled`: サーバーを無効にするかどうか（true/false）
- `timeout`: ツール実行のタイムアウト時間（秒）
- `command`: サーバーを起動するコマンド
- `args`: コマンドに渡す引数の配列
- `transportType`: 通信方式（通常は "stdio"）

### 環境変数
- 機密情報（APIキーなど）は環境変数として設定
- サーバーごとに `.env` ファイルを作成し、`.gitignore` に追加
- 環境変数の命名規則は各サーバーのドキュメントに従う

## GitHub MCPサーバーの利用

### セットアップ
1. GitHub Personal Access Token (PAT) を取得
   - [GitHub設定ページ](https://github.com/settings/tokens)から作成
   - 必要なスコープ: `repo`, `read:user`, `user:email`
   - トークンは安全に保管し、共有しない

2. 環境変数の設定
   - `mcp/github-server/.env` ファイルを作成
   - `GITHUB_TOKEN=your_token_here` を設定

3. サーバーのビルド
   ```bash
   cd mcp/github-server
   npm install
   npm run build
   ```

4. MCPサーバー設定の追加
   - `~/.cline/mcp-config.json` に設定を追加（上記の設定例参照）
   - パスは絶対パスで指定

### 利用可能なツール
- `get_repo_info`: リポジトリ情報の取得
- `create_issue`: イシューの作成
- `list_issues`: イシュー一覧の取得
- `create_pull_request`: プルリクエストの作成
- `list_pull_requests`: プルリクエスト一覧の取得

### 使用ガイドライン
- APIレート制限に注意（1時間あたり5000リクエスト）
- 大量のリクエストを短時間に発行しない
- 機密情報や個人情報を含むリポジトリへのアクセスは最小限に
- 不要なコミットやプルリクエストを作成しない

## カスタムMCPサーバーの開発

### 基本構造
- MCPサーバーは以下の2つの主要コンポーネントを提供:
  1. **ツール (Tools)**: LLMが実行できるアクション
  2. **リソース (Resources)**: LLMがアクセスできるデータソース

### サーバー実装のガイドライン
- TypeScriptでの実装を推奨
- 適切なエラーハンドリングを実装
- レート制限やタイムアウト処理を考慮
- 詳細なログ出力
- ユニットテストの作成

### ツール定義
- 各ツールは入力スキーマを明確に定義
- 必須パラメータと任意パラメータを区別
- 戻り値の形式を文書化
- 例:
```typescript
{
  name: "get_weather",
  description: "指定した都市の天気情報を取得します",
  inputSchema: {
    type: "object",
    properties: {
      city: {
        type: "string",
        description: "都市名"
      },
      units: {
        type: "string",
        enum: ["metric", "imperial"],
        description: "温度単位（metric: 摂氏, imperial: 華氏）",
        default: "metric"
      }
    },
    required: ["city"]
  }
}
```

### リソース定義
- URIベースのアクセス方法を定義
- キャッシュ戦略を検討
- アクセス制御を実装

## セキュリティとプライバシー

### セキュリティ対策
- APIキーや認証情報は環境変数として管理
- 機密情報をコードにハードコーディングしない
- 定期的にライブラリを更新し、脆弱性に対応
- 入力値のバリデーションを徹底

### プライバシー対策
- 個人情報や機密データへのアクセスを最小限に
- データの保持期間を明確に設定
- 不要なデータは速やかに削除
- ユーザーの同意を得た範囲内でのみデータを利用

### アクセス制御
- 必要最小限の権限でAPIトークンを作成
- 読み取り専用操作と書き込み操作を分離
- 重要な操作（データ削除など）は常に手動承認を要求

## トラブルシューティング

### 一般的な問題と解決策
- サーバー起動失敗: パスやコマンドの確認、依存関係のインストール確認
- 認証エラー: APIキーや認証情報の再確認
- タイムアウト: ネットワーク接続の確認、タイムアウト設定の調整
- レート制限: リクエスト頻度の調整、キャッシュの活用

### ログの確認
- Clineのログディレクトリ: `~/.cline/logs`
- MCPサーバーのログ: 各サーバーの実装による
- デバッグモードの有効化: 詳細なログ出力を確認

### サポートリソース
- [MCP公式ドキュメント](https://github.com/modelcontextprotocol/mcp)
- [GitHub MCPサーバーリポジトリ](https://github.com/modelcontextprotocol/servers)
- コミュニティフォーラムやDiscussions

## ベストプラクティス

### 効率的な利用
- 複雑な処理はサーバー側で実装し、LLMの負荷を軽減
- 頻繁に使用するデータはキャッシュを活用
- バッチ処理を活用し、APIコール数を削減

### チーム開発での利用
- MCPサーバーの設定を共有し、環境の統一を図る
- 環境変数のテンプレート（`.env.example`）を提供
- サーバーの更新やバージョン管理を徹底

### パフォーマンス最適化
- 不要なAPIコールを削減
- レスポンスサイズを最適化
- 並列処理の活用
- 適切なキャッシュ戦略の実装

## 継続的な改善

### フィードバックの収集
- MCPサーバーの使用状況を監視
- ユーザーからのフィードバックを収集
- パフォーマンスメトリクスの分析

### 更新と拡張
- 新しいAPIやサービスへの対応
- 既存機能の改善
- セキュリティ対策の強化
- ドキュメントの充実
