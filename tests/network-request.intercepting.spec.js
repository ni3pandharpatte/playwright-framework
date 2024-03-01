import { test, expect } from '@playwright/test'


test('network intercepting', async ({ browser }) => {
    const context = await browser.newContext({ storageState: 'loginState.json' })
    const page = await context.newPage()

    await page.goto('https://rahulshettyacademy.com/client/')
    const fakePayloadOfOrders = { data: [], message: "No Orders" }
    await page.route('https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/620c7bf148767f1f1215d2ca',
        async (route) => {
            route.fulfill({
                body: JSON.stringify(fakePayloadOfOrders),
            })
        }
    )

    await page.locator('button[routerlink*="myorders"]').click()
    const emptyOrderListMessage = await page.locator('[class="mt-4 ng-star-inserted"]').textContent()
    expect(emptyOrderListMessage).toContain('You have No Orders to show at this time')
    // await page.pause()
})