import { test } from '@playwright/test'

test.beforeAll(async ({ browser }) => {
    const context = await browser.newContext()
    const page = await context.newPage()

    await page.goto('https://rahulshettyacademy.com/client/')
    await page.locator('[id="userEmail"]').fill("anshika@gmail.com")
    await page.locator('[id="userPassword"]').fill('Iamking@000')
    await page.locator('[value="Login"]').click();

    await context.storageState({ path: 'loginState.json' })
})

test('client app validation', async ({ browser }) => {
    const contextWithStorageState = await browser.newContext({ storageState: 'loginState.json' })
    const page = await contextWithStorageState.newPage()
    await page.goto('https://rahulshettyacademy.com/client/')
    const cardTitles = page.locator('.card-body b')
    await cardTitles.first().waitFor()
    console.log(await cardTitles.allTextContents())
})