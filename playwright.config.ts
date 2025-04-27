import { defineConfig, devices } from '@playwright/test';

/**
 * Playwrightの設定ファイル
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './tests',
  /* テスト実行の最大タイムアウト */
  timeout: 30 * 1000,
  /* テスト実行ごとの期待値 */
  expect: {
    /**
     * 要素が表示されるまでの最大待機時間
     * @see https://playwright.dev/docs/test-assertions
     */
    timeout: 5000
  },
  /* テスト実行時のレポート形式 */
  reporter: [
    ['html'],
    ['junit', { outputFile: 'test-results/junit-report.xml' }],
  ],
  /* 並列実行の設定 */
  fullyParallel: true,
  /* 失敗したテストの再試行回数 */
  retries: process.env.CI ? 2 : 0,
  /* テストの並列実行数 */
  workers: process.env.CI ? 1 : undefined,
  /* テスト実行前に実行するファイル */
  globalSetup: require.resolve('./tests/global-setup'),
  /* 各テストの使用状況を収集 */
  use: {
    /* テスト実行時のベースURL */
    baseURL: 'http://localhost:3000',
    /* すべてのテストでトレースを収集 */
    trace: 'on-first-retry',
    /* スクリーンショットを撮影 */
    screenshot: 'only-on-failure',
    /* テスト実行時のビデオを録画 */
    video: 'on-first-retry',
  },

  /* プロジェクト別の設定 */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
    /* モバイルブラウザのテスト */
    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'] },
    },
    {
      name: 'Mobile Safari',
      use: { ...devices['iPhone 12'] },
    },
  ],

  /* ローカル開発サーバーの設定 */
  webServer: {
    command: 'npm run start',
    port: 3000,
    reuseExistingServer: !process.env.CI,
  },
});
