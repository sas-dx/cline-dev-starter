import { test, expect } from '@playwright/test';

/**
 * サンプルテストスイート
 */
test.describe('サンプルテスト', () => {
  test('ホームページのタイトルが正しいこと', async ({ page }) => {
    // ホームページに移動
    await page.goto('/');
    
    // タイトルを検証
    await expect(page).toHaveTitle(/Cline 開発スターターキット/);
  });
  
  test('ナビゲーションメニューが表示されること', async ({ page }) => {
    // ホームページに移動
    await page.goto('/');
    
    // ナビゲーションメニューが表示されていることを確認
    const nav = page.locator('nav');
    await expect(nav).toBeVisible();
    
    // メニュー項目が存在することを確認
    const menuItems = nav.locator('a');
    await expect(menuItems).toHaveCount(3);
  });
  
  test('ログインフォームが機能すること', async ({ page }) => {
    // ログインページに移動
    await page.goto('/login');
    
    // フォームに入力
    await page.fill('input[name="email"]', 'test@example.com');
    await page.fill('input[name="password"]', 'password');
    
    // フォームを送信
    await page.click('button[type="submit"]');
    
    // リダイレクト先を確認
    await expect(page).toHaveURL(/dashboard/);
    
    // ログイン後のユーザー名が表示されていることを確認
    const userName = page.locator('.user-name');
    await expect(userName).toContainText('Test User');
  });
});

/**
 * APIテストの例
 */
test.describe('API テスト', () => {
  test('ユーザーリストAPIが正しく動作すること', async ({ request }) => {
    // APIリクエストを送信
    const response = await request.get('/api/users');
    
    // レスポンスのステータスコードを確認
    expect(response.status()).toBe(200);
    
    // レスポンスのJSONを取得
    const data = await response.json();
    
    // データの構造を確認
    expect(data).toHaveProperty('users');
    expect(Array.isArray(data.users)).toBeTruthy();
    expect(data.users.length).toBeGreaterThan(0);
  });
});

/**
 * モバイル向けテストの例
 */
test.describe('モバイル表示テスト', () => {
  // モバイルビューポートでのみ実行
  test.use({ viewport: { width: 375, height: 667 } });
  
  test('モバイルメニューが正しく表示されること', async ({ page }) => {
    // ホームページに移動
    await page.goto('/');
    
    // ハンバーガーメニューが表示されていることを確認
    const menuButton = page.locator('.hamburger-menu');
    await expect(menuButton).toBeVisible();
    
    // メニューをクリック
    await menuButton.click();
    
    // モバイルナビゲーションが表示されることを確認
    const mobileNav = page.locator('.mobile-nav');
    await expect(mobileNav).toBeVisible();
  });
});
