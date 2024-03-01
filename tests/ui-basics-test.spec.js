import { test, expect, chromium } from '@playwright/test'

test.describe('Jai Ganesh', async function () {
    test('ridhi', async function ({ browser }) {
        const context = await browser.newContext();
        const page = await context.newPage();
        await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
        console.log('Jai Ganesh!');
        const pageTitle = await page.title();
        // expect(pageTitle).toBe('LoginPage Practise | Rahul Shetty Academy');
        await expect(page).toHaveTitle('LoginPage Practise | Rahul Shetty Academy');
        console.log(pageTitle);
        page.close();
    })

    test('sidhi', async ({ page }) => {
        await page.goto('https://www.google.co.in/');
        const pageTitle = await page.title();
        expect(pageTitle).toBe('Google');
        console.log(pageTitle);
        page.close();
    })

    test('login end to end', async () => {
        const browser = await chromium.launch()
        const context = await browser.newContext()
        const page = await context.newPage()

        const usernameInput = page.locator('[id="username"]')
        const passwordInput = page.locator('[type=password]')
        const signInButton = page.locator('[id="signInBtn"]')
        const cardTitles = page.locator('.card-body a')

        await page.goto('https://rahulshettyacademy.com/loginpagePractise/')

        await usernameInput.fill("rahulshetty")
        await passwordInput.fill('learning')
        await signInButton.click();

        await expect(page.locator('[style*="block"]')).toContainText('Incorrect')

        await page.waitForTimeout(2000)
        await usernameInput.clear()
        await usernameInput.fill("rahulshettyacademy")
        await passwordInput.clear()
        await passwordInput.fill("learning")
        await signInButton.click();

        const aText1 = await cardTitles.first().textContent()
        const aText2 = await cardTitles.nth(2).textContent()
        console.log(aText1)
        console.log(aText2)

        const allTitles = await cardTitles.allTextContents()
        console.log(allTitles)

    })

    test('static select dropdown and radioButtons', async () => {
        const browser = await chromium.launch()
        const context = await browser.newContext()
        const page = await context.newPage()

        const usernameInput = page.locator('[id="username"]')
        const passwordInput = page.locator('[type=password]')
        const selectDropdown = page.locator('select.form-control')
        const userRadioButton = page.locator('input[value="user"]')

        await page.goto('https://rahulshettyacademy.com/loginpagePractise/')

        await usernameInput.fill("rahulshetty")
        await passwordInput.fill('learning')
        await selectDropdown.selectOption({ value: 'consult' })
        await userRadioButton.click()

        await page.locator('#okayBtn').click()
        // await page.pause()
    })

    test('child window handles / multiple tabs', async () => {
        const browser = await chromium.launch()
        const context = await browser.newContext()
        const page = await context.newPage()

        await page.goto('https://rahulshettyacademy.com/loginpagePractise/')
        const documentLink = page.locator('[href*="documents-request"]')

        //switch to child tab using waitForEvent which triggers when any new pages creates
        // Here documentLink.click() opens new tab so waitForEvent return that page
        // Promise.all is used because we want these steps must fulfill then only next flow start to execute
        const [newPage] = await Promise.all([
            context.waitForEvent('page'),
            documentLink.click()  // This click action opens the link in new Tab
        ])

        const text = await newPage.locator('.red').textContent()
        const arrayText = text.split('@')[1]
        const domain = arrayText.split(' ')[0]

        //Again back to the parent window
        const usernameInput = page.locator('[id="username"]')
        await usernameInput.fill(domain)
    })

    test('locators in playwright',async ()=>{
        const browser = await chromium.launch()
        const context = await browser.newContext()
        const page = await context.newPage()

        await page.goto('https://rahulshettyacademy.com/angularpractice/')
        await page.getByLabel('Check me out if you Love IceCreams!').click()
        await page.getByLabel('Employed').click()
        await page.getByLabel('Gender').selectOption('Female')
        await page.pause()
    })
})