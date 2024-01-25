import { test } from '@playwright/test';
import { LoginPage } from '../page-objects/LoginPage';
import { ProductPage } from '../page-objects/ProductsPage';

test('Login and Product Tests', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const productPage = new ProductPage(page);
     
    await loginPage.navigateToLoginPage();
    await loginPage.invalidLogin('standard_user', 'secret_sauce');
    

      await productPage.validateNumberOfItems(6);

      await productPage.sortItemsByPriceLowToHigh();
      await productPage.assertLowestAndHighestPrice();
 
      await page.waitForTimeout(5000);
      await productPage.addItemsToBasket(3);
      await productPage.validateNumberOfItemsInBasket(3);
      await page.waitForTimeout(5000);
  
      await productPage.removeItemFromBasket();
      await productPage.validateNumberOfItemsInBasket(2);
      await page.waitForTimeout(5000);

  });

