import { test, expect } from '@playwright/test'

test('Browser navigation methods', async function ({ browser }) {
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('https://rahulshettyacademy.com/AutomationPractice/');
    await page.goto('https://google.co.in/')
    await page.goBack()
    await page.goForward()
})

test('confirm element visibility', async function ({ browser }) {
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('https://rahulshettyacademy.com/AutomationPractice/');
    await expect(page.locator('displayed-text')).toBeVisible()
    await page.locator('hide-textbox').click()
    await expect(page.locator('displayed-text')).toBeHidden()
})

test('javascript popup/dialog handling', async function ({ browser }) {
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('https://rahulshettyacademy.com/AutomationPractice/');

    page.on('dialog', (dialog) => dialog.accept())
    await page.locator('#confirmbtn').click()
})

test('handling frames', async function ({ browser }) {
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('https://rahulshettyacademy.com/AutomationPractice/');

    const framePage = page.frameLocator('[name="iframe-name"]')
    await framePage.locator('li [href="lifetime-access"]:visible').click()
    const subscribers = await framePage.locator('.text h2').textContent()
    expect(subscribers).toContain('13,522')
})