import { test, expect, chromium, webkit } from '@playwright/test'

test('validate page title', async () => {
    const browser = await chromium.launch()
    const context = await browser.newContext()
    const page = await context.newPage()
    await page.goto('https://google.co.in')

    const pageTitle = await page.title()
    expect(pageTitle).toStrictEqual('Google')
    await expect(page).toHaveTitle('Google')
})
