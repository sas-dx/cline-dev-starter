# Playwright テスト

このディレクトリには、[Playwright](https://playwright.dev/) を使用したE2Eテストが含まれています。

## セットアップ

### 1. Playwrightのインストール

```bash
# Playwrightをインストール
npm install -D @playwright/test

# ブラウザをインストール
npx playwright install
```

### 2. 型定義のインストール

TypeScriptでエラーが表示される場合は、Node.jsの型定義をインストールしてください。

```bash
npm install -D @types/node
```

## テストの実行

### すべてのテストを実行

```bash
npx playwright test
```

### 特定のブラウザでテストを実行

```bash
# Chromiumでのみテストを実行
npx playwright test --project=chromium

# Firefoxでのみテストを実行
npx playwright test --project=firefox

# WebKitでのみテストを実行
npx playwright test --project=webkit
```

### 特定のテストファイルを実行

```bash
npx playwright test tests/example.spec.ts
```

### UIモードでテストを実行

```bash
npx playwright test --ui
```

### テストレポートを表示

```bash
npx playwright show-report
```

## テストの作成

新しいテストを作成するには、`tests` ディレクトリに `.spec.ts` ファイルを作成します。

```typescript
import { test, expect } from '@playwright/test';

test('タイトルが正しいこと', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/Cline 開発スターターキット/);
});
```

## テストの構造

- `tests/global-setup.ts` - テスト実行前に一度だけ実行される設定
- `tests/example.spec.ts` - サンプルテスト
- `playwright.config.ts` - Playwrightの設定ファイル

## CI/CD との統合

GitHub Actionsを使用してテストを自動実行するための設定が `.github/workflows/playwright.yml` に含まれています。

この設定では、以下のタイミングでテストが実行されます：

- `master`、`main`、`develop` ブランチへのプッシュ時
- `master`、`main` ブランチへのプルリクエスト時
- 手動トリガー

## 詳細情報

- [Playwright 公式ドキュメント](https://playwright.dev/docs/intro)
- [Playwright API リファレンス](https://playwright.dev/docs/api/class-playwright)
- [Playwright テストアサーション](https://playwright.dev/docs/test-assertions)
