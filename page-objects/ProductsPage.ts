import { expect } from '@playwright/test';
import { Page } from 'playwright';

export class ProductPage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async validateNumberOfItems(expectedCount: number) {
    const items = await this.page.$$('.inventory_item');
    expect(items.length).toBe(expectedCount);
  }

  async sortItemsByPriceLowToHigh() {
    await this.page.selectOption('.product_sort_container', 'lohi');
  }


async assertLowestAndHighestPrice() {
    const items = await this.page.$$('.inventory_item_price');
    const firstItemPrice = await items[0].innerText();
    const lastItemPrice = await items[items.length - 1].innerText();
    
    const firstPriceNumeric = parseFloat(firstItemPrice.replace('$', ''));
    const lastPriceNumeric = parseFloat(lastItemPrice.replace('$', ''));

    expect(firstPriceNumeric).toBeLessThanOrEqual(lastPriceNumeric);
  }


async addItemsToBasket(quantity: number) {
    const addButtons = await this.page.$$('.btn_inventory');
    for (let i = 0; i < quantity; i++) {
      await addButtons[i].click();
    }
  }

  async validateNumberOfItemsInBasket(expectedCount: number) {
    const basket = await this.page.$(".shopping_cart_badge");
    if (basket) {
      expect(await basket.textContent()).toBe(expectedCount.toString());
    }
  }

  async removeItemFromBasket() {
    const removeButton = await this.page.$(".btn_secondary");
    if (removeButton) {
      await removeButton.click();
    }
  }
}

  
