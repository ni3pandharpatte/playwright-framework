class DashboardPage {
    constructor(page) {
        this.page = page
        this.cardTitles = page.locator('.card-body b')
        this.cardLocator = page.locator('[class="card"]')
    }

    async getAllCardsTitle() {
        // await page.waitForLoadState('networkidle')
        await this.cardTitles.first().waitFor()
        return this.cardTitles.allTextContents()
    }

    async addProductToCart(productName) {
        const cards = await this.cardLocator.all()
        await Promise.all(cards.map(async (card) => {
            const pName = await card.locator('b').textContent()
            if (pName === productName) {
                await card.locator('[class="fa fa-shopping-cart"]').click()
            }
        }))
        console.log(cards.length)
    }
}

export default DashboardPage