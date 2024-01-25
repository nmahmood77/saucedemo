import { test } from '@playwright/test';
import { LoginPage } from '../page-objects/LoginPage';


test("Verify Login to homepage successfully", async ({page}) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigateToLoginPage();
    await loginPage.validLogin('standard_user', 'secret_sauce');
  })

  test("Verify Login to homepage Unsuccessfully", async ({page}) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigateToLoginPage();
    await page.waitForTimeout(5000);
    await loginPage.invalidLogin('standard_user', 'secret_sauc');
    await loginPage.assertErrorMessage();
  })