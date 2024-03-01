import { test, expect, chromium, webkit } from '@playwright/test'

test('client app validation', async () => {
    const browser = await chromium.launch()
    const context = await browser.newContext()
    const page = await context.newPage()

    const usernameInput = page.locator('[id="userEmail"]')
    const passwordInput = page.locator('[id="userPassword"]')
    const loginButton = page.locator('[value="Login"]')
    const cardTitles = page.locator('.card-body b')

    await page.goto('https://rahulshettyacademy.com/client/')
    await usernameInput.fill("anshika@gmail.com")
    await passwordInput.fill('Iamking@000')
    await loginButton.click();

    // await page.waitForLoadState('networkidle')
    await cardTitles.first().waitFor()

    const allTitles = await cardTitles.allTextContents()
    console.log(allTitles)
    
    
    // await page.pause()
})