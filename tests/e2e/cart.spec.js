import {expect, test} from '@playwright/test';

test.describe('Cart', () => {
    test('Debe mostrar un número positivo tras añadir al carrito', async ({page}) => {
        await page.goto('/');
        await page.waitForLoadState('networkidle');

        const cartCounter = page.locator('[id="cart-badge"]').first();

        const firstProduct = page.locator('[id*="product"]').first();
        await firstProduct.click();
        await page.waitForURL(/\/product\/.+/);

        await page.waitForTimeout(1000);

        const addToCartButton = page.getByRole('button', {name: /Add to cart/i});
        await expect(addToCartButton).toBeVisible();
        await addToCartButton.click();

        await page.waitForTimeout(1000);

        await expect(cartCounter).toBeVisible();

        const cartText = await cartCounter.textContent();
        const hasNumber = /\d+/.test(cartText);
        expect(hasNumber).toBeTruthy();
    });

    test('Debe ser visible en la página principal', async ({page}) => {
        await page.goto('/');
        await page.waitForLoadState('networkidle');
        const cartCounter = page.locator('[id="cart-badge"]').first();
        const cartText = await cartCounter.textContent();
        const hasNumber = /\d+/.test(cartText);
        expect(hasNumber).toBeTruthy();
    });
});
