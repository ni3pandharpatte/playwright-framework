import { test, chromium } from '@playwright/test'
import POManager from '../page-objects/POManager.js'
const placeOrderTestData = require('../test-data/client-app-po.testdata.json')
//Json -> string -> js object
const orderSet = JSON.parse(JSON.stringify(placeOrderTestData))

for (const data of orderSet) {
    test(`client app validation for ${data.productName}`, async () => {
        const browser = await chromium.launch()
        const context = await browser.newContext()
        const page = await context.newPage()
        const poManager = new POManager(page)

        const loginPage = poManager.getLoginPage()
        await loginPage.goto()
        await loginPage.validLogin(data.username, data.password)

        const dashboardPage = poManager.getDashboardPage()
        const allTitles = await dashboardPage.getAllCardsTitle()
        console.log(allTitles)
        await dashboardPage.addProductToCart(data.productName)
        await page.pause()
    })
}