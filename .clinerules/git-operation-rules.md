# Cline Git操作ルール

## 基本原則

- **コミットは論理的な単位で行う**
- **コミットメッセージは明確で詳細に記述する**
- **プッシュ前に必ずローカルでテストを実行する**
- **機密情報をリポジトリにコミットしない**
- **大きなバイナリファイルはGit LFSを使用する**

## 日常的なGit操作フロー

### 作業開始時

```bash
# リモートの最新変更を取得
git fetch origin

# 開発ブランチの最新状態に更新
git checkout develop
git pull origin develop

# 作業用ブランチを作成
git checkout -b feature/新機能名
```

### 作業中

```bash
# 変更状態の確認
git status

# 変更内容の確認
git diff

# ステージングに追加
git add <ファイル名>  # 特定のファイルを追加
git add .            # すべての変更をステージング

# 変更をコミット
git commit -m "✨ feat: 機能の追加"
```

### 作業完了時

```bash
# リモートの最新状態を取得
git fetch origin

# 開発ブランチの変更を取り込む（リベース）
git checkout develop
git pull origin develop
git checkout feature/新機能名
git rebase develop

# コンフリクトがあれば解決後
git rebase --continue

# リモートにプッシュ
git push origin feature/新機能名
```

## コンフリクト解決手順

1. コンフリクトが発生したファイルを確認
   ```bash
   git status
   ```

2. コンフリクトマーカーを含むファイルを編集して競合を解決
   ```
   <<<<<<< HEAD
   現在のブランチの内容
   =======
   マージするブランチの内容
   >>>>>>> feature/branch-name
   ```

3. 解決したファイルをステージングに追加
   ```bash
   git add <解決したファイル>
   ```

4. リベースまたはマージを続行
   ```bash
   git rebase --continue
   # または
   git merge --continue
   ```

## リベースとマージの使い分け

### リベース（Rebase）を使う場合
- 個人の作業ブランチを最新の開発ブランチに追いつかせる
- プルリクエスト前に履歴を整理する
- 小規模な変更や単一の機能開発

```bash
git checkout feature/branch
git rebase develop
```

### マージ（Merge）を使う場合
- 開発ブランチへの機能ブランチの統合
- リリースブランチの作成
- 複数人で作業している共有ブランチへの統合

```bash
git checkout develop
git merge --no-ff feature/branch
```

## タグ付けのルール

### セマンティックバージョニング
- メジャーバージョン: 互換性のない変更
- マイナーバージョン: 後方互換性のある機能追加
- パッチバージョン: 後方互換性のあるバグ修正

### タグの作成

```bash
# 注釈付きタグの作成
git tag -a v1.0.0 -m "バージョン1.0.0リリース"

# タグのプッシュ
git push origin v1.0.0

# すべてのタグをプッシュ
git push origin --tags
```

## Gitフックの活用

### pre-commit フック
- コードスタイルチェック
- 構文エラーチェック
- 単体テストの実行
- 禁止コミットパターンのチェック

### pre-push フック
- 統合テストの実行
- ビルド検証
- セキュリティチェック

### commit-msg フック
- コミットメッセージの形式チェック
- チケット番号の存在確認

## 高度なGit操作

### 特定のコミットの取り消し

```bash
# 直前のコミットを修正
git commit --amend

# 特定のコミットを取り消す新しいコミットを作成
git revert <コミットハッシュ>

# 履歴を書き換える（共有ブランチでは使用禁止）
git reset --hard <コミットハッシュ>
```

### ブランチの整理

```bash
# マージ済みのローカルブランチを削除
git branch --merged | grep -v "\*" | xargs -n 1 git branch -d

# リモートで削除されたブランチの参照を削除
git fetch --prune
```

### 一時的な作業の退避

```bash
# 作業内容を一時保存
git stash save "作業中の内容"

# 保存した作業の一覧
git stash list

# 最新の退避した作業を復元
git stash pop

# 特定の退避した作業を復元
git stash apply stash@{n}

# 退避した作業を削除
git stash drop stash@{n}
```

## トラブルシューティング

### コミット履歴の確認

```bash
# コミット履歴の表示
git log

# グラフィカルに履歴を表示
git log --graph --oneline --all

# 特定ファイルの履歴
git log --follow <ファイル名>
```

### 変更の追跡

```bash
# 特定の行の変更履歴を表示
git blame <ファイル名>

# ブランチ間の差分を表示
git diff branch1..branch2

# コミット間の差分を表示
git diff <コミットハッシュ1>..<コミットハッシュ2>
```

### 一般的な問題と解決策

1. **プッシュが拒否される**
   - リモートの変更を取り込んでから再度プッシュ
   ```bash
   git pull --rebase origin <ブランチ名>
   git push origin <ブランチ名>
   ```

2. **間違ったブランチでコミットした**
   - 変更を新しいブランチに移動
   ```bash
   git branch 新ブランチ名
   git reset --hard origin/<元のブランチ名>
   git checkout 新ブランチ名
   ```

3. **大きなファイルをコミットしてしまった**
   - Git履歴から大きなファイルを削除
   ```bash
   git filter-branch --force --tree-filter 'rm -f path/to/large/file' HEAD
   git push origin --force
   ```

## セキュリティ対策

### 機密情報の管理
- `.gitignore` に機密ファイルを追加
- 環境変数ファイル（.env）は常に `.gitignore` に追加
- 誤ってコミットした機密情報は履歴から完全に削除

### 認証情報の保護
- SSH鍵を使用した認証を推奨
- 個人アクセストークンは定期的に更新
- 認証情報をハードコーディングしない

## Git設定のベストプラクティス

### グローバル設定

```bash
# ユーザー情報の設定
git config --global user.name "あなたの名前"
git config --global user.email "あなたのメール"

# エディタの設定
git config --global core.editor "vim"

# 改行コードの自動変換を無効化
git config --global core.autocrlf false

# プル時のリベースをデフォルトに
git config --global pull.rebase true

# マージコミットの作成を強制
git config --global merge.ff false
```

### エイリアスの活用

```bash
# ステータス確認のショートカット
git config --global alias.st status

# コミットのショートカット
git config --global alias.ci commit

# ブランチ一覧のショートカット
git config --global alias.br branch

# ログのグラフ表示
git config --global alias.lg "log --graph --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset' --abbrev-commit --date=relative"
```

## チーム開発でのGit活用

### コードレビュープロセス
- プルリクエストは小さく保つ
- レビュー前にセルフレビューを実施
- コメントには具体的な改善案を含める
- 承認後は速やかにマージする

### 継続的インテグレーション
- プルリクエストごとに自動テストを実行
- マージ前にビルドの成功を確認
- テストカバレッジの維持・向上を目指す

### ドキュメント管理
- READMEの更新を忘れない
- 重要な変更はCHANGELOGに記録
- コードコメントとドキュメントの一貫性を保つ

## まとめ

効果的なGit操作は、チーム開発の生産性と品質を大きく向上させます。このルールを遵守することで、コードの履歴を明確に保ち、チームメンバー間の協力をスムーズにし、プロジェクトの長期的な保守性を高めることができます。定期的にこのルールを見直し、チームの経験に基づいて改善していくことが重要です。
