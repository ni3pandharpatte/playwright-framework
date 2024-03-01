import POManager from '../page-objects/POManager.js'
import { myTest } from '../utils/test-base.js'

myTest('demo', async ({ page, placeOrderTestData }) => {
    console.log(placeOrderTestData)
    const poManager = new POManager(page)
    const loginPage = poManager.getLoginPage()
    await loginPage.goto()
    await loginPage.validLogin(placeOrderTestData.username, placeOrderTestData.password)

    const dashboardPage = poManager.getDashboardPage()
    const allTitles = await dashboardPage.getAllCardsTitle()
    console.log(allTitles)
    await dashboardPage.addProductToCart(placeOrderTestData.productName)
})
