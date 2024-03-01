import { test, expect, chromium, request } from '@playwright/test'

const loginPayload = {
    userEmail: "anshika@gmail.com",
    userPassword: "Iamking@000"
}

const orderPayload = {
    orders: [
        {
            country: "India",
            productOrderedId: "6581ca979fd99c85e8ee7faf"
        }
    ]
}

let loginToken
test.beforeAll(async () => {
    const apiContext = await request.newContext()
    //Login using API
    const loginResponse = await apiContext.post(
        'https://www.rahulshettyacademy.com/api/ecom/auth/login',
        {
            // data: {
            //     userEmail: "anshika@gmail.com",
            //     userPassword: "Iamking@000"
            // },
            data: loginPayload,
        });
    expect(loginResponse.ok()).toBeTruthy();
    const loginResponseJson = await loginResponse.json();
    loginToken = await loginResponseJson.token;
    console.log(loginToken);

    //Order using API
    const orderResponse = await apiContext.post('https://www.rahulshettyacademy.com/api/ecom/order/create-order',
        {
            headers: {
                Authorization: loginToken,
            },
            data: orderPayload
        });
    expect(orderResponse.ok()).toBeTruthy();
    const orderResponseJson = await orderResponse.json();
    const orderId = await orderResponseJson.orders[0];
    console.log(orderId);
    const message = await orderResponseJson.message;
    console.log(message);
})

test('login using API and then client app', async () => {
    const browser = await chromium.launch()
    const context = await browser.newContext()
    const page = await context.newPage()

    const cardTitles = page.locator('.card-body b')

    await page.addInitScript((value) => {
        window.localStorage.setItem('token', value)
    }, loginToken)

    await page.goto('https://rahulshettyacademy.com/client/')
    await cardTitles.first().waitFor()
    const allTitles = await cardTitles.allTextContents()
    console.log(allTitles)

    await page.pause()

})