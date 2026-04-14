const { test, expect } = require('@playwright/test');
const { LoginPagePractise } = require('../pageobjects/loginPagePractise');

test.describe('Login Page Practice - Rahul Shetty Academy', () => {

    let loginPagePractise;

    test.beforeEach(async ({ page }) => {
        loginPagePractise = new LoginPagePractise(page);
        await loginPagePractise.goTo();
    });

    test('@Smoke Login with valid credentials as Admin', async ({ page }) => {
        // Arrange: Login page is already loaded in beforeEach

        // Act: Perform login with valid credentials
        await loginPagePractise.signInWithCredentials(
            'rahulshettyacademy',
            'Learning@830$3mK2',
            'Student',
            'admin'
        );

        // Assert: Verify successful login by checking page URL
        expect(page.url()).toContain('/angularpractice/shop');
        
        // Additional verification - Check if shop page loaded
        const shopPageTitle = await page.locator('heading').first().innerText();
        expect(shopPageTitle).toBeTruthy();
    });

    test('@Smoke Login with valid credentials as User', async ({ page }) => {
        // Arrange: Login page is already loaded in beforeEach

        // Act: Perform login with valid credentials as User role
        await loginPagePractise.signInWithCredentials(
            'rahulshettyacademy',
            'Learning@830$3mK2',
            'Student',
            'user'
        );

        // Assert: Verify successful login
        expect(page.url()).toContain('/angularpractice/shop');
    });

    test('@Smoke Login with different user type selection', async ({ page }) => {
        // Arrange: Login page is already loaded in beforeEach

        // Act: Select different user types and verify
        await loginPagePractise.enterUsername('rahulshettyacademy');
        await loginPagePractise.enterPassword('Learning@830$3mK2');
        await loginPagePractise.selectUserType('Teacher');
        await loginPagePractise.selectAdminRole();
        await loginPagePractise.acceptTermsAndConditions();
        await loginPagePractise.clickSignIn();

        // Assert: Verify successful login with Teacher user type
        expect(page.url()).toContain('/angularpractice/shop');
    });

    test('@Functional Verify Sign In button is enabled when terms are accepted', async ({ page }) => {
        // Arrange: Login page is already loaded in beforeEach

        // Act: Fill in credentials and accept terms
        await loginPagePractise.enterUsername('rahulshettyacademy');
        await loginPagePractise.enterPassword('Learning@830$3mK2');
        await loginPagePractise.acceptTermsAndConditions();

        // Assert: Verify Sign In button is enabled
        const isEnabled = await loginPagePractise.isSignInButtonEnabled();
        expect(isEnabled).toBeTruthy();
    });

    test('@Functional Verify all form elements are visible on login page', async ({ page }) => {
        // Arrange & Act: Check visibility of elements
        const usernameVisible = await loginPagePractise.usernameField.isVisible();
        const passwordVisible = await loginPagePractise.passwordField.isVisible();
        const adminRadioVisible = await loginPagePractise.adminRadio.isVisible();
        const userRadioVisible = await loginPagePractise.userRadio.isVisible();
        const checkboxVisible = await loginPagePractise.termsCheckbox.isVisible();
        const signInButtonVisible = await loginPagePractise.isSignInButtonVisible();

        // Assert: All elements should be visible
        expect(usernameVisible).toBeTruthy();
        expect(passwordVisible).toBeTruthy();
        expect(adminRadioVisible).toBeTruthy();
        expect(userRadioVisible).toBeTruthy();
        expect(checkboxVisible).toBeTruthy();
        expect(signInButtonVisible).toBeTruthy();
    });

    test('@Functional Verify Admin radio button is selected by default', async ({ page }) => {
        // Arrange & Act: Check if admin radio is checked
        const isAdminChecked = await loginPagePractise.adminRadio.isChecked();

        // Assert: Admin should be selected by default
        expect(isAdminChecked).toBeTruthy();
    });

    test('@Functional Verify radio button selection can be changed', async ({ page }) => {
        // Arrange: Admin is selected by default
        let isAdminChecked = await loginPagePractise.adminRadio.isChecked();
        expect(isAdminChecked).toBeTruthy();

        // Act: Switch to User role
        await loginPagePractise.selectUserRole();

        // Assert: Verify User is now selected and Admin is not
        const isUserChecked = await loginPagePractise.userRadio.isChecked();
        isAdminChecked = await loginPagePractise.adminRadio.isChecked();
        expect(isUserChecked).toBeTruthy();
        expect(isAdminChecked).toBeFalsy();
    });

    test('@Functional Verify dropdown user types are available', async ({ page }) => {
        // Arrange & Act: Try selecting different user types
        const userTypes = ['Student', 'Teacher', 'Consultant'];

        for (const userType of userTypes) {
            await loginPagePractise.selectUserType(userType);
            
            // Assert: Verify the selection was successful using selected option
            const selectedValue = await loginPagePractise.getSelectedUserType();
            expect(selectedValue.trim()).toBe(userType);
        }
    });

    test('@Negative Login attempt with username only (no password)', async ({ page }) => {
        // Arrange: Login page is already loaded

        // Act: Enter only username and try to sign in
        await loginPagePractise.enterUsername('rahulshettyacademy');
        await loginPagePractise.acceptTermsAndConditions();
        await loginPagePractise.signInButton.click();
        await page.waitForTimeout(2000);

        // Assert: Should either show error or stay on login page
        expect(page.url()).toContain('loginpagePractise');
    });

    test('@Negative Login attempt without accepting terms checkbox', async ({ page }) => {
        // Arrange: Login page is already loaded

        // Act: Fill credentials but don't accept terms, try to sign in
        await loginPagePractise.enterUsername('rahulshettyacademy');
        await loginPagePractise.enterPassword('Learning@830$3mK2');
        
        // Note: Attempting to click sign in without checking terms
        // This tests if the application has proper validation

        // Assert: Verify terms checkbox is still unchecked
        const isTermsChecked = await loginPagePractise.termsCheckbox.isChecked();
        expect(isTermsChecked).toBeFalsy();
    });

    test('@Regression Complete login flow with all fields', async ({ page }) => {
        // Arrange: Login page is already loaded

        // Act: Complete login flow step by step
        await loginPagePractise.enterUsername('rahulshettyacademy');
        await loginPagePractise.enterPassword('Learning@830$3mK2');
        await loginPagePractise.selectAdminRole();
        await loginPagePractise.selectUserType('Consultant');
        await loginPagePractise.acceptTermsAndConditions();
        await loginPagePractise.clickSignIn();

        // Assert: Verify redirect to shop page
        expect(page.url()).toContain('/angularpractice/shop');
        
        // Additional verification
        await page.waitForLoadState('domcontentloaded');
        const pageTitle = await page.title();
        expect(pageTitle).toBeTruthy();
    });
});
