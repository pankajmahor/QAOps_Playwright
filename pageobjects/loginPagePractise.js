class LoginPagePractise {

    constructor(page) {
        this.page = page;
        this.usernameField = page.locator('#username');
        this.passwordField = page.locator('#password');
        this.adminRadio = page.locator('input[value="admin"]');
        this.userRadio = page.locator('input[value="user"]');
        this.termsCheckbox = page.locator('#terms');
        this.signInButton = page.locator('#signInBtn');
        this.cancelButton = page.locator('#cancelBtn');
        this.okayButton = page.locator('#okayBtn');
        this.userTypeDropdown = page.locator('select');
        this.loginForm = page.locator('#login-form');
    }

    async goTo() {
        await this.page.goto('https://rahulshettyacademy.com/loginpagePractise/');
        await this.page.waitForLoadState('domcontentloaded');
    }

    async enterUsername(username) {
        await this.usernameField.clear();
        await this.usernameField.fill(username);
        await this.usernameField.press('Tab');
    }

    async enterPassword(password) {
        await this.passwordField.clear();
        await this.passwordField.fill(password);
        await this.passwordField.press('Tab');
    }

    async selectAdminRole() {
        await this.adminRadio.check({ force: true });
    }

    async selectUserRole() {
        await this.userRadio.check({ force: true });
    }

    async selectUserType(userType) {
        await this.userTypeDropdown.selectOption(userType);
    }

    async acceptTermsAndConditions() {
        await this.termsCheckbox.check({ force: true });
    }

    async clickSignIn() {
        // Submit form using the submit() method
        await this.loginForm.evaluate(form => form.submit());
        
        await this.page.waitForTimeout(3000);
        await this.page.waitForLoadState('networkidle', { timeout: 15000 }).catch(() => {});
    }

    async signInWithCredentials(username, password, userType = 'Student', userRole = 'admin') {
        await this.enterUsername(username);
        await this.enterPassword(password);
        
        if (userRole.toLowerCase() === 'user') {
            await this.selectUserRole();
        } else {
            await this.selectAdminRole();
        }
        
        await this.selectUserType(userType);
        await this.acceptTermsAndConditions();
        await this.clickSignIn();
    }

    async clickCancel() {
        await this.cancelButton.click();
    }

    async clickOkay() {
        await this.okayButton.click();
    }

    async isSignInButtonVisible() {
        return await this.signInButton.isVisible();
    }

    async isSignInButtonEnabled() {
        return await this.signInButton.isEnabled();
    }

    async getSelectedUserType() {
        return await this.userTypeDropdown.locator('option[selected]').innerText();
    }
}

module.exports = { LoginPagePractise };
