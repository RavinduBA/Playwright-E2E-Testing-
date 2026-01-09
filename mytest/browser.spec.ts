import {test, expect} from '@playwright/test'
import type {Browser, Page, Locator, BrowserContext} from '@playwright/test'
import { chromium } from 'playwright'

test('login test with multiple browser contexts', async()=>{

const browser:Browser = await chromium.launch({headless: false, channel:'chrome'});

// browsercontext1:
const browserContext_1: BrowserContext = await browser.newContext();
const page1: Page = await browserContext_1.newPage();

// browsercontext2:
const browserContext_2: BrowserContext = await browser.newContext();
const page2: Page = await browserContext_2.newPage();

//Browser Context 1
await page1.goto("https://naveenautomationlabs.com/opencart/index.php?route=account/login");
const emailId1:Locator = page1.locator('#input-email'); // No await needed
const password1:Locator = page1.locator('#input-password');
const loginButton1:Locator = page1.locator("[value='Login']");

await emailId1.fill("pwtest@opencart.com");
await password1.fill("playwright@123");
await loginButton1.click();

// Verify login for user 1
await page1.waitForLoadState('networkidle');
const title1 = await page1.title();
console.log("User 1 page title:", title1);
expect(title1).toBe('My Account');

//Browser Context 2
await page2.goto("https://naveenautomationlabs.com/opencart/index.php?route=account/login");
const emailId2:Locator = page2.locator('#input-email'); // No await needed
const password2:Locator = page2.locator('#input-password');
const loginButton2:Locator = page2.locator("[value='Login']");

await emailId2.fill("ravindubandaraha1@gmail.com");
await password2.fill("ravindu1");
await loginButton2.click();

// Verify login for user 2
await page2.waitForLoadState('networkidle');
const title2 = await page2.title();
console.log("User 2 page title:", title2);
expect(title2).toBe('My Account');

// Wait a bit to see both browsers (optional)
await page1.waitForTimeout(3000);

// Clean up
//await browserContext_1.close();
//await browserContext_2.close();
// await browser.close();

});