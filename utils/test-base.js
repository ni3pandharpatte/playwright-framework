import { test } from '@playwright/test';

export const myTest = test.extend({
    placeOrderTestData: {
        "username": "anshika@gmail.com",
        "password": "Iamking@000",
        "productName": "ADIDAS ORIGINAL"
    }
})

export const expect = myTest.expect;