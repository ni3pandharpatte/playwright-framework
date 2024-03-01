import LoginPage from './LoginPage.js'
import DashboardPage from './DashboardPage.js'

class POManager {
    constructor(page) {
        this.loginPage = new LoginPage(page)
        this.dashboardPage = new DashboardPage(page)
    }

    getLoginPage = () => this.loginPage

    // getLoginPage() {
    //     return this.loginPage
    // }

    getDashboardPage() {
        return this.dashboardPage
    }
}
export default POManager