import {test, expect} from '@playwright/test'
import type {Browser, Page, Locator} from '@playwright/test'
import { firefox } from 'playwright'

test('account registration test', async()=>{
    const browser:Browser = await firefox.launch({headless: false});
    const page: Page = await browser.newPage();
    await page.goto("https://naveenautomationlabs.com/opencart/index.php?route=account/register");

    // Fill in Personal Details
    const firstName:Locator = await page.locator('#input-firstname');
    const lastName:Locator = await page.locator('#input-lastname');
    const email:Locator = await page.locator('#input-email');
    const telephone:Locator = await page.locator('#input-telephone');

    await firstName.fill("Ravindu");
    await lastName.fill("Abeysinghe");
    // Generate unique email to avoid duplicate registration
    const timestamp = Date.now();
    await email.fill(`ravindubandaraha${timestamp}@gmail.com`);
    await telephone.fill("0716589780");

    // Fill in Password
    const password:Locator = await page.locator('#input-password');
    const confirmPassword:Locator = await page.locator('#input-confirm');

    await password.fill("Password123");
    await confirmPassword.fill("Password123");

    // Select Newsletter - No option
    const newsletterNo:Locator = await page.locator('input[name="newsletter"][value="0"]');
    await newsletterNo.check();

    // Agree to Privacy Policy
    const privacyPolicy:Locator = await page.locator('input[name="agree"]');
    await privacyPolicy.check();

    // Click Continue button
    const continueButton:Locator = await page.locator('input[type="submit"][value="Continue"]');
    await continueButton.click();

    // Wait for success message
    await page.waitForLoadState('networkidle');

    // Verify success message
    const successMessage = await page.locator('h1').textContent();
    console.log("Success message: ", successMessage);

    await page.screenshot({path: 'registration-success.png'});

    expect(successMessage).toContain('Your Account Has Been Created!');

    await browser.close();
});
