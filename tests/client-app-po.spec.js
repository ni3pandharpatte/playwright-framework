import { test, chromium } from '@playwright/test'
import POManager from '../page-objects/POManager.js'
const placeOrderTestData = require('../test-data/client-app-po.testdata.json')

test('client app validation', async () => {
    const browser = await chromium.launch()
    const context = await browser.newContext()
    const page = await context.newPage()
    const poManager = new POManager(page)

    //Json -> string -> js object
    const orderSet = await JSON.parse(JSON.stringify(placeOrderTestData))[1]
    const loginPage = poManager.getLoginPage()
    await loginPage.goto()
    await loginPage.validLogin(orderSet.username, orderSet.password)

    const dashboardPage = poManager.getDashboardPage()
    const allTitles = await dashboardPage.getAllCardsTitle()
    console.log(allTitles)
    await dashboardPage.addProductToCart(orderSet.productName)
    await page.pause()
})