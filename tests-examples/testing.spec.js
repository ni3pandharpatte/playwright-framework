import { chromium, test } from '@playwright/test'
test('Testing', async function() {
    const browser = await chromium.launch();
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('https://www.lendingclub.com/apply/myinstantoffer');
    await page.getByPlaceholder('Enter your 12-digit code').fill('1234-5678-9012');
    await page.locator('[name="submit-button"]').click()
})