import {test, expect} from '@playwright/test'
import type {Browser, Page, Locator} from '@playwright/test'
import { webkit, chromium, firefox } from 'playwright'

test('login test', async()=>{  // The function is async because Playwright operations are asynchronous (network calls, DOM updates, etc.)

const browser:Browser = await firefox. launch({headless: false});
const page: Page = await browser.newPage();
await page. goto("https://naveenautomationlabs.com/opencart/index.php?route=account/login");

//Creates locators for the elements on the page:
const emailId:Locator = await page. locator('#input-email');
const password: Locator = await page. locator('#input-password');
const loginButton:Locator = await page. locator("[value='Login']");

// Types the email and password into the respective fields.
await emailId.fill("pwtest@opencart.com");
await password.fill("playwright@123");
await loginButton.click(); // Clicks the Login button.

const title = await page.title();
console. log ("home page title: ", title);

// Takes a screenshot of the page after login. and save it in home directory
await page. screenshot({path: 'homepage.png'});

// Uses Playwright’s assertion to verify the page title is exactly 'My Account'.
expect(title).toEqual('My Account');

browser.close();

});

// Try to wright test script for registration form  


/*
test is used to define a test case
expect is used to verify results, like checking page titles or element text.

Imports TypeScript types: Browser → the browser instance
                          Page    → a single tab or page in the browser
                          Locator → a reference to a DOM element

Imports browser engines for direct control: chromium → Chrome/Edge
                                            firefox → Firefox
                                            webkit → Safari engine


*/