class LoginPage {
    constructor(page) {
        this.page = page
        this.usernameInput = page.locator('[id="userEmail"]')
        this.loginButton = page.locator('[value="Login"]')
        this.passwordInput = page.locator('[id="userPassword"]')
    }

    async goto() {
        await this.page.goto('https://rahulshettyacademy.com/client/')
    }

    async validLogin(userName, password) {
        await this.usernameInput.fill(userName)
        await this.passwordInput.fill(password)
        await this.loginButton.click();
    }
}

export default LoginPage;