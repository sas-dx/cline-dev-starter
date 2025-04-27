import { FullConfig } from '@playwright/test';

/**
 * グローバルセットアップ
 * テスト実行前に一度だけ実行される
 * @param config Playwrightの設定
 */
async function globalSetup(config: FullConfig) {
  // 環境変数の設定
  process.env.TEST_ENV = process.env.CI ? 'ci' : 'local';
  
  // ログイン状態の保存など、テスト全体で共有したい処理を記述
  console.log('グローバルセットアップを実行中...');
  console.log(`テスト環境: ${process.env.TEST_ENV}`);
  console.log(`ベースURL: ${config.projects[0].use.baseURL}`);
  
  // 認証情報の設定例
  // const authFile = '.auth/user.json';
  // const browser = await chromium.launch();
  // const page = await browser.newPage();
  // await page.goto('http://localhost:3000/login');
  // await page.fill('#email', 'test@example.com');
  // await page.fill('#password', 'password');
  // await page.click('button[type="submit"]');
  // await page.waitForURL('http://localhost:3000/dashboard');
  // await page.context().storageState({ path: authFile });
  // await browser.close();
}

export default globalSetup;
