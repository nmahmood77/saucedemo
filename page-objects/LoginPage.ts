import { Page, expect } from '@playwright/test';

export class LoginPage {
  private readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigateToLoginPage() {
    await this.page.goto('https://www.saucedemo.com/');
  }

  async validLogin(username: string, password: string) {
    await this.page.fill('[data-test="username"]', username);
    await this.page.fill('[data-test="password"]', password);
    await this.page.click('[data-test="login-button"]');
    await expect(this.page).toHaveURL(
      "https://www.saucedemo.com/inventory.html"
    );
  }




  async invalidLogin(username: string, password: string) {
    await this.page.fill('[data-test="username"]', username);
    await this.page.fill('[data-test="password"]', password);
    await this.page.click('[data-test="login-button"]');
    // await expect(this.page.locator('[data-test="error"]')).toContainText('sadface:');
  }

  async assertErrorMessage() {
    await expect(this.page.locator('[data-test="error"]')).toContainText('Epic sadface: Username and password do not match any user in this service');
  }

  

}
