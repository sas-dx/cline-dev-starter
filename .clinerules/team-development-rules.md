# Cline チーム開発ルール

## Git ワークフローとブランチ戦略

### ブランチ命名規則
- `main`: 本番環境用のブランチ
- `develop`: 開発環境用のブランチ
- `feature/[機能名]`: 新機能開発用のブランチ
- `bugfix/[バグID]`: バグ修正用のブランチ
- `hotfix/[緊急修正名]`: 緊急修正用のブランチ
- `release/[バージョン]`: リリース準備用のブランチ

### コミットメッセージ規約
- 形式: `[絵文字] [タイプ]: [タイトル]`
- タイプ:
  - `feat`: 新機能
  - `fix`: バグ修正
  - `docs`: ドキュメントのみの変更
  - `style`: コードの意味に影響を与えない変更（空白、フォーマット、セミコロンの欠落など）
  - `refactor`: バグ修正や機能追加ではないコード変更
  - `perf`: パフォーマンスを向上させるコード変更
  - `test`: 不足しているテストの追加や既存のテストの修正
  - `chore`: ビルドプロセスやドキュメント生成などの補助ツールやライブラリの変更
- 例: `✨ feat: ユーザー認証機能の実装`

### プルリクエストのプロセス
1. 作業前に最新の `develop` ブランチを取得
2. 適切な命名規則に従ったブランチを作成
3. 小さな単位で頻繁にコミット
4. プルリクエスト作成前に最新の `develop` ブランチをマージ
5. プルリクエストのタイトルと説明に変更内容を明記
6. レビュアーを指定
7. CI テストが通過していることを確認
8. レビュー後の修正は同じブランチにコミット
9. 承認後、`develop` ブランチにマージ

## コードレビュープロセス

### レビューの目的
- コード品質の向上
- バグの早期発見
- 知識の共有
- チームの技術力向上

### レビュー基準
- 機能要件を満たしているか
- コーディング規約に準拠しているか
- テストが適切に書かれているか
- セキュリティ上の問題がないか
- パフォーマンスに問題がないか
- ドキュメントが更新されているか

### レビューのエチケット
- 建設的なフィードバックを心がける
- コードではなく問題点に焦点を当てる
- 具体的な改善案を提示する
- ポジティブな点も指摘する
- 迅速にレビューを行う（24時間以内が理想）

## チーム内コミュニケーション

### 定例ミーティング
- デイリースタンドアップ（15分以内）
  - 昨日やったこと
  - 今日やること
  - 障害となっていること
- 週次振り返り（1時間）
  - 進捗確認
  - 問題点の共有と解決策の検討
  - 次週の計画

### コミュニケーションツール
- チャット: 日常的な質問や情報共有
- ビデオ会議: 複雑な議論やペアプログラミング
- 課題管理ツール: タスクの割り当てと進捗管理
- ドキュメント共有: 設計書や仕様書の共同編集

### 情報共有のルール
- 技術的な発見や解決策は全員に共有
- ドキュメントは常に最新の状態を維持
- 決定事項は必ず記録に残す
- 不明点はすぐに質問する文化を促進

## 開発環境の統一

### 環境構築
- 開発環境のセットアップ手順をドキュメント化
- Docker などのコンテナ技術を活用して環境の差異を最小化
- 必要なツールとバージョンを明示
- 自動化スクリプトの提供

### エディタ設定
- コードフォーマッターの統一
- リンターの設定共有
- エディタの推奨設定とプラグイン
- .editorconfig ファイルの活用

### 依存関係の管理
- パッケージマネージャーの使用ルール
- バージョン固定の方針
- 依存関係の更新頻度とプロセス
- セキュリティ脆弱性のチェック

## CI/CD パイプライン

### 継続的インテグレーション
- プッシュごとに自動テスト実行
- コードスタイルチェック
- 静的解析
- テストカバレッジの測定
- ビルド検証

### 継続的デリバリー
- ステージング環境への自動デプロイ
- 本番環境へのデプロイプロセス
- ロールバック手順
- デプロイ履歴の管理

### 品質ゲート
- マージ前に満たすべき条件
- テストカバレッジの最低基準
- パフォーマンス基準
- セキュリティスキャン

## 障害対応とインシデント管理

### インシデント報告
- 発生した問題の詳細な記録
- 影響範囲の特定
- 優先度と緊急度の評価
- 担当者のアサイン

### トラブルシューティングプロセス
- 問題の切り分け手順
- ログ収集と分析
- 一時的な回避策の検討
- 根本原因の特定

### 再発防止
- 恒久的な解決策の実装
- テストケースの追加
- ドキュメントの更新
- 振り返りと学習点の共有

## ドメイン駆動設計 (DDD) の原則

### 値オブジェクトとエンティティの区別
- **値オブジェクト**：同一性がなく、属性値のみで識別される不変のオブジェクト
  - 例：住所、金額、日付範囲など
  - 常にイミュータブル（不変）に設計し、副作用を持たない
  - 等価性は属性値の比較で判断

- **エンティティ**：一意の識別子を持ち、ライフサイクルを通じて同一性が保たれるオブジェクト
  - 例：ユーザー、注文、商品など
  - 識別子（ID）によって同一性を判断
  - 状態が変化しても同じエンティティとして扱われる

### 集約による整合性の保証
- 関連するエンティティと値オブジェクトをグループ化し、一貫性を保つ
- 集約ルート（Aggregate Root）を通じてのみ集約内のオブジェクトにアクセス
- トランザクション境界として機能し、不変条件を維持
- 集約間の参照は識別子を使用し、直接参照を避ける

### リポジトリによるデータアクセスの抽象化
- 永続化の詳細を隠蔽し、ドメインモデルに集中できるようにする
- 集約単位でデータの取得・保存を行う
- インターフェースを定義し、実装の詳細から分離
- クエリオブジェクトを使用して複雑な検索条件を表現

## コーディング規約

### 一般原則
- DRY (Don't Repeat Yourself) の原則を遵守
- SOLID 原則に従ったコード設計
- 命名規則の一貫性を保つ
- コメントは「なぜ」に焦点を当て、コード自体が「何を」「どのように」を表現

### 言語・フレームワーク固有のガイドライン
- 各言語やフレームワークの公式スタイルガイドに準拠
- プロジェクト固有の規約がある場合はそれを優先
- 静的解析ツールを活用してコード品質を維持

## テスト戦略

### テスト階層
- ユニットテスト：個々の関数やクラスの動作を検証
- 統合テスト：コンポーネント間の相互作用を検証
- E2Eテスト：ユーザーの視点からシステム全体の動作を検証

### テスト駆動開発 (TDD)
- 可能な限り、テストファーストのアプローチを採用
- レッド（失敗するテストを書く）→グリーン（テストを通す）→リファクタリングのサイクルを実践

## 継続的改善

### 技術的負債の管理
- 技術的負債を特定し、可視化
- 計画的な返済戦略を立案
- 新機能開発とのバランスを取る

### 振り返りと改善
- スプリント終了時に振り返りを実施
- 良かった点、改善点を共有
- アクションアイテムを設定し、次のスプリントで実施
- プロセスや規約の定期的な見直し
