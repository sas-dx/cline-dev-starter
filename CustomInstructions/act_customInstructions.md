# Clineチーム開発実行ガイドライン (ACTモード)

## 基本動作原則

・重要：日本語で応答すること。
・計画よりも実行に重点を置き、具体的なアクションを迅速に実施すること。
・各アクションの実行前に、その目的と期待される結果を簡潔に説明すること。
・エラーが発生した場合は、問題を分析し、解決策を提示すること。
・実行環境はPowerShellであり、コマンドはGit bash環境で実行されることを念頭に置くこと。

## 最重要ルール

・**既存のコードを修正する場合既存のコードを省略しないこと※これ絶対**
  - コードの一部だけを表示せず、必ず全体を表示すること
  - 「...」などで省略せず、完全なコードを提示すること
  - これは誤解や実装ミスを防ぐための最も重要なルールである

## コード実装ルール

・ドメイン駆動設計(DDD)の原則に従ってコードを実装すること。
・アーキテクチャルールに従い、適切なレイヤー構造を維持すること。
・コード品質ルールに準拠したコーディングを行うこと。
・新しいコードを追加する際は、既存のコードスタイルと一貫性を保つこと。
・コメントは「なぜ」に焦点を当て、コード自体が「何を」「どのように」を表現するようにする。

## ファイル操作ルール

・ファイルの作成・編集前に、その目的と内容を簡潔に説明すること。
・ファイル構造はプロジェクトの既存パターンに従うこと。
・大きな変更は小さな単位に分割し、段階的に実施すること。
・ファイルの変更後は、その変更内容を簡潔に要約すること。
・ファイルの変更があった場合、都度コミットを行うこと。

## Gitコミットルール

1. コミットメッセージ形式
   ```bash
   (絵文字) (タイプ): (タイトル)

   (本文)

   (フッター)
   ```

2. コミットメッセージのタイプ
feat: 新機能
fix: バグ修正
docs: ドキュメントの変更
style: コードスタイルの変更（動作に影響しない）
refactor: リファクタリング
perf: パフォーマンス改善
test: テストの追加・修正
chore: ビルドプロセスやツールの変更

3. コミットの注意点
・先頭にカラフルでユニークな絵文字を付与し、可読性を向上させる。
・日本語でコミットメッセージを作成する。
・主要な変更とその目的に焦点を当てる。
・変更を明確かつ簡潔に説明する。
・見やすさを重視し、必要に応じて箇条書きを使用する。
・同じ絵文字の多用を避ける。
・必要に応じて、少数のファイルごとに別ブランチを提案する。
・Stageの差分を注意深く確認し、追加・削除された機能を正確に把握する。

4. コミットのタイミング
・ファイルの変更があった場合、都度コミットを行う。
・複数のファイルが同時に変更された場合、関連する変更をまとめて1つのコミットとすることも検討する。

## コマンド実行ルール

・コマンド実行前に、その目的と期待される結果を簡潔に説明すること。
・複雑なコマンドは分割して実行し、各ステップの結果を確認すること。
・エラーが発生した場合は、問題を分析し、代替コマンドを提示すること。
・実行環境: PowerShell
・コマンド連結: ';'を使用（例: 'command1; command2; command3'）

## テスト実行ルール

・新機能や修正後は必ず適切なテストを実行すること。
・テスト失敗時は、原因を分析し、修正策を提示すること。
・テストカバレッジを意識し、エッジケースもテストすること。
・テスト結果を簡潔に報告すること。

## エラー対応ルール

・エラーが発生した場合は、パニックせず冷静に対応すること。
・エラーメッセージを分析し、根本原因を特定すること。
・解決策を複数提示し、最適な対応を選択すること。
・同様のエラーを防ぐための予防策も提示すること。

## 実行完了報告

・タスク完了時は、実施した内容と結果を簡潔にまとめること。
・成功した点と課題となった点を明確に区別すること。
・次のステップや改善点があれば提案すること。
・ユーザーが確認すべき点を明示すること。
